"""Main FastAPI application entry point."""

from contextlib import asynccontextmanager
from typing import AsyncGenerator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from loguru import logger

from app.core import settings, setup_logging
from app.db.base import Base
from app.db.session import engine


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """
    Application lifespan manager for startup and shutdown events.

    Args:
        app: FastAPI application instance

    Yields:
        None during application runtime
    """
    # Startup
    logger.info("Starting M-Kopa AOIS API...")
    logger.info(f"Environment: {settings.ENVIRONMENT}")
    logger.info(f"Debug Mode: {settings.DEBUG}")

    # Create database tables (for development only)
    # In production, use Alembic migrations
    if settings.DEBUG:
        logger.info("Creating database tables...")
        Base.metadata.create_all(bind=engine)

    logger.info("Application startup complete")

    yield

    # Shutdown
    logger.info("Shutting down M-Kopa AOIS API...")
    logger.info("Application shutdown complete")


# Initialize logging
setup_logging()

# Create FastAPI application
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="M-Kopa Accra Operations Intelligence System - Backend API",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url=f"{settings.API_V1_PREFIX}/openapi.json",
    lifespan=lifespan,
)

# Configure CORS
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


# Health check endpoint
@app.get("/health", tags=["Health"])
async def health_check() -> JSONResponse:
    """
    Health check endpoint to verify API is running.

    Returns:
        JSON response with health status
    """
    return JSONResponse(
        content={
            "status": "healthy",
            "app_name": settings.APP_NAME,
            "version": settings.APP_VERSION,
            "environment": settings.ENVIRONMENT,
        }
    )


# Root endpoint
@app.get("/", tags=["Root"])
async def root() -> JSONResponse:
    """
    Root endpoint providing API information.

    Returns:
        JSON response with API details
    """
    return JSONResponse(
        content={
            "message": "M-Kopa AOIS API",
            "version": settings.APP_VERSION,
            "docs": "/docs",
            "health": "/health",
        }
    )


# Import and include API routers
from app.api.v1.api import api_router
app.include_router(api_router, prefix=settings.API_V1_PREFIX)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.DEBUG,
        log_level=settings.LOG_LEVEL.lower(),
    )

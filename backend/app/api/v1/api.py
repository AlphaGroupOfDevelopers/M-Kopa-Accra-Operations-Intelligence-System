"""API v1 router aggregation."""

from fastapi import APIRouter

from app.api.v1.endpoints import agents, auth, sales, shops

api_router = APIRouter()

# Include authentication routes
api_router.include_router(
    auth.router,
    prefix="/auth",
    tags=["Authentication"],
)

# Include team member routes
api_router.include_router(
    agents.router,
    prefix="/agents",
    tags=["Team Members"],
)

# Include shop routes
api_router.include_router(
    shops.router,
    prefix="/shops",
    tags=["Shops"],
)

# Include sales routes
api_router.include_router(
    sales.router,
    prefix="/sales",
    tags=["Sales"],
)

# TODO: Add reports router when implemented
# api_router.include_router(reports.router, prefix="/reports", tags=["Reports"])

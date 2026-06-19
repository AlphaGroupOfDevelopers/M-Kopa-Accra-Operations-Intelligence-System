"""Logging configuration for the application."""

import logging
import sys
from pathlib import Path
from typing import Any

from loguru import logger

from app.core.config import settings


class InterceptHandler(logging.Handler):
    """
    Intercept standard logging messages and redirect to loguru.
    """

    def emit(self, record: logging.LogRecord) -> None:
        # Get corresponding Loguru level if it exists
        try:
            level = logger.level(record.levelname).name
        except ValueError:
            level = record.levelno

        # Find caller from where originated the logged message
        frame, depth = logging.currentframe(), 2
        while frame.f_code.co_filename == logging.__file__:
            frame = frame.f_back  # type: ignore
            depth += 1

        logger.opt(depth=depth, exception=record.exc_info).log(level, record.getMessage())


def setup_logging() -> None:
    """
    Configure application logging.

    - Remove default loguru handler
    - Add console handler with appropriate format
    - Add file handler if configured
    - Intercept uvicorn and other library logs
    """
    # Remove default handler
    logger.remove()

    # Console handler
    logger.add(
        sys.stdout,
        level=settings.LOG_LEVEL,
        format="<green>{time:YYYY-MM-DD HH:mm:ss}</green> | <level>{level: <8}</level> | <cyan>{name}</cyan>:<cyan>{function}</cyan>:<cyan>{line}</cyan> - <level>{message}</level>",
        colorize=True,
    )

    # File handler (if configured)
    if settings.LOG_FILE:
        log_path = Path(settings.LOG_FILE)
        log_path.parent.mkdir(parents=True, exist_ok=True)

        logger.add(
            settings.LOG_FILE,
            level=settings.LOG_LEVEL,
            format="{time:YYYY-MM-DD HH:mm:ss} | {level: <8} | {name}:{function}:{line} - {message}",
            rotation="10 MB",
            retention="30 days",
            compression="zip",
        )

    # Intercept standard logging
    logging.basicConfig(handlers=[InterceptHandler()], level=0, force=True)

    # Set levels for specific loggers
    for logger_name in ["uvicorn", "uvicorn.access", "uvicorn.error", "fastapi"]:
        logging_logger = logging.getLogger(logger_name)
        logging_logger.handlers = [InterceptHandler()]

    # Log startup
    logger.info(f"Logging configured - Level: {settings.LOG_LEVEL}, Environment: {settings.ENVIRONMENT}")

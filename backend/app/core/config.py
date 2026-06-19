"""Core configuration settings for the M-Kopa AOIS application."""

from typing import Any, List, Optional
from pydantic import AnyHttpUrl, PostgresDsn, RedisDsn, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore"
    )

    # Application
    APP_NAME: str = "M-Kopa AOIS API"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False
    ENVIRONMENT: str = "production"
    API_V1_PREFIX: str = "/api/v1"

    # Security
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # Database
    DATABASE_URL: PostgresDsn
    DATABASE_POOL_SIZE: int = 5
    DATABASE_MAX_OVERFLOW: int = 10
    DATABASE_ECHO: bool = False

    # Redis
    REDIS_URL: RedisDsn
    CACHE_TTL: int = 3600

    # CORS
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = []

    @field_validator("BACKEND_CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: str | List[str]) -> List[str] | str:
        """Parse CORS origins from string or list."""
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)

    # External Services
    GOOGLE_FORMS_WEBHOOK_SECRET: Optional[str] = None
    MICROSOFT_FORMS_WEBHOOK_SECRET: Optional[str] = None

    # Storage
    FILE_STORAGE_PATH: str = "./storage"
    REPORTS_STORAGE_PATH: str = "./storage/reports"

    # Logging
    LOG_LEVEL: str = "INFO"
    LOG_FILE: Optional[str] = "./logs/app.log"

    # Email Configuration
    SMTP_HOST: Optional[str] = None
    SMTP_PORT: Optional[int] = 587
    SMTP_USER: Optional[str] = None
    SMTP_PASSWORD: Optional[str] = None
    EMAILS_FROM_EMAIL: Optional[str] = None
    EMAILS_FROM_NAME: Optional[str] = None

    # Pagination
    DEFAULT_PAGE_SIZE: int = 50
    MAX_PAGE_SIZE: int = 100

    # Analytics
    FORECASTING_WINDOW_DAYS: int = 30
    MOMENTUM_LOOKBACK_DAYS: int = 7
    SILENT_SHOP_THRESHOLD_DAYS: int = 3

    @property
    def database_url_sync(self) -> str:
        """Get synchronous database URL for SQLAlchemy."""
        url = str(self.DATABASE_URL)
        # Handle both psycopg2 and psycopg3
        if "postgresql+asyncpg://" in url:
            return url.replace("postgresql+asyncpg://", "postgresql+psycopg://")
        elif "postgresql://" in url:
            # Default to psycopg (psycopg3)
            return url.replace("postgresql://", "postgresql+psycopg://")
        return url

    @property
    def database_url_async(self) -> str:
        """Get async database URL for SQLAlchemy."""
        url = str(self.DATABASE_URL)
        if "postgresql://" in url and "postgresql+asyncpg://" not in url:
            return url.replace("postgresql://", "postgresql+asyncpg://")
        return url


# Create global settings instance
settings = Settings()

"""Authentication schemas."""

from pydantic import BaseModel, EmailStr, Field


class Token(BaseModel):
    """Access token response."""

    access_token: str = Field(..., description="JWT access token")
    token_type: str = Field("bearer", description="Token type")
    refresh_token: str = Field(..., description="JWT refresh token")


class TokenRefresh(BaseModel):
    """Token refresh request."""

    refresh_token: str = Field(..., description="Refresh token")


class LoginRequest(BaseModel):
    """Login request."""

    email: EmailStr = Field(..., description="User email")
    password: str = Field(..., min_length=6, description="User password")


class TokenPayload(BaseModel):
    """JWT token payload."""

    sub: str = Field(..., description="Subject (user ID)")
    exp: int = Field(..., description="Expiration timestamp")
    type: str = Field(..., description="Token type (access or refresh)")

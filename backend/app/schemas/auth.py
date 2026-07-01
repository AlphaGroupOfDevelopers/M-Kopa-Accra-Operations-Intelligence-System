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

    account_number: str = Field(..., description="User account number")
    password: str = Field(..., min_length=5, max_length=5, description="5-Digit password")


class ForgotPasswordRequest(BaseModel):
    """Forgot password request."""

    account_number: str = Field(..., description="User account number")


class ForgotPasswordResponse(BaseModel):
    """Forgot password response."""

    message: str = Field(..., description="Status message")
    reset_token: str | None = Field(None, description="Password reset token (for direct redirection)")


class ResetPasswordRequest(BaseModel):
    """Reset password request."""

    token: str = Field(..., description="Password reset token")
    new_password: str = Field(..., min_length=5, max_length=5, description="New 5-Digit password")


class TokenPayload(BaseModel):
    """JWT token payload."""

    sub: str = Field(..., description="Subject (user ID)")
    exp: int = Field(..., description="Expiration timestamp")
    type: str = Field(..., description="Token type (access or refresh)")

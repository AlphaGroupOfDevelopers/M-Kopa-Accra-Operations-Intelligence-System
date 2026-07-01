"""Authentication endpoints."""

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.api.deps import get_current_active_user, get_db
from app.core.security import (
    create_access_token,
    create_refresh_token,
    create_reset_token,
    get_password_hash,
    verify_password,
    verify_token,
)
from app.models.user import User
from app.schemas.auth import (
    LoginRequest, 
    Token, 
    TokenRefresh, 
    ForgotPasswordRequest, 
    ForgotPasswordResponse, 
    ResetPasswordRequest
)
from app.schemas.user import UserProfile

router = APIRouter()


@router.post("/login", response_model=Token, summary="User login")
def login(
    login_data: LoginRequest,
    db: Session = Depends(get_db),
) -> Token:
    """
    Authenticate user and return JWT tokens.

    Args:
        login_data: Login credentials (email and password)
        db: Database session

    Returns:
        Access and refresh tokens

    Raises:
        HTTPException: If credentials are invalid
    """
    # Find user by appending the default domain to the account number
    email = f"{login_data.account_number}@m-kopa.com"
    user = db.query(User).filter(User.email == email).first()

    # Verify user exists and password is correct
    if not user or not verify_password(login_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect account number or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Check if user is active
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is inactive",
        )

    # Generate tokens
    access_token = create_access_token(subject=str(user.id))
    refresh_token = create_refresh_token(subject=str(user.id))

    return Token(
        access_token=access_token,
        refresh_token=refresh_token,
        token_type="bearer",
    )


@router.post("/login/form", response_model=Token, summary="Form-based login")
def login_form(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
) -> Token:
    """
    OAuth2 compatible form-based authentication.

    Args:
        form_data: OAuth2 form data (username and password)
        db: Database session

    Returns:
        Access and refresh tokens

    Raises:
        HTTPException: If credentials are invalid
    """
    # Use username as email
    user = db.query(User).filter(User.email == form_data.username).first()

    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is inactive",
        )

    access_token = create_access_token(subject=str(user.id))
    refresh_token = create_refresh_token(subject=str(user.id))

    return Token(
        access_token=access_token,
        refresh_token=refresh_token,
        token_type="bearer",
    )


@router.post("/refresh", response_model=Token, summary="Refresh access token")
def refresh_token(
    token_data: TokenRefresh,
    db: Session = Depends(get_db),
) -> Token:
    """
    Refresh access token using refresh token.

    Args:
        token_data: Refresh token
        db: Database session

    Returns:
        New access and refresh tokens

    Raises:
        HTTPException: If refresh token is invalid
    """
    # Verify refresh token
    user_id = verify_token(token_data.refresh_token, token_type="refresh")
    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Get user
    user = db.query(User).filter(User.id == int(user_id)).first()
    if not user or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found or inactive",
        )

    # Generate new tokens
    access_token = create_access_token(subject=str(user.id))
    refresh_token = create_refresh_token(subject=str(user.id))

    return Token(
        access_token=access_token,
        refresh_token=refresh_token,
        token_type="bearer",
    )


@router.get("/me", response_model=UserProfile, summary="Get current user profile")
def get_profile(
    current_user: User = Depends(get_current_active_user),
) -> UserProfile:
    """
    Get current authenticated user profile.

    Args:
        current_user: Current authenticated user

    Returns:
        User profile data
    """
    return current_user


@router.post("/forgot-password", response_model=ForgotPasswordResponse, summary="Request password reset")
def forgot_password(
    request: ForgotPasswordRequest,
    db: Session = Depends(get_db),
) -> ForgotPasswordResponse:
    """
    Request a password reset token.
    """
    email = f"{request.account_number}@m-kopa.com"
    user = db.query(User).filter(User.email == email).first()

    if not user or not user.is_active:
        # Return success anyway to prevent username enumeration
        return ForgotPasswordResponse(
            message="If an active account exists, a reset link has been generated."
        )

    # Generate token
    reset_token = create_reset_token(subject=str(user.id))

    # In a real app, send an email here.
    # For this internal tool, we return the token directly so the frontend can redirect.
    return ForgotPasswordResponse(
        message="Reset token generated successfully.",
        reset_token=reset_token
    )


@router.post("/reset-password", summary="Reset password")
def reset_password(
    request: ResetPasswordRequest,
    db: Session = Depends(get_db),
) -> dict:
    """
    Reset user password using token.
    """
    user_id = verify_token(request.token, token_type="reset")
    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired reset token",
        )

    user = db.query(User).filter(User.id == int(user_id)).first()
    if not user or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found or inactive",
        )

    user.hashed_password = get_password_hash(request.new_password)
    db.commit()

    return {"message": "Password reset successfully"}

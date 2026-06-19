"""Database initialization script."""

from loguru import logger
from sqlalchemy.orm import Session

from app.core.security import get_password_hash
from app.db.session import SessionLocal
from app.models.user import User


def init_db(db: Session) -> None:
    """
    Initialize database with default data.

    Args:
        db: Database session
    """
    logger.info("Initializing database...")

    # Check if admin user exists
    admin_user = db.query(User).filter(User.email == "admin@mkopa-aois.com").first()

    if not admin_user:
        logger.info("Creating default admin user...")
        admin_user = User(
            email="admin@mkopa-aois.com",
            full_name="System Administrator",
            hashed_password=get_password_hash("admin123"),  # Change in production!
            is_active=True,
            is_superuser=True,
        )
        db.add(admin_user)
        db.commit()
        db.refresh(admin_user)
        logger.info(f"Admin user created: {admin_user.email}")
    else:
        logger.info("Admin user already exists")

    logger.info("Database initialization complete")


def main() -> None:
    """Main function to run database initialization."""
    logger.info("Starting database initialization...")
    db = SessionLocal()
    try:
        init_db(db)
    finally:
        db.close()
    logger.info("Database initialization script completed")


if __name__ == "__main__":
    main()

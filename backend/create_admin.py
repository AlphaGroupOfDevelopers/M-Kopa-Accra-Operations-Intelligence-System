import os
import sys

# Add backend directory to path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__))))

from app.db.session import SessionLocal
from app.models.user import User
from app.core.security import get_password_hash

def create_admin():
    db = SessionLocal()
    email = "263713288@m-kopa.com"
    password = "12345"
    
    # Check if user already exists
    user = db.query(User).filter(User.email == email).first()
    if user:
        print(f"User {email} already exists. Updating password...")
        user.hashed_password = get_password_hash(password)
        db.commit()
    else:
        print(f"Creating user {email}...")
        user = User(
            email=email,
            full_name="Operations Manager",
            hashed_password=get_password_hash(password),
            is_active=True,
            is_superuser=True
        )
        db.add(user)
        db.commit()
    
    print("Admin user setup complete.")
    db.close()

if __name__ == "__main__":
    create_admin()

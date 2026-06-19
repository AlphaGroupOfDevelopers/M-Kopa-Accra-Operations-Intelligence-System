"""Agent (Team Member) model."""

from datetime import date
from typing import List, Optional

from sqlalchemy import String, Text, Date, Enum as SQLEnum
from sqlalchemy.orm import Mapped, mapped_column, relationship
import enum

from app.db.base import Base, TimestampMixin, SoftDeleteMixin


class EmploymentStatus(str, enum.Enum):
    """Employment status options."""
    ACTIVE = "active"
    INACTIVE = "inactive"
    ON_LEAVE = "on_leave"
    TERMINATED = "terminated"


class EducationLevel(str, enum.Enum):
    """Education level options."""
    HIGH_SCHOOL = "high_school"
    DIPLOMA = "diploma"
    BACHELOR = "bachelor"
    MASTER = "master"
    PHD = "phd"
    OTHER = "other"


class Agent(Base, TimestampMixin, SoftDeleteMixin):
    """
    Agent/Team Member model representing M-Kopa sales agents.

    Attributes:
        id: Primary key
        employee_id: Unique employee identifier
        first_name: Agent's first name
        last_name: Agent's last name
        email: Email address
        phone: Contact phone number
        date_of_birth: Date of birth
        gender: Gender
        address: Residential address
        education_level: Highest education level achieved
        education_institution: Name of educational institution
        education_year: Year of graduation/completion
        employment_date: Date of employment with M-Kopa
        employment_status: Current employment status
        national_id: National identification number
        emergency_contact_name: Emergency contact person
        emergency_contact_phone: Emergency contact phone
        notes: Additional notes about the agent
        assignments: Relationship to shop assignments
        sales_records: Relationship to sales records
    """

    __tablename__ = "agents"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    employee_id: Mapped[str] = mapped_column(String(50), unique=True, index=True, nullable=False)
    first_name: Mapped[str] = mapped_column(String(100), nullable=False)
    last_name: Mapped[str] = mapped_column(String(100), nullable=False)
    email: Mapped[str | None] = mapped_column(String(255), unique=True, index=True, nullable=True)
    phone: Mapped[str] = mapped_column(String(20), nullable=False)

    # Personal Information
    date_of_birth: Mapped[date | None] = mapped_column(Date, nullable=True)
    gender: Mapped[str | None] = mapped_column(String(20), nullable=True)
    address: Mapped[str | None] = mapped_column(Text, nullable=True)
    national_id: Mapped[str | None] = mapped_column(String(50), unique=True, nullable=True)

    # Education
    education_level: Mapped[EducationLevel | None] = mapped_column(
        SQLEnum(EducationLevel, name="education_level_enum", create_constraint=True),
        nullable=True
    )
    education_institution: Mapped[str | None] = mapped_column(String(255), nullable=True)
    education_year: Mapped[int | None] = mapped_column(nullable=True)

    # Employment
    employment_date: Mapped[date | None] = mapped_column(Date, nullable=True)
    employment_status: Mapped[EmploymentStatus] = mapped_column(
        SQLEnum(EmploymentStatus, name="employment_status_enum", create_constraint=True),
        default=EmploymentStatus.ACTIVE,
        nullable=False
    )

    # Emergency Contact
    emergency_contact_name: Mapped[str | None] = mapped_column(String(255), nullable=True)
    emergency_contact_phone: Mapped[str | None] = mapped_column(String(20), nullable=True)

    # Additional Information
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)

    # Relationships
    assignments: Mapped[List["Assignment"]] = relationship(
        "Assignment",
        back_populates="agent",
        cascade="all, delete-orphan",
        order_by="Assignment.start_date.desc()"
    )
    sales_records: Mapped[List["SalesRecord"]] = relationship(
        "SalesRecord",
        back_populates="agent",
        cascade="all, delete-orphan"
    )

    @property
    def full_name(self) -> str:
        """Get agent's full name."""
        return f"{self.first_name} {self.last_name}"

    @property
    def current_assignment(self) -> Optional["Assignment"]:
        """Get agent's current active assignment."""
        for assignment in self.assignments:
            if assignment.is_current:
                return assignment
        return None

    def __repr__(self) -> str:
        return f"<Agent(id={self.id}, employee_id='{self.employee_id}', name='{self.full_name}')>"

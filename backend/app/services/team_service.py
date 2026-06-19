"""Team Service - Business logic for agent/team member management."""

from typing import List, Optional

from sqlalchemy.orm import Session

from app.models.agent import Agent, EmploymentStatus
from app.schemas.agent import AgentCreate, AgentUpdate


class TeamService:
    """Service for managing team members (agents)."""

    @staticmethod
    def create_agent(db: Session, agent_data: AgentCreate) -> Agent:
        """
        Create a new agent.

        Args:
            db: Database session
            agent_data: Agent creation data

        Returns:
            Created agent

        Raises:
            ValueError: If employee_id or email already exists
        """
        # Check if employee_id already exists
        existing = db.query(Agent).filter(Agent.employee_id == agent_data.employee_id).first()
        if existing:
            raise ValueError(f"Employee ID {agent_data.employee_id} already exists")

        # Check if email already exists (if provided)
        if agent_data.email:
            existing_email = db.query(Agent).filter(Agent.email == agent_data.email).first()
            if existing_email:
                raise ValueError(f"Email {agent_data.email} already exists")

        # Create agent
        agent = Agent(**agent_data.model_dump())
        db.add(agent)
        db.commit()
        db.refresh(agent)
        return agent

    @staticmethod
    def get_agent(db: Session, agent_id: int) -> Optional[Agent]:
        """Get agent by ID."""
        return db.query(Agent).filter(Agent.id == agent_id, Agent.deleted_at.is_(None)).first()

    @staticmethod
    def get_agent_by_employee_id(db: Session, employee_id: str) -> Optional[Agent]:
        """Get agent by employee ID."""
        return db.query(Agent).filter(
            Agent.employee_id == employee_id,
            Agent.deleted_at.is_(None)
        ).first()

    @staticmethod
    def list_agents(
        db: Session,
        skip: int = 0,
        limit: int = 50,
        employment_status: Optional[EmploymentStatus] = None,
    ) -> tuple[List[Agent], int]:
        """
        List agents with pagination and filtering.

        Args:
            db: Database session
            skip: Number of records to skip
            limit: Maximum number of records to return
            employment_status: Filter by employment status

        Returns:
            Tuple of (agents list, total count)
        """
        query = db.query(Agent).filter(Agent.deleted_at.is_(None))

        if employment_status:
            query = query.filter(Agent.employment_status == employment_status)

        total = query.count()
        agents = query.order_by(Agent.created_at.desc()).offset(skip).limit(limit).all()

        return agents, total

    @staticmethod
    def update_agent(db: Session, agent_id: int, agent_data: AgentUpdate) -> Optional[Agent]:
        """
        Update agent information.

        Args:
            db: Database session
            agent_id: Agent ID
            agent_data: Update data

        Returns:
            Updated agent or None if not found
        """
        agent = db.query(Agent).filter(Agent.id == agent_id, Agent.deleted_at.is_(None)).first()
        if not agent:
            return None

        # Update fields
        update_data = agent_data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(agent, field, value)

        db.commit()
        db.refresh(agent)
        return agent

    @staticmethod
    def delete_agent(db: Session, agent_id: int) -> bool:
        """
        Soft delete an agent.

        Args:
            db: Database session
            agent_id: Agent ID

        Returns:
            True if deleted, False if not found
        """
        agent = db.query(Agent).filter(Agent.id == agent_id, Agent.deleted_at.is_(None)).first()
        if not agent:
            return False

        agent.soft_delete()
        db.commit()
        return True

    @staticmethod
    def search_agents(db: Session, search_term: str, limit: int = 50) -> List[Agent]:
        """
        Search agents by name, employee ID, or email.

        Args:
            db: Database session
            search_term: Search term
            limit: Maximum results

        Returns:
            List of matching agents
        """
        search_pattern = f"%{search_term}%"
        return (
            db.query(Agent)
            .filter(
                Agent.deleted_at.is_(None),
                (
                    Agent.first_name.ilike(search_pattern)
                    | Agent.last_name.ilike(search_pattern)
                    | Agent.employee_id.ilike(search_pattern)
                    | Agent.email.ilike(search_pattern)
                ),
            )
            .limit(limit)
            .all()
        )

"""Team Service - Business logic for DSR (agent) management."""

from typing import List, Optional

from sqlalchemy.orm import Session

from app.models.agent import Agent, EmploymentStatus
from app.schemas.agent import AgentCreate, AgentUpdate


class TeamService:
    """Service for managing team members (DSR/agents)."""

    @staticmethod
    def create_agent(db: Session, agent_data: AgentCreate) -> Agent:
        """
        Create a new agent/DSR.

        Args:
            db: Database session
            agent_data: Agent creation data

        Returns:
            Created agent

        Raises:
            ValueError: If account_number or email already exists
        """
        # Check if account_number already exists
        existing = db.query(Agent).filter(Agent.account_number == agent_data.account_number).first()
        if existing:
            raise ValueError(f"Account number {agent_data.account_number} already exists")

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
    def get_agent_by_account_number(db: Session, account_number: str) -> Optional[Agent]:
        """Get agent by account number."""
        return db.query(Agent).filter(
            Agent.account_number == account_number,
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
        Search agents by name, account number, or email.

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
                    Agent.full_name.ilike(search_pattern)
                    | Agent.account_number.ilike(search_pattern)
                    | Agent.email.ilike(search_pattern)
                ),
            )
            .limit(limit)
            .all()
        )

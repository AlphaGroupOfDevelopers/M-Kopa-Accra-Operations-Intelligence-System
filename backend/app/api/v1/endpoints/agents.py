"""Team Member (Agent) API endpoints."""

from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_active_user, get_db
from app.models.agent import EmploymentStatus
from app.models.user import User
from app.schemas.agent import AgentCreate, AgentListItem, AgentRead, AgentUpdate
from app.schemas.common import MessageResponse, PaginatedResponse, SuccessResponse
from app.services.team_service import TeamService

router = APIRouter()


@router.post(
    "",
    response_model=AgentRead,
    status_code=status.HTTP_201_CREATED,
    summary="Create new agent",
)
def create_agent(
    agent_data: AgentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> AgentRead:
    """
    Create a new team member (agent).

    Args:
        agent_data: Agent creation data
        db: Database session
        current_user: Current authenticated user

    Returns:
        Created agent

    Raises:
        HTTPException: If employee_id or email already exists
    """
    try:
        agent = TeamService.create_agent(db, agent_data)
        return agent
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@router.get(
    "",
    response_model=PaginatedResponse[AgentListItem],
    summary="List agents",
)
def list_agents(
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(50, ge=1, le=100, description="Items per page"),
    employment_status: Optional[EmploymentStatus] = Query(None, description="Filter by employment status"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> PaginatedResponse[AgentListItem]:
    """
    List agents with pagination and filtering.

    Args:
        page: Page number
        page_size: Items per page
        employment_status: Filter by employment status
        db: Database session
        current_user: Current authenticated user

    Returns:
        Paginated list of agents
    """
    skip = (page - 1) * page_size
    agents, total = TeamService.list_agents(
        db,
        skip=skip,
        limit=page_size,
        employment_status=employment_status,
    )

    return PaginatedResponse.create(
        items=agents,
        total=total,
        page=page,
        page_size=page_size,
    )


@router.get(
    "/search",
    response_model=list[AgentListItem],
    summary="Search agents",
)
def search_agents(
    q: str = Query(..., min_length=1, description="Search term"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> list[AgentListItem]:
    """
    Search agents by name, employee ID, or email.

    Args:
        q: Search term
        db: Database session
        current_user: Current authenticated user

    Returns:
        List of matching agents
    """
    agents = TeamService.search_agents(db, q)
    return agents


@router.get(
    "/{agent_id}",
    response_model=AgentRead,
    summary="Get agent by ID",
)
def get_agent(
    agent_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> AgentRead:
    """
    Get agent details by ID.

    Args:
        agent_id: Agent ID
        db: Database session
        current_user: Current authenticated user

    Returns:
        Agent details

    Raises:
        HTTPException: If agent not found
    """
    agent = TeamService.get_agent(db, agent_id)
    if not agent:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Agent with ID {agent_id} not found",
        )
    return agent


@router.get(
    "/employee/{employee_id}",
    response_model=AgentRead,
    summary="Get agent by employee ID",
)
def get_agent_by_employee_id(
    employee_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> AgentRead:
    """
    Get agent details by employee ID.

    Args:
        employee_id: Employee ID
        db: Database session
        current_user: Current authenticated user

    Returns:
        Agent details

    Raises:
        HTTPException: If agent not found
    """
    agent = TeamService.get_agent_by_employee_id(db, employee_id)
    if not agent:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Agent with employee ID {employee_id} not found",
        )
    return agent


@router.put(
    "/{agent_id}",
    response_model=AgentRead,
    summary="Update agent",
)
def update_agent(
    agent_id: int,
    agent_data: AgentUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> AgentRead:
    """
    Update agent information.

    Args:
        agent_id: Agent ID
        agent_data: Update data
        db: Database session
        current_user: Current authenticated user

    Returns:
        Updated agent

    Raises:
        HTTPException: If agent not found
    """
    agent = TeamService.update_agent(db, agent_id, agent_data)
    if not agent:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Agent with ID {agent_id} not found",
        )
    return agent


@router.delete(
    "/{agent_id}",
    response_model=SuccessResponse,
    summary="Delete agent",
)
def delete_agent(
    agent_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> SuccessResponse:
    """
    Soft delete an agent.

    Args:
        agent_id: Agent ID
        db: Database session
        current_user: Current authenticated user

    Returns:
        Success response

    Raises:
        HTTPException: If agent not found
    """
    success = TeamService.delete_agent(db, agent_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Agent with ID {agent_id} not found",
        )

    return SuccessResponse(
        success=True,
        message=f"Agent {agent_id} deleted successfully",
    )

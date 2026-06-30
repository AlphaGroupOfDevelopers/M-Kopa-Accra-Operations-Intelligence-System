"""Add sync_states table for tracking integration sync status

Revision ID: 001_sync_states
Revises: 
Create Date: 2026-06-25

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '001_sync_states'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    """Create sync_states table."""
    op.create_table(
        'sync_states',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('sync_key', sa.String(length=255), nullable=False),
        sa.Column('last_value', sa.Text(), nullable=True),
        sa.Column('last_sync_at', sa.DateTime(), nullable=True),
        sa.Column('sync_count', sa.Integer(), nullable=False, server_default='0'),
        sa.Column('metadata', sa.Text(), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_sync_states_sync_key'), 'sync_states', ['sync_key'], unique=True)


def downgrade():
    """Drop sync_states table."""
    op.drop_index(op.f('ix_sync_states_sync_key'), table_name='sync_states')
    op.drop_table('sync_states')

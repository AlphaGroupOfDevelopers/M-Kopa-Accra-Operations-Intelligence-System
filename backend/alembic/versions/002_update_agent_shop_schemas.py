"""Update agent schema to use account_number and remove GPS from shops

Revision ID: 002_agent_updates
Revises: 001_sync_states
Create Date: 2026-06-25

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '002_agent_updates'
down_revision = '001_sync_states'
branch_labels = None
depends_on = None


def upgrade():
    """Apply schema changes."""
    
    # ============================================
    # CREATE INITIAL TABLES (if they don't exist)
    # ============================================
    
    # Check if agents table exists, if not create all tables
    conn = op.get_bind()
    inspector = sa.inspect(conn)
    existing_tables = inspector.get_table_names()
    
    if 'agents' not in existing_tables:
        # Create agents table with new schema
        op.create_table(
            'agents',
            sa.Column('id', sa.Integer(), nullable=False),
            sa.Column('account_number', sa.String(length=20), nullable=False),
            sa.Column('full_name', sa.String(length=255), nullable=False),
            sa.Column('email', sa.String(length=255), nullable=True),
            sa.Column('secondary_number', sa.String(length=20), nullable=True),
            sa.Column('date_of_birth', sa.Date(), nullable=True),
            sa.Column('gender', sa.String(length=20), nullable=True),
            sa.Column('address', sa.Text(), nullable=True),
            sa.Column('education_level', sa.Enum('HIGH_SCHOOL', 'DIPLOMA', 'BACHELOR', 'MASTER', 'PHD', 'OTHER', name='education_level_enum'), nullable=True),
            sa.Column('education_institution', sa.String(length=255), nullable=True),
            sa.Column('education_year', sa.Integer(), nullable=True),
            sa.Column('employment_date', sa.Date(), nullable=True),
            sa.Column('employment_status', sa.Enum('ACTIVE', 'INACTIVE', 'ON_LEAVE', 'TERMINATED', name='employment_status_enum'), nullable=False, server_default='ACTIVE'),
            sa.Column('emergency_contact_name', sa.String(length=255), nullable=True),
            sa.Column('emergency_contact_phone', sa.String(length=20), nullable=True),
            sa.Column('notes', sa.Text(), nullable=True),
            sa.Column('created_at', sa.DateTime(), nullable=False, server_default=sa.text('CURRENT_TIMESTAMP')),
            sa.Column('updated_at', sa.DateTime(), nullable=False, server_default=sa.text('CURRENT_TIMESTAMP')),
            sa.Column('deleted_at', sa.DateTime(), nullable=True),
            sa.PrimaryKeyConstraint('id')
        )
        op.create_index(op.f('ix_agents_id'), 'agents', ['id'])
        op.create_index(op.f('ix_agents_account_number'), 'agents', ['account_number'], unique=True)
        op.create_index(op.f('ix_agents_email'), 'agents', ['email'], unique=True)
    
    if 'shops' not in existing_tables:
        # Create shops table with new schema (no GPS)
        op.create_table(
            'shops',
            sa.Column('id', sa.Integer(), nullable=False),
            sa.Column('code', sa.String(length=50), nullable=False),
            sa.Column('name', sa.String(length=255), nullable=False),
            sa.Column('location', sa.String(length=500), nullable=False),
            sa.Column('region', sa.String(length=100), nullable=False, server_default='Greater Accra'),
            sa.Column('district', sa.String(length=100), nullable=True),
            sa.Column('description', sa.Text(), nullable=True),
            sa.Column('is_active', sa.Boolean(), nullable=False, server_default='true'),
            sa.Column('created_at', sa.DateTime(), nullable=False, server_default=sa.text('CURRENT_TIMESTAMP')),
            sa.Column('updated_at', sa.DateTime(), nullable=False, server_default=sa.text('CURRENT_TIMESTAMP')),
            sa.Column('deleted_at', sa.DateTime(), nullable=True),
            sa.PrimaryKeyConstraint('id')
        )
        op.create_index(op.f('ix_shops_id'), 'shops', ['id'])
        op.create_index(op.f('ix_shops_code'), 'shops', ['code'], unique=True)
    
    if 'users' not in existing_tables:
        # Create users table
        op.create_table(
            'users',
            sa.Column('id', sa.Integer(), nullable=False),
            sa.Column('email', sa.String(length=255), nullable=False),
            sa.Column('full_name', sa.String(length=255), nullable=False),
            sa.Column('hashed_password', sa.String(length=255), nullable=False),
            sa.Column('is_active', sa.Boolean(), nullable=False, server_default='true'),
            sa.Column('is_superuser', sa.Boolean(), nullable=False, server_default='false'),
            sa.Column('created_at', sa.DateTime(), nullable=False, server_default=sa.text('CURRENT_TIMESTAMP')),
            sa.Column('updated_at', sa.DateTime(), nullable=False, server_default=sa.text('CURRENT_TIMESTAMP')),
            sa.PrimaryKeyConstraint('id')
        )
        op.create_index(op.f('ix_users_id'), 'users', ['id'])
        op.create_index(op.f('ix_users_email'), 'users', ['email'], unique=True)
    
    if 'assignments' not in existing_tables:
        # Create assignments table with team_name
        op.create_table(
            'assignments',
            sa.Column('id', sa.Integer(), nullable=False),
            sa.Column('agent_id', sa.Integer(), nullable=False),
            sa.Column('shop_id', sa.Integer(), nullable=False),
            sa.Column('start_date', sa.Date(), nullable=False),
            sa.Column('end_date', sa.Date(), nullable=True),
            sa.Column('status', sa.Enum('ACTIVE', 'COMPLETED', 'TERMINATED', name='assignment_status_enum'), nullable=False, server_default='ACTIVE'),
            sa.Column('team_name', sa.String(length=100), nullable=True),
            sa.Column('role', sa.String(length=100), nullable=True),
            sa.Column('notes', sa.Text(), nullable=True),
            sa.Column('created_at', sa.DateTime(), nullable=False, server_default=sa.text('CURRENT_TIMESTAMP')),
            sa.Column('updated_at', sa.DateTime(), nullable=False, server_default=sa.text('CURRENT_TIMESTAMP')),
            sa.ForeignKeyConstraint(['agent_id'], ['agents.id'], ondelete='CASCADE'),
            sa.ForeignKeyConstraint(['shop_id'], ['shops.id'], ondelete='CASCADE'),
            sa.PrimaryKeyConstraint('id')
        )
        op.create_index(op.f('ix_assignments_id'), 'assignments', ['id'])
        op.create_index(op.f('ix_assignments_agent_id'), 'assignments', ['agent_id'])
        op.create_index(op.f('ix_assignments_shop_id'), 'assignments', ['shop_id'])
        op.create_index(op.f('ix_assignments_start_date'), 'assignments', ['start_date'])
        op.create_index(op.f('ix_assignments_end_date'), 'assignments', ['end_date'])
        op.create_index(op.f('ix_assignments_status'), 'assignments', ['status'])
    
    if 'sales_records' not in existing_tables:
        # Create sales_records table
        op.create_table(
            'sales_records',
            sa.Column('id', sa.Integer(), nullable=False),
            sa.Column('agent_id', sa.Integer(), nullable=False),
            sa.Column('shop_id', sa.Integer(), nullable=False),
            sa.Column('sale_date', sa.Date(), nullable=False),
            sa.Column('devices_sold', sa.Integer(), nullable=False, server_default='0'),
            sa.Column('remarks', sa.Text(), nullable=True),
            sa.Column('data_source', sa.Enum('GOOGLE_FORMS', 'MICROSOFT_FORMS', 'MANUAL_ENTRY', 'API', name='data_source_enum'), nullable=False, server_default='GOOGLE_FORMS'),
            sa.Column('external_id', sa.String(length=255), nullable=True),
            sa.Column('verified', sa.Boolean(), nullable=False, server_default='false'),
            sa.Column('verified_by', sa.Integer(), nullable=True),
            sa.Column('created_at', sa.DateTime(), nullable=False, server_default=sa.text('CURRENT_TIMESTAMP')),
            sa.Column('updated_at', sa.DateTime(), nullable=False, server_default=sa.text('CURRENT_TIMESTAMP')),
            sa.ForeignKeyConstraint(['agent_id'], ['agents.id'], ondelete='CASCADE'),
            sa.ForeignKeyConstraint(['shop_id'], ['shops.id'], ondelete='CASCADE'),
            sa.ForeignKeyConstraint(['verified_by'], ['users.id'], ondelete='SET NULL'),
            sa.PrimaryKeyConstraint('id')
        )
        op.create_index(op.f('ix_sales_records_id'), 'sales_records', ['id'])
        op.create_index(op.f('ix_sales_records_agent_id'), 'sales_records', ['agent_id'])
        op.create_index(op.f('ix_sales_records_shop_id'), 'sales_records', ['shop_id'])
        op.create_index(op.f('ix_sales_records_sale_date'), 'sales_records', ['sale_date'])
        op.create_index(op.f('ix_sales_records_external_id'), 'sales_records', ['external_id'], unique=True)
    
    if 'transfer_records' not in existing_tables:
        # Create transfer_records table
        op.create_table(
            'transfer_records',
            sa.Column('id', sa.Integer(), nullable=False),
            sa.Column('agent_id', sa.Integer(), nullable=False),
            sa.Column('from_shop_id', sa.Integer(), nullable=False),
            sa.Column('to_shop_id', sa.Integer(), nullable=False),
            sa.Column('transfer_date', sa.Date(), nullable=False),
            sa.Column('reason', sa.Enum('PERFORMANCE_IMPROVEMENT', 'SHOP_NEEDS', 'AGENT_REQUEST', 'DISCIPLINARY', 'RESTRUCTURING', 'OTHER', name='transfer_reason_enum'), nullable=False),
            sa.Column('reason_detail', sa.Text(), nullable=True),
            sa.Column('approved_by', sa.Integer(), nullable=True),
            sa.Column('effectiveness_score', sa.Integer(), nullable=True),
            sa.Column('notes', sa.Text(), nullable=True),
            sa.Column('created_at', sa.DateTime(), nullable=False, server_default=sa.text('CURRENT_TIMESTAMP')),
            sa.Column('updated_at', sa.DateTime(), nullable=False, server_default=sa.text('CURRENT_TIMESTAMP')),
            sa.ForeignKeyConstraint(['agent_id'], ['agents.id'], ondelete='CASCADE'),
            sa.ForeignKeyConstraint(['from_shop_id'], ['shops.id'], ondelete='CASCADE'),
            sa.ForeignKeyConstraint(['to_shop_id'], ['shops.id'], ondelete='CASCADE'),
            sa.ForeignKeyConstraint(['approved_by'], ['users.id'], ondelete='SET NULL'),
            sa.PrimaryKeyConstraint('id')
        )
        op.create_index(op.f('ix_transfer_records_id'), 'transfer_records', ['id'])
        op.create_index(op.f('ix_transfer_records_agent_id'), 'transfer_records', ['agent_id'])
        op.create_index(op.f('ix_transfer_records_from_shop_id'), 'transfer_records', ['from_shop_id'])
        op.create_index(op.f('ix_transfer_records_to_shop_id'), 'transfer_records', ['to_shop_id'])
        op.create_index(op.f('ix_transfer_records_transfer_date'), 'transfer_records', ['transfer_date'])


def downgrade():
    """Reverse schema changes."""
    
    # Drop tables in reverse order (respecting foreign keys)
    op.drop_table('transfer_records')
    op.drop_table('sales_records')
    op.drop_table('assignments')
    op.drop_table('shops')
    op.drop_table('agents')
    op.drop_table('users')

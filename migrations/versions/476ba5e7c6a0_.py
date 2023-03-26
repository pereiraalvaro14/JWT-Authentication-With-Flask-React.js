"""empty message

Revision ID: 476ba5e7c6a0
Revises: 
Create Date: 2023-02-22 21:25:41.039963

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '476ba5e7c6a0'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('planets')
    op.drop_table('people')
    op.drop_table('favorites')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('favorites',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('type', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('entityId', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('uid', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.PrimaryKeyConstraint('id', name='favorites_pkey')
    )
    op.create_table('people',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('name', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('height', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('mass', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('skin_color', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('gender', postgresql.BYTEA(), autoincrement=False, nullable=True),
    sa.PrimaryKeyConstraint('id', name='people_pkey')
    )
    op.create_table('planets',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('name', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('diameter', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('rotation_period', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('orbital_period', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('gravity', postgresql.BYTEA(), autoincrement=False, nullable=False),
    sa.PrimaryKeyConstraint('id', name='planets_pkey')
    )
    # ### end Alembic commands ###

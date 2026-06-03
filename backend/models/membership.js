export default (sequelize, DataTypes) => {
  return sequelize.define(
    'Membership',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      memberId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'member_id',
      },
      planId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'plan_id',
      },
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        field: 'start_date',
      },
      endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        field: 'end_date',
      },
      status: {
        type: DataTypes.ENUM('active', 'expired', 'cancelled'),
        allowNull: false,
        defaultValue: 'active',
      },
      pricePaid: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: 'price_paid',
      },
    },
    {
      tableName: 'memberships',
      timestamps: true,
      underscored: true,
    }
  );
};

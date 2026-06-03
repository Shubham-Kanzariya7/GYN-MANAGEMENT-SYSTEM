export default (sequelize, DataTypes) => {
  return sequelize.define(
    'MembershipPlan',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      durationMonths: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'duration_months',
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      benefits: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: 'membership_plans',
      timestamps: true,
      underscored: true,
    }
  );
};

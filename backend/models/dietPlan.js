export default (sequelize, DataTypes) => {
  return sequelize.define(
    'DietPlan',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      trainerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'trainer_id',
      },
      memberId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'member_id',
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      calories: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM('planned', 'active', 'completed'),
        allowNull: false,
        defaultValue: 'planned',
      },
    },
    {
      tableName: 'diet_plans',
      timestamps: true,
      underscored: true,
    }
  );
};

export default (sequelize, DataTypes) => {
  return sequelize.define(
    'WorkoutPlan',
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
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        field: 'start_date',
      },
      endDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        field: 'end_date',
      },
      status: {
        type: DataTypes.ENUM('planned', 'active', 'completed'),
        allowNull: false,
        defaultValue: 'planned',
      },
    },
    {
      tableName: 'workout_plans',
      timestamps: true,
      underscored: true,
    }
  );
};

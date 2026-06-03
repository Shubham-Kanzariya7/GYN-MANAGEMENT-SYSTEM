export default (sequelize, DataTypes) => {
  return sequelize.define(
    'Attendance',
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
      trainerId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'trainer_id',
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('present', 'absent', 'late', 'leave'),
        allowNull: false,
        defaultValue: 'present',
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: 'attendance',
      timestamps: true,
      underscored: true,
    }
  );
};

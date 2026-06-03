export default (sequelize, DataTypes) => {
  return sequelize.define(
    'Notification',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      targetRole: {
        type: DataTypes.ENUM('admin', 'trainer', 'member', 'all'),
        allowNull: false,
        defaultValue: 'all',
        field: 'target_role',
      },
      isPublished: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_published',
      },
      publishedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'published_at',
      },
    },
    {
      tableName: 'notifications',
      timestamps: true,
      underscored: true,
    }
  );
};

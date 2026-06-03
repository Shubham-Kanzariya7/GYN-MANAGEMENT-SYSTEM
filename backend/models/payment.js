export default (sequelize, DataTypes) => {
  return sequelize.define(
    'Payment',
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
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      paymentDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        field: 'payment_date',
      },
      method: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM('paid', 'pending', 'failed'),
        allowNull: false,
        defaultValue: 'paid',
      },
      invoiceNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        field: 'invoice_number',
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: 'payments',
      timestamps: true,
      underscored: true,
    }
  );
};

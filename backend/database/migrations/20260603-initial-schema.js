import { DataTypes } from 'sequelize';

export async function up({ context: sequelize }) {
  const qi = sequelize.getQueryInterface();

  await qi.createTable('users', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    full_name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    phone: { type: DataTypes.STRING, allowNull: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('admin', 'trainer', 'member'), allowNull: false, defaultValue: 'member' },
    status: { type: DataTypes.ENUM('active', 'inactive', 'suspended'), allowNull: false, defaultValue: 'active' },
    last_login: { type: DataTypes.DATE, allowNull: true },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  });

  await qi.createTable('membership_plans', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    duration_months: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    benefits: { type: DataTypes.TEXT, allowNull: true },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  });

  await qi.createTable('trainers', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: true, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
    full_name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    phone: { type: DataTypes.STRING, allowNull: true },
    specialty: { type: DataTypes.STRING, allowNull: true },
    bio: { type: DataTypes.TEXT, allowNull: true },
    hourly_rate: { type: DataTypes.FLOAT, allowNull: true },
    status: { type: DataTypes.ENUM('active', 'inactive', 'suspended'), allowNull: false, defaultValue: 'active' },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  });

  await qi.createTable('members', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: true, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
    full_name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    phone: { type: DataTypes.STRING, allowNull: true },
    gender: { type: DataTypes.ENUM('male', 'female', 'other'), allowNull: true },
    dob: { type: DataTypes.DATEONLY, allowNull: true },
    address: { type: DataTypes.TEXT, allowNull: true },
    height: { type: DataTypes.FLOAT, allowNull: true },
    weight: { type: DataTypes.FLOAT, allowNull: true },
    photo: { type: DataTypes.STRING, allowNull: true },
    status: { type: DataTypes.ENUM('active', 'inactive', 'suspended'), allowNull: false, defaultValue: 'active' },
    trainer_id: { type: DataTypes.INTEGER, allowNull: true, references: { model: 'trainers', key: 'id' }, onDelete: 'SET NULL' },
    membership_plan_id: { type: DataTypes.INTEGER, allowNull: true, references: { model: 'membership_plans', key: 'id' }, onDelete: 'SET NULL' },
    joining_date: { type: DataTypes.DATEONLY, allowNull: true },
    expiry_date: { type: DataTypes.DATEONLY, allowNull: true },
    notes: { type: DataTypes.TEXT, allowNull: true },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  });

  await qi.createTable('memberships', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    member_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'members', key: 'id' }, onDelete: 'CASCADE' },
    plan_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'membership_plans', key: 'id' }, onDelete: 'CASCADE' },
    start_date: { type: DataTypes.DATEONLY, allowNull: false },
    end_date: { type: DataTypes.DATEONLY, allowNull: false },
    status: { type: DataTypes.ENUM('active', 'expired', 'cancelled'), allowNull: false, defaultValue: 'active' },
    price_paid: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  });

  await qi.createTable('attendance', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    member_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'members', key: 'id' }, onDelete: 'CASCADE' },
    trainer_id: { type: DataTypes.INTEGER, allowNull: true, references: { model: 'trainers', key: 'id' }, onDelete: 'SET NULL' },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    status: { type: DataTypes.ENUM('present', 'absent', 'late', 'leave'), allowNull: false, defaultValue: 'present' },
    notes: { type: DataTypes.TEXT, allowNull: true },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  });

  await qi.createTable('payments', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    member_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'members', key: 'id' }, onDelete: 'CASCADE' },
    amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    payment_date: { type: DataTypes.DATEONLY, allowNull: false },
    method: { type: DataTypes.STRING, allowNull: true },
    status: { type: DataTypes.ENUM('paid', 'pending', 'failed'), allowNull: false, defaultValue: 'paid' },
    invoice_number: { type: DataTypes.STRING, allowNull: true, unique: true },
    notes: { type: DataTypes.TEXT, allowNull: true },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  });

  await qi.createTable('workout_plans', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    trainer_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'trainers', key: 'id' }, onDelete: 'CASCADE' },
    member_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'members', key: 'id' }, onDelete: 'CASCADE' },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    start_date: { type: DataTypes.DATEONLY, allowNull: true },
    end_date: { type: DataTypes.DATEONLY, allowNull: true },
    status: { type: DataTypes.ENUM('planned', 'active', 'completed'), allowNull: false, defaultValue: 'planned' },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  });

  await qi.createTable('diet_plans', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    trainer_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'trainers', key: 'id' }, onDelete: 'CASCADE' },
    member_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'members', key: 'id' }, onDelete: 'CASCADE' },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    calories: { type: DataTypes.INTEGER, allowNull: true },
    status: { type: DataTypes.ENUM('planned', 'active', 'completed'), allowNull: false, defaultValue: 'planned' },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  });

  await qi.createTable('notifications', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    message: { type: DataTypes.TEXT, allowNull: false },
    target_role: { type: DataTypes.ENUM('admin', 'trainer', 'member', 'all'), allowNull: false, defaultValue: 'all' },
    is_published: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    published_at: { type: DataTypes.DATE, allowNull: true },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  });
}

export async function down({ context: sequelize }) {
  const qi = sequelize.getQueryInterface();
  await qi.dropTable('notifications');
  await qi.dropTable('diet_plans');
  await qi.dropTable('workout_plans');
  await qi.dropTable('payments');
  await qi.dropTable('attendance');
  await qi.dropTable('memberships');
  await qi.dropTable('members');
  await qi.dropTable('trainers');
  await qi.dropTable('membership_plans');
  await qi.dropTable('users');
}

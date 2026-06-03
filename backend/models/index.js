import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/db.js';
import userModel from './user.js';
import memberModel from './member.js';
import trainerModel from './trainer.js';
import membershipPlanModel from './membershipPlan.js';
import membershipModel from './membership.js';
import attendanceModel from './attendance.js';
import paymentModel from './payment.js';
import workoutPlanModel from './workoutPlan.js';
import dietPlanModel from './dietPlan.js';
import notificationModel from './notification.js';

const User = userModel(sequelize, DataTypes);
const Member = memberModel(sequelize, DataTypes);
const Trainer = trainerModel(sequelize, DataTypes);
const MembershipPlan = membershipPlanModel(sequelize, DataTypes);
const Membership = membershipModel(sequelize, DataTypes);
const Attendance = attendanceModel(sequelize, DataTypes);
const Payment = paymentModel(sequelize, DataTypes);
const WorkoutPlan = workoutPlanModel(sequelize, DataTypes);
const DietPlan = dietPlanModel(sequelize, DataTypes);
const Notification = notificationModel(sequelize, DataTypes);

// Associations
User.hasOne(Member, { foreignKey: 'user_id', as: 'memberProfile', onDelete: 'SET NULL' });
Member.belongsTo(User, { foreignKey: 'user_id', as: 'userAccount' });

User.hasOne(Trainer, { foreignKey: 'user_id', as: 'trainerProfile', onDelete: 'SET NULL' });
Trainer.belongsTo(User, { foreignKey: 'user_id', as: 'userAccount' });

Trainer.hasMany(Member, { foreignKey: 'trainer_id', as: 'members' });
Member.belongsTo(Trainer, { foreignKey: 'trainer_id', as: 'trainerProfile' });

MembershipPlan.hasMany(Member, { foreignKey: 'membership_plan_id', as: 'members' });
Member.belongsTo(MembershipPlan, { foreignKey: 'membership_plan_id', as: 'membershipPlan' });

Member.hasMany(Membership, { foreignKey: 'member_id', as: 'memberships' });
Membership.belongsTo(Member, { foreignKey: 'member_id', as: 'member' });

MembershipPlan.hasMany(Membership, { foreignKey: 'plan_id', as: 'memberships' });
Membership.belongsTo(MembershipPlan, { foreignKey: 'plan_id', as: 'plan' });

Member.hasMany(Attendance, { foreignKey: 'member_id', as: 'attendanceRecords' });
Attendance.belongsTo(Member, { foreignKey: 'member_id', as: 'member' });

Trainer.hasMany(Attendance, { foreignKey: 'trainer_id', as: 'attendanceSessions' });
Attendance.belongsTo(Trainer, { foreignKey: 'trainer_id', as: 'trainer' });

Member.hasMany(Payment, { foreignKey: 'member_id', as: 'payments' });
Payment.belongsTo(Member, { foreignKey: 'member_id', as: 'member' });

Trainer.hasMany(WorkoutPlan, { foreignKey: 'trainer_id', as: 'workouts' });
WorkoutPlan.belongsTo(Trainer, { foreignKey: 'trainer_id', as: 'trainer' });
Member.hasMany(WorkoutPlan, { foreignKey: 'member_id', as: 'workoutPlans' });
WorkoutPlan.belongsTo(Member, { foreignKey: 'member_id', as: 'member' });

Trainer.hasMany(DietPlan, { foreignKey: 'trainer_id', as: 'dietPlans' });
DietPlan.belongsTo(Trainer, { foreignKey: 'trainer_id', as: 'trainer' });
Member.hasMany(DietPlan, { foreignKey: 'member_id', as: 'dietPlans' });
DietPlan.belongsTo(Member, { foreignKey: 'member_id', as: 'member' });

const db = {
  sequelize,
  Sequelize,
  User,
  Member,
  Trainer,
  MembershipPlan,
  Membership,
  Attendance,
  Payment,
  WorkoutPlan,
  DietPlan,
  Notification,
};

export default db;

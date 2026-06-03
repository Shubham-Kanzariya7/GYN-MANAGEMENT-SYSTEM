import bcrypt from 'bcryptjs';

const DEFAULT_USERS = [
  {
    fullName: 'Administrator',
    email: 'admin@gym.com',
    phone: '0000000000',
    password: 'Admin@123',
    role: 'admin',
    status: 'active',
  },
  {
    fullName: 'Lead Trainer',
    email: 'trainer@gym.com',
    phone: '0000000001',
    password: 'Trainer@123',
    role: 'trainer',
    status: 'active',
  },
  {
    fullName: 'Gym Member',
    email: 'member@gym.com',
    phone: '0000000002',
    password: 'Member@123',
    role: 'member',
    status: 'active',
  },
];

const DEFAULT_PLANS = [
  { name: 'Starter', description: 'Basic access with monthly check-ins.', durationMonths: 1, price: 29.99, benefits: 'Gym access, locker' },
  { name: 'Standard', description: 'Popular plan with classes and trainer support.', durationMonths: 3, price: 79.99, benefits: 'Gym access, group classes, trainer evaluation' },
  { name: 'Premium', description: 'Full membership with diet and workout plans.', durationMonths: 12, price: 249.99, benefits: 'All access, nutrition, premium support' },
];

const DEFAULT_TRAINERS = [
  { fullName: 'Jordan Carter', email: 'jordan.trainer@gym.com', phone: '0000000100', specialty: 'Strength', bio: 'Certified strength coach', hourlyRate: 45 },
];

const DEFAULT_MEMBERS = [
  {
    fullName: 'Alejandro Ruiz',
    email: 'alejandro@gym.com',
    phone: '0000000200',
    gender: 'male',
    dob: '1990-05-10',
    address: '456 Elm Street',
    status: 'active',
    joiningDate: '2026-01-01',
    expiryDate: '2026-12-31',
  },
];

export default async function seedInitialData(db) {
  const { User, Trainer, Member, MembershipPlan } = db;

  for (const user of DEFAULT_USERS) {
    const existing = await User.findOne({ where: { email: user.email } });
    if (!existing) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await User.create({ ...user, password: hashedPassword });
    }
  }

  for (const plan of DEFAULT_PLANS) {
    const existingPlan = await MembershipPlan.findOne({ where: { name: plan.name } });
    if (!existingPlan) {
      await MembershipPlan.create(plan);
    }
  }

  for (const trainerData of DEFAULT_TRAINERS) {
    const existingTrainer = await Trainer.findOne({ where: { email: trainerData.email } });
    if (!existingTrainer) {
      await Trainer.create(trainerData);
    }
  }

  for (const memberData of DEFAULT_MEMBERS) {
    const existingMember = await Member.findOne({ where: { email: memberData.email } });
    if (!existingMember) {
      await Member.create(memberData);
    }
  }
}

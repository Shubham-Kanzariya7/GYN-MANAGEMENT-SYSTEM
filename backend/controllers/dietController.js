import db from '../models/index.js';

const { DietPlan, Trainer, Member } = db;

export async function addDietPlan(req, res, next) {
  try {
    const { trainerId, memberId, title, description, calories, status } = req.body;
    const dietPlan = await DietPlan.create({
      trainerId,
      memberId,
      title,
      description,
      calories: calories || null,
      status: status || 'planned',
    });
    res.status(201).json({ success: true, message: 'Diet plan created', data: dietPlan });
  } catch (error) {
    next(error);
  }
}

export async function getAllDietPlans(req, res, next) {
  try {
    const plans = await DietPlan.findAll({
      include: [
        { model: Trainer, as: 'trainer' },
        { model: Member, as: 'member' },
      ],
      order: [['createdAt', 'DESC']],
    });
    res.json({ success: true, message: 'Diet plans retrieved', data: plans });
  } catch (error) {
    next(error);
  }
}

export async function getDietPlanById(req, res, next) {
  try {
    const { id } = req.params;
    const plan = await DietPlan.findByPk(id, {
      include: [
        { model: Trainer, as: 'trainer' },
        { model: Member, as: 'member' },
      ],
    });
    if (!plan) {
      return res.status(404).json({ success: false, message: 'Diet plan not found' });
    }
    res.json({ success: true, message: 'Diet plan loaded', data: plan });
  } catch (error) {
    next(error);
  }
}

export async function getMemberDietPlans(req, res, next) {
  try {
    const { memberId } = req.params;
    const plans = await DietPlan.findAll({
      where: { memberId },
      include: [
        { model: Trainer, as: 'trainer' },
        { model: Member, as: 'member' },
      ],
      order: [['createdAt', 'DESC']],
    });
    res.json({ success: true, message: 'Member diet plans retrieved', data: plans });
  } catch (error) {
    next(error);
  }
}

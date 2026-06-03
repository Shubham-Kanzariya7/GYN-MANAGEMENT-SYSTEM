import db from '../models/index.js';

const { MembershipPlan } = db;

export async function addMembershipPlan(req, res, next) {
  try {
    const { name, description, durationMonths, price, benefits } = req.body;
    const plan = await MembershipPlan.create({
      name,
      description,
      durationMonths,
      price,
      benefits,
    });
    res.status(201).json({ success: true, message: 'Membership plan created', data: plan });
  } catch (error) {
    next(error);
  }
}

export async function getAllMembershipPlans(req, res, next) {
  try {
    const plans = await MembershipPlan.findAll({ order: [['price', 'ASC']] });
    res.json({ success: true, message: 'Membership plans retrieved', data: plans });
  } catch (error) {
    next(error);
  }
}

export async function getMembershipPlanById(req, res, next) {
  try {
    const { id } = req.params;
    const plan = await MembershipPlan.findByPk(id);
    if (!plan) {
      return res.status(404).json({ success: false, message: 'Plan not found' });
    }
    res.json({ success: true, message: 'Membership plan loaded', data: plan });
  } catch (error) {
    next(error);
  }
}

export async function updateMembershipPlan(req, res, next) {
  try {
    const { id } = req.params;
    const plan = await MembershipPlan.findByPk(id);
    if (!plan) {
      return res.status(404).json({ success: false, message: 'Plan not found' });
    }
    await plan.update(req.body);
    res.json({ success: true, message: 'Membership plan updated', data: plan });
  } catch (error) {
    next(error);
  }
}

export async function deleteMembershipPlan(req, res, next) {
  try {
    const { id } = req.params;
    const plan = await MembershipPlan.findByPk(id);
    if (!plan) {
      return res.status(404).json({ success: false, message: 'Plan not found' });
    }
    await plan.destroy();
    res.json({ success: true, message: 'Membership plan deleted' });
  } catch (error) {
    next(error);
  }
}

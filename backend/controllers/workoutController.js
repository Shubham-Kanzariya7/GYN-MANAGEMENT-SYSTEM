import db from '../models/index.js';

const { WorkoutPlan, Trainer, Member } = db;

export async function addWorkoutPlan(req, res, next) {
  try {
    const { trainerId, memberId, title, description, startDate, endDate, status } = req.body;
    const workoutPlan = await WorkoutPlan.create({
      trainerId,
      memberId,
      title,
      description,
      startDate: startDate || null,
      endDate: endDate || null,
      status: status || 'planned',
    });
    res.status(201).json({ success: true, message: 'Workout plan created', data: workoutPlan });
  } catch (error) {
    next(error);
  }
}

export async function getAllWorkoutPlans(req, res, next) {
  try {
    const plans = await WorkoutPlan.findAll({
      include: [
        { model: Trainer, as: 'trainer' },
        { model: Member, as: 'member' },
      ],
      order: [['createdAt', 'DESC']],
    });
    res.json({ success: true, message: 'Workout plans retrieved', data: plans });
  } catch (error) {
    next(error);
  }
}

export async function getWorkoutPlanById(req, res, next) {
  try {
    const { id } = req.params;
    const plan = await WorkoutPlan.findByPk(id, {
      include: [
        { model: Trainer, as: 'trainer' },
        { model: Member, as: 'member' },
      ],
    });
    if (!plan) {
      return res.status(404).json({ success: false, message: 'Workout plan not found' });
    }
    res.json({ success: true, message: 'Workout plan loaded', data: plan });
  } catch (error) {
    next(error);
  }
}

export async function getMemberWorkoutPlans(req, res, next) {
  try {
    const { memberId } = req.params;
    const plans = await WorkoutPlan.findAll({
      where: { memberId },
      include: [
        { model: Trainer, as: 'trainer' },
        { model: Member, as: 'member' },
      ],
      order: [['startDate', 'DESC']],
    });
    res.json({ success: true, message: 'Member workout plans retrieved', data: plans });
  } catch (error) {
    next(error);
  }
}

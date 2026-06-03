import db from '../models/index.js';

const { Trainer } = db;

export async function addTrainer(req, res, next) {
  try {
    const { fullName, email, phone, specialty, bio, hourlyRate, status } = req.body;
    const trainer = await Trainer.create({
      fullName,
      email,
      phone,
      specialty,
      bio,
      hourlyRate: hourlyRate || null,
      status: status || 'active',
    });

    res.status(201).json({ success: true, message: 'Trainer created', data: trainer });
  } catch (error) {
    next(error);
  }
}

export async function getAllTrainers(req, res, next) {
  try {
    const trainers = await Trainer.findAll({ order: [['createdAt', 'DESC']] });
    res.json({ success: true, message: 'Trainers retrieved', data: trainers });
  } catch (error) {
    next(error);
  }
}

export async function getTrainerById(req, res, next) {
  try {
    const { id } = req.params;
    const trainer = await Trainer.findByPk(id);
    if (!trainer) {
      return res.status(404).json({ success: false, message: 'Trainer not found' });
    }
    res.json({ success: true, message: 'Trainer loaded', data: trainer });
  } catch (error) {
    next(error);
  }
}

export async function updateTrainer(req, res, next) {
  try {
    const { id } = req.params;
    const trainer = await Trainer.findByPk(id);
    if (!trainer) {
      return res.status(404).json({ success: false, message: 'Trainer not found' });
    }
    await trainer.update(req.body);
    res.json({ success: true, message: 'Trainer updated', data: trainer });
  } catch (error) {
    next(error);
  }
}

export async function deleteTrainer(req, res, next) {
  try {
    const { id } = req.params;
    const trainer = await Trainer.findByPk(id);
    if (!trainer) {
      return res.status(404).json({ success: false, message: 'Trainer not found' });
    }
    await trainer.destroy();
    res.json({ success: true, message: 'Trainer deleted' });
  } catch (error) {
    next(error);
  }
}

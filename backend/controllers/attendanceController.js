import db from '../models/index.js';

const { Attendance, Member, Trainer } = db;

export async function recordAttendance(req, res, next) {
  try {
    const { memberId, trainerId, date, status, notes } = req.body;
    const attendance = await Attendance.create({
      memberId,
      trainerId: trainerId || null,
      date,
      status: status || 'present',
      notes,
    });
    res.status(201).json({ success: true, message: 'Attendance recorded', data: attendance });
  } catch (error) {
    next(error);
  }
}

export async function getAttendanceByMember(req, res, next) {
  try {
    const { memberId } = req.params;
    const records = await Attendance.findAll({
      where: { memberId },
      include: [
        { model: Member, as: 'member' },
        { model: Trainer, as: 'trainer' },
      ],
      order: [['date', 'DESC']],
    });
    res.json({ success: true, message: 'Attendance loaded', data: records });
  } catch (error) {
    next(error);
  }
}

export async function getAllAttendance(req, res, next) {
  try {
    const records = await Attendance.findAll({
      include: [
        { model: Member, as: 'member' },
        { model: Trainer, as: 'trainer' },
      ],
      order: [['date', 'DESC']],
    });
    res.json({ success: true, message: 'Attendance retrieved', data: records });
  } catch (error) {
    next(error);
  }
}

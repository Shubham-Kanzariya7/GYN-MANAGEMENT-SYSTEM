import { Op } from 'sequelize';
import db from '../models/index.js';

const { Member, Trainer, MembershipPlan } = db;

export async function addMember(req, res, next) {
  try {
    const {
      fullName,
      email,
      phone,
      gender,
      dob,
      address,
      height,
      weight,
      status,
      trainerId,
      membershipPlanId,
      joiningDate,
      expiryDate,
      notes,
    } = req.body;

    const photo = req.file ? req.file.filename : null;
    const member = await Member.create({
      fullName,
      email,
      phone,
      gender,
      dob,
      address,
      height: height || null,
      weight: weight || null,
      status: status || 'active',
      trainerId: trainerId || null,
      membershipPlanId: membershipPlanId || null,
      joiningDate: joiningDate || null,
      expiryDate: expiryDate || null,
      photo,
      notes,
    });

    const newMember = await Member.findByPk(member.id, {
      include: [
        { model: Trainer, as: 'trainerProfile' },
        { model: MembershipPlan, as: 'membershipPlan' },
      ],
    });

    res.status(201).json({ success: true, message: 'Member added successfully', data: newMember });
  } catch (error) {
    next(error);
  }
}

export async function updateMember(req, res, next) {
  try {
    const { id } = req.params;
    const member = await Member.findByPk(id);
    if (!member) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }

    const photo = req.file ? req.file.filename : member.photo;
    const {
      fullName,
      email,
      phone,
      gender,
      dob,
      address,
      height,
      weight,
      status,
      trainerId,
      membershipPlanId,
      joiningDate,
      expiryDate,
      notes,
    } = req.body;

    await member.update({
      fullName: fullName || member.fullName,
      email: email || member.email,
      phone: phone || member.phone,
      gender: gender || member.gender,
      dob: dob || member.dob,
      address: address || member.address,
      height: height || member.height,
      weight: weight || member.weight,
      status: status || member.status,
      trainerId: trainerId !== undefined ? trainerId : member.trainerId,
      membershipPlanId:
        membershipPlanId !== undefined ? membershipPlanId : member.membershipPlanId,
      joiningDate: joiningDate || member.joiningDate,
      expiryDate: expiryDate || member.expiryDate,
      photo,
      notes: notes || member.notes,
    });

    const updatedMember = await Member.findByPk(id, {
      include: [
        { model: Trainer, as: 'trainerProfile' },
        { model: MembershipPlan, as: 'membershipPlan' },
      ],
    });

    res.json({ success: true, message: 'Member updated successfully', data: updatedMember });
  } catch (error) {
    next(error);
  }
}

export async function deleteMember(req, res, next) {
  try {
    const { id } = req.params;
    const member = await Member.findByPk(id);
    if (!member) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }

    await member.destroy();
    res.json({ success: true, message: 'Member deleted successfully' });
  } catch (error) {
    next(error);
  }
}

export async function getMemberById(req, res, next) {
  try {
    const { id } = req.params;
    const member = await Member.findByPk(id, {
      include: [
        { model: Trainer, as: 'trainerProfile' },
        { model: MembershipPlan, as: 'membershipPlan' },
      ],
    });
    if (!member) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }
    res.json({ success: true, message: 'Member loaded successfully', data: member });
  } catch (error) {
    next(error);
  }
}

export async function getAllMembers(req, res, next) {
  try {
    const members = await Member.findAll({
      include: [
        { model: Trainer, as: 'trainerProfile' },
        { model: MembershipPlan, as: 'membershipPlan' },
      ],
      order: [['createdAt', 'DESC']],
    });
    res.json({ success: true, message: 'Members retrieved successfully', data: members });
  } catch (error) {
    next(error);
  }
}

export async function searchMembers(req, res, next) {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ success: false, message: 'Search query is required' });
    }
    const members = await Member.findAll({
      where: {
        [Op.or]: [
          { fullName: { [Op.like]: `%${q}%` } },
          { email: { [Op.like]: `%${q}%` } },
          { phone: { [Op.like]: `%${q}%` } },
        ],
      },
      order: [['createdAt', 'DESC']],
    });
    res.json({ success: true, message: 'Search results returned', data: members });
  } catch (error) {
    next(error);
  }
}

export async function getExpiringMembers(req, res, next) {
  try {
    const today = new Date().toISOString().split('T')[0];
    const members = await Member.findAll({
      where: {
        expiryDate: {
          [Op.lte]: today,
        },
      },
      order: [['expiryDate', 'ASC']],
    });
    res.json({ success: true, message: 'Expiring memberships returned', data: members });
  } catch (error) {
    next(error);
  }
}

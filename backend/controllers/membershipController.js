import db from '../models/index.js';

const { Membership, Member, MembershipPlan } = db;

export async function addMembership(req, res, next) {
  try {
    const { memberId, planId, startDate, endDate, pricePaid, status } = req.body;
    const membership = await Membership.create({
      memberId,
      planId,
      startDate,
      endDate,
      pricePaid,
      status: status || 'active',
    });

    const result = await Membership.findByPk(membership.id, {
      include: [
        { model: Member, as: 'member' },
        { model: MembershipPlan, as: 'plan' },
      ],
    });

    res.status(201).json({ success: true, message: 'Membership created', data: result });
  } catch (error) {
    next(error);
  }
}

export async function getAllMemberships(req, res, next) {
  try {
    const memberships = await Membership.findAll({
      include: [
        { model: Member, as: 'member' },
        { model: MembershipPlan, as: 'plan' },
      ],
      order: [['createdAt', 'DESC']],
    });
    res.json({ success: true, message: 'Memberships retrieved', data: memberships });
  } catch (error) {
    next(error);
  }
}

export async function getMembershipById(req, res, next) {
  try {
    const { id } = req.params;
    const membership = await Membership.findByPk(id, {
      include: [
        { model: Member, as: 'member' },
        { model: MembershipPlan, as: 'plan' },
      ],
    });
    if (!membership) {
      return res.status(404).json({ success: false, message: 'Membership not found' });
    }
    res.json({ success: true, message: 'Membership loaded', data: membership });
  } catch (error) {
    next(error);
  }
}

export async function updateMembership(req, res, next) {
  try {
    const { id } = req.params;
    const membership = await Membership.findByPk(id);
    if (!membership) {
      return res.status(404).json({ success: false, message: 'Membership not found' });
    }
    await membership.update(req.body);
    res.json({ success: true, message: 'Membership updated', data: membership });
  } catch (error) {
    next(error);
  }
}

export async function deleteMembership(req, res, next) {
  try {
    const { id } = req.params;
    const membership = await Membership.findByPk(id);
    if (!membership) {
      return res.status(404).json({ success: false, message: 'Membership not found' });
    }
    await membership.destroy();
    res.json({ success: true, message: 'Membership deleted' });
  } catch (error) {
    next(error);
  }
}

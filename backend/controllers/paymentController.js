import db from '../models/index.js';

const { Payment, Member } = db;

export async function recordPayment(req, res, next) {
  try {
    const { memberId, amount, paymentDate, method, status, invoiceNumber, notes } = req.body;
    const payment = await Payment.create({
      memberId,
      amount,
      paymentDate,
      method,
      status: status || 'paid',
      invoiceNumber,
      notes,
    });
    res.status(201).json({ success: true, message: 'Payment recorded', data: payment });
  } catch (error) {
    next(error);
  }
}

export async function getPaymentsByMember(req, res, next) {
  try {
    const { memberId } = req.params;
    const payments = await Payment.findAll({
      where: { memberId },
      include: [{ model: Member, as: 'member' }],
      order: [['paymentDate', 'DESC']],
    });
    res.json({ success: true, message: 'Member payments loaded', data: payments });
  } catch (error) {
    next(error);
  }
}

export async function getAllPayments(req, res, next) {
  try {
    const payments = await Payment.findAll({
      include: [{ model: Member, as: 'member' }],
      order: [['paymentDate', 'DESC']],
    });
    res.json({ success: true, message: 'Payments retrieved', data: payments });
  } catch (error) {
    next(error);
  }
}

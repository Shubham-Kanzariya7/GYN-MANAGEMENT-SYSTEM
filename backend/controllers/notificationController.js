import db from '../models/index.js';

const { Notification } = db;

export async function addNotification(req, res, next) {
  try {
    const { title, message, targetRole, isPublished, publishedAt } = req.body;
    const notification = await Notification.create({
      title,
      message,
      targetRole: targetRole || 'all',
      isPublished: isPublished || false,
      publishedAt: publishedAt || null,
    });
    res.status(201).json({ success: true, message: 'Notification created', data: notification });
  } catch (error) {
    next(error);
  }
}

export async function getNotifications(req, res, next) {
  try {
    const { role } = req.user;
    const criteria = role === 'admin' ? {} : { targetRole: [role, 'all'] };
    const notifications = await Notification.findAll({
      where: criteria,
      order: [['createdAt', 'DESC']],
    });
    res.json({ success: true, message: 'Notifications retrieved', data: notifications });
  } catch (error) {
    next(error);
  }
}

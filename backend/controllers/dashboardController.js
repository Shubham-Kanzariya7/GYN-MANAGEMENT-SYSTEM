import db from '../models/index.js';

const { User, Member, Trainer, MembershipPlan, Attendance, Payment, WorkoutPlan, DietPlan, Notification } = db;

export async function getDashboardStats(req, res, next) {
  try {
    const [userCount, memberCount, trainerCount, planCount, attendanceCount, paymentTotal, workoutCount, dietCount, notificationCount] = await Promise.all([
      User.count(),
      Member.count(),
      Trainer.count(),
      MembershipPlan.count(),
      Attendance.count(),
      Payment.sum('amount'),
      WorkoutPlan.count(),
      DietPlan.count(),
      Notification.count(),
    ]);

    res.json({
      success: true,
      message: 'Dashboard statistics retrieved',
      data: {
        users: userCount,
        members: memberCount,
        trainers: trainerCount,
        membershipPlans: planCount,
        attendanceRecords: attendanceCount,
        totalPayments: paymentTotal || 0,
        workoutPlans: workoutCount,
        dietPlans: dietCount,
        notifications: notificationCount,
      },
    });
  } catch (error) {
    next(error);
  }
}

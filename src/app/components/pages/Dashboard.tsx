import { Users, TrendingUp, DollarSign, Calendar, ArrowUp, ArrowDown, Plus } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const stats = [
  { label: 'Total Members', value: '1,284', change: '+12.5%', trend: 'up', icon: Users, color: 'bg-blue-500' },
  { label: 'Active Memberships', value: '956', change: '+8.2%', trend: 'up', icon: TrendingUp, color: 'bg-accent' },
  { label: 'Total Revenue', value: '$45,230', change: '+23.1%', trend: 'up', icon: DollarSign, color: 'bg-primary' },
  { label: "Today's Attendance", value: '187', change: '-3.2%', trend: 'down', icon: Calendar, color: 'bg-purple-500' },
];

const revenueData = [
  { month: 'Jan', revenue: 32000 },
  { month: 'Feb', revenue: 35000 },
  { month: 'Mar', revenue: 38000 },
  { month: 'Apr', revenue: 42000 },
  { month: 'May', revenue: 45000 },
  { month: 'Jun', revenue: 45230 },
];

const attendanceData = [
  { day: 'Mon', count: 145 },
  { day: 'Tue', count: 178 },
  { day: 'Wed', count: 192 },
  { day: 'Thu', count: 165 },
  { day: 'Fri', count: 201 },
  { day: 'Sat', count: 234 },
  { day: 'Sun', count: 156 },
];

const recentPayments = [
  { id: 1, name: 'John Smith', amount: '$299', date: '2026-05-30', status: 'Paid', plan: 'Premium' },
  { id: 2, name: 'Sarah Johnson', amount: '$149', date: '2026-05-30', status: 'Paid', plan: 'Basic' },
  { id: 3, name: 'Mike Brown', amount: '$399', date: '2026-05-29', status: 'Pending', plan: 'Elite' },
  { id: 4, name: 'Emily Davis', amount: '$299', date: '2026-05-29', status: 'Paid', plan: 'Premium' },
  { id: 5, name: 'David Wilson', amount: '$149', date: '2026-05-28', status: 'Paid', plan: 'Basic' },
];

const expiringMemberships = [
  { name: 'Alex Turner', plan: 'Premium', expiryDate: '2026-06-05', daysLeft: 5 },
  { name: 'Jessica Lee', plan: 'Elite', expiryDate: '2026-06-08', daysLeft: 8 },
  { name: 'Chris Martin', plan: 'Basic', expiryDate: '2026-06-10', daysLeft: 10 },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/30">
          <Plus className="w-5 h-5" />
          Quick Actions
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span
                  className={`flex items-center gap-1 text-sm font-medium ${
                    stat.trend === 'up' ? 'text-accent' : 'text-destructive'
                  }`}
                >
                  {stat.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                  {stat.change}
                </span>
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-1">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Monthly Revenue</h3>
              <p className="text-sm text-muted-foreground">Last 6 months performance</p>
            </div>
            <button className="text-sm text-primary hover:text-primary/80">View Details</button>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF6B00" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FF6B00" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
              <XAxis dataKey="month" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: '12px' }}
                labelStyle={{ color: '#FFFFFF' }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#FF6B00" strokeWidth={3} fill="url(#revenueGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Attendance Chart */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Weekly Attendance</h3>
              <p className="text-sm text-muted-foreground">Last 7 days</p>
            </div>
            <button className="text-sm text-primary hover:text-primary/80">View Details</button>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
              <XAxis dataKey="day" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: '12px' }}
                labelStyle={{ color: '#FFFFFF' }}
              />
              <Bar dataKey="count" fill="#22C55E" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Payments */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Recent Payments</h3>
            <button className="text-sm text-primary hover:text-primary/80">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-sm font-medium text-muted-foreground pb-3">Member</th>
                  <th className="text-left text-sm font-medium text-muted-foreground pb-3">Plan</th>
                  <th className="text-left text-sm font-medium text-muted-foreground pb-3">Amount</th>
                  <th className="text-left text-sm font-medium text-muted-foreground pb-3">Date</th>
                  <th className="text-left text-sm font-medium text-muted-foreground pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentPayments.map((payment) => (
                  <tr key={payment.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="py-4 text-sm text-foreground">{payment.name}</td>
                    <td className="py-4 text-sm text-muted-foreground">{payment.plan}</td>
                    <td className="py-4 text-sm font-semibold text-foreground">{payment.amount}</td>
                    <td className="py-4 text-sm text-muted-foreground">{payment.date}</td>
                    <td className="py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          payment.status === 'Paid'
                            ? 'bg-accent/10 text-accent'
                            : 'bg-primary/10 text-primary'
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Membership Expiry Alerts */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Expiring Soon</h3>
            <span className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs text-white font-bold">
              {expiringMemberships.length}
            </span>
          </div>
          <div className="space-y-4">
            {expiringMemberships.map((member, index) => (
              <div
                key={index}
                className="p-4 bg-primary/5 border border-primary/20 rounded-xl hover:bg-primary/10 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-foreground">{member.name}</h4>
                  <span className="text-xs font-medium text-primary bg-primary/20 px-2 py-1 rounded-full">
                    {member.daysLeft}d
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{member.plan} Plan</p>
                <p className="text-xs text-muted-foreground">Expires: {member.expiryDate}</p>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-sm font-medium text-primary border border-primary rounded-xl hover:bg-primary hover:text-white transition-all">
            View All Expiring
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { DollarSign, Download, Filter, CreditCard, Banknote, Smartphone } from 'lucide-react';

const payments = [
  {
    id: 1,
    member: 'John Smith',
    amount: 299,
    date: '2026-05-30',
    method: 'Credit Card',
    status: 'Paid',
    plan: 'Premium',
    invoiceId: 'INV-2026-001',
  },
  {
    id: 2,
    member: 'Sarah Johnson',
    amount: 149,
    date: '2026-05-30',
    method: 'Cash',
    status: 'Paid',
    plan: 'Basic',
    invoiceId: 'INV-2026-002',
  },
  {
    id: 3,
    member: 'Mike Brown',
    amount: 399,
    date: '2026-05-29',
    method: 'UPI',
    status: 'Pending',
    plan: 'Elite',
    invoiceId: 'INV-2026-003',
  },
  {
    id: 4,
    member: 'Emily Davis',
    amount: 299,
    date: '2026-05-29',
    method: 'Credit Card',
    status: 'Paid',
    plan: 'Premium',
    invoiceId: 'INV-2026-004',
  },
  {
    id: 5,
    member: 'David Wilson',
    amount: 149,
    date: '2026-05-28',
    method: 'Cash',
    status: 'Paid',
    plan: 'Basic',
    invoiceId: 'INV-2026-005',
  },
  {
    id: 6,
    member: 'Jessica Lee',
    amount: 399,
    date: '2026-05-27',
    method: 'Credit Card',
    status: 'Failed',
    plan: 'Elite',
    invoiceId: 'INV-2026-006',
  },
];

const getMethodIcon = (method: string) => {
  switch (method) {
    case 'Credit Card':
      return CreditCard;
    case 'Cash':
      return Banknote;
    case 'UPI':
      return Smartphone;
    default:
      return DollarSign;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Paid':
      return 'bg-accent/10 text-accent';
    case 'Pending':
      return 'bg-primary/10 text-primary';
    case 'Failed':
      return 'bg-destructive/10 text-destructive';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

export function Payments() {
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredPayments = payments.filter(
    (payment) => filterStatus === 'All' || payment.status === filterStatus
  );

  const totalRevenue = payments.filter(p => p.status === 'Paid').reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = payments.filter(p => p.status === 'Pending').reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Payment Management</h1>
        <p className="text-muted-foreground mt-1">Track and manage all gym payments</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-accent" />
            </div>
            <span className="text-2xl font-bold text-foreground">${totalRevenue.toLocaleString()}</span>
          </div>
          <p className="text-sm text-muted-foreground">Total Revenue</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-primary" />
            </div>
            <span className="text-2xl font-bold text-foreground">${pendingAmount}</span>
          </div>
          <p className="text-sm text-muted-foreground">Pending Payments</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
              <Banknote className="w-6 h-6 text-blue-500" />
            </div>
            <span className="text-2xl font-bold text-foreground">{payments.length}</span>
          </div>
          <p className="text-sm text-muted-foreground">Total Transactions</p>
        </div>
      </div>

      {/* Pending Dues Alert */}
      {pendingAmount > 0 && (
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Pending Dues Alert</p>
              <p className="text-sm text-muted-foreground">
                You have ${pendingAmount} in pending payments from {payments.filter(p => p.status === 'Pending').length} members
              </p>
            </div>
          </div>
          <button className="px-4 py-2 bg-primary text-white rounded-xl hover:opacity-90 transition-all">
            Send Reminder
          </button>
        </div>
      )}

      {/* Payment History */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Payment History</h3>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="pl-10 pr-8 py-2 bg-input border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
                >
                  <option>All</option>
                  <option>Paid</option>
                  <option>Pending</option>
                  <option>Failed</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/20 border-b border-border">
              <tr>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Member</th>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Plan</th>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Amount</th>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Payment Date</th>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Method</th>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Status</th>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => {
                const MethodIcon = getMethodIcon(payment.method);
                return (
                  <tr
                    key={payment.id}
                    className="border-b border-border last:border-0 hover:bg-muted/10 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="font-medium text-foreground">{payment.member}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-muted-foreground">{payment.plan}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-foreground">${payment.amount}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-muted-foreground">{payment.date}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <MethodIcon className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-foreground">{payment.method}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(payment.status)}`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
                        <Download className="w-4 h-4" />
                        <span className="text-sm">{payment.invoiceId}</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

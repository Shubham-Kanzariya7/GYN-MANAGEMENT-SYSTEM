import { useState } from 'react';
import { Search, Filter, Plus, Edit, Trash2, User, Mail, Phone } from 'lucide-react';

const members = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 234 567 8901',
    plan: 'Premium',
    expiryDate: '2026-12-15',
    status: 'Active',
    avatar: null,
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1 234 567 8902',
    plan: 'Basic',
    expiryDate: '2026-11-20',
    status: 'Active',
    avatar: null,
  },
  {
    id: 3,
    name: 'Mike Brown',
    email: 'mike.brown@email.com',
    phone: '+1 234 567 8903',
    plan: 'Elite',
    expiryDate: '2026-06-05',
    status: 'Expiring',
    avatar: null,
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily.davis@email.com',
    phone: '+1 234 567 8904',
    plan: 'Premium',
    expiryDate: '2026-10-30',
    status: 'Active',
    avatar: null,
  },
  {
    id: 5,
    name: 'David Wilson',
    email: 'david.w@email.com',
    phone: '+1 234 567 8905',
    plan: 'Basic',
    expiryDate: '2026-05-15',
    status: 'Expired',
    avatar: null,
  },
  {
    id: 6,
    name: 'Jessica Lee',
    email: 'jessica.lee@email.com',
    phone: '+1 234 567 8906',
    plan: 'Elite',
    expiryDate: '2026-08-22',
    status: 'Active',
    avatar: null,
  },
  {
    id: 7,
    name: 'Chris Martin',
    email: 'chris.m@email.com',
    phone: '+1 234 567 8907',
    plan: 'Premium',
    expiryDate: '2026-09-10',
    status: 'Active',
    avatar: null,
  },
  {
    id: 8,
    name: 'Amanda Taylor',
    email: 'amanda.t@email.com',
    phone: '+1 234 567 8908',
    plan: 'Basic',
    expiryDate: '2026-07-18',
    status: 'Active',
    avatar: null,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active':
      return 'bg-accent/10 text-accent';
    case 'Expiring':
      return 'bg-primary/10 text-primary';
    case 'Expired':
      return 'bg-destructive/10 text-destructive';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

export function Members() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'All' || member.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Member Management</h1>
          <p className="text-muted-foreground mt-1">Manage all gym members and their subscriptions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/30">
          <Plus className="w-5 h-5" />
          Add Member
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search members by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="pl-11 pr-8 py-3 bg-card border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
          >
            <option>All</option>
            <option>Active</option>
            <option>Expiring</option>
            <option>Expired</option>
          </select>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/20 border-b border-border">
              <tr>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Profile</th>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Name</th>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Contact</th>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Plan</th>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Expiry Date</th>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Status</th>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member) => (
                <tr
                  key={member.id}
                  className="border-b border-border last:border-0 hover:bg-muted/10 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-foreground">{member.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        {member.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        {member.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-muted/30 text-foreground">
                      {member.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-muted-foreground">{member.expiryDate}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(member.status)}`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">{filteredMembers.length}</span> of{' '}
            <span className="font-medium text-foreground">{members.length}</span> members
          </p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-sm font-medium text-foreground bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors">
              Previous
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:opacity-90 transition-all">
              1
            </button>
            <button className="px-4 py-2 text-sm font-medium text-foreground bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors">
              2
            </button>
            <button className="px-4 py-2 text-sm font-medium text-foreground bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors">
              3
            </button>
            <button className="px-4 py-2 text-sm font-medium text-foreground bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

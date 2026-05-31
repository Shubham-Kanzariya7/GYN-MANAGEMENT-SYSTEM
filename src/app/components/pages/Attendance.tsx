import { useState } from 'react';
import { Calendar, QrCode, UserCheck, Clock, Filter } from 'lucide-react';

const attendanceRecords = [
  { id: 1, name: 'John Smith', checkInTime: '06:45 AM', status: 'Present', date: '2026-05-31' },
  { id: 2, name: 'Sarah Johnson', checkInTime: '07:15 AM', status: 'Present', date: '2026-05-31' },
  { id: 3, name: 'Mike Brown', checkInTime: '08:30 AM', status: 'Present', date: '2026-05-31' },
  { id: 4, name: 'Emily Davis', checkInTime: '09:00 AM', status: 'Present', date: '2026-05-31' },
  { id: 5, name: 'David Wilson', checkInTime: '10:15 AM', status: 'Present', date: '2026-05-31' },
  { id: 6, name: 'Jessica Lee', checkInTime: '11:45 AM', status: 'Present', date: '2026-05-31' },
  { id: 7, name: 'Chris Martin', checkInTime: '02:30 PM', status: 'Present', date: '2026-05-31' },
  { id: 8, name: 'Amanda Taylor', checkInTime: '04:00 PM', status: 'Present', date: '2026-05-31' },
];

export function Attendance() {
  const [selectedDate, setSelectedDate] = useState('2026-05-31');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Attendance Management</h1>
        <p className="text-muted-foreground mt-1">Track and manage member check-ins</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-accent" />
            </div>
            <span className="text-2xl font-bold text-foreground">{attendanceRecords.length}</span>
          </div>
          <p className="text-sm text-muted-foreground">Today's Check-ins</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <span className="text-2xl font-bold text-foreground">234</span>
          </div>
          <p className="text-sm text-muted-foreground">This Week</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-500" />
            </div>
            <span className="text-2xl font-bold text-foreground">10:23 AM</span>
          </div>
          <p className="text-sm text-muted-foreground">Peak Time</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
              <QrCode className="w-6 h-6 text-purple-500" />
            </div>
            <span className="text-2xl font-bold text-foreground">78%</span>
          </div>
          <p className="text-sm text-muted-foreground">Attendance Rate</p>
        </div>
      </div>

      {/* QR Scan and Manual Check-in */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8 text-center">
          <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <QrCode className="w-12 h-12 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Scan QR Code</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Ask member to scan their QR code for quick check-in
          </p>
          <button className="px-6 py-3 bg-primary text-white rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/30">
            Open Scanner
          </button>
        </div>

        <div className="bg-gradient-to-br from-accent/10 to-blue-500/10 border border-accent/20 rounded-2xl p-8 text-center">
          <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <UserCheck className="w-12 h-12 text-accent" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Manual Check-in</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Manually check-in a member by selecting their name
          </p>
          <button className="px-6 py-3 bg-accent text-white rounded-xl hover:opacity-90 transition-all shadow-lg shadow-accent/30">
            Check-in Member
          </button>
        </div>
      </div>

      {/* Attendance Records */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Today's Attendance</h3>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-input border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-muted/20 border border-border rounded-xl text-foreground hover:bg-muted/40 transition-colors">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/20 border-b border-border">
              <tr>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Member Name</th>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Check-in Time</th>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Date</th>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((record) => (
                <tr
                  key={record.id}
                  className="border-b border-border last:border-0 hover:bg-muted/10 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-white">
                          {record.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span className="font-medium text-foreground">{record.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{record.checkInTime}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-muted-foreground">{record.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-accent/10 text-accent">
                      <span className="w-2 h-2 bg-accent rounded-full"></span>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

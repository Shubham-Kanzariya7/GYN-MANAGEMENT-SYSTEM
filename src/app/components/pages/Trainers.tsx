import { Dumbbell, Users, DollarSign, Calendar, Plus } from 'lucide-react';

const trainers = [
  {
    id: 1,
    name: 'Alex Rodriguez',
    specializations: ['Strength', 'HIIT', 'CrossFit'],
    assignedMembers: 24,
    salary: '$3,500/mo',
    experience: '8 years',
    availability: 'Mon-Fri',
  },
  {
    id: 2,
    name: 'Maria Santos',
    specializations: ['Yoga', 'Pilates', 'Flexibility'],
    assignedMembers: 32,
    salary: '$3,200/mo',
    experience: '6 years',
    availability: 'All Week',
  },
  {
    id: 3,
    name: 'James Wilson',
    specializations: ['Cardio', 'Weight Loss', 'Nutrition'],
    assignedMembers: 28,
    salary: '$3,800/mo',
    experience: '10 years',
    availability: 'Mon-Sat',
  },
  {
    id: 4,
    name: 'Lisa Chen',
    specializations: ['Bodybuilding', 'Powerlifting'],
    assignedMembers: 18,
    salary: '$3,600/mo',
    experience: '7 years',
    availability: 'Tue-Sat',
  },
  {
    id: 5,
    name: 'Michael Brown',
    specializations: ['Boxing', 'MMA', 'HIIT'],
    assignedMembers: 22,
    salary: '$3,400/mo',
    experience: '5 years',
    availability: 'Mon-Fri',
  },
  {
    id: 6,
    name: 'Sarah Taylor',
    specializations: ['Dance Fitness', 'Zumba', 'Aerobics'],
    assignedMembers: 35,
    salary: '$3,000/mo',
    experience: '4 years',
    availability: 'All Week',
  },
];

const specializationColors: { [key: string]: string } = {
  Strength: 'bg-primary/10 text-primary',
  HIIT: 'bg-accent/10 text-accent',
  CrossFit: 'bg-blue-500/10 text-blue-500',
  Yoga: 'bg-purple-500/10 text-purple-500',
  Pilates: 'bg-pink-500/10 text-pink-500',
  Flexibility: 'bg-green-500/10 text-green-500',
  Cardio: 'bg-red-500/10 text-red-500',
  'Weight Loss': 'bg-orange-500/10 text-orange-500',
  Nutrition: 'bg-yellow-500/10 text-yellow-500',
  Bodybuilding: 'bg-indigo-500/10 text-indigo-500',
  Powerlifting: 'bg-gray-500/10 text-gray-500',
  Boxing: 'bg-red-600/10 text-red-600',
  MMA: 'bg-orange-600/10 text-orange-600',
  'Dance Fitness': 'bg-pink-600/10 text-pink-600',
  Zumba: 'bg-fuchsia-500/10 text-fuchsia-500',
  Aerobics: 'bg-cyan-500/10 text-cyan-500',
};

export function Trainers() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Trainer Management</h1>
          <p className="text-muted-foreground mt-1">Manage your gym trainers and their schedules</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/30">
          <Plus className="w-5 h-5" />
          Add Trainer
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Dumbbell className="w-6 h-6 text-primary" />
            </div>
            <span className="text-2xl font-bold text-foreground">{trainers.length}</span>
          </div>
          <p className="text-sm text-muted-foreground">Total Trainers</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-accent" />
            </div>
            <span className="text-2xl font-bold text-foreground">
              {trainers.reduce((sum, t) => sum + t.assignedMembers, 0)}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">Assigned Members</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-500" />
            </div>
            <span className="text-2xl font-bold text-foreground">$20.5K</span>
          </div>
          <p className="text-sm text-muted-foreground">Monthly Payroll</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-purple-500" />
            </div>
            <span className="text-2xl font-bold text-foreground">152</span>
          </div>
          <p className="text-sm text-muted-foreground">Sessions This Week</p>
        </div>
      </div>

      {/* Trainers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainers.map((trainer) => (
          <div
            key={trainer.id}
            className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:scale-105"
          >
            {/* Trainer Avatar and Name */}
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-bold text-white">
                  {trainer.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-1">{trainer.name}</h3>
                <p className="text-sm text-muted-foreground">{trainer.experience} experience</p>
              </div>
            </div>

            {/* Specializations */}
            <div className="mb-4">
              <p className="text-xs font-medium text-muted-foreground mb-2">Specializations:</p>
              <div className="flex flex-wrap gap-2">
                {trainer.specializations.map((spec, index) => (
                  <span
                    key={index}
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      specializationColors[spec] || 'bg-muted/30 text-foreground'
                    }`}
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4 pt-4 border-t border-border">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Assigned</span>
                </div>
                <p className="text-lg font-semibold text-foreground">{trainer.assignedMembers}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Salary</span>
                </div>
                <p className="text-lg font-semibold text-foreground">{trainer.salary}</p>
              </div>
            </div>

            {/* Availability */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Availability</span>
              </div>
              <p className="text-sm text-foreground">{trainer.availability}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="flex-1 py-2 bg-primary text-white rounded-xl hover:opacity-90 transition-all text-sm font-medium">
                View Schedule
              </button>
              <button className="px-4 py-2 border border-border rounded-xl text-foreground hover:bg-muted/20 transition-colors text-sm font-medium">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

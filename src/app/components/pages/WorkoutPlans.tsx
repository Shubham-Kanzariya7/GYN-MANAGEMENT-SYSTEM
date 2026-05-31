import { Dumbbell, TrendingUp, Clock, Target, Plus } from 'lucide-react';

const workoutCategories = ['All', 'Strength', 'Cardio', 'Flexibility', 'HIIT'];

const workouts = [
  {
    id: 1,
    name: 'Full Body Strength',
    category: 'Strength',
    duration: '45 min',
    difficulty: 'Intermediate',
    exercises: 12,
    assignedTo: 24,
  },
  {
    id: 2,
    name: 'HIIT Cardio Blast',
    category: 'HIIT',
    duration: '30 min',
    difficulty: 'Advanced',
    exercises: 8,
    assignedTo: 18,
  },
  {
    id: 3,
    name: 'Yoga Flow',
    category: 'Flexibility',
    duration: '60 min',
    difficulty: 'Beginner',
    exercises: 15,
    assignedTo: 32,
  },
  {
    id: 4,
    name: 'Upper Body Power',
    category: 'Strength',
    duration: '40 min',
    difficulty: 'Advanced',
    exercises: 10,
    assignedTo: 16,
  },
  {
    id: 5,
    name: 'Morning Cardio',
    category: 'Cardio',
    duration: '35 min',
    difficulty: 'Beginner',
    exercises: 6,
    assignedTo: 28,
  },
  {
    id: 6,
    name: 'Core Crusher',
    category: 'Strength',
    duration: '25 min',
    difficulty: 'Intermediate',
    exercises: 8,
    assignedTo: 22,
  },
];

const assignedPlans = [
  { member: 'John Smith', plan: 'Full Body Strength', progress: 75 },
  { member: 'Sarah Johnson', plan: 'Yoga Flow', progress: 60 },
  { member: 'Mike Brown', plan: 'HIIT Cardio Blast', progress: 90 },
  { member: 'Emily Davis', plan: 'Upper Body Power', progress: 45 },
  { member: 'David Wilson', plan: 'Morning Cardio', progress: 85 },
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner':
      return 'bg-accent/10 text-accent';
    case 'Intermediate':
      return 'bg-primary/10 text-primary';
    case 'Advanced':
      return 'bg-destructive/10 text-destructive';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

export function WorkoutPlans() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Workout & Diet Plans</h1>
          <p className="text-muted-foreground mt-1">Create and assign workout plans to members</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/30">
          <Plus className="w-5 h-5" />
          Create Plan
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Dumbbell className="w-6 h-6 text-primary" />
            </div>
            <span className="text-2xl font-bold text-foreground">{workouts.length}</span>
          </div>
          <p className="text-sm text-muted-foreground">Total Plans</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-accent" />
            </div>
            <span className="text-2xl font-bold text-foreground">140</span>
          </div>
          <p className="text-sm text-muted-foreground">Active Assignments</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-500" />
            </div>
            <span className="text-2xl font-bold text-foreground">73%</span>
          </div>
          <p className="text-sm text-muted-foreground">Avg Completion</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-purple-500" />
            </div>
            <span className="text-2xl font-bold text-foreground">42min</span>
          </div>
          <p className="text-sm text-muted-foreground">Avg Duration</p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {workoutCategories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-xl font-medium transition-all whitespace-nowrap ${
              category === 'All'
                ? 'bg-primary text-white shadow-lg shadow-primary/30'
                : 'bg-card border border-border text-foreground hover:bg-muted/20'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Workout Library */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Workout Library</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {workouts.map((workout) => (
              <div
                key={workout.id}
                className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:scale-105"
              >
                {/* Icon and Category */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                    <Dumbbell className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground bg-muted/20 px-2.5 py-1 rounded-full">
                    {workout.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-foreground mb-3">{workout.name}</h3>

                {/* Details */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{workout.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{workout.exercises} exercises</span>
                  </div>
                </div>

                {/* Difficulty */}
                <div className="mb-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(workout.difficulty)}`}>
                    {workout.difficulty}
                  </span>
                </div>

                {/* Assigned Count */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-sm text-muted-foreground">{workout.assignedTo} members</span>
                  <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                    Assign →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Assigned Plans & Progress */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Recent Assignments</h2>
          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            {assignedPlans.map((assignment, index) => (
              <div key={index} className="pb-4 border-b border-border last:border-0 last:pb-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-foreground">{assignment.member}</p>
                    <p className="text-sm text-muted-foreground">{assignment.plan}</p>
                  </div>
                  <span className="text-sm font-semibold text-primary">{assignment.progress}%</span>
                </div>
                <div className="w-full bg-muted/30 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300"
                    style={{ width: `${assignment.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-6">
            <h3 className="font-semibold text-foreground mb-4">This Week's Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Workouts Completed</span>
                <span className="font-semibold text-foreground">247</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Duration</span>
                <span className="font-semibold text-foreground">182 hrs</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Avg Rating</span>
                <span className="font-semibold text-foreground">4.8/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

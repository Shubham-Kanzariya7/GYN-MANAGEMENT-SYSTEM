import { Check, Plus, Crown, Zap, Star } from 'lucide-react';

const plans = [
  {
    name: 'Basic',
    price: '$29',
    duration: 'per month',
    icon: Zap,
    features: [
      'Access to gym equipment',
      'Locker room access',
      'Free Wi-Fi',
      '2 group classes per week',
      'Basic fitness assessment',
    ],
    color: 'from-blue-500 to-blue-600',
    popular: false,
  },
  {
    name: 'Premium',
    price: '$59',
    duration: 'per month',
    icon: Star,
    features: [
      'All Basic features',
      'Unlimited group classes',
      'Personal trainer (2 sessions/month)',
      'Nutrition consultation',
      'Sauna & steam room access',
      'Guest pass (2 per month)',
    ],
    color: 'from-primary to-accent',
    popular: true,
  },
  {
    name: 'Elite',
    price: '$99',
    duration: 'per month',
    icon: Crown,
    features: [
      'All Premium features',
      'Unlimited personal training',
      'Custom workout & diet plans',
      'Priority class booking',
      'Massage therapy (2 sessions/month)',
      'Free gym merchandise',
      'VIP locker',
    ],
    color: 'from-purple-500 to-pink-600',
    popular: false,
  },
];

export function MembershipPlans() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Membership Plans</h1>
          <p className="text-muted-foreground mt-1">Choose the perfect plan for your fitness journey</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/30">
          <Plus className="w-5 h-5" />
          Create Plan
        </button>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan, index) => {
          const Icon = plan.icon;
          return (
            <div
              key={index}
              className={`relative bg-card border border-border rounded-3xl p-8 transition-all duration-300 ${
                plan.popular
                  ? 'ring-2 ring-primary shadow-2xl shadow-primary/20 scale-105'
                  : 'hover:shadow-lg hover:shadow-primary/10 hover:scale-105'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-primary to-accent text-white text-sm font-semibold rounded-full shadow-lg">
                    <Star className="w-4 h-4" />
                    Most Popular
                  </span>
                </div>
              )}

              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                <Icon className="w-8 h-8 text-white" />
              </div>

              {/* Plan Name */}
              <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.duration.split(' ')[1]}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{plan.duration}</p>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-accent" />
                    </div>
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className={`w-full py-3 rounded-xl font-semibold transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/30 hover:opacity-90'
                    : 'bg-muted/20 text-foreground hover:bg-muted/40 border border-border'
                }`}
              >
                Select Plan
              </button>
            </div>
          );
        })}
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="bg-card border border-border rounded-2xl p-6 text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Check className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No Commitment</h3>
          <p className="text-sm text-muted-foreground">Cancel anytime with no hidden fees or penalties</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 text-center">
          <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Star className="w-6 h-6 text-accent" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Expert Trainers</h3>
          <p className="text-sm text-muted-foreground">Certified professionals to guide your fitness journey</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 text-center">
          <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Crown className="w-6 h-6 text-blue-500" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Premium Equipment</h3>
          <p className="text-sm text-muted-foreground">State-of-the-art machines and facilities</p>
        </div>
      </div>
    </div>
  );
}

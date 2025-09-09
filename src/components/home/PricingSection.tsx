import React from 'react'
import { motion } from 'framer-motion'
import { Check, Star, Crown, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

const PLANS = [
  {
    name: 'Free',
    price: 'K0',
    period: '/month',
    description: 'Perfect for casual viewers',
    icon: Zap,
    features: [
      'Limited movie access',
      'Standard definition',
      'Ads included',
      'Single device',
      'Community support'
    ],
    buttonText: 'Get Started',
    popular: false,
    gradient: 'from-gray-600 to-gray-700'
  },
  {
    name: 'Premium',
    price: 'K25',
    period: '/month',
    description: 'Most popular choice',
    icon: Star,
    features: [
      'Full movie library',
      'HD quality streaming',
      'No advertisements',
      'Up to 3 devices',
      'Priority support',
      'Offline downloads'
    ],
    buttonText: 'Start Free Trial',
    popular: true,
    gradient: 'from-secondary-500 to-accent-500'
  },
  {
    name: 'VIP',
    price: 'K50',
    period: '/month',
    description: 'Ultimate experience',
    icon: Crown,
    features: [
      'Everything in Premium',
      '4K Ultra HD quality',
      'Early access to new releases',
      'Unlimited devices',
      'VIP customer support',
      'Exclusive content',
      'Behind-the-scenes access'
    ],
    buttonText: 'Go VIP',
    popular: false,
    gradient: 'from-yellow-500 to-orange-500'
  }
]

export function PricingSection() {
  return (
    <section className="py-16 bg-streaming-gray relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(245, 158, 11, 0.4) 0%, transparent 50%)
          `
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-header text-gradient">Choose Your Plan</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Start with our free plan and upgrade anytime to unlock premium features
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {PLANS.map((plan, index) => {
            const Icon = plan.icon
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative group ${
                  plan.popular ? 'md:-mt-4 md:mb-4' : ''
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-secondary-500 to-accent-500 text-white text-sm font-bold px-4 py-2 rounded-full">
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Card */}
                <div className={`relative p-8 rounded-2xl border-2 transition-all duration-300 ${
                  plan.popular 
                    ? 'border-secondary-500 bg-gray-800/50 shadow-xl shadow-secondary-500/20'
                    : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
                } backdrop-blur-sm group-hover:scale-105`}>
                  
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                  
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${plan.gradient} rounded-2xl p-4`}>
                      <Icon className="w-full h-full text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-gray-400">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="text-center mb-8">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                      <span className="text-gray-400 ml-1">{plan.period}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <div className={`flex-shrink-0 w-5 h-5 bg-gradient-to-br ${plan.gradient} rounded-full p-1`}>
                          <Check className="w-full h-full text-white" />
                        </div>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link
                    to="/signup"
                    className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-secondary-500 to-accent-500 text-white hover:shadow-lg hover:shadow-secondary-500/25'
                        : 'bg-gray-700 text-white hover:bg-gray-600'
                    }`}
                  >
                    {plan.buttonText}
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 text-sm">
            All plans include our core features. Upgrade or downgrade anytime. 
            <Link to="/pricing" className="text-secondary-400 hover:text-secondary-300 ml-1">
              View detailed comparison
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

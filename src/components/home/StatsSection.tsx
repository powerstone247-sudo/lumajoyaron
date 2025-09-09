import React from 'react'
import { motion } from 'framer-motion'
import { Users, Play, Award, Globe } from 'lucide-react'

const STATS = [
  {
    icon: Users,
    value: '10,000+',
    label: 'Active Users',
    description: 'Growing community of movie lovers'
  },
  {
    icon: Play,
    value: '50+',
    label: 'Premium Movies',
    description: 'Curated collection of quality content'
  },
  {
    icon: Award,
    value: '15+',
    label: 'Awards Won',
    description: 'Recognized for excellence in streaming'
  },
  {
    icon: Globe,
    value: '5+',
    label: 'Countries',
    description: 'Expanding across Africa and beyond'
  }
]

export function StatsSection() {
  return (
    <section className="py-16 bg-streaming-dark relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-secondary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
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
          <h2 className="section-header text-gradient">Our Impact</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Building the future of African entertainment, one story at a time
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="relative">
                  {/* Icon Background */}
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-2xl p-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-full h-full text-white" />
                  </div>
                  
                  {/* Glow Effect */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
                </div>
                
                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                  className="text-4xl font-bold text-white mb-2 text-gradient-gold"
                >
                  {stat.value}
                </motion.div>
                
                <h3 className="text-xl font-semibold text-white mb-2">
                  {stat.label}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed">
                  {stat.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

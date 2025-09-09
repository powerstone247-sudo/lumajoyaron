import React from 'react'
import { motion } from 'framer-motion'
import { Play, Heart, Clock, TrendingUp } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-streaming-dark py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''}!
          </h1>
          <p className="text-gray-400 text-lg">Continue watching or discover something new</p>
        </motion.div>

        {/* Dashboard Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {[
            { icon: Play, label: 'Movies Watched', value: '12', color: 'from-blue-500 to-cyan-500' },
            { icon: Heart, label: 'Favorites', value: '8', color: 'from-pink-500 to-red-500' },
            { icon: Clock, label: 'Watch Time', value: '24h', color: 'from-green-500 to-emerald-500' },
            { icon: TrendingUp, label: 'This Month', value: '5', color: 'from-purple-500 to-indigo-500' },
          ].map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg p-3 mb-4`}>
                  <Icon className="w-full h-full text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            )
          })}
        </motion.div>

        {/* Coming Soon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center py-20"
        >
          <div className="bg-gray-800/50 rounded-2xl p-12 max-w-2xl mx-auto">
            <Play className="h-16 w-16 text-secondary-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">Dashboard Coming Soon</h2>
            <p className="text-gray-400 mb-6">
              We're building a personalized dashboard with your viewing history, 
              recommendations, progress tracking, and more.
            </p>
            <div className="text-sm text-gray-500">
              Features include: Continue Watching, Personalized Recommendations, 
              Viewing Statistics, and Account Management.
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

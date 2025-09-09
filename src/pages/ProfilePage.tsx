import React from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Calendar, Settings, Shield, Bell } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export function ProfilePage() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-streaming-dark py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Profile Settings</h1>
          <p className="text-gray-400 text-lg">Manage your account and preferences</p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 mb-8"
        >
          <div className="flex items-center space-x-6 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-full flex items-center justify-center">
              <User className="h-10 w-10 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {user?.email?.split('@')[0] || 'User'}
              </h2>
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="h-4 w-4" />
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400 mt-1">
                <Calendar className="h-4 w-4" />
                <span>Member since {new Date().getFullYear()}</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-900/50 rounded-lg">
              <div className="text-2xl font-bold text-white">12</div>
              <div className="text-gray-400 text-sm">Movies Watched</div>
            </div>
            <div className="text-center p-4 bg-gray-900/50 rounded-lg">
              <div className="text-2xl font-bold text-white">8</div>
              <div className="text-gray-400 text-sm">Favorites</div>
            </div>
            <div className="text-center p-4 bg-gray-900/50 rounded-lg">
              <div className="text-2xl font-bold text-white">24h</div>
              <div className="text-gray-400 text-sm">Watch Time</div>
            </div>
          </div>
        </motion.div>

        {/* Settings Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: Settings,
              title: 'Account Settings',
              description: 'Update your personal information and preferences',
              color: 'from-blue-500 to-cyan-500'
            },
            {
              icon: Shield,
              title: 'Privacy & Security',
              description: 'Manage your privacy settings and security options',
              color: 'from-green-500 to-emerald-500'
            },
            {
              icon: Bell,
              title: 'Notifications',
              description: 'Control what notifications you receive',
              color: 'from-purple-500 to-indigo-500'
            },
            {
              icon: User,
              title: 'Profile',
              description: 'Customize your profile and display preferences',
              color: 'from-pink-500 to-red-500'
            },
          ].map((section, index) => {
            const Icon = section.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors cursor-pointer group"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${section.color} rounded-lg p-3 mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{section.title}</h3>
                <p className="text-gray-400">{section.description}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Coming Soon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center py-12 mt-8"
        >
          <div className="text-sm text-gray-500">
            Profile management features coming soon!
          </div>
        </motion.div>
      </div>
    </div>
  )
}

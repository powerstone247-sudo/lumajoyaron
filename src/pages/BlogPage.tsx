import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, User, Search } from 'lucide-react'

export function BlogPage() {
  return (
    <div className="min-h-screen bg-streaming-dark py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Blog & News</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Stay updated with the latest news, behind-the-scenes content, and industry insights
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-lg mx-auto mb-12"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
            />
          </div>
        </motion.div>

        {/* Coming Soon Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center py-20"
        >
          <div className="bg-gray-800/50 rounded-2xl p-12 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Calendar className="h-8 w-8 text-secondary-500" />
              <User className="h-8 w-8 text-accent-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Blog Coming Soon</h2>
            <p className="text-gray-400 mb-6">
              We're preparing engaging content including industry news, behind-the-scenes stories, 
              interviews with filmmakers, and insights into Zambian cinema.
            </p>
            <div className="text-sm text-gray-500">
              Follow us on social media for the latest updates!
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

import React from 'react'
import { motion } from 'framer-motion'
import { Search, Filter } from 'lucide-react'

export function MoviesPage() {
  return (
    <div className="min-h-screen bg-streaming-dark py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Movies</h1>
          <p className="text-gray-400 text-lg">Discover our complete collection of premium content</p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search movies..."
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center space-x-2 px-6 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700 transition-colors">
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </button>
        </motion.div>

        {/* Coming Soon Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center py-20"
        >
          <div className="bg-gray-800/50 rounded-2xl p-12 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">Movies Page Coming Soon</h2>
            <p className="text-gray-400 mb-6">
              We're working on building an amazing movie browsing experience with advanced filtering, 
              search capabilities, and personalized recommendations.
            </p>
            <div className="text-sm text-gray-500">
              Check back soon for the full movie catalog!
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

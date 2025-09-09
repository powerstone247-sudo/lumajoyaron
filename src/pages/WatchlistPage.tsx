import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Plus, Search } from 'lucide-react'
import { Link } from 'react-router-dom'

export function WatchlistPage() {
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
          <h1 className="text-4xl font-bold text-white mb-4">My Watchlist</h1>
          <p className="text-gray-400 text-lg">Movies and shows you want to watch</p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search your watchlist..."
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
            />
          </div>
        </motion.div>

        {/* Empty Watchlist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center py-20"
        >
          <div className="bg-gray-800/50 rounded-2xl p-12 max-w-2xl mx-auto">
            <Heart className="h-16 w-16 text-gray-600 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">Your Watchlist is Empty</h2>
            <p className="text-gray-400 mb-8">
              Start building your watchlist by adding movies you want to watch later. 
              Click the "Add to Watchlist" button on any movie to get started.
            </p>
            <Link
              to="/movies"
              className="inline-flex items-center space-x-2 btn-primary"
            >
              <Plus className="h-5 w-5" />
              <span>Browse Movies</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

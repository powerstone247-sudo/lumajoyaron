import React from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Play, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export function MovieDetailPage() {
  const { id } = useParams<{ id: string }>()

  return (
    <div className="min-h-screen bg-streaming-dark py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
        </motion.div>

        {/* Movie Detail Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center py-20"
        >
          <div className="bg-gray-800/50 rounded-2xl p-12 max-w-2xl mx-auto">
            <Play className="h-16 w-16 text-secondary-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-white mb-4">Movie Detail Page</h1>
            <p className="text-gray-400 mb-6">
              Movie ID: <span className="text-white font-mono">{id}</span>
            </p>
            <p className="text-gray-400 mb-8">
              We're building a comprehensive movie detail page with trailers, cast information, 
              reviews, ratings, and streaming options.
            </p>
            <div className="text-sm text-gray-500">
              Coming soon with full movie details and streaming capabilities!
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

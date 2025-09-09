import React from 'react'
import { motion } from 'framer-motion'
import { Film, Tv, Zap, Heart, Sword, Laugh, Drama, Globe } from 'lucide-react'
import { Link } from 'react-router-dom'

const GENRES = [
  { name: 'Action', icon: Zap, color: 'from-red-500 to-orange-500', count: '15+ Movies' },
  { name: 'Drama', icon: Drama, color: 'from-blue-500 to-purple-500', count: '12+ Movies' },
  { name: 'Comedy', icon: Laugh, color: 'from-yellow-500 to-green-500', count: '8+ Movies' },
  { name: 'Romance', icon: Heart, color: 'from-pink-500 to-red-500', count: '6+ Movies' },
  { name: 'Historical', icon: Globe, color: 'from-amber-500 to-orange-500', count: '4+ Movies' },
  { name: 'Adventure', icon: Sword, color: 'from-emerald-500 to-teal-500', count: '10+ Movies' },
  { name: 'Family', icon: Film, color: 'from-indigo-500 to-purple-500', count: '7+ Movies' },
  { name: 'Animation', icon: Tv, color: 'from-cyan-500 to-blue-500', count: '5+ Movies' },
]

export function GenreCategories() {
  return (
    <section className="py-16 bg-streaming-gray relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(45deg, transparent 40%, rgba(59, 130, 246, 0.1) 50%, transparent 60%),
            linear-gradient(-45deg, transparent 40%, rgba(245, 158, 11, 0.1) 50%, transparent 60%)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-header text-gradient">Explore by Genre</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover movies across different genres and find your next favorite story
          </p>
        </motion.div>

        {/* Genre Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {GENRES.map((genre, index) => {
            const Icon = genre.icon
            return (
              <motion.div
                key={genre.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  to={`/movies?genre=${genre.name.toLowerCase()}`}
                  className="group block"
                >
                  <div className="relative p-6 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${genre.color} opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300`} />
                    
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${genre.color} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-full h-full text-white" />
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                      {genre.name}
                    </h3>
                    <p className="text-gray-400 text-sm">{genre.count}</p>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

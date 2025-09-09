import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Plus, Star, Clock, Eye, Crown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn, formatPrice } from '@/lib/utils'

interface Movie {
  id: string
  title: string
  description: string
  thumbnail_url: string | null
  duration: string | null
  category: string | null
  view_count: number | null
  is_premium: boolean | null
  price: number | null
  genres?: string[]
  rating?: {
    average: number
    count: number
  }
}

interface MovieCardProps {
  movie: Movie
  className?: string
  size?: 'sm' | 'md' | 'lg'
  showDetails?: boolean
}

export function MovieCard({ 
  movie, 
  className, 
  size = 'md', 
  showDetails = true 
}: MovieCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const sizeClasses = {
    sm: 'aspect-[2/3] max-w-[180px]',
    md: 'aspect-[2/3] max-w-[220px]',
    lg: 'aspect-[2/3] max-w-[280px]',
  }

  const formatViewCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`
    }
    return count.toString()
  }

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="h-3 w-3 text-yellow-400" fill="currentColor" />
        )
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Star key={i} className="h-3 w-3 text-yellow-400" fill="currentColor" style={{ clipPath: 'inset(0 50% 0 0)' }} />
        )
      } else {
        stars.push(
          <Star key={i} className="h-3 w-3 text-gray-600" />
        )
      }
    }

    return stars
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'movie-card group relative cursor-pointer',
        sizeClasses[size],
        className
      )}
    >
      {/* Movie Poster */}
      <div className="relative w-full h-full overflow-hidden rounded-xl bg-gray-800">
        {/* Loading Skeleton */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-700 animate-pulse flex items-center justify-center">
            <Play className="h-8 w-8 text-gray-500" />
          </div>
        )}

        {/* Error Fallback */}
        {imageError && (
          <div className="absolute inset-0 bg-gray-800 flex flex-col items-center justify-center text-gray-400">
            <Play className="h-8 w-8 mb-2" />
            <span className="text-sm text-center px-2">{movie.title}</span>
          </div>
        )}

        {/* Movie Image */}
        {movie.thumbnail_url && !imageError && (
          <img
            src={movie.thumbnail_url}
            alt={movie.title}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={cn(
              'w-full h-full object-cover transition-all duration-300 group-hover:scale-110',
              imageLoaded ? 'opacity-100' : 'opacity-0'
            )}
          />
        )}

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Premium Badge */}
        {movie.is_premium && (
          <div className="absolute top-3 left-3 bg-yellow-500/90 backdrop-blur-sm text-black text-xs font-bold px-2 py-1 rounded-full flex items-center space-x-1">
            <Crown className="h-3 w-3" />
            <span>Premium</span>
          </div>
        )}

        {/* Rating Badge */}
        {movie.rating && movie.rating.average > 0 && (
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full flex items-center space-x-1">
            <Star className="h-3 w-3 text-yellow-400" fill="currentColor" />
            <span>{movie.rating.average.toFixed(1)}</span>
          </div>
        )}

        {/* Hover Actions */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="flex items-center space-x-3">
            {/* Play Button */}
            <Link to={`/movie/${movie.id}`}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-white/30 transition-colors"
              >
                <Play className="h-6 w-6 text-white" fill="currentColor" />
              </motion.button>
            </Link>

            {/* Add to Watchlist */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-white/30 transition-colors"
            >
              <Plus className="h-6 w-6 text-white" />
            </motion.button>
          </div>
        </div>

        {/* Movie Details Overlay */}
        {showDetails && (
          <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-white font-semibold text-sm mb-1 line-clamp-1">
              {movie.title}
            </h3>
            
            <div className="flex items-center justify-between text-xs text-gray-300 mb-2">
              <span className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{movie.duration}</span>
              </span>
              
              {movie.view_count !== null && (
                <span className="flex items-center space-x-1">
                  <Eye className="h-3 w-3" />
                  <span>{formatViewCount(movie.view_count)}</span>
                </span>
              )}
            </div>

            {/* Genres */}
            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {movie.genres.slice(0, 2).map((genre, index) => (
                  <span
                    key={index}
                    className="genre-badge text-xs py-0.5 px-2"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            )}

            {/* Rating */}
            {movie.rating && movie.rating.average > 0 && (
              <div className="flex items-center space-x-1 mb-2">
                <div className="flex items-center space-x-0.5">
                  {renderStars(movie.rating.average)}
                </div>
                <span className="text-xs text-gray-400">({movie.rating.count})</span>
              </div>
            )}

            {/* Price */}
            {movie.price !== null && (
              <div className="text-secondary-400 font-semibold text-sm">
                {formatPrice(movie.price)}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile-friendly title (shown below image on small screens) */}
      <div className="mt-3 sm:hidden">
        <h3 className="text-white font-medium text-sm line-clamp-2">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-gray-400">{movie.category}</span>
          {movie.rating && movie.rating.average > 0 && (
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 text-yellow-400" fill="currentColor" />
              <span className="text-xs text-gray-400">{movie.rating.average.toFixed(1)}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Info, Plus, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Movie } from '@/lib/supabase'

const HERO_MOVIES: Partial<Movie>[] = [
  {
    id: '77dc584f-d7c6-4142-b2aa-b7c2623850e0',
    title: 'Black Panther',
    description: "Marvel's groundbreaking superhero film set in the technologically advanced African nation of Wakanda, celebrating African culture and heritage.",
    thumbnail_url: 'https://anjnakascphvuxlygden.supabase.co/storage/v1/object/public/movie-assets/black-panther-poster.png',
    duration: '2h 14m',
    category: 'Action',
    view_count: 8900,
    is_premium: true,
  },
  {
    id: '8616e262-0448-47f8-bd49-9025a14c80ef',
    title: 'The Bemba Princess',
    description: 'A historical epic telling the story of a legendary Bemba princess who united tribes against colonial forces in the early 1900s.',
    thumbnail_url: 'https://anjnakascphvuxlygden.supabase.co/storage/v1/object/public/movie-assets/bemba-princess-poster.png',
    duration: '2h 32m',
    category: 'Historical',
    view_count: 2100,
    is_premium: true,
  },
  {
    id: '5b530b84-72fb-4185-a1a2-30a5af49af55',
    title: 'Zambezi Dreams',
    description: 'A captivating drama about a young fisherman navigating life along the mighty Zambezi River, exploring themes of tradition, family, and hope in modern Zambia.',
    thumbnail_url: 'https://anjnakascphvuxlygden.supabase.co/storage/v1/object/public/movie-assets/zambezi-dreams-poster.png',
    duration: '2h 15m',
    category: 'Drama',
    view_count: 1240,
    is_premium: true,
  },
]

export function HeroSection() {
  const [currentMovie, setCurrentMovie] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const { user } = useAuth()
  const movie = HERO_MOVIES[currentMovie]

  // Auto-rotate hero movies
  useEffect(() => {
    if (!autoplay) return
    
    const interval = setInterval(() => {
      setCurrentMovie((prev) => (prev + 1) % HERO_MOVIES.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [autoplay])

  const nextMovie = () => {
    setAutoplay(false)
    setCurrentMovie((prev) => (prev + 1) % HERO_MOVIES.length)
  }

  const prevMovie = () => {
    setAutoplay(false)
    setCurrentMovie((prev) => (prev - 1 + HERO_MOVIES.length) % HERO_MOVIES.length)
  }

  const formatViewCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`
    }
    return count.toString()
  }

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Image with Overlay */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMovie}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${movie?.thumbnail_url})`,
              filter: 'blur(20px) brightness(0.3)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-streaming-dark via-streaming-dark/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-streaming-dark via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevMovie}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-all duration-200 backdrop-blur-sm"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={nextMovie}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-all duration-200 backdrop-blur-sm"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${currentMovie}`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Movie Category & Rating */}
              <div className="flex items-center space-x-4">
                <span className="genre-badge">{movie?.category}</span>
                {movie?.is_premium && (
                  <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-yellow-500/20 text-yellow-400 rounded-full border border-yellow-500/30">
                    <Star className="h-3 w-3 mr-1" fill="currentColor" />
                    Premium
                  </span>
                )}
              </div>

              {/* Movie Title */}
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight hero-text-shadow">
                {movie?.title}
              </h1>

              {/* Movie Stats */}
              <div className="flex items-center space-x-6 text-gray-300">
                <span className="flex items-center space-x-1">
                  <Play className="h-4 w-4" />
                  <span>{movie?.duration}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                  <span>4.8</span>
                </span>
                <span>{formatViewCount(movie?.view_count || 0)} views</span>
              </div>

              {/* Movie Description */}
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl hero-text-shadow">
                {movie?.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  to={user ? `/movie/${movie?.id}` : '/login'}
                  className="btn-primary text-lg px-8 py-4 flex items-center justify-center space-x-3 group"
                >
                  <Play className="h-6 w-6 group-hover:scale-110 transition-transform" fill="currentColor" />
                  <span>Watch Now</span>
                </Link>
                
                <Link
                  to={`/movie/${movie?.id}`}
                  className="btn-secondary text-lg px-8 py-4 flex items-center justify-center space-x-3 group"
                >
                  <Info className="h-6 w-6 group-hover:scale-110 transition-transform" />
                  <span>More Info</span>
                </Link>
                
                {user && (
                  <button className="btn-secondary text-lg px-8 py-4 flex items-center justify-center space-x-3 group">
                    <Plus className="h-6 w-6 group-hover:scale-110 transition-transform" />
                    <span>My List</span>
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Movie Poster */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`poster-${currentMovie}`}
              initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateY: -30 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="hidden lg:flex justify-center items-center"
            >
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-secondary-500 via-accent-500 to-secondary-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
                <div className="relative">
                  <img
                    src={movie?.thumbnail_url}
                    alt={movie?.title}
                    className="w-80 h-[480px] object-cover rounded-2xl shadow-2xl card-shadow-hover transition-all duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-2xl" />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="bg-white/20 backdrop-blur-md rounded-full p-6 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <Play className="h-12 w-12 text-white" fill="currentColor" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Movie Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {HERO_MOVIES.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setAutoplay(false)
              setCurrentMovie(index)
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentMovie
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 right-8 z-20"
      >
        <div className="flex flex-col items-center space-y-2 text-white/60">
          <span className="text-sm font-medium">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-8 bg-white/60"
          />
        </div>
      </motion.div>
    </section>
  )
}

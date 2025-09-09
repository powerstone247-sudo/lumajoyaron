import React from 'react'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { ChevronRight, Play, Plus, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { supabase, Movie, MovieGenre, MovieRating } from '@/lib/supabase'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { MovieCard } from '@/components/ui/MovieCard'

interface MovieWithGenres extends Movie {
  genres: string[]
  rating: {
    average: number
    count: number
  }
}

export function FeaturedMovies() {
  const { data: moviesData, isLoading, error } = useQuery({
    queryKey: ['featured-movies'],
    queryFn: async () => {
      // Get top movies by view count
      const { data: movies, error } = await supabase
        .from('movies')
        .select()
        .order('view_count', { ascending: false })
        .limit(12)
        .returns<Movie[]>()

      if (error) throw error
      if (!movies) return []

      // Get genres for movies
      const movieIds = movies.map(m => m.id)
      const { data: genres } = await supabase
        .from('movie_genres')
        .select('movie_id, genre')
        .in('movie_id', movieIds)
        .returns<Pick<MovieGenre, 'movie_id' | 'genre'>[]>()

      // Get ratings for movies
      const { data: ratings } = await supabase
        .from('movie_ratings')
        .select('movie_id, rating')
        .in('movie_id', movieIds)
        .returns<Pick<MovieRating, 'movie_id' | 'rating'>[]>()

      // Combine data
      const moviesWithData: MovieWithGenres[] = movies.map(movie => {
        const movieGenres = genres?.filter(g => g.movie_id === movie.id).map(g => g.genre) || []
        const movieRatings = ratings?.filter(r => r.movie_id === movie.id).map(r => r.rating) || []
        
        const averageRating = movieRatings.length > 0 
          ? movieRatings.reduce((sum, rating) => sum + rating, 0) / movieRatings.length 
          : 0

        return {
          ...movie,
          genres: movieGenres.length > 0 ? movieGenres : [movie.category].filter(Boolean) as string[],
          rating: {
            average: Math.round(averageRating * 10) / 10,
            count: movieRatings.length
          }
        }
      })

      return moviesWithData
    },
  })

  if (error) {
    return (
      <section className="py-16 bg-streaming-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-400">
            <p>Failed to load featured movies. Please try again later.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-streaming-dark relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(245, 158, 11, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 40% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)`
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <h2 className="section-header text-gradient">Featured Movies</h2>
            <p className="text-gray-400 text-lg">Discover our most popular content</p>
          </div>
          <Link
            to="/movies"
            className="hidden sm:flex items-center space-x-2 text-secondary-400 hover:text-secondary-300 font-medium transition-colors group"
          >
            <span>View All</span>
            <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {/* Movies Grid */}
        {moviesData && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="movie-grid"
            >
              {moviesData.map((movie, index) => (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <MovieCard movie={movie} />
                </motion.div>
              ))}
            </motion.div>

            {/* Mobile View All Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex justify-center mt-12 sm:hidden"
            >
              <Link
                to="/movies"
                className="btn-secondary flex items-center space-x-2"
              >
                <span>View All Movies</span>
                <ChevronRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  )
}

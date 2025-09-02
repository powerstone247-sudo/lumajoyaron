import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { supabase, Content, Genre } from '@/lib/supabase'
import { ContentCard } from '@/components/ContentCard'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

const ITEMS_PER_PAGE = 24

export function Browse() {
  const { genre } = useParams()
  const [selectedType, setSelectedType] = useState<'all' | 'movie' | 'series'>('all')
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'rating'>('popular')
  const [currentPage, setCurrentPage] = useState(1)

  // Fetch genres for filter
  const { data: genres } = useQuery({
    queryKey: ['genres'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('genres')
        .select('*')
        .order('name')

      if (error) throw error
      return data as Genre[]
    },
  })

  // Fetch content based on filters
  const { data: contentData, isLoading } = useQuery({
    queryKey: ['browse-content', genre, selectedType, sortBy, currentPage],
    queryFn: async () => {
      let query = supabase
        .from('content')
        .select('*')
      
      // Apply content type filter
      if (selectedType !== 'all') {
        query = query.eq('content_type', selectedType)
      }

      // Apply sorting
      switch (sortBy) {
        case 'newest':
          query = query.order('created_at', { ascending: false })
          break
        case 'rating':
          query = query.order('imdb_rating', { ascending: false })
          break
        case 'popular':
        default:
          query = query.order('view_count', { ascending: false })
          break
      }

      // Apply pagination
      const from = (currentPage - 1) * ITEMS_PER_PAGE
      const to = from + ITEMS_PER_PAGE - 1
      query = query.range(from, to)

      const { data, error, count } = await query

      if (error) throw error

      // If genre filter is applied, we need to filter by genre
      if (genre && data) {
        // Get content-genre relationships for the genre
        const genreRecord = genres?.find(g => g.slug === genre)
        if (genreRecord) {
          const { data: contentGenres } = await supabase
            .from('content_genres')
            .select('content_id')
            .eq('genre_id', genreRecord.id)

          const contentIds = contentGenres?.map(cg => cg.content_id) || []
          const filteredData = data.filter(content => contentIds.includes(content.id))
          return { content: filteredData, total: filteredData.length }
        }
      }

      return { content: data || [], total: count || 0 }
    },
  })

  const selectedGenre = genres?.find(g => g.slug === genre)
  const content = contentData?.content || []
  const totalPages = Math.ceil((contentData?.total || 0) / ITEMS_PER_PAGE)

  return (
    <div className="min-h-screen bg-black pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            {selectedGenre ? selectedGenre.name : 'Browse All'}
          </h1>
          {selectedGenre && (
            <p className="text-gray-400">
              {selectedGenre.description}
            </p>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Content Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value as 'all' | 'movie' | 'series')
              setCurrentPage(1)
            }}
            className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="all">All Content</option>
            <option value="movie">Movies</option>
            <option value="series">TV Series</option>
          </select>

          {/* Sort Filter */}
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value as 'newest' | 'popular' | 'rating')
              setCurrentPage(1)
            }}
            className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="popular">Most Popular</option>
            <option value="newest">Newest</option>
            <option value="rating">Highest Rated</option>
          </select>

          {/* Genre Filter Links */}
          {genres && (
            <div className="flex flex-wrap gap-2">
              <a
                href="/browse"
                className={`px-3 py-2 rounded-md text-sm transition-colors ${
                  !genre
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                All
              </a>
              {genres.slice(0, 8).map((g) => (
                <a
                  key={g.id}
                  href={`/browse/${g.slug}`}
                  className={`px-3 py-2 rounded-md text-sm transition-colors ${
                    genre === g.slug
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {g.name}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {/* Content Grid */}
        {!isLoading && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
              {content.map((item) => (
                <ContentCard key={item.id} content={item} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-800 text-white rounded-md disabled:opacity-50 hover:bg-gray-700"
                >
                  Previous
                </button>
                
                <span className="px-4 py-2 text-white">
                  Page {currentPage} of {totalPages}
                </span>
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-800 text-white rounded-md disabled:opacity-50 hover:bg-gray-700"
                >
                  Next
                </button>
              </div>
            )}

            {/* No Results */}
            {content.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg">
                  No content found matching your filters.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
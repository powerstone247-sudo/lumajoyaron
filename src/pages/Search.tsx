import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { supabase } from '@/lib/supabase'
import { ContentCard } from '@/components/ContentCard'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { useDebounce } from '@/hooks/useDebounce'

export function Search() {
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState({
    content_type: 'all',
    release_year: '',
    min_rating: '',
    quality: 'all'
  })

  const debouncedQuery = useDebounce(query, 500)

  // Search content using edge function
  const { data: searchResults, isLoading } = useQuery({
    queryKey: ['search-content', debouncedQuery, filters],
    queryFn: async () => {
      if (!debouncedQuery.trim()) return { results: [], total: 0 }

      const searchFilters = {
        ...filters,
        content_type: filters.content_type === 'all' ? undefined : filters.content_type,
        quality: filters.quality === 'all' ? undefined : filters.quality,
        release_year: filters.release_year ? parseInt(filters.release_year) : undefined,
        min_rating: filters.min_rating ? parseFloat(filters.min_rating) : undefined
      }

      // Remove undefined values
      const cleanFilters = Object.entries(searchFilters)
        .filter(([_, value]) => value !== undefined)
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})

      const { data, error } = await supabase.functions.invoke('search-content', {
        body: {
          query: debouncedQuery,
          filters: cleanFilters,
          limit: 50,
          offset: 0
        }
      })

      if (error) throw error
      return data?.data || { results: [], total: 0 }
    },
    enabled: debouncedQuery.trim().length > 0
  })

  return (
    <div className="min-h-screen bg-black pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-6">Search</h1>
          
          {/* Search Input */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for movies, TV shows..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-md leading-5 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <select
              value={filters.content_type}
              onChange={(e) => setFilters(prev => ({ ...prev, content_type: e.target.value }))}
              className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="all">All Content</option>
              <option value="movie">Movies</option>
              <option value="series">TV Series</option>
            </select>

            <input
              type="number"
              placeholder="Release Year"
              value={filters.release_year}
              onChange={(e) => setFilters(prev => ({ ...prev, release_year: e.target.value }))}
              className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />

            <select
              value={filters.min_rating}
              onChange={(e) => setFilters(prev => ({ ...prev, min_rating: e.target.value }))}
              className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Any Rating</option>
              <option value="7">7+ Stars</option>
              <option value="8">8+ Stars</option>
              <option value="9">9+ Stars</option>
            </select>

            <select
              value={filters.quality}
              onChange={(e) => setFilters(prev => ({ ...prev, quality: e.target.value }))}
              className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="all">Any Quality</option>
              <option value="HD">HD</option>
              <option value="4K">4K</option>
              <option value="CAM">CAM</option>
            </select>
          </div>
        </div>

        {/* Search Results */}
        <div className="space-y-6">
          {!debouncedQuery.trim() && (
            <div className="text-center py-20">
              <MagnifyingGlassIcon className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">
                Start typing to search for movies and TV shows
              </p>
            </div>
          )}

          {isLoading && debouncedQuery.trim() && (
            <div className="flex justify-center py-20">
              <LoadingSpinner size="lg" />
            </div>
          )}

          {searchResults && searchResults.results.length > 0 && (
            <>
              <div className="mb-4">
                <p className="text-gray-300">
                  Found {searchResults.total} results for "{debouncedQuery}"
                </p>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {searchResults.results.map((content) => (
                  <ContentCard key={content.id} content={content} />
                ))}
              </div>
            </>
          )}

          {searchResults && searchResults.results.length === 0 && debouncedQuery.trim() && !isLoading && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">
                No results found for "{debouncedQuery}"
              </p>
              <p className="text-gray-500 mt-2">
                Try different keywords or adjust your filters
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
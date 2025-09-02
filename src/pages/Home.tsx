import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { supabase, Content } from '@/lib/supabase'
import { HeroSection } from '@/components/HeroSection'
import { ContentRow } from '@/components/ContentRow'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export function Home() {
  // Fetch featured content for hero section
  const { data: featuredContent } = useQuery({
    queryKey: ['featured-content'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('is_featured', true)
        .order('view_count', { ascending: false })
        .limit(5)

      if (error) throw error
      return data as Content[]
    },
  })

  // Fetch trending content
  const { data: trendingContent } = useQuery({
    queryKey: ['trending-content'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('is_trending', true)
        .order('view_count', { ascending: false })
        .limit(20)

      if (error) throw error
      return data as Content[]
    },
  })

  // Fetch popular movies
  const { data: popularMovies } = useQuery({
    queryKey: ['popular-movies'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('content_type', 'movie')
        .order('view_count', { ascending: false })
        .limit(20)

      if (error) throw error
      return data as Content[]
    },
  })

  // Fetch popular series
  const { data: popularSeries } = useQuery({
    queryKey: ['popular-series'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('content_type', 'series')
        .order('view_count', { ascending: false })
        .limit(20)

      if (error) throw error
      return data as Content[]
    },
  })

  // Fetch recent releases
  const { data: recentContent } = useQuery({
    queryKey: ['recent-content'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20)

      if (error) throw error
      return data as Content[]
    },
  })

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      {featuredContent && featuredContent.length > 0 && (
        <HeroSection content={featuredContent[0]} />
      )}

      {/* Content Rows */}
      <div className="relative z-10 -mt-32 pb-20">
        <div className="space-y-12">
          {trendingContent && (
            <ContentRow
              title="Trending Now"
              content={trendingContent}
              priority
            />
          )}

          {popularMovies && (
            <ContentRow
              title="Popular Movies"
              content={popularMovies}
            />
          )}

          {popularSeries && (
            <ContentRow
              title="Popular TV Series"
              content={popularSeries}
            />
          )}

          {recentContent && (
            <ContentRow
              title="Recently Added"
              content={recentContent}
            />
          )}
        </div>
      </div>
    </div>
  )
}
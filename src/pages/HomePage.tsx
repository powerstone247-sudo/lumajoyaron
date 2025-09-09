import React from 'react'
import { HeroSection } from '@/components/home/HeroSection'
import { FeaturedMovies } from '@/components/home/FeaturedMovies'
import { GenreCategories } from '@/components/home/GenreCategories'
import { RecentBlog } from '@/components/home/RecentBlog'
import { PricingSection } from '@/components/home/PricingSection'
import { StatsSection } from '@/components/home/StatsSection'

export function HomePage() {
  return (
    <div className="min-h-screen bg-streaming-dark">
      <HeroSection />
      <FeaturedMovies />
      <GenreCategories />
      <StatsSection />
      <PricingSection />
      <RecentBlog />
    </div>
  )
}

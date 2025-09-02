import React from 'react'
import { PlayIcon, PlusIcon, InformationCircleIcon } from '@heroicons/react/24/solid'
import { Content } from '@/lib/supabase'
import { Link } from 'react-router-dom'

interface HeroSectionProps {
  content: Content
}

export function HeroSection({ content }: HeroSectionProps) {
  return (
    <div className="relative h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={content.poster_url || content.thumbnail_url || 'https://via.placeholder.com/1920x1080/000000/333333?text=Lumajoyaron'}
          alt={content.title}
          className="w-full h-full object-cover"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {content.title}
          </h1>

          {/* Metadata */}
          <div className="flex items-center space-x-4 mb-6 text-sm text-gray-300">
            <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
              {content.rating || 'NR'}
            </span>
            <span>{content.release_year}</span>
            {content.duration_minutes && (
              <span>{Math.floor(content.duration_minutes / 60)}h {content.duration_minutes % 60}m</span>
            )}
            <span className="bg-gray-700 text-white px-2 py-1 rounded text-xs">
              {content.quality}
            </span>
            {content.imdb_rating && (
              <span className="flex items-center">
                ⭐ {content.imdb_rating}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-lg text-gray-300 mb-8 line-clamp-3">
            {content.description}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Link
              to={`/watch/${content.content_type}/${content.slug}`}
              className="flex items-center space-x-2 bg-white text-black px-6 py-3 rounded font-semibold hover:bg-gray-200 transition-colors"
            >
              <PlayIcon className="h-5 w-5" />
              <span>Play</span>
            </Link>
            
            <button className="flex items-center space-x-2 bg-gray-600 text-white px-6 py-3 rounded font-semibold hover:bg-gray-500 transition-colors">
              <PlusIcon className="h-5 w-5" />
              <span>My List</span>
            </button>
            
            <button className="flex items-center space-x-2 bg-gray-600/50 text-white px-4 py-3 rounded font-semibold hover:bg-gray-600/70 transition-colors">
              <InformationCircleIcon className="h-6 w-6" />
              <span className="hidden sm:block">More Info</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
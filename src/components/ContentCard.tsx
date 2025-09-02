import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { PlayIcon, PlusIcon } from '@heroicons/react/24/solid'
import { Content } from '@/lib/supabase'
import { cn } from '@/lib/utils'

interface ContentCardProps {
  content: Content
  priority?: boolean
}

export function ContentCard({ content, priority }: ContentCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const imageUrl = content.thumbnail_url || content.poster_url || 'https://via.placeholder.com/300x450/000000/333333?text=' + encodeURIComponent(content.title)

  return (
    <div 
      className="relative flex-shrink-0 w-48 group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Card */}
      <div className="relative bg-gray-900 rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-105">
        {/* Image */}
        <div className="relative aspect-[2/3]">
          <img
            src={imageUrl}
            alt={content.title}
            loading={priority ? 'eager' : 'lazy'}
            className={cn(
              "w-full h-full object-cover transition-opacity duration-300",
              imageLoaded ? 'opacity-100' : 'opacity-0'
            )}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = 'https://via.placeholder.com/300x450/111111/666666?text=' + encodeURIComponent(content.title)
            }}
          />
          
          {/* Loading placeholder */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
              <div className="text-gray-600 text-xs text-center px-2">
                {content.title}
              </div>
            </div>
          )}

          {/* Quality badge */}
          <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
            {content.quality}
          </div>

          {/* Rating badge */}
          {content.imdb_rating && (
            <div className="absolute top-2 right-2 bg-yellow-600 text-white px-2 py-1 rounded text-xs font-medium">
              ⭐ {content.imdb_rating}
            </div>
          )}
        </div>

        {/* Content Info */}
        <div className="p-3">
          <h3 className="font-semibold text-white text-sm mb-1 line-clamp-1">
            {content.title}
          </h3>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>{content.release_year}</span>
            <span className="capitalize">{content.content_type}</span>
          </div>
        </div>
      </div>

      {/* Hover Overlay */}
      {isHovered && (
        <div className="absolute inset-0 bg-black/80 rounded-lg flex flex-col justify-end p-4 z-10">
          <div className="text-white">
            <h3 className="font-bold mb-2 text-sm">{content.title}</h3>
            <p className="text-xs text-gray-300 mb-3 line-clamp-3">
              {content.description}
            </p>
            <div className="flex items-center space-x-2">
              <Link
                to={`/watch/${content.content_type}/${content.slug}`}
                className="flex items-center justify-center bg-white text-black w-8 h-8 rounded-full hover:bg-gray-200 transition-colors"
              >
                <PlayIcon className="h-4 w-4" />
              </Link>
              <button className="flex items-center justify-center bg-gray-600 text-white w-8 h-8 rounded-full hover:bg-gray-500 transition-colors">
                <PlusIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
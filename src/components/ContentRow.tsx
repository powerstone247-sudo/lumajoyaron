import React, { useRef } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { Content } from '@/lib/supabase'
import { ContentCard } from './ContentCard'
import { useIsMobile } from '@/hooks/use-mobile'

interface ContentRowProps {
  title: string
  content: Content[]
  priority?: boolean
}

export function ContentRow({ title, content, priority }: ContentRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -800,
        behavior: 'smooth'
      })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 800,
        behavior: 'smooth'
      })
    }
  }

  if (!content || content.length === 0) {
    return null
  }

  return (
    <div className="my-4">
      <h2 className="text-2xl font-bold text-white mb-4 px-4 sm:px-6 lg:px-8">{title}</h2>
      
      <div className="relative group">
        {/* Scroll Left Button */}
        {!isMobile && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white p-2 rounded-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
        )}

        {/* Content Scroll Container */}
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth px-4 sm:px-6 lg:px-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {content.map((item) => (
            <ContentCard
              key={item.id}
              content={item}
              priority={priority}
            />
          ))}
        </div>

        {/* Scroll Right Button */}
        {!isMobile && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white p-2 rounded-l opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        )}
      </div>
    </div>
  )
}
import React, { useEffect, useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { 
  PlayIcon, 
  PauseIcon, 
  SpeakerWaveIcon, 
  SpeakerXMarkIcon,
  ArrowLeftIcon,
  PlusIcon,
  MinusIcon
} from '@heroicons/react/24/solid'
import { supabase, Content } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export function Watch() {
  const { type, slug } = useParams<{ type: string; slug: string }>()
  const { user } = useAuth()
  const queryClient = useQueryClient()
  
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0.8)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showControls, setShowControls] = useState(true)

  // Handle video events
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setProgress(videoRef.current.currentTime / videoRef.current.duration || 0)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handlePlay = () => setIsPlaying(true)
  const handlePause = () => setIsPlaying(false)

  const handleEnded = () => {
    setIsPlaying(false)
    if (content && videoRef.current) {
      updateProgressMutation.mutate({
        progressSeconds: Math.floor(videoRef.current.duration),
        completed: true
      })
    }
  }

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
    }
  }

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
    }
  }

  const handleMuteToggle = () => {
    setIsMuted(!isMuted)
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
    }
  }

  const [isInWatchlist, setIsInWatchlist] = useState(false)

  // Fetch content details
  const { data: content, isLoading } = useQuery({
    queryKey: ['content', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('slug', slug)
        .eq('content_type', type)
        .maybeSingle()

      if (error) throw error
      if (!data) throw new Error('Content not found')

      return data as Content
    },
    enabled: !!slug && !!type
  })

  // Check if content is in watchlist
  useQuery({
    queryKey: ['watchlist-status', content?.id],
    queryFn: async () => {
      if (!user || !content) return false

      const { data } = await supabase
        .from('user_watchlist')
        .select('id')
        .eq('user_id', user.id)
        .eq('content_id', content.id)
        .maybeSingle()

      const inWatchlist = !!data
      setIsInWatchlist(inWatchlist)
      return inWatchlist
    },
    enabled: !!user && !!content
  })

  // Update progress mutation
  const updateProgressMutation = useMutation({
    mutationFn: async ({ progressSeconds, completed }: { progressSeconds: number; completed?: boolean }) => {
      if (!user || !content) throw new Error('Missing user or content')

      const { data, error } = await supabase.functions.invoke('update-progress', {
        body: {
          contentId: content.id,
          progressSeconds,
          completed: completed || false
        }
      })

      if (error) throw error
      return data
    }
  })

  // Watchlist mutation
  const watchlistMutation = useMutation({
    mutationFn: async (action: 'add' | 'remove') => {
      if (!user || !content) throw new Error('Missing user or content')

      const { data, error } = await supabase.functions.invoke('manage-watchlist', {
        body: {
          action,
          contentId: content.id
        }
      })

      if (error) throw error
      return data
    },
    onSuccess: (_, action) => {
      setIsInWatchlist(action === 'add')
      queryClient.invalidateQueries({ queryKey: ['watchlist-status', content?.id] })
    }
  })

  // Auto-hide controls
  useEffect(() => {
    let timeout: NodeJS.Timeout
    
    if (showControls && isPlaying) {
      timeout = setTimeout(() => {
        setShowControls(false)
      }, 3000)
    }

    return () => clearTimeout(timeout)
  }, [showControls, isPlaying])

  // Save progress periodically
  useEffect(() => {
    if (progress > 0 && duration > 0 && content) {
      const progressSeconds = Math.floor(progress * duration)
      updateProgressMutation.mutate({ progressSeconds })
    }
  }, [Math.floor(progress * 10)]) // Update every 10% of progress

  const handleWatchlistToggle = () => {
    watchlistMutation.mutate(isInWatchlist ? 'remove' : 'add')
  }

  const handleMouseMove = () => {
    setShowControls(true)
  }

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)
    
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Content Not Found</h1>
          <Link to="/" className="text-red-600 hover:text-red-500">
            Return to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="min-h-screen bg-black relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Video Player */}
      <div className="relative w-full h-screen">
        <video
          ref={videoRef}
          src={content.video_url || 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4'}
          className="w-full h-full object-cover"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onPlay={handlePlay}
          onPause={handlePause}
          onEnded={handleEnded}
          poster={content.poster_url || content.thumbnail_url}
        />

        {/* Controls Overlay */}
        <div 
          className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/50 transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Top Controls */}
          <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center space-x-2 bg-black/50 hover:bg-black/70 px-4 py-2 rounded-md transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5 text-white" />
              <span className="text-white font-medium">Back</span>
            </Link>

            <button
              onClick={handleWatchlistToggle}
              disabled={watchlistMutation.isPending}
              className="flex items-center space-x-2 bg-black/50 hover:bg-black/70 px-4 py-2 rounded-md transition-colors"
            >
              {isInWatchlist ? (
                <>
                  <MinusIcon className="h-5 w-5 text-white" />
                  <span className="text-white font-medium">Remove from List</span>
                </>
              ) : (
                <>
                  <PlusIcon className="h-5 w-5 text-white" />
                  <span className="text-white font-medium">Add to List</span>
                </>
              )}
            </button>
          </div>

          {/* Center Play/Pause Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={togglePlayPause}
              className="bg-black/50 hover:bg-black/70 p-6 rounded-full transition-colors"
            >
              {isPlaying ? (
                <PauseIcon className="h-12 w-12 text-white" />
              ) : (
                <PlayIcon className="h-12 w-12 text-white" />
              )}
            </button>
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-white mb-2">{content.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-300">
                <span>{content.release_year}</span>
                <span>{content.quality}</span>
                {content.imdb_rating && (
                  <span>⭐ {content.imdb_rating}</span>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="w-full bg-gray-600 rounded-full h-1">
                <div 
                  className="bg-red-600 h-1 rounded-full transition-all duration-300"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>{formatTime(progress * duration)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={togglePlayPause}
                  className="bg-white text-black p-2 rounded-full hover:bg-gray-200 transition-colors"
                >
                  {isPlaying ? (
                    <PauseIcon className="h-5 w-5" />
                  ) : (
                    <PlayIcon className="h-5 w-5" />
                  )}
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleMuteToggle}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  {isMuted ? (
                    <SpeakerXMarkIcon className="h-6 w-6" />
                  ) : (
                    <SpeakerWaveIcon className="h-6 w-6" />
                  )}
                </button>
                
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.1}
                  value={volume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className="w-20 accent-red-600"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
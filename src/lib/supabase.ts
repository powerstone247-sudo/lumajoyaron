import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ojvqvbwnifhvvvzrnhvj.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qdnF2YnduaWZodnZ2enJuaHZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4MTA2NDQsImV4cCI6MjA3MjM4NjY0NH0.ao0rWumSxpZhuZhfx3Ir23SLfO4lSYQsKFwHS9rXnxc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface Content {
  id: number
  title: string
  slug: string
  description: string
  content_type: 'movie' | 'series'
  release_year?: number
  duration_minutes?: number
  rating?: string
  quality?: string
  thumbnail_url?: string
  poster_url?: string
  trailer_url?: string
  video_url?: string
  imdb_rating?: number
  is_featured: boolean
  is_trending: boolean
  view_count: number
  created_at: string
  updated_at: string
  genres?: string[]
}

export interface Genre {
  id: number
  name: string
  slug: string
  description?: string
  created_at: string
}

export interface Profile {
  id: string
  username?: string
  full_name?: string
  avatar_url?: string
  subscription_type: 'free' | 'premium'
  is_admin: boolean
  created_at: string
  updated_at: string
}

export interface WatchHistory {
  id: number
  user_id: string
  content_id: number
  episode_id?: number
  progress_seconds: number
  completed: boolean
  last_watched: string
}

export interface WatchlistItem {
  id: number
  user_id: string
  content_id: number
  added_at: string
}
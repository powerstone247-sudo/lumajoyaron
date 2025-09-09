import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

const supabaseUrl = 'https://anjnakascphvuxlygden.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFuam5ha2FzY3BodnV4bHlnZGVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MTg0ODcsImV4cCI6MjA3Mjk5NDQ4N30.c72Zoy8OEj52NZe9_rFpWbHoK1RUiwRccbHs_HJgwlw'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Export types for convenience
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']

// Specific table types
export type Movie = Tables<'movies'>
export type UserProfile = Tables<'user_profiles'>
export type MovieRating = Tables<'movie_ratings'>
export type MovieReview = Tables<'movie_reviews'>
export type Watchlist = Tables<'watchlist'>
export type ViewingHistory = Tables<'viewing_history'>
export type BlogPost = Tables<'blog_posts'>

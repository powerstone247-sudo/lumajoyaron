export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  __InternalSupabase: {
    PostgrestVersion: '12.2.3 (519615d)';
  };
  public: {
    Tables: {
      affiliates: {
        Row: {
          created_at: string | null
          id: string
          paid_earnings: number | null
          pending_earnings: number | null
          referral_code: string
          status: string | null
          total_earnings: number | null
          total_referrals: number | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          paid_earnings?: number | null
          pending_earnings?: number | null
          referral_code: string
          status?: string | null
          total_earnings?: number | null
          total_referrals?: number | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          paid_earnings?: number | null
          pending_earnings?: number | null
          referral_code?: string
          status?: string | null
          total_earnings?: number | null
          total_referrals?: number | null
          user_id?: string
        }
      }
      blog_posts: {
        Row: {
          author_id: string | null
          category: string | null
          content: string
          created_at: string | null
          excerpt: string | null
          id: string
          slug: string
          thumbnail: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          category?: string | null
          content: string
          created_at?: string | null
          excerpt?: string | null
          id?: string
          slug: string
          thumbnail?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          category?: string | null
          content?: string
          created_at?: string | null
          excerpt?: string | null
          id?: string
          slug?: string
          thumbnail?: string | null
          title?: string
          updated_at?: string | null
        }
      }
      movies: {
        Row: {
          category: string | null
          created_at: string | null
          description: string
          duration: string | null
          id: string
          is_premium: boolean | null
          price: number | null
          release_date: string | null
          thumbnail_url: string | null
          title: string
          video_url: string | null
          view_count: number | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description: string
          duration?: string | null
          id?: string
          is_premium?: boolean | null
          price?: number | null
          release_date?: string | null
          thumbnail_url?: string | null
          title: string
          video_url?: string | null
          view_count?: number | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string
          duration?: string | null
          id?: string
          is_premium?: boolean | null
          price?: number | null
          release_date?: string | null
          thumbnail_url?: string | null
          title?: string
          video_url?: string | null
          view_count?: number | null
        }
      }
      movie_genres: {
        Row: {
          id: string
          movie_id: string
          genre: string
        }
        Insert: {
          id?: string
          movie_id: string
          genre: string
        }
        Update: {
          id?: string
          movie_id?: string
          genre?: string
        }
      }
      movie_ratings: {
        Row: {
          id: string
          movie_id: string
          user_id: string
          rating: number
          created_at: string | null
        }
        Insert: {
          id?: string
          movie_id: string
          user_id: string
          rating: number
          created_at?: string | null
        }
        Update: {
          id?: string
          movie_id?: string
          user_id?: string
          rating?: number
          created_at?: string | null
        }
      }
      movie_reviews: {
        Row: {
          id: string
          movie_id: string
          user_id: string
          review_text: string
          is_spoiler: boolean | null
          helpful_count: number | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          movie_id: string
          user_id: string
          review_text: string
          is_spoiler?: boolean | null
          helpful_count?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          movie_id?: string
          user_id?: string
          review_text?: string
          is_spoiler?: boolean | null
          helpful_count?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      user_profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          subscription_status: string | null
          subscription_ends_at: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          subscription_status?: string | null
          subscription_ends_at?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          subscription_status?: string | null
          subscription_ends_at?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      watchlist: {
        Row: {
          id: string
          user_id: string
          movie_id: string
          added_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          movie_id: string
          added_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          movie_id?: string
          added_at?: string | null
        }
      }
      viewing_history: {
        Row: {
          id: string
          user_id: string
          movie_id: string
          progress_seconds: number | null
          completed: boolean | null
          last_watched_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          movie_id: string
          progress_seconds?: number | null
          completed?: boolean | null
          last_watched_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          movie_id?: string
          progress_seconds?: number | null
          completed?: boolean | null
          last_watched_at?: string | null
        }
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          expiry_date: string | null
          id: string
          method: string | null
          movie_id: string
          purchase_date: string | null
          status: string | null
          transaction_ref: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          expiry_date?: string | null
          id?: string
          method?: string | null
          movie_id: string
          purchase_date?: string | null
          status?: string | null
          transaction_ref?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          expiry_date?: string | null
          id?: string
          method?: string | null
          movie_id?: string
          purchase_date?: string | null
          status?: string | null
          transaction_ref?: string | null
          user_id?: string
        }
      }
      rentals: {
        Row: {
          created_at: string | null
          expiry_date: string
          id: string
          movie_id: string
          purchase_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          expiry_date: string
          id?: string
          movie_id: string
          purchase_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          expiry_date?: string
          id?: string
          movie_id?: string
          purchase_at?: string | null
          user_id?: string
        }
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          is_verified: boolean | null
          password_hash: string
          phone_number: string | null
          referral_code: string | null
          referred_by: string | null
          role: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name?: string | null
          id?: string
          is_verified?: boolean | null
          password_hash: string
          phone_number?: string | null
          referral_code?: string | null
          referred_by?: string | null
          role?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          is_verified?: boolean | null
          password_hash?: string
          phone_number?: string | null
          referral_code?: string | null
          referred_by?: string | null
          role?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase, TablesInsert } from '@/lib/supabase'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error?: any }>
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error?: any }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  // Load user on mount (one-time check)
  useEffect(() => {
    async function loadUser() {
      setLoading(true)
      try {
        const { data: { user }, error } = await supabase.auth.getUser()
        if (error) {
          console.error('Error getting user:', error)
          setUser(null)
        } else {
          setUser(user)
        }
        
        const { data: { session } } = await supabase.auth.getSession()
        setSession(session)
      } catch (error) {
        console.error('Auth initialization error:', error)
      } finally {
        setLoading(false)
      }
    }
    loadUser()

    // Set up auth listener - KEEP SIMPLE, avoid any async operations in callback
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        // NEVER use any async operations in callback
        setUser(session?.user || null)
        setSession(session)
        if (!session) {
          setLoading(false)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  // Auth methods
  async function signIn(email: string, password: string) {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      return { error }
    } catch (error) {
      return { error }
    }
  }

  async function signUp(email: string, password: string, fullName?: string) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName || ''
          },
          emailRedirectTo: `${window.location.protocol}//${window.location.host}/auth/callback`
        }
      })

      // If signup successful and user is confirmed, create profile
      if (!error && data.user && data.user.email_confirmed_at) {
        await createUserProfile(data.user.id, fullName)
      }

      return { error }
    } catch (error) {
      return { error }
    }
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error signing out:', error)
    }
  }

  async function createUserProfile(userId: string, fullName?: string) {
    try {
      const userProfile: TablesInsert<'user_profiles'> = {
        id: userId,
        full_name: fullName || '',
        subscription_status: 'free'
      }
      const { error } = await supabase
        .from('user_profiles')
        // TODO: Remove `as any` once the Supabase type generation issue is resolved.
        // The build environment is currently unable to correctly infer the types
        // for the insert method, causing the build to fail. This is a temporary
        // workaround to unblock the build.
        .insert(userProfile as any)
      
      if (error) {
        console.error('Error creating user profile:', error)
      }
    } catch (error) {
      console.error('Error creating user profile:', error)
    }
  }

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

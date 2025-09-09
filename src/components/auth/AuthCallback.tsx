import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export function AuthCallback() {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function handleAuthCallback() {
      try {
        // Get the hash fragment from the URL
        const hashFragment = window.location.hash

        if (hashFragment && hashFragment.length > 0) {
          // Exchange the auth code for a session
          const { data, error } = await supabase.auth.exchangeCodeForSession(hashFragment)

          if (error) {
            console.error('Error exchanging code for session:', error.message)
            setError(error.message)
            setTimeout(() => {
              navigate('/login?error=' + encodeURIComponent(error.message))
            }, 3000)
            return
          }

          if (data.session) {
            // Successfully signed in, redirect to dashboard
            navigate('/dashboard')
            return
          }
        }

        // If we get here, something went wrong
        setError('No session found')
        setTimeout(() => {
          navigate('/login?error=No session found')
        }, 3000)
      } catch (err) {
        console.error('Auth callback error:', err)
        setError('Authentication failed')
        setTimeout(() => {
          navigate('/login?error=Authentication failed')
        }, 3000)
      } finally {
        setLoading(false)
      }
    }

    handleAuthCallback()
  }, [navigate])

  return (
    <div className="min-h-screen bg-streaming-dark flex items-center justify-center">
      <div className="text-center">
        {loading && (
          <>
            <LoadingSpinner size="lg" className="mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Completing sign up...</h2>
            <p className="text-gray-400">Please wait while we set up your account.</p>
          </>
        )}
        
        {error && (
          <>
            <div className="text-red-500 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Authentication Error</h2>
            <p className="text-gray-400 mb-4">{error}</p>
            <p className="text-sm text-gray-500">Redirecting to login page...</p>
          </>
        )}
      </div>
    </div>
  )
}

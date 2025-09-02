import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { UserIcon, CameraIcon } from '@heroicons/react/24/outline'

export function Profile() {
  const { user, profile, updateProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    username: profile?.username || ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setLoading(true)

    try {
      const { error } = await updateProfile(formData)
      if (error) {
        setError(error.message)
      } else {
        setSuccess(true)
        setIsEditing(false)
        setTimeout(() => setSuccess(false), 3000)
      }
    } catch (error) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      full_name: profile?.full_name || '',
      username: profile?.username || ''
    })
    setIsEditing(false)
    setError(null)
  }

  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black pt-8 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">My Profile</h1>
          <p className="text-gray-400">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-lg p-6 text-center">
              <div className="relative inline-block mb-4">
                {profile.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center">
                    <UserIcon className="h-12 w-12 text-gray-400" />
                  </div>
                )}
                <button className="absolute bottom-0 right-0 bg-red-600 p-2 rounded-full text-white hover:bg-red-700 transition-colors">
                  <CameraIcon className="h-4 w-4" />
                </button>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-1">
                {profile.full_name || 'Anonymous User'}
              </h3>
              <p className="text-gray-400 mb-2">@{profile.username || 'username'}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
              
              <div className="mt-4 p-3 bg-gray-800 rounded-lg">
                <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                  Subscription
                </div>
                <div className="flex items-center justify-center">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    profile.subscription_type === 'premium'
                      ? 'bg-gold-100 text-gold-800'
                      : 'bg-gray-700 text-gray-300'
                  }`}>
                    {profile.subscription_type.toUpperCase()}
                  </span>
                </div>
              </div>

              {profile.is_admin && (
                <div className="mt-3 p-3 bg-red-900/20 border border-red-800 rounded-lg">
                  <div className="text-xs text-red-400 uppercase tracking-wide">
                    Administrator
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Account Information</h2>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                  >
                    Edit Profile
                  </button>
                )}
              </div>

              {success && (
                <div className="mb-4 p-4 bg-green-900/20 border border-green-800 text-green-400 rounded-lg">
                  Profile updated successfully!
                </div>
              )}

              {error && (
                <div className="mb-4 p-4 bg-red-900/20 border border-red-800 text-red-400 rounded-lg">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.full_name}
                        onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                        className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Enter your full name"
                      />
                    ) : (
                      <div className="w-full bg-gray-800 px-3 py-2 rounded-md text-gray-300">
                        {profile.full_name || 'Not set'}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Username
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.username}
                        onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                        className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Enter your username"
                      />
                    ) : (
                      <div className="w-full bg-gray-800 px-3 py-2 rounded-md text-gray-300">
                        {profile.username || 'Not set'}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="w-full bg-gray-800 px-3 py-2 rounded-md text-gray-500">
                    {user.email} (cannot be changed)
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Account Created
                  </label>
                  <div className="w-full bg-gray-800 px-3 py-2 rounded-md text-gray-500">
                    {new Date(profile.created_at).toLocaleDateString()}
                  </div>
                </div>

                {isEditing && (
                  <div className="flex items-center space-x-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
                    >
                      {loading ? <LoadingSpinner size="sm" /> : 'Save Changes'}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-500 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </form>
            </div>

            {/* Account Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-gray-900 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-white mb-1">0</div>
                <div className="text-sm text-gray-400">Movies Watched</div>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-white mb-1">0</div>
                <div className="text-sm text-gray-400">Series Watched</div>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-white mb-1">0</div>
                <div className="text-sm text-gray-400">In Watchlist</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
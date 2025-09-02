import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  HomeIcon, 
  FilmIcon, 
  MagnifyingGlassIcon, 
  UserIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline'
import { useAuth } from '@/contexts/AuthContext'
import { cn } from '@/lib/utils'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const { user, profile, signOut } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const navigation = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Browse', href: '/browse', icon: FilmIcon },
    { name: 'Search', href: '/search', icon: MagnifyingGlassIcon },
  ]

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-blue-900">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img src="/logo.png" alt="Lumajoyaron Logo" className="h-8 w-8" />
              <div className="text-blue-500 text-2xl font-bold [text-shadow:0_0_10px_rgba(59,130,246,0.8)]">
                Lumajoyaron
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href || 
                  (item.href === '/browse' && location.pathname.startsWith('/browse'))
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      'flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-blue-900 hover:text-white'
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-300">
                Welcome, {profile?.full_name || user?.email}
              </div>
              <Link
                to="/profile"
                className={cn(
                  'flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  location.pathname === '/profile'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-blue-900 hover:text-white'
                )}
              >
                <UserIcon className="h-5 w-5" />
                <span className="hidden sm:block">Profile</span>
              </Link>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-blue-900 hover:text-white transition-colors"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                <span className="hidden sm:block">Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-blue-900">
          <nav className="flex justify-around py-2">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href || 
                (item.href === '/browse' && location.pathname.startsWith('/browse'))
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'flex flex-col items-center py-2 px-3 rounded-md transition-colors',
                    isActive
                      ? 'text-blue-500'
                      : 'text-gray-400 hover:text-white'
                  )}
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-xs mt-1">{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 md:pt-16">
        {children}
      </main>
    </div>
  )
}
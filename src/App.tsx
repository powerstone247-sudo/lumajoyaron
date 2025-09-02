import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import { Layout } from '@/components/Layout'
import { Home } from '@/pages/Home'
import { Browse } from '@/pages/Browse'
import { Search } from '@/pages/Search'
import { Watch } from '@/pages/Watch'
import { Profile } from '@/pages/Profile'
import { Auth } from '@/pages/Auth'
import { useAuth } from '@/contexts/AuthContext'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
})

function AppRoutes() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!user) {
    return <Auth />
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/browse/:genre" element={<Browse />} />
        <Route path="/search" element={<Search />} />
        <Route path="/watch/:type/:slug" element={<Watch />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="App bg-black text-white min-h-screen">
            <AppRoutes />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  )
}
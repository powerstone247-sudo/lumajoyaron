import React from 'react'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { ChevronRight, Calendar, User, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { formatDate } from '@/lib/utils'

interface BlogPost {
  id: string
  title: string
  excerpt: string | null
  category: string | null
  created_at: string | null
  slug: string
  thumbnail: string | null
}

export function RecentBlog() {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['recent-blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, excerpt, category, created_at, slug, thumbnail')
        .order('created_at', { ascending: false })
        .limit(3)

      if (error) throw error
      return data as BlogPost[]
    },
  })

  if (error) {
    return null // Silently fail for blog section
  }

  return (
    <section className="py-16 bg-streaming-dark relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(60deg, transparent 40%, rgba(139, 92, 246, 0.1) 50%, transparent 60%),
            linear-gradient(-60deg, transparent 40%, rgba(59, 130, 246, 0.1) 50%, transparent 60%)
          `,
          backgroundSize: '80px 80px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <h2 className="section-header text-gradient">Latest News</h2>
            <p className="text-gray-400 text-lg">Stay updated with our latest stories and behind-the-scenes content</p>
          </div>
          <Link
            to="/blog"
            className="hidden sm:flex items-center space-x-2 text-secondary-400 hover:text-secondary-300 font-medium transition-colors group"
          >
            <span>View All Posts</span>
            <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {/* Blog Posts */}
        {posts && posts.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <Link to={`/blog/${post.slug}`} className="block">
                    {/* Article Image */}
                    <div className="relative overflow-hidden rounded-xl mb-6 aspect-video bg-gray-800">
                      {post.thumbnail ? (
                        <img
                          src={post.thumbnail}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-secondary-600 to-accent-600 flex items-center justify-center">
                          <User className="h-12 w-12 text-white/60" />
                        </div>
                      )}
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Read More Icon */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                          <ArrowUpRight className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      
                      {/* Category Badge */}
                      {post.category && (
                        <div className="absolute bottom-4 left-4">
                          <span className="genre-badge text-xs">
                            {post.category}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Article Content */}
                    <div className="space-y-3">
                      {/* Meta Info */}
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {post.created_at ? formatDate(post.created_at) : 'Recent'}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>Lumajoyaron Team</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-semibold text-white group-hover:text-secondary-400 transition-colors duration-300 line-clamp-2">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      {post.excerpt && (
                        <p className="text-gray-400 line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>
                      )}

                      {/* Read More */}
                      <div className="flex items-center space-x-2 text-secondary-400 group-hover:text-secondary-300 transition-colors duration-300">
                        <span className="text-sm font-medium">Read More</span>
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>

            {/* Mobile View All Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex justify-center mt-12 sm:hidden"
            >
              <Link
                to="/blog"
                className="btn-secondary flex items-center space-x-2"
              >
                <span>View All Posts</span>
                <ChevronRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </>
        )}

        {/* Empty State */}
        {posts && posts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <User className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No posts yet</h3>
            <p className="text-gray-500">Check back soon for the latest news and updates.</p>
          </motion.div>
        )}
      </div>
    </section>
  )
}

import { notFound } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { BlogCard } from "@/components/blog-card"
import { getPostsBySeries, getSeriesWithPosts } from "@/lib/blog-utils"
import { BLOG_SERIES } from "@/lib/blogData"
import { getContactContent } from "@/lib/profile-utils"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, Target, Users } from "lucide-react"
import type { Metadata } from "next"

interface SeriesPageParams {
  params: {
    seriesId: string
  }
}

export async function generateMetadata({ params }: SeriesPageParams): Promise<Metadata> {
  const series = BLOG_SERIES.find(s => s.id === params.seriesId)
  
  if (!series) {
    return {
      title: "Series Not Found",
      description: "The requested blog series could not be found.",
    }
  }

  return {
    title: `${series.title} Series | VUHUY AI Blog`,
    description: series.description,
  }
}

export async function generateStaticParams() {
  return BLOG_SERIES.map((series) => ({
    seriesId: series.id,
  }))
}

export default async function SeriesPage({ params }: SeriesPageParams) {
  const series = BLOG_SERIES.find(s => s.id === params.seriesId)
  
  if (!series) {
    notFound()
  }

  const posts = await getPostsBySeries(params.seriesId)
  const contactData = await getContactContent()

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 to-indigo-900 text-white py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="tech-pattern absolute inset-0 opacity-10"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <span className="text-6xl">{series.icon}</span>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold">{series.title}</h1>
                <Badge className={`mt-2 ${getLevelColor(series.level)}`}>
                  {series.level}
                </Badge>
              </div>
            </div>
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed mb-8">
              {series.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>{posts.length} Lessons</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>{series.estimatedDuration}</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Target className="h-5 w-5" />
                <span>{series.level} Level</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="flex-grow bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length > 0 ? (
            <>
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-center mb-4 dark:text-white">
                  Course Curriculum
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Follow this structured learning path to master {series.title.toLowerCase()}. 
                  Each lesson builds upon the previous one.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, index) => (
                  <div key={post.slug} className="relative">
                    <div className="absolute -top-3 -left-3 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold z-10">
                      {index + 1}
                    </div>
                    <BlogCard post={post} index={index} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <span className="text-6xl mb-4 block">{series.icon}</span>
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Coming Soon
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  We're working hard to create amazing content for the {series.title} series. 
                  Stay tuned for updates!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer contactInfo={contactData.contactInfo} socialLinks={contactData.socialLinks} />
    </main>
  )
}
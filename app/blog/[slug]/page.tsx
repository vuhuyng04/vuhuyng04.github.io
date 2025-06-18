import { notFound } from "next/navigation"
import Image from "next/image"
import { formatDate } from "@/lib/date-utils"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { getPostBySlug, getAllPosts, getSeriesNavigation, getPostsBySeries } from "@/lib/blog-utils"
import SeriesNavigation from "@/components/series-navigation"
import MathRenderer from "@/components/math-renderer"
import type { Metadata } from "next"
import { getContactContent } from "@/lib/profile-utils"
import { Badge } from "@/components/ui/badge"
import { Clock, BookOpen, Target, AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface BlogPostParams {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostParams): Promise<Metadata> {
  const decodedSlug = decodeURIComponent(params.slug);
  const post = await getPostBySlug(decodedSlug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${post.title} | VUHUY AI Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author?.name || "VUHUY AI"],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: encodeURIComponent(post.slug),
  }));
}

export default async function BlogPost({ params }: BlogPostParams) {
  const decodedSlug = decodeURIComponent(params.slug);
  const post = await getPostBySlug(decodedSlug);
  const contactData = await getContactContent()

  if (!post) {
    notFound();
  }

  const { previous, next, seriesInfo } = await getSeriesNavigation(post)
  const allSeriesPosts = post.series ? await getPostsBySeries(post.series) : []

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
      <article className="flex-grow pt-24 pb-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Article Header */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge className={getLevelColor(post.level)}>
                  {post.level}
                </Badge>
                {post.series && (
                  <Badge variant="outline">
                    {seriesInfo?.title} Series
                  </Badge>
                )}
                {post.mathFormulas && (
                  <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                    Math Formulas
                  </Badge>
                )}
                {post.codeExamples && (
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    Code Examples
                  </Badge>
                )}
              </div>

              <h1 className="text-4xl font-bold mb-4 dark:text-white">{post.title}</h1>
              
              <div className="flex items-center text-gray-600 dark:text-gray-400 mb-6">
                <time dateTime={post.date}>{formatDate(new Date(post.date), "MMMM d, yyyy")}</time>
                <span className="mx-2">•</span>
                <Clock className="h-4 w-4 mr-1" />
                <span>{post.readingTime} min read</span>
                <span className="mx-2">•</span>
                <span>{post.level} level</span>
              </div>

              {/* Prerequisites */}
              {post.prerequisites && post.prerequisites.length > 0 && (
                <Card className="mb-6 border-orange-200 dark:border-orange-800">
                  <CardContent className="pt-4">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">
                          Prerequisites
                        </h3>
                        <ul className="text-sm text-orange-700 dark:text-orange-300 space-y-1">
                          {post.prerequisites.map((prereq, index) => (
                            <li key={index}>• {prereq}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {post.coverImage && (
                <div className="relative h-[400px] w-full mb-8 rounded-lg overflow-hidden shadow-lg">
                  <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                </div>
              )}

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-3">
                {post.mathFormulas ? (
                  <MathRenderer content={post.content} />
                ) : (
                  <div
                    className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-blue-600"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                )}

                {/* Author Info */}
                <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Image
                        className="h-12 w-12 rounded-full object-cover"
                        src={post.author?.image || "/placeholder.svg?height=48&width=48"}
                        alt={post.author?.name || "Author"}
                        width={48}
                        height={48}
                      />
                    </div>
                    <div className="ml-4">
                      <p className="text-lg font-medium text-gray-900 dark:text-white">
                        {post.author?.name || "VUHUY AI"}
                      </p>
                      <div className="text-gray-600 dark:text-gray-400">
                        <p>AI Researcher & Data Science Educator</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {seriesInfo && (
                    <SeriesNavigation
                      currentPost={post}
                      previous={previous}
                      next={next}
                      seriesInfo={seriesInfo}
                      allSeriesPosts={allSeriesPosts}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
      <Footer contactInfo={contactData.contactInfo} socialLinks={contactData.socialLinks} />
    </main>
  )
}
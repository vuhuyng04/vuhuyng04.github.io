"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { BlogCard } from "@/components/blog-card"
import BlogSeriesGrid from "@/components/blog-series-grid"
import { Post, BlogSeries } from "@/lib/blogData"
import { useTheme } from "next-themes"
import { Input } from "@/components/ui/input"
import { Search, Filter, Calendar, Tag, User, BookOpen, Target as TargetIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface BlogClientPageProps {
  posts: Post[];
  series: BlogSeries[];
}

export default function BlogClientPage({ posts, series }: BlogClientPageProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Typing effect state
  const [text, setText] = useState("")
  const fullText = "Data & AI Learning Hub"
  const [showCursor, setShowCursor] = useState(true)
  const [isComplete, setIsComplete] = useState(false)
  const [isRestarting, setIsRestarting] = useState(false)

  // Filter and pagination state
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSeries, setSelectedSeries] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [selectedTag, setSelectedTag] = useState("all")
  const [sortBy, setSortBy] = useState("date-desc")
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 9

  // Extract categories and tags from posts
  const allSeries = Array.from(new Set(posts.map(post => post.series).filter(Boolean)))
  const allLevels = Array.from(new Set(posts.map(post => post.level)))
  const allTags = Array.from(new Set(posts.flatMap(post => post.tags || []))).sort()

  // Filter posts based on search and filters
  const filteredPosts = posts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))

    const matchesSeries = selectedSeries === "all" || post.series === selectedSeries
    const matchesLevel = selectedLevel === "all" || post.level === selectedLevel
    const matchesTag = selectedTag === "all" || 
      (post.tags && post.tags.includes(selectedTag))

    return matchesSearch && matchesSeries && matchesLevel && matchesTag
  })

  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case "date-desc":
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case "date-asc":
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      case "title-asc":
        return a.title.localeCompare(b.title)
      case "title-desc":
        return b.title.localeCompare(a.title)
      case "reading-time":
        return a.readingTime - b.readingTime
      case "level":
        const levelOrder = { beginner: 1, intermediate: 2, advanced: 3 }
        return levelOrder[a.level as keyof typeof levelOrder] - levelOrder[b.level as keyof typeof levelOrder]
      default:
        return 0
    }
  })

  // Pagination
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const paginatedPosts = sortedPosts.slice(startIndex, startIndex + postsPerPage)

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedSeries, selectedLevel, selectedTag, sortBy])

  // Typing effect
  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (isRestarting) {
      setText("")
      setIsRestarting(false)
      return
    }

    if (text.length < fullText.length) {
      timeout = setTimeout(() => {
        setText(fullText.slice(0, text.length + 1))
        if (text.length + 1 === fullText.length) {
          setIsComplete(true)
          setTimeout(() => {
            setIsRestarting(true)
            setIsComplete(false)
          }, 3000)
        }
      }, 150)
    }

    return () => clearTimeout(timeout)
  }, [text, isRestarting])

  // Cursor blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedSeries("all")
    setSelectedLevel("all")
    setSelectedTag("all")
    setSortBy("date-desc")
    setCurrentPage(1)
  }

  return (
    <div className="flex-grow">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 to-indigo-900 text-white py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100&text=+')] opacity-5"></div>
          <div className="tech-pattern absolute inset-0 opacity-10"></div>
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-500 rounded-full filter blur-3xl opacity-10 animate-blob"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-indigo-500 rounded-full filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {text}
              <span className={`${showCursor ? "opacity-100" : "opacity-0"} transition-opacity duration-100`}>|</span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: isComplete ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl md:text-2xl text-blue-100 leading-relaxed mb-8"
            >
              Master Data Science, Machine Learning, and AI through structured learning paths
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isComplete ? 1 : 0, y: isComplete ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-200 mb-1">{series.length}</div>
                <div className="text-blue-100 text-sm">Learning Series</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-200 mb-1">{posts.length}</div>
                <div className="text-blue-100 text-sm">Lessons</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-200 mb-1">{allTags.length}</div>
                <div className="text-blue-100 text-sm">Topics</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-200 mb-1">
                  {Math.round(posts.reduce((acc, post) => acc + post.readingTime, 0) / 60)}h
                </div>
                <div className="text-blue-100 text-sm">Content</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Tabs defaultValue="series" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="series" className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span>Learning Series</span>
            </TabsTrigger>
            <TabsTrigger value="posts" className="flex items-center space-x-2">
              <Search className="h-4 w-4" />
              <span>All Posts</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="series">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-center mb-4 dark:text-white">
                Structured Learning Paths
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
                Follow our carefully designed series to build expertise step by step. 
                Each series is crafted to take you from basics to advanced concepts.
              </p>
            </div>
            <BlogSeriesGrid series={series} />
          </TabsContent>

          <TabsContent value="posts">
            {/* Filters and Search */}
            <div className="mb-12 space-y-6">
              {/* Search Bar */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search posts..."
                  className="pl-10 pr-4 py-2 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Filter Controls */}
              <div className="flex flex-wrap gap-4 items-center justify-center">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-gray-500" />
                  <Select value={selectedSeries} onValueChange={setSelectedSeries}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Series" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Series</SelectItem>
                      {allSeries.map((seriesId) => {
                        const seriesInfo = series.find(s => s.id === seriesId)
                        return (
                          <SelectItem key={seriesId} value={seriesId}>
                            {seriesInfo?.title || seriesId}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <TargetIcon className="h-4 w-4 text-gray-500" />
                  <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      {allLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level.charAt(0).toUpperCase() + level.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Tag className="h-4 w-4 text-gray-500" />
                  <Select value={selectedTag} onValueChange={setSelectedTag}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Tag" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Tags</SelectItem>
                      {allTags.map((tag) => (
                        <SelectItem key={tag} value={tag}>
                          {tag}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date-desc">Newest First</SelectItem>
                      <SelectItem value="date-asc">Oldest First</SelectItem>
                      <SelectItem value="title-asc">Title A-Z</SelectItem>
                      <SelectItem value="title-desc">Title Z-A</SelectItem>
                      <SelectItem value="reading-time">Reading Time</SelectItem>
                      <SelectItem value="level">Difficulty Level</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="outline" onClick={clearFilters} className="flex items-center space-x-2">
                  <Filter className="h-4 w-4" />
                  <span>Clear Filters</span>
                </Button>
              </div>

              {/* Results Summary */}
              <div className="text-center text-gray-600 dark:text-gray-400">
                {filteredPosts.length === 0 ? (
                  <p>No posts found matching your criteria.</p>
                ) : (
                  <p>
                    Showing {startIndex + 1}-{Math.min(startIndex + postsPerPage, filteredPosts.length)} of {filteredPosts.length} posts
                    {searchTerm && ` for "${searchTerm}"`}
                  </p>
                )}
              </div>
            </div>

            {/* Blog Posts Grid */}
            {paginatedPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {paginatedPosts.map((post, index) => (
                  <BlogCard key={post.slug} post={post} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="max-w-md mx-auto">
                  <div className="mb-4">
                    <Search className="h-16 w-16 text-gray-300 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    No posts found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Try adjusting your search criteria or browse all posts.
                  </p>
                  <Button onClick={clearFilters}>
                    Clear All Filters
                  </Button>
                </div>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                
                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          onClick={() => setCurrentPage(page)}
                          className="w-10 h-10"
                        >
                          {page}
                        </Button>
                      )
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                      return (
                        <span key={page} className="px-2 py-2 text-gray-500">
                          ...
                        </span>
                      )
                    }
                    return null
                  })}
                </div>

                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
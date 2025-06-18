"use client"

import Link from "next/link"
import { ChevronLeft, ChevronRight, BookOpen, Clock, Target } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Post, BlogSeries } from "@/lib/blogData"

interface SeriesNavigationProps {
  currentPost: Post
  previous: Post | null
  next: Post | null
  seriesInfo: BlogSeries | null
  allSeriesPosts: Post[]
}

export default function SeriesNavigation({ 
  currentPost, 
  previous, 
  next, 
  seriesInfo, 
  allSeriesPosts 
}: SeriesNavigationProps) {
  if (!seriesInfo) return null

  const currentIndex = allSeriesPosts.findIndex(post => post.slug === currentPost.slug)
  const progress = ((currentIndex + 1) / allSeriesPosts.length) * 100

  return (
    <div className="space-y-6">
      {/* Series Info Card */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{seriesInfo.icon}</span>
              <div>
                <CardTitle className="text-lg">{seriesInfo.title}</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Part {currentIndex + 1} of {allSeriesPosts.length}
                </p>
              </div>
            </div>
            <Badge variant="outline" className={`${seriesInfo.color} text-white border-none`}>
              {seriesInfo.level}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
            {seriesInfo.description}
          </p>
          
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Series Stats */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span>{seriesInfo.estimatedDuration}</span>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4 text-gray-500" />
              <span>{allSeriesPosts.length} lessons</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Objectives */}
      {currentPost.learningObjectives && currentPost.learningObjectives.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Learning Objectives</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {currentPost.learningObjectives.map((objective, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-sm">{objective}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between space-x-4">
        {previous ? (
          <Link href={`/blog/${previous.slug}`} className="flex-1">
            <Button variant="outline" className="w-full justify-start">
              <ChevronLeft className="h-4 w-4 mr-2" />
              <div className="text-left">
                <div className="text-xs text-gray-500">Previous</div>
                <div className="truncate">{previous.title}</div>
              </div>
            </Button>
          </Link>
        ) : (
          <div className="flex-1" />
        )}

        {next ? (
          <Link href={`/blog/${next.slug}`} className="flex-1">
            <Button variant="outline" className="w-full justify-end">
              <div className="text-right">
                <div className="text-xs text-gray-500">Next</div>
                <div className="truncate">{next.title}</div>
              </div>
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </div>

      {/* Series Table of Contents */}
      <Card>
        <CardHeader>
          <CardTitle>Series Contents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {allSeriesPosts.map((post, index) => (
              <Link 
                key={post.slug} 
                href={`/blog/${post.slug}`}
                className={`block p-2 rounded-md transition-colors ${
                  post.slug === currentPost.slug 
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-6">
                    {index + 1}.
                  </span>
                  <span className="text-sm flex-1">{post.title}</span>
                  <Badge variant="outline" size="sm">
                    {post.level}
                  </Badge>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
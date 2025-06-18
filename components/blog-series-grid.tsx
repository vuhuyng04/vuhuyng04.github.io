"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock, Users, TrendingUp } from "lucide-react"
import { BlogSeries } from "@/lib/blogData"

interface BlogSeriesGridProps {
  series: BlogSeries[]
}

export default function BlogSeriesGrid({ series }: BlogSeriesGridProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {series.map((seriesItem) => (
        <Card key={seriesItem.id} className="group hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{seriesItem.icon}</span>
                <div>
                  <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                    {seriesItem.title}
                  </CardTitle>
                  <Badge className={getLevelColor(seriesItem.level)}>
                    {seriesItem.level}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
              {seriesItem.description}
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4 text-gray-500" />
                <span>{seriesItem.posts.length} lessons</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span>{seriesItem.estimatedDuration}</span>
              </div>
            </div>

            {seriesItem.posts.length > 0 ? (
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Latest Posts:
                </div>
                <div className="space-y-1">
                  {seriesItem.posts.slice(0, 2).map((post) => (
                    <Link 
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="block text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 truncate"
                    >
                      • {post.title}
                    </Link>
                  ))}
                  {seriesItem.posts.length > 2 && (
                    <div className="text-sm text-gray-500">
                      +{seriesItem.posts.length - 2} more lessons
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-500 italic">
                Coming soon...
              </div>
            )}

            <div className="mt-4 pt-4 border-t">
              <Link href={`/blog/series/${seriesItem.id}`}>
                <Button className="w-full" variant="outline">
                  {seriesItem.posts.length > 0 ? 'Start Learning' : 'Learn More'}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
"use client"

import Link from "next/link"
import Image from "next/image"
import { formatDate } from "@/lib/date-utils"
import { motion } from "framer-motion"
import type { Post } from "@/lib/blog-utils"

interface BlogCardProps {
  post: Post
  index?: number
}

export function BlogCard({ post, index = 0 }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="overflow-hidden flex flex-col h-full rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={post.coverImage || "/placeholder.svg?height=200&width=400"}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>

          <div className="absolute bottom-0 left-0 p-6 text-white z-10">
            <div className="flex items-center mb-2">
              <div className="text-xs font-medium bg-blue-600/90 px-2 py-1 rounded-full">
                {formatDate(new Date(post.date), "MMM d, yyyy")}
              </div>
              <div className="mx-2 text-xs">•</div>
              <div className="text-xs">{post.readingTime} min read</div>
            </div>
            <Link href={`/blog/${post.slug}`} className="no-underline">
              <h3 className="text-xl font-bold mb-2 group-hover:text-blue-300 transition-colors duration-300">
                {post.title}
              </h3>
            </Link>
          </div>
        </div>

        <div className="p-6 flex-grow">
          <p className="text-gray-700 dark:text-gray-300 line-clamp-3">{post.excerpt}</p>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
                >
                  {tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                  +{post.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="px-6 pb-6 pt-0">
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm group"
          >
            Read more
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1 transform transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

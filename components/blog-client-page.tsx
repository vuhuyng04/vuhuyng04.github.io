"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { BlogCard } from "@/components/blog-card"
import { Post } from "@/lib/blogPostsData"
import { useTheme } from "next-themes"

interface BlogClientPageProps {
  posts: Post[];
}

export default function BlogClientPage({ posts }: BlogClientPageProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Typing effect state
  const [text, setText] = useState("")
  const fullText = "Our Blog"
  const [showCursor, setShowCursor] = useState(true)
  const [isComplete, setIsComplete] = useState(false)
  const [isRestarting, setIsRestarting] = useState(false)

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
          // Schedule restart after completion
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

        {/* AI-themed background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full opacity-5">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid-blog" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke={isDark ? "#4F46E5" : "#2563EB"} strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-blog)" />
            </svg>
          </div>
        </div>

        {/* Digital circuit pattern */}
        <div className="absolute inset-0 z-0 opacity-5">
          <svg width="100%" height="100%">
            <pattern
              id="circuit-pattern-blog"
              x="0"
              y="0"
              width="200"
              height="200"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <path
                d="M50 10 H150 M150 10 V100 M150 100 H100 M100 100 V150 M100 150 H180 M50 10 V190 M50 190 H120"
                stroke={isDark ? "rgba(100, 150, 255, 0.8)" : "rgba(0, 50, 150, 0.8)"}
                strokeWidth="2"
                fill="none"
              />
              <circle cx="50" cy="10" r="5" fill={isDark ? "rgba(100, 150, 255, 0.8)" : "rgba(0, 50, 150, 0.8)"} />
              <circle cx="150" cy="10" r="5" fill={isDark ? "rgba(100, 150, 255, 0.8)" : "rgba(0, 50, 150, 0.8)"} />
              <circle cx="150" cy="100" r="5" fill={isDark ? "rgba(100, 150, 255, 0.8)" : "rgba(0, 50, 150, 0.8)"} />
              <circle cx="100" cy="100" r="5" fill={isDark ? "rgba(100, 150, 255, 0.8)" : "rgba(0, 50, 150, 0.8)"} />
              <circle cx="100" cy="150" r="5" fill={isDark ? "rgba(100, 150, 255, 0.8)" : "rgba(0, 50, 150, 0.8)"} />
              <circle cx="180" cy="150" r="5" fill={isDark ? "rgba(100, 150, 255, 0.8)" : "rgba(0, 50, 150, 0.8)"} />
              <circle cx="50" cy="190" r="5" fill={isDark ? "rgba(100, 150, 255, 0.8)" : "rgba(0, 50, 150, 0.8)"} />
              <circle cx="120" cy="190" r="5" fill={isDark ? "rgba(100, 150, 255, 0.8)" : "rgba(0, 50, 150, 0.8)"} />
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#circuit-pattern-blog)" />
          </svg>
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
              className="text-xl md:text-2xl text-blue-100 leading-relaxed"
            >
              Insights, tutorials, and updates from our research team
            </motion.p>
          </div>
        </div>

        {/* Styles for blob animations */}
        <style jsx>{`
          .tech-pattern {
            background-image: radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0);
            background-size: 20px 20px;
          }

          @keyframes blob {
            0% {
              transform: translate(0px, 0px) scale(1);
            }
            33% {
              transform: translate(30px, -50px) scale(1.1);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.9);
            }
            100% {
              transform: translate(0px, 0px) scale(1);
            }
          }

          .animate-blob {
            animation: blob 7s infinite;
          }

          .animation-delay-2000 {
            animation-delay: 2s;
          }
        `}</style>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts?.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}
"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, Network, Database, LineChart, Code, Users } from "lucide-react"
import { useTheme } from "next-themes"
import { ResearchInterest, Publication, Collaboration } from "@/lib/profileData"

interface ResearchClientPageProps {
  researchInterests: ResearchInterest[]
  publications: Publication[]
  collaborations: Collaboration[]
}

export default function ResearchClientPage({ researchInterests, publications, collaborations }: ResearchClientPageProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Typing effect state
  const [text, setText] = useState("")
  const fullText = "Research & Innovation"
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
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

        {/* AI-themed background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full opacity-5">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid-research" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke={isDark ? "#4F46E5" : "#2563EB"} strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-research)" />
            </svg>
          </div>
        </div>

        {/* Digital circuit pattern */}
        <div className="absolute inset-0 z-0 opacity-5">
          <svg width="100%" height="100%">
            <pattern
              id="circuit-pattern-research"
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
            <rect x="0" y="0" width="100%" height="100%" fill="url(#circuit-pattern-research)" />
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
              Advancing AI through innovative research and practical applications
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <p className="text-lg text-gray-600 dark:text-gray-300">
            My research focuses on advancing the state-of-the-art in Artificial Intelligence through innovative
            approaches and applications. I am particularly interested in developing practical solutions for real-world
            problems using machine learning and deep learning techniques.
          </p>
        </motion.div>

        {/* Research Areas Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Research Areas</h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {researchInterests.map((area, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
                variants={itemVariants}
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={`/placeholder.svg?height=300&width=400&text=${area.name.replace(/\s/g, '+')}`}
                    alt={area.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute top-4 left-4 p-2 bg-blue-600 rounded-full text-white">
                    <Brain className="h-6 w-6" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">{area.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{area.description}</p>
                  <Button variant="link" className="mt-4 p-0 text-blue-600 dark:text-blue-400 hover:underline">
                    Learn More <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Publications Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Recent Publications</h2>
          <div className="space-y-8">
            {publications.map((pub, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-start md:items-center"
              >
                <div className="md:w-3/4">
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">{pub.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                    {pub.journal || pub.conference} • {pub.year}
                  </p>
                  <p className="text-gray-700 dark:text-gray-400 text-sm mb-4">{pub.description}</p>
                  {pub.url && (
                    <a href={pub.url} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-900">
                        Read More
                      </Button>
                    </a>
                  )}
                </div>
                <div className="md:w-1/4 mt-4 md:mt-0 md:text-right">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Authors:</p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm font-medium">{pub.authors}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Collaborations Section */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Collaborations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collaborations.map((collab, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center"
              >
                <Image
                  src={collab.logo || "/placeholder.svg?height=60&width=60"}
                  alt={collab.name}
                  width={60}
                  height={60}
                  className="mx-auto mb-4 rounded-full"
                />
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{collab.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{collab.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
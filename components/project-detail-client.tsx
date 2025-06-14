"use client"

import Link from "next/link"

import { useEffect, useState } from "react"
import { useParams, notFound } from "next/navigation"
import Image from "next/image"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Github, ExternalLink, Calendar, User, Clock } from "lucide-react"
import type { Project } from "@/lib/projectData" // Changed import from project-utils to projectData
import { motion } from "framer-motion"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ContactInfoItem, SocialLink } from "@/lib/profileData"

interface ProjectDetailClientProps {
  project: Project | null;
  contactInfo: ContactInfoItem[];
  socialLinks: SocialLink[];
}

export default function ProjectDetailClient({ project, contactInfo, socialLinks }: ProjectDetailClientProps) {
  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow pt-24 pb-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="relative h-[400px] md:h-[500px] w-full rounded-xl overflow-hidden mb-12">
            <Image
              src={project.image || "/placeholder.svg?height=500&width=1200"}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 text-white z-10 w-full">
              <div className="max-w-3xl">
                <Badge variant="secondary" className="bg-blue-600 text-white border-none mb-4">
                  {project.category}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
                <p className="text-lg text-gray-200 mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-4">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Button className="bg-gray-800 hover:bg-gray-700 text-white">
                        <Github className="mr-2 h-4 w-4" /> View on GitHub
                      </Button>
                    </a>
                  )}
                  {project.demoUrl && (
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid grid-cols-3 mb-8">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="technical">Technical Details</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
                  >
                    <h2 className="text-2xl font-bold mb-4 dark:text-white">Project Overview</h2>
                    <div className="prose dark:prose-invert max-w-none">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {project.longDescription || project.description}
                      </ReactMarkdown>
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="features" className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
                  >
                    <h2 className="text-2xl font-bold mb-4 dark:text-white">Key Features</h2>
                    <ul className="space-y-4">
                      {project.features && project.features.map((feature, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex items-start"
                        >
                          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3 mt-0.5">
                            <svg
                              className="h-4 w-4 text-blue-600 dark:text-blue-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                    {!project.features || project.features.length === 0 && (
                      <p className="text-gray-500 dark:text-gray-400">No features available for this project.</p>
                    )}
                  </motion.div>
                </TabsContent>

                <TabsContent value="technical" className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
                  >
                    <h2 className="text-2xl font-bold mb-4 dark:text-white">Technical Details</h2>
                    <div className="prose dark:prose-invert max-w-none">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {project.content}
                      </ReactMarkdown>
                    </div>
                  </motion.div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-4 dark:text-white">Project Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Completion Date</p>
                      <p className="text-gray-700 dark:text-gray-300">{project.date || "2023"}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Team</p>
                      <p className="text-gray-700 dark:text-gray-300">{project.team || "Personal Project"}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
                      <p className="text-700 dark:text-gray-300">{project.duration || "3 months"}</p>
                    </div>
                  </div>
                </div>

                {project.technologies && project.technologies.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-xl font-bold mb-4 dark:text-white">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="dark:bg-gray-700 dark:text-gray-200">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {project.relatedProjects && project.relatedProjects.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-xl font-bold mb-4 dark:text-white">Related Projects</h3>
                    <ul className="space-y-3">
                      {project.relatedProjects.map((relatedProject) => (
                        <li key={relatedProject.id}>
                          <Link
                            href={`/projects/${relatedProject.slug}`}
                            className="text-blue-600 hover:underline dark:text-blue-400"
                          >
                            {relatedProject.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer contactInfo={contactInfo} socialLinks={socialLinks} />
    </main>
  )
} 
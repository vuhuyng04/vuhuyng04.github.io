"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Github, ExternalLink, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Project } from "@/lib/project-utils"

interface ProjectCardProps {
  project: Project
  index?: number
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="overflow-hidden flex flex-col h-full rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={project.image || "/placeholder.svg?height=200&width=400"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>

          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-blue-600 text-white border-none">
              {project.technologies && project.technologies.length > 0 ? project.technologies[0] : "Project"}
            </Badge>
          </div>

          <div className="absolute bottom-0 left-0 p-6 text-white z-10">
            <h3 className="text-xl font-bold mb-2 group-hover:text-blue-300 transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-sm text-gray-200 line-clamp-2">{project.description}</p>
          </div>
        </div>

        <div className="p-6 flex-grow">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="outline" className="bg-gray-100 dark:bg-gray-700 font-normal">
                {tech}
              </Badge>
            ))}
          </div>

          <div className="mt-auto flex justify-between items-center">
            <div className="flex space-x-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
              )}
            </div>

            <Link href={`/projects/${project.slug}`}>
              <Button
                variant="ghost"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 p-0 group"
              >
                View Details
                <ChevronRight
                  className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                    isHovered ? "transform translate-x-1" : ""
                  }`}
                />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

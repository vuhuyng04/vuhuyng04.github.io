"use client"

import { useState, useRef } from "react"
import { ProjectCard } from "@/components/project-card"
import { motion, useInView } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Project } from "@/lib/projectData"

interface ProjectsClientPageProps {
  projects: Project[];
}

export default function ProjectsClientPage({ projects }: ProjectsClientPageProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  // Extract unique categories (all unique technologies)
  const allTechnologies = Array.from(new Set(projects?.flatMap(project => project.technologies) || []));
  const categories = ["All", ...allTechnologies];

  // Filter projects based on search term and category
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase()))

    // Filter by any matching technology
    const matchesCategory = selectedCategory === "All" || project.technologies.includes(selectedCategory);

    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex-grow pt-24 pb-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 dark:text-white">Projects</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Explore my research projects and applications in AI, NLP, and machine learning
          </p>
        </motion.div>

        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search projects..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-center md:justify-end">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300">No projects found</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 
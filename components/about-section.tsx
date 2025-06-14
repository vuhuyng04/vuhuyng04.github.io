"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { useInView } from "framer-motion"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Download, ExternalLink, ChevronRight, MapPin, Mail, Briefcase } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTheme } from "next-themes"
import { ProfileBasicInfo, Skill, EducationItem, ExperienceItem, ResearchInterest, AboutContent } from "@/lib/profileData"
import { CircuitBackground } from "@/components/circuit-background"
// Import specific Lucide React icons for skills
import { Cpu, Code, Database, Server, Cloud, GitBranch, Lightbulb } from "lucide-react";

interface AboutSectionProps {
  basicInfo: ProfileBasicInfo | null;
  aboutContent: AboutContent | null;
  skills: { technicalSkills: Skill[]; tools: Skill[] } | null;
  educationData: EducationItem[] | null;
  experienceData: ExperienceItem[] | null;
  researchInterests: ResearchInterest[] | null;
}

export default function AboutSection({
  basicInfo,
  aboutContent,
  skills,
  educationData,
  experienceData,
  researchInterests,
}: AboutSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [activeTab, setActiveTab] = useState("about")
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Helper function to get skill icon based on category
  const getSkillIcon = (category?: string) => {
    switch (category) {
      case "AI":
        return <Cpu className="h-8 w-8 text-blue-600 dark:text-blue-400" />;
      case "Programming":
      case "Frameworks":
      case "DevOps":
        return <Code className="h-8 w-8 text-blue-600 dark:text-blue-400" />;
      case "Data":
      case "Infrastructure":
        return <Database className="h-8 w-8 text-blue-600 dark:text-blue-400" />;
      // Add more cases for other categories or specific skill names if needed
      default:
        return <Lightbulb className="h-8 w-8 text-gray-500 dark:text-gray-400" />;
    }
  };

  // Animation variants
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
    <section ref={ref} className="py-24 bg-white dark:bg-gray-900 overflow-hidden relative">
      {/* AI-themed background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" className="stroke-grid-pattern" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Digital circuit pattern */}
      <div className="absolute inset-0 z-0 opacity-5">
        <CircuitBackground id="circuit-pattern-about" isDark={isDark} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold dark:text-white inline-block relative">
            About Me
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {basicInfo?.bio || "AI researcher and specialist with a passion for developing cutting-edge technologies"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <motion.div
            className="lg:col-span-4 lg:sticky lg:top-24"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-200 dark:bg-blue-800/50 rounded-lg -z-10"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-indigo-200 dark:bg-indigo-800/50 rounded-lg -z-10"></div>
              <div className="relative rounded-lg overflow-hidden shadow-2xl bg-white dark:bg-gray-800 z-20 transform transition-all duration-300 hover:scale-[1.01] hover:shadow-3xl">
                <div className="h-[400px] w-full relative overflow-hidden rounded-full group">
                  {/* Background tech pattern behind the image */}
                  <div className="absolute inset-0 rounded-full tech-pattern animate-tech-pattern-move z-0 opacity-10"></div>
                  {/* Subtle border glow around the image */}
                  <div className="absolute inset-[-2px] rounded-full border border-blue-500/50 group-hover:border-blue-500 transition-colors duration-300 z-0"></div>

                  <Image src={basicInfo?.profileImage || "/placeholder.svg?height=400&width=400"} alt={basicInfo?.name || "Profile"} fill className="object-cover relative z-10 rounded-full" />
                </div>
                {/* Dedicated Information Panel */}
                <div className="p-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 relative z-20">
                  {/* Inner tech lines/glows */}
                  <div className="absolute inset-0 overflow-hidden rounded-lg opacity-20">
                    <div className="absolute left-0 top-0 h-full w-px bg-blue-500 animate-[dataFlow_5s_linear_infinite]"></div>
                    <div className="absolute right-0 bottom-0 h-full w-px bg-purple-500 animate-[dataFlow_5s_linear_infinite_reverse]"></div>
                  </div>
                  <h3 className="text-2xl font-bold dark:text-white mb-2">{basicInfo?.name || "Your Name"}</h3>
                  <p className="text-blue-600 dark:text-blue-400 text-base mb-4">{basicInfo?.title || "Your Title"}</p>
                  <div className="space-y-4 text-gray-700 dark:text-gray-300">
                    <div className="flex items-center">
                      <Briefcase className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                      <span>{experienceData && experienceData.length > 0 ? `${experienceData[0].position} at ${experienceData[0].company}` : "Your Current Job"}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                      <span>{basicInfo?.location || "Your Location"}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                      <span>{basicInfo?.email || "Your Email"}</span>
                    </div>
                  </div>
                  <div className="mt-6 flex space-x-4">
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                      <Download className="mr-2 h-4 w-4" /> Resume
                    </Button>
                    <Button variant="outline" className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-white">
                      <ExternalLink className="mr-2 h-4 w-4" /> Portfolio
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <h3 className="text-2xl font-bold mb-4 dark:text-white">Who I Am</h3>
                  <div className="prose dark:prose-invert max-w-none">
                    {aboutContent?.mission && <p>{aboutContent.mission}</p>}
                    {basicInfo?.bio && <p>{basicInfo.bio}</p>}
                  </div>

                  <div className="mt-8">
                    <h4 className="text-xl font-semibold mb-4 dark:text-white">Research Interests</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {researchInterests?.map((interest, index) => (
                        <li key={index} className="flex items-center">
                          <ChevronRight className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                          <span className="text-gray-700 dark:text-gray-300">{interest.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="skills">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <h3 className="text-2xl font-bold mb-6 dark:text-white">Technical Skills</h3>
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={activeTab === "skills" ? "visible" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {skills?.technicalSkills.map((skill, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-4 text-white shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
                      >
                        <div className="flex items-center">
                          {getSkillIcon(skill.category)}
                          <span className="text-lg font-medium ml-3">{skill.name}</span>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  <h3 className="text-2xl font-bold mt-12 mb-6 dark:text-white">Tools & Technologies</h3>
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={activeTab === "skills" ? "visible" : "hidden"}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4" 
                  >
                    {skills?.tools.map((tool, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex items-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300"
                      >
                        {getSkillIcon(tool.category)}
                        <span className="text-gray-700 dark:text-gray-300 ml-3">{tool.name}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </TabsContent>

              <TabsContent value="education">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <h3 className="text-2xl font-bold mb-6 dark:text-white">Education</h3>
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={activeTab === "education" ? "visible" : "hidden"}
                    className="space-y-8 relative"
                  >
                    <div className="absolute left-[39px] top-0 bottom-0 w-0.5 bg-blue-300 dark:bg-blue-700"></div>
                    {educationData?.map((item, index) => (
                      <motion.div key={index} variants={itemVariants} className="flex items-center relative pl-20">
                        <div className="absolute left-[34px] top-[36px] w-3 h-3 rounded-full bg-blue-600 dark:bg-blue-400 z-10 animate-pulse-dot"></div>
                        {item.logo && (
                          <div className="flex-shrink-0 w-16 h-16 relative bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center p-2 border border-blue-400 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg">
                            <Image
                              src={item.logo}
                              alt={item.institution || "Institution Logo"}
                              width={64} // Adjust size as needed
                              height={64} // Adjust size as needed
                              className="object-contain"
                            />
                          </div>
                        )}
                        <div className="ml-4">
                          <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{item.degree}</h4>
                          <p className="text-blue-600 dark:text-blue-400 font-medium">{item.institution}</p>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{item.years}</p>
                          <p className="text-gray-700 dark:text-gray-300 text-sm whitespace-pre-wrap">{item.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </TabsContent>

              <TabsContent value="experience">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <h3 className="text-2xl font-bold mb-6 dark:text-white">Experience</h3>
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={activeTab === "experience" ? "visible" : "hidden"}
                    className="space-y-8 relative"
                  >
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-300 dark:bg-blue-700"></div>
                    {experienceData?.map((item, index) => (
                      <motion.div key={index} variants={itemVariants} className="flex items-start relative pl-16">
                        <div className="absolute left-[26px] top-[30px] w-3 h-3 rounded-full bg-blue-600 dark:bg-blue-400 z-10 animate-pulse-dot"></div>
                        {item.logo && (
                          <div className="flex-shrink-0 w-16 h-16 relative bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center p-2 border border-blue-400 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg">
                            <Image
                              src={item.logo}
                              alt={item.company || "Company Logo"}
                              width={64} // Adjust size as needed
                              height={64} // Adjust size as needed
                              className="object-contain"
                            />
                          </div>
                        )}
                        <div className="ml-4">
                          <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{item.position}</h4>
                          <p className="text-blue-600 dark:text-blue-400 font-medium">{item.company}</p>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{item.years}</p>
                          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-sm space-y-1">
                            {item.description?.split('\n').map((line, descIndex) => (
                              line.trim() !== '' && <li key={descIndex}>{line.trim()}</li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
        {/* Add custom keyframe for pulse-dot animation */}
        <style jsx>{`
          @keyframes pulse-dot {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.5);
              opacity: 0.7;
            }
          }
          .animate-pulse-dot {
            animation: pulse-dot 1.5s infinite ease-in-out;
          }
        `}</style>
      </div>
    </section>
  )
}

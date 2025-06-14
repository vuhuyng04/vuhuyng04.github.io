"use client"

import { Cpu, Award, BookOpen, Code, Users, Globe, Lightbulb } from "lucide-react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ProfileBasicInfo, Skill, EducationItem, ExperienceItem, ResearchInterest, AboutContent } from "@/lib/profileData"
import { CircuitBackground } from "@/components/circuit-background"
import AboutSection from "@/components/about-section"

interface AboutClientPageProps {
  basicInfo: ProfileBasicInfo | null;
  aboutContent: AboutContent | null;
  skills: { technicalSkills: Skill[]; tools: Skill[] } | null;
  educationData: EducationItem[] | null;
  experienceData: ExperienceItem[] | null;
  researchInterests: ResearchInterest[] | null;
}

export default function AboutClientPage({
  basicInfo,
  aboutContent,
  skills,
  educationData,
  experienceData,
  researchInterests,
}: AboutClientPageProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  // const { theme } = useState<any>(null) // Removed: theme should be handled at a higher level or removed if not used
  // const isDark = theme === "dark"

  // Research focus areas should come from researchInterests prop
  // Using the prop directly
  const researchFocus = researchInterests ? researchInterests.map(interest => ({
    icon: <Lightbulb className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
    title: interest.name,
    description: interest.description || "", // Add a description field to ResearchInterest interface or provide default
  })) : [];

  // Use aboutContent directly, no more hardcoded data
  const mission = aboutContent?.mission || "";
  const values = aboutContent?.values || [];
  const team = aboutContent?.team || [];

  return (
    <>
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About VUHUY AI</h1>
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
              {mission}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content (includes AboutSection with tabs) */}
      <AboutSection
        basicInfo={basicInfo}
        aboutContent={{ mission, values, team }}
        skills={skills}
        educationData={educationData}
        experienceData={experienceData}
        researchInterests={researchInterests}
      />

      {/* Research Focus Areas */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Research Focus Areas</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our research spans multiple areas of artificial intelligence, with a focus on practical applications and
              ethical considerations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {researchFocus.map((area, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="mb-4">{area.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{area.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Our Team</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Meet the researchers and engineers driving innovation in AI and machine learning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative mb-4">
                  <Image
                    src={member.image && typeof member.image === 'string' && member.image.startsWith('/') ? member.image : "/placeholder.svg?height=120&width=120&text=Team"}
                    alt={member.name}
                    width={120}
                    height={120}
                    className="rounded-full mx-auto object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{member.name}</h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Publications & Achievements */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Publications & Achievements</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our research contributions to the AI and machine learning community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">25+</div>
              <div className="text-gray-600 dark:text-gray-400">Research Papers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">10+</div>
              <div className="text-gray-600 dark:text-gray-400">Open Source Projects</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">5</div>
              <div className="text-gray-600 dark:text-gray-400">Awards</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">1000+</div>
              <div className="text-gray-600 dark:text-gray-400">Citations</div>
            </div>
          </div>
        </div>
      </section>

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
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </>
  )
} 
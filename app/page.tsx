import Navbar from "@/components/navbar"
// import Hero from "@/components/hero"
import AboutSection from "@/components/about-section"
import Footer from "@/components/footer"
import RecentPosts from "@/components/recent-posts"
import FeaturedCertifications from "@/components/featured-certifications"
import ClientHeroWrapper from "@/components/client-hero-wrapper"

import { getAllPosts } from "@/lib/blog-utils"
import { getCertifications } from "@/lib/certification-utils"
import { getBasicInfo, getSkills, getEducation, getExperience, getResearchInterests, getAboutContent, getContactContent } from "@/lib/profile-utils"

// const Hero = dynamic(() => import("@/components/hero"), { ssr: false })

export default async function Home() {
  const posts = await getAllPosts()
  console.log("Home page - Posts:", posts)
  const certifications = await getCertifications()
  console.log("Home page - Certifications:", certifications)
  const basicInfo = await getBasicInfo()
  console.log("Home page - Basic Info:", basicInfo)
  const allSkills = await getSkills()
  console.log("Home page - All Skills:", allSkills)
  const skills = {
    technicalSkills: allSkills.filter(skill => skill.icon),
    tools: allSkills.filter(skill => !skill.icon)
  }
  console.log("Home page - Formatted Skills:", skills)
  const educationData = await getEducation()
  console.log("Home page - Education Data:", educationData)
  const experienceData = await getExperience()
  console.log("Home page - Experience Data:", experienceData)
  const researchInterests = await getResearchInterests()
  console.log("Home page - Research Interests:", researchInterests)
  const aboutContent = await getAboutContent()
  console.log("Home page - About Content:", aboutContent)
  const contactContent = await getContactContent();
  console.log("Home page - Contact Content:", contactContent)

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Global Animated Background for AI/Data/Circuit Feel */}
      <div className="absolute inset-0 z-0 bg-gray-950 dark:bg-black opacity-90"></div>
      <div className="absolute inset-0 z-0 tech-pattern animate-tech-pattern-move opacity-5"></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 animate-blob animation-delay-2000 opacity-5"></div>
      
      <Navbar />
      <div className="flex-grow relative z-10">
        <ClientHeroWrapper />
        <AboutSection 
          basicInfo={basicInfo}
          aboutContent={aboutContent}
          skills={skills}
          educationData={educationData}
          experienceData={experienceData}
          researchInterests={researchInterests}
        />
        <FeaturedCertifications certifications={certifications} />
        <RecentPosts posts={posts} />
      </div>
      <Footer contactInfo={contactContent.contactInfo} socialLinks={contactContent.socialLinks} />
    </main>
  )
}

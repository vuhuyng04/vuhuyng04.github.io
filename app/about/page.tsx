import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AboutClientPage from "@/components/about-client-page"
import { getBasicInfo, getSkills, getEducation, getExperience, getResearchInterests, getAboutContent, getContactContent } from "@/lib/profile-utils"

export const metadata = {
  title: "About | My Personal Website",
  description: "Learn more about my background, skills, and research interests.",
}

export default async function AboutPage() {
  const basicInfo = await getBasicInfo()
  console.log("About page - Basic Info:", basicInfo)
  const allSkills = await getSkills()
  console.log("About page - All Skills:", allSkills)
  const skills = {
    technicalSkills: allSkills.filter(skill => skill.icon),
    tools: allSkills.filter(skill => !skill.icon)
  }
  console.log("About page - Formatted Skills:", skills)
  const educationData = await getEducation()
  console.log("About page - Education Data:", educationData)
  const experienceData = await getExperience()
  console.log("About page - Experience Data:", experienceData)
  const researchInterests = await getResearchInterests()
  console.log("About page - Research Interests:", researchInterests)
  const aboutContent = await getAboutContent()
  console.log("About page - About Content:", aboutContent)
  const contactData = await getContactContent()

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <AboutClientPage
        basicInfo={basicInfo}
        aboutContent={aboutContent}
        skills={skills}
        educationData={educationData}
        experienceData={experienceData}
        researchInterests={researchInterests}
      />
      <Footer contactInfo={contactData.contactInfo} socialLinks={contactData.socialLinks} />
    </main>
  )
}

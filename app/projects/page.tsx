import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { getAllProjects } from "@/lib/project-utils"
import ProjectsClientPage from "@/components/projects-client-page"
import { getContactContent } from "@/lib/profile-utils"

export const metadata = {
  title: "Projects | My Personal Website",
  description: "Explore my research projects and applications in AI, NLP, and machine learning.",
}

export default async function ProjectsPage() {
  const projects = await getAllProjects()
  const contactData = await getContactContent()

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <ProjectsClientPage projects={projects} />
      <Footer contactInfo={contactData.contactInfo} socialLinks={contactData.socialLinks} />
    </main>
  )
}
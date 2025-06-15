import Navbar from "@/components/navbar"
import ResearchClientPage from "@/components/research-client-page"
import Footer from "@/components/footer"
import { getResearchContent, getContactContent } from "@/lib/profile-utils"
import { notFound } from "next/navigation"

export const metadata = {
  title: "Research | My Personal Website",
  description: "Explore my research interests, publications, and collaborations in AI and machine learning.",
}

export default async function Research() {
  const researchData = await getResearchContent()
  const contactData = await getContactContent()

  if (!researchData) {
    notFound()
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <ResearchClientPage
        researchInterests={researchData.interests ?? []}
        publications={researchData.publications ?? []}
        collaborations={researchData.collaborations ?? []}
      />
      <Footer contactInfo={contactData.contactInfo} socialLinks={contactData.socialLinks} />
    </main>
  )
}
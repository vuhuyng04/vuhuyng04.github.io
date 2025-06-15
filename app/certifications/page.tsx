import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { CertificateCard } from "@/components/certificate-card"
import { getCertifications } from "@/lib/certification-utils"
import { getContactContent } from "@/lib/profile-utils"
import CertificationsClientPage from "@/components/certifications-client-page"

export const metadata = {
  title: "Certifications | My Personal Website",
  description: "Professional certifications and courses completed to enhance my skills and knowledge.",
}

export default async function CertificationsPage() {
  const certifications = await getCertifications()
  const contactData = await getContactContent()

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <CertificationsClientPage certifications={certifications} />
      <Footer contactInfo={contactData.contactInfo} socialLinks={contactData.socialLinks} />
    </main>
  )
}
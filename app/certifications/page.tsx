import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { CertificateCard } from "@/components/certificate-card"
import { motion } from "framer-motion"
import { getCertifications } from "@/lib/certification-utils"
import { getContactContent } from "@/lib/profile-utils"

export default async function CertificationsPage() {
  const certifications = await getCertifications()
  const contactData = await getContactContent()

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow pt-24 pb-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <section className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl font-bold mb-4 dark:text-white">Certifications</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Professional certifications and courses completed to enhance my skills and knowledge
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <CertificateCard key={cert.id} certificate={cert} index={index} />
            ))}
          </div>
        </div>
      </div>
      <Footer contactInfo={contactData.contactInfo} socialLinks={contactData.socialLinks} />
    </main>
  )
}

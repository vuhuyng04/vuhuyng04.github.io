import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { getContactContent } from "@/lib/profile-utils"
import ContactClientPage from "@/components/contact-client-page"

export default async function Contact() {
  const contactData = await getContactContent();

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <ContactClientPage contactData={contactData} />
      <Footer contactInfo={contactData.contactInfo} socialLinks={contactData.socialLinks} />
    </main>
  )
}

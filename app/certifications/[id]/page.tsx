import { notFound } from "next/navigation"
import Image from "next/image"
import { formatDate } from "@/lib/date-utils"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { getCertificationById, getCertifications } from "@/lib/certification-utils"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import type { Metadata } from "next"
import { getContactContent } from "@/lib/profile-utils"

interface CertificationPageParams {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: CertificationPageParams): Promise<Metadata> {
  const decodedId = decodeURIComponent(params.id);
  const certification = getCertificationById(decodedId);

  if (!certification) {
    return {
      title: "Certification Not Found",
      description: "The requested certification could not be found.",
    };
  }

  return {
    title: `${certification.name} | Certifications`,
    description: certification.description,
  };
}

export function generateStaticParams() {
  const certifications = getCertifications();
  return certifications.map((cert) => ({
    id: encodeURIComponent(cert.id),
  }));
}

export default async function CertificationPage({ params }: CertificationPageParams) {
  const decodedId = decodeURIComponent(params.id);
  const certification = getCertificationById(decodedId);
  const contactData = await getContactContent();

  if (!certification) {
    notFound();
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow pt-24 pb-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-64 w-full">
                <Image
                  src={certification.image || "/placeholder.svg?height=400&width=800"}
                  alt={certification.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <span className="bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                    {certification.platform}
                  </span>
                </div>
              </div>

              <div className="p-8">
                <h1 className="text-3xl font-bold mb-4 dark:text-white">{certification.name}</h1>
                <div className="flex items-center text-gray-600 dark:text-gray-400 mb-6">
                  <span>Issued: {formatDate(new Date(certification.issueDate), "MMMM yyyy")}</span>
                  {certification.expiryDate && (
                    <>
                      <span className="mx-2">•</span>
                      <span>Expires: {formatDate(new Date(certification.expiryDate), "MMMM yyyy")}</span>
                    </>
                  )}
                </div>

                <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
                  <p className="text-gray-700 dark:text-gray-300">{certification.description}</p>
                  {certification.content && <div dangerouslySetInnerHTML={{ __html: certification.content }} />}
                </div>

                {certification.skills && certification.skills.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 dark:text-white">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {certification.skills.map((skill) => (
                        <span
                          key={skill}
                          className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-8">
                  <a href={certification.url} target="_blank" rel="noopener noreferrer">
                    <Button className="bg-blue-600 hover:bg-blue-700 flex items-center">
                      Verify Certificate
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer contactInfo={contactData.contactInfo} socialLinks={contactData.socialLinks} />
    </main>
  )
}

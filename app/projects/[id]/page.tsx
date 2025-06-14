import { notFound } from "next/navigation"
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/project-utils"
import type { Metadata } from "next"
import ProjectDetailClient from "@/components/project-detail-client"
import { getContactContent } from "@/lib/profile-utils"

interface ProjectPageParams {
  params: { id: string }
}

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs()
  return slugs.map((id) => ({ id }))
}

export async function generateMetadata({ params }: ProjectPageParams): Promise<Metadata> {
  const project = await getProjectBySlug(params.id)

  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  return {
    title: project.title,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: ProjectPageParams) {
  const project = await getProjectBySlug(params.id)
  const contactData = await getContactContent() // Fetch contact data

  if (!project) {
    notFound()
  }

  return <ProjectDetailClient project={project} contactInfo={contactData.contactInfo} socialLinks={contactData.socialLinks} />
}

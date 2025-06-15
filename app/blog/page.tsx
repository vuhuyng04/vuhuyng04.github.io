import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { BlogCard } from "@/components/blog-card"
import { getAllPosts } from "@/lib/blog-utils"
import { Suspense } from "react"
import { getContactContent } from "@/lib/profile-utils"
import BlogClientPage from "@/components/blog-client-page"

export const metadata = {
  title: "Blog | My Personal Website",
  description: "Read my latest thoughts, tutorials, and insights on NLP and AI research.",
}

export default async function Blog() {
  const posts = await getAllPosts()
  const contactData = await getContactContent()

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <BlogClientPage posts={posts} />
      <Footer contactInfo={contactData.contactInfo} socialLinks={contactData.socialLinks} />
    </main>
  )
}
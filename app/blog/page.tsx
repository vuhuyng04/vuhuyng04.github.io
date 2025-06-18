import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { getAllPosts, getSeriesWithPosts } from "@/lib/blog-utils"
import { getContactContent } from "@/lib/profile-utils"
import BlogClientPage from "@/components/blog-client-page"

export const metadata = {
  title: "Data & AI Learning Hub | VUHUY AI Blog",
  description: "Master Data Science, Machine Learning, and AI through structured learning paths and comprehensive tutorials.",
}

export default async function Blog() {
  const posts = await getAllPosts()
  const series = await getSeriesWithPosts()
  const contactData = await getContactContent()

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <BlogClientPage posts={posts} series={series} />
      <Footer contactInfo={contactData.contactInfo} socialLinks={contactData.socialLinks} />
    </main>
  )
}
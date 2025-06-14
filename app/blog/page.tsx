import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { BlogCard } from "@/components/blog-card"
import { getAllPosts } from "@/lib/blog-utils"
import { Suspense } from "react"
import { getContactContent } from "@/lib/profile-utils"

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
      <div className="flex-grow pt-24 pb-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl font-bold mb-4 dark:text-white">Our Blog</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Insights, tutorials, and updates from our research team
            </p>
          </div>

          <Suspense
            fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="h-96 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
                ))}
              </div>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts?.map((post, index) => (
                <BlogCard key={post.slug} post={post} index={index} />
              ))}
            </div>
          </Suspense>
        </div>
      </div>
      <Footer contactInfo={contactData.contactInfo} socialLinks={contactData.socialLinks} />
    </main>
  )
}

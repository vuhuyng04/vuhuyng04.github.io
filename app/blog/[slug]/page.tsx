import { notFound } from "next/navigation"
import Image from "next/image"
import { formatDate } from "@/lib/date-utils"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { getPostBySlug, getAllPosts } from "@/lib/blog-utils"
import type { Metadata } from "next"
import { PortableText } from "@portabletext/react"
import { getContactContent } from "@/lib/profile-utils"

interface BlogPostParams {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostParams): Promise<Metadata> {
  const decodedSlug = decodeURIComponent(params.slug);
  const post = await getPostBySlug(decodedSlug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${post.title} | My Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author?.name || "Your Name"],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: encodeURIComponent(post.slug),
  }));
}

export default async function BlogPost({ params }: BlogPostParams) {
  const decodedSlug = decodeURIComponent(params.slug);
  console.log("Fetching blog post for slug:", decodedSlug);
  const post = await getPostBySlug(decodedSlug);
  const contactData = await getContactContent()

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <article className="flex-grow pt-24 pb-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-4 dark:text-white">{post.title}</h1>
              <div className="flex items-center text-gray-600 dark:text-gray-400 mb-8">
                <time dateTime={post.date}>{formatDate(new Date(post.date), "MMMM d, yyyy")}</time>
                <span className="mx-2">•</span>
                <span>{post.readingTime} min read</span>
                {post.tags && post.tags.length > 0 && (
                  <>
                    <span className="mx-2">•</span>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {post.coverImage && (
                <div className="relative h-[400px] w-full mb-8 rounded-lg overflow-hidden shadow-lg">
                  <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                </div>
              )}
            </div>

            {typeof post.content === "string" ? (
              <div
                className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-blue-600"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            ) : (
              <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-blue-600">
                <PortableText value={post.content} />
              </div>
            )}

            <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Image
                    className="h-12 w-12 rounded-full object-cover"
                    src={post.author?.image || "/placeholder.svg?height=48&width=48"}
                    alt={post.author?.name || "Author"}
                    width={48}
                    height={48}
                  />
                </div>
                <div className="ml-4">
                  <p className="text-lg font-medium text-gray-900 dark:text-white">
                    {post.author?.name || "Your Name"}
                  </p>
                  <div className="text-gray-600 dark:text-gray-400">
                    <p>Author, Researcher</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
      <Footer contactInfo={contactData.contactInfo} socialLinks={contactData.socialLinks} />
    </main>
  )
}

import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { Post } from "./blogPostsData"

const postsDirectory = path.join(process.cwd(), '_posts')

// Hàm này trả về tất cả các bài viết
export async function getAllPosts(): Promise<Post[]> {
  if (!fs.existsSync(postsDirectory)) {
    console.error(`Posts directory not found: ${postsDirectory}`);
    return [];
  }
  const fileNames = fs.readdirSync(postsDirectory)
  
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get slug
    const slug = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    let processedCoverImage = matterResult.data.coverImage;
    const defaultPlaceholderImage = "/placeholder.png"; // Use the generic placeholder.png

    if (processedCoverImage && typeof processedCoverImage === 'string' && processedCoverImage.startsWith('/')) {
      const publicPath = path.join(process.cwd(), 'public', processedCoverImage);
      if (!fs.existsSync(publicPath)) {
        console.warn(`Blog post cover image not found: ${publicPath}. Using placeholder.`);
        processedCoverImage = defaultPlaceholderImage;
      }
    } else {
      processedCoverImage = defaultPlaceholderImage;
    }
    console.log(`Post ${slug}: processed cover image URL: ${processedCoverImage}`);

    // Combine the data with the slug
    return {
      slug,
      title: matterResult.data.title,
      date: matterResult.data.date,
      excerpt: matterResult.data.excerpt,
      coverImage: processedCoverImage,
      readingTime: matterResult.data.readingTime,
      tags: Array.isArray(matterResult.data.tags) ? matterResult.data.tags : [],
      content: matterResult.content,
      ...(matterResult.data.author && { author: matterResult.data.author }),
    } as Post
  })

  // Sort posts by date in descending order
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

// Hàm này sẽ lấy một bài viết cụ thể dựa trên slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const decodedSlug = decodeURIComponent(slug);
  const fullPath = path.join(postsDirectory, `${decodedSlug}.md`)
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    let processedCoverImage = matterResult.data.coverImage;
    const defaultPlaceholderImage = "/placeholder.png"; // Use the generic placeholder.png

    if (processedCoverImage && typeof processedCoverImage === 'string' && processedCoverImage.startsWith('/')) {
      const publicPath = path.join(process.cwd(), 'public', processedCoverImage);
      if (!fs.existsSync(publicPath)) {
        console.warn(`Blog post cover image not found: ${publicPath}. Using placeholder.`);
        processedCoverImage = defaultPlaceholderImage;
      }
    } else {
      processedCoverImage = defaultPlaceholderImage;
    }
    console.log(`Post ${decodedSlug}: processed cover image URL: ${processedCoverImage}`);

    return {
      slug: decodedSlug,
      title: matterResult.data.title,
      date: matterResult.data.date,
      excerpt: matterResult.data.excerpt,
      coverImage: processedCoverImage,
      readingTime: matterResult.data.readingTime,
      tags: Array.isArray(matterResult.data.tags) ? matterResult.data.tags : [],
      content: matterResult.content,
      ...(matterResult.data.author && { author: matterResult.data.author }),
    } as Post
  } catch (error) {
    console.error(`Error reading post with slug ${decodedSlug}:`, error)
    return null
  }
}

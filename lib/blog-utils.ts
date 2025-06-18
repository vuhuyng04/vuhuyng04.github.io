import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { Post, BlogSeries, BLOG_SERIES } from "./blogData"

const postsDirectory = path.join(process.cwd(), '_posts')

// Enhanced function to get all posts with series organization
export async function getAllPosts(): Promise<Post[]> {
  if (!fs.existsSync(postsDirectory)) {
    console.error(`Posts directory not found: ${postsDirectory}`);
    return [];
  }
  const fileNames = fs.readdirSync(postsDirectory)
  
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    let processedCoverImage = matterResult.data.coverImage;
    const defaultPlaceholderImage = "/placeholder.png";

    if (processedCoverImage && typeof processedCoverImage === 'string' && processedCoverImage.startsWith('/')) {
      const publicPath = path.join(process.cwd(), 'public', processedCoverImage);
      if (!fs.existsSync(publicPath)) {
        console.warn(`Blog post cover image not found: ${publicPath}. Using placeholder.`);
        processedCoverImage = defaultPlaceholderImage;
      }
    } else {
      processedCoverImage = defaultPlaceholderImage;
    }

    return {
      slug,
      title: matterResult.data.title,
      date: matterResult.data.date,
      excerpt: matterResult.data.excerpt,
      coverImage: processedCoverImage,
      readingTime: matterResult.data.readingTime,
      tags: Array.isArray(matterResult.data.tags) ? matterResult.data.tags : [],
      series: matterResult.data.series,
      seriesOrder: matterResult.data.seriesOrder,
      level: matterResult.data.level || 'beginner',
      prerequisites: matterResult.data.prerequisites || [],
      learningObjectives: matterResult.data.learningObjectives || [],
      mathFormulas: matterResult.data.mathFormulas || false,
      codeExamples: matterResult.data.codeExamples || false,
      content: matterResult.content,
      ...(matterResult.data.author && { author: matterResult.data.author }),
    } as Post
  })

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

// Get posts by series
export async function getPostsBySeries(seriesId: string): Promise<Post[]> {
  const allPosts = await getAllPosts()
  return allPosts
    .filter(post => post.series === seriesId)
    .sort((a, b) => (a.seriesOrder || 0) - (b.seriesOrder || 0))
}

// Get series with posts
export async function getSeriesWithPosts(): Promise<BlogSeries[]> {
  const allPosts = await getAllPosts()
  
  return BLOG_SERIES.map(series => ({
    ...series,
    posts: allPosts
      .filter(post => post.series === series.id)
      .sort((a, b) => (a.seriesOrder || 0) - (b.seriesOrder || 0))
  }))
}

// Get next and previous posts in series
export async function getSeriesNavigation(currentPost: Post): Promise<{
  previous: Post | null
  next: Post | null
  seriesInfo: BlogSeries | null
}> {
  if (!currentPost.series) {
    return { previous: null, next: null, seriesInfo: null }
  }

  const seriesPosts = await getPostsBySeries(currentPost.series)
  const currentIndex = seriesPosts.findIndex(post => post.slug === currentPost.slug)
  const seriesInfo = BLOG_SERIES.find(s => s.id === currentPost.series) || null

  return {
    previous: currentIndex > 0 ? seriesPosts[currentIndex - 1] : null,
    next: currentIndex < seriesPosts.length - 1 ? seriesPosts[currentIndex + 1] : null,
    seriesInfo
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const decodedSlug = decodeURIComponent(slug);
  const fullPath = path.join(postsDirectory, `${decodedSlug}.md`)
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    let processedCoverImage = matterResult.data.coverImage;
    const defaultPlaceholderImage = "/placeholder.png";

    if (processedCoverImage && typeof processedCoverImage === 'string' && processedCoverImage.startsWith('/')) {
      const publicPath = path.join(process.cwd(), 'public', processedCoverImage);
      if (!fs.existsSync(publicPath)) {
        console.warn(`Blog post cover image not found: ${publicPath}. Using placeholder.`);
        processedCoverImage = defaultPlaceholderImage;
      }
    } else {
      processedCoverImage = defaultPlaceholderImage;
    }

    return {
      slug: decodedSlug,
      title: matterResult.data.title,
      date: matterResult.data.date,
      excerpt: matterResult.data.excerpt,
      coverImage: processedCoverImage,
      readingTime: matterResult.data.readingTime,
      tags: Array.isArray(matterResult.data.tags) ? matterResult.data.tags : [],
      series: matterResult.data.series,
      seriesOrder: matterResult.data.seriesOrder,
      level: matterResult.data.level || 'beginner',
      prerequisites: matterResult.data.prerequisites || [],
      learningObjectives: matterResult.data.learningObjectives || [],
      mathFormulas: matterResult.data.mathFormulas || false,
      codeExamples: matterResult.data.codeExamples || false,
      content: matterResult.content,
      ...(matterResult.data.author && { author: matterResult.data.author }),
    } as Post
  } catch (error) {
    console.error(`Error reading post with slug ${decodedSlug}:`, error)
    return null
  }
}
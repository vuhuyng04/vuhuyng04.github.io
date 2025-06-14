export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  coverImage: string
  readingTime: number
  tags: string[]
  author?: {
    name: string
    image: string
  }
} 
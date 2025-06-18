export interface BlogSeries {
  id: string
  title: string
  description: string
  icon: string
  color: string
  posts: Post[]
  level: 'beginner' | 'intermediate' | 'advanced'
  estimatedDuration: string
}

export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  coverImage: string
  readingTime: number
  tags: string[]
  series?: string
  seriesOrder?: number
  level: 'beginner' | 'intermediate' | 'advanced'
  prerequisites?: string[]
  learningObjectives?: string[]
  author?: {
    name: string
    image: string
  }
  mathFormulas?: boolean
  codeExamples?: boolean
}

export const BLOG_SERIES: BlogSeries[] = [
  {
    id: 'data-engineering',
    title: 'Data Engineering',
    description: 'Learn to build robust data pipelines, ETL processes, and data infrastructure',
    icon: '🔧',
    color: 'bg-blue-500',
    posts: [],
    level: 'intermediate',
    estimatedDuration: '8 weeks'
  },
  {
    id: 'data-science',
    title: 'Data Science',
    description: 'Master statistical analysis, data visualization, and predictive modeling',
    icon: '📊',
    color: 'bg-green-500',
    posts: [],
    level: 'beginner',
    estimatedDuration: '12 weeks'
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning',
    description: 'Deep dive into ML algorithms, model training, and deployment',
    icon: '🤖',
    color: 'bg-purple-500',
    posts: [],
    level: 'intermediate',
    estimatedDuration: '16 weeks'
  },
  {
    id: 'deep-learning',
    title: 'Deep Learning',
    description: 'Neural networks, computer vision, and natural language processing',
    icon: '🧠',
    color: 'bg-red-500',
    posts: [],
    level: 'advanced',
    estimatedDuration: '20 weeks'
  },
  {
    id: 'mlops',
    title: 'MLOps',
    description: 'Production ML systems, monitoring, and continuous deployment',
    icon: '⚙️',
    color: 'bg-orange-500',
    posts: [],
    level: 'advanced',
    estimatedDuration: '10 weeks'
  },
  {
    id: 'ai-ethics',
    title: 'AI Ethics & Governance',
    description: 'Responsible AI development, bias detection, and ethical considerations',
    icon: '⚖️',
    color: 'bg-indigo-500',
    posts: [],
    level: 'intermediate',
    estimatedDuration: '6 weeks'
  }
]
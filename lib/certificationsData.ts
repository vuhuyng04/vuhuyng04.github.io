export interface Certificate {
  id: string
  name: string
  platform: string
  issueDate: string
  expiryDate?: string
  description: string
  image: string
  url: string
  skills: string[]
  content?: string
} 
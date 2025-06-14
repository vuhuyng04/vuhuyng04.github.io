export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  category: string;
  technologies: string[];
  features?: string[];
  githubUrl?: string;
  liveUrl?: string;
  date: string;
  content: string;
  team?: string;
  duration?: string;
  relatedProjects?: { id: string; title: string; category: string; image: string }[];
} 
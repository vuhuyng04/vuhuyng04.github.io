import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { Project } from "./projectData"

const projectsDirectory = path.join(process.cwd(), '_projects')

export function getAllProjects(): Project[] {
  if (!fs.existsSync(projectsDirectory)) {
    console.error(`Projects directory not found: ${projectsDirectory}`);
    return [];
  }
  const fileNames = fs.readdirSync(projectsDirectory)

  const allProjectsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '')
    const fullPath = path.join(projectsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    let imageUrl = matterResult.data.image;
    const defaultPlaceholder = "/placeholder.png";

    if (imageUrl && typeof imageUrl === 'string' && imageUrl.startsWith('/')) {
      const publicPath = path.join(process.cwd(), 'public', imageUrl);
      if (!fs.existsSync(publicPath)) {
        console.warn(`Project image not found: ${publicPath}. Using placeholder.`);
        imageUrl = defaultPlaceholder;
      }
    } else {
      imageUrl = defaultPlaceholder;
    }
    console.log(`Project ${slug}: processed image URL: ${imageUrl}`);

    return {
      slug,
      title: matterResult.data.title,
      description: matterResult.data.description,
      longDescription: matterResult.data.longDescription || matterResult.data.description,
      image: imageUrl,
      category: matterResult.data.category || "General",
      technologies: matterResult.data.technologies || [],
      features: matterResult.data.features || [],
      githubUrl: matterResult.data.githubUrl || undefined,
      liveUrl: matterResult.data.liveUrl || undefined,
      date: matterResult.data.date,
      content: matterResult.content || "",
      team: matterResult.data.team || undefined,
      duration: matterResult.data.duration || undefined,
      relatedProjects: matterResult.data.relatedProjects || [],
    } as Project
  })

  return allProjectsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getProjectBySlug(slug: string): Project | undefined {
  const fullPath = path.join(projectsDirectory, `${slug}.md`)
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    let imageUrl = matterResult.data.image;
    const defaultPlaceholder = "/placeholder.png";

    if (imageUrl && typeof imageUrl === 'string' && imageUrl.startsWith('/')) {
      const publicPath = path.join(process.cwd(), 'public', imageUrl);
      if (!fs.existsSync(publicPath)) {
        console.warn(`Project image not found: ${publicPath}. Using placeholder.`);
        imageUrl = defaultPlaceholder;
      }
    } else {
      imageUrl = defaultPlaceholder;
    }
    console.log(`Project ${slug}: processed image URL: ${imageUrl}`);

    return {
      slug,
      title: matterResult.data.title,
      description: matterResult.data.description,
      longDescription: matterResult.data.longDescription || matterResult.data.description,
      image: imageUrl,
      category: matterResult.data.category || "General",
      technologies: matterResult.data.technologies || [],
      features: matterResult.data.features || [],
      githubUrl: matterResult.data.githubUrl || undefined,
      liveUrl: matterResult.data.liveUrl || undefined,
      date: matterResult.data.date,
      content: matterResult.content || "",
      team: matterResult.data.team || undefined,
      duration: matterResult.data.duration || undefined,
      relatedProjects: matterResult.data.relatedProjects || [],
    } as Project
  } catch (error) {
    console.error(`Error reading project with slug ${slug}:`, error)
    return undefined
  }
}

export function getAllProjectSlugs() {
  if (!fs.existsSync(projectsDirectory)) {
    console.error(`Projects directory not found for slugs: ${projectsDirectory}`);
    return [];
  }
  const fileNames = fs.readdirSync(projectsDirectory)
  const slugs = fileNames.map((fileName) => fileName.replace(/\.md$/, ''))
  console.log("Generated project slugs:", slugs);
  return slugs
}

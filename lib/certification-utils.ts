import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { Certificate } from "./certificationsData"

const certificationsDirectory = path.join(process.cwd(), '_certifications')

export function getCertifications(): Certificate[] {
  if (!fs.existsSync(certificationsDirectory)) {
    console.error(`Certifications directory not found: ${certificationsDirectory}`);
    return [];
  }
  const fileNames = fs.readdirSync(certificationsDirectory)

  const allCertificationsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '')
    const fullPath = path.join(certificationsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    let imageUrl = matterResult.data.image;
    const defaultPlaceholderImage = "/placeholder.png";

    if (imageUrl && typeof imageUrl === 'string' && imageUrl.startsWith('/')) {
      const publicPath = path.join(process.cwd(), 'public', imageUrl);
      if (!fs.existsSync(publicPath)) {
        console.warn(`Certification image not found: ${publicPath}. Using placeholder.`);
        imageUrl = defaultPlaceholderImage;
      }
    } else {
      imageUrl = defaultPlaceholderImage;
    }
    console.log(`Certification ${id}: processed image URL: ${imageUrl}`);

    return {
      id,
      name: matterResult.data.title,
      platform: matterResult.data.platform,
      issueDate: matterResult.data.issueDate,
      expiryDate: matterResult.data.expiryDate || undefined,
      description: matterResult.data.description,
      image: imageUrl,
      url: matterResult.data.url,
      skills: Array.isArray(matterResult.data.skills) ? matterResult.data.skills : [],
      content: matterResult.content,
    } as Certificate
  })

  return allCertificationsData.sort((a, b) => {
    if (a.issueDate < b.issueDate) {
      return 1
    } else {
      return -1
    }
  })
}

export function getCertificationById(id: string): Certificate | undefined {
  const decodedId = decodeURIComponent(id);
  const fullPath = path.join(certificationsDirectory, `${decodedId}.md`);
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    let imageUrl = matterResult.data.image;
    const defaultPlaceholderImage = "/placeholder.png";

    if (imageUrl && typeof imageUrl === 'string' && imageUrl.startsWith('/')) {
      const publicPath = path.join(process.cwd(), 'public', imageUrl);
      if (!fs.existsSync(publicPath)) {
        console.warn(`Certification image not found: ${publicPath}. Using placeholder.`);
        imageUrl = defaultPlaceholderImage;
      }
    } else {
      imageUrl = defaultPlaceholderImage;
    }
    console.log(`Certification ${decodedId}: processed image URL: ${imageUrl}`);

    return {
      id: decodedId,
      name: matterResult.data.title,
      platform: matterResult.data.platform,
      issueDate: matterResult.data.issueDate,
      expiryDate: matterResult.data.expiryDate || undefined,
      description: matterResult.data.description,
      image: imageUrl,
      url: matterResult.data.url,
      skills: Array.isArray(matterResult.data.skills) ? matterResult.data.skills : [],
      content: matterResult.content,
    } as Certificate
  } catch (error) {
    console.error(`Error reading certification with id ${decodedId}:`, error)
    return undefined
  }
}

import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { ProfileBasicInfo, Skill, EducationItem, ExperienceItem, ResearchInterest, AboutContent, ContactContent } from "./profileData"

const profileDirectory = path.join(process.cwd(), '_profile')

const parseMarkdownFile = <T>(filePath: string): T | null => {
  try {
    console.log(`Attempting to read file: ${filePath}`)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const matterResult = matter(fileContents)
    console.log(`Parsed data from ${filePath}:`, matterResult.data)
    return matterResult.data as T
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      console.warn(`File not found: ${filePath}. Returning empty object.`);
      return {} as T; // Return an empty object if file not found
    } else {
      console.error(`Error reading or parsing ${filePath}:`, error)
      return null
    }
  }
}

export const getBasicInfo = (): ProfileBasicInfo | null => {
  const data = parseMarkdownFile<any>(path.join(profileDirectory, 'basic-info.md'))
  const basicInfo: ProfileBasicInfo | null = data ? {
    name: data.name,
    title: data.title,
    email: data.email,
    phone: data.phone,
    location: data.location,
    website: data.website,
    profileImage: data.profileImage && typeof data.profileImage === 'string' && data.profileImage.startsWith('/') ? data.profileImage : "/placeholder.svg?height=600&width=600&text=Profile+Image",
    bio: data.bio,
    socialLinks: data.socialLinks || [],
  } : null;
  console.log("Basic Info:", basicInfo);
  return basicInfo;
}

export const getSkills = (): Skill[] => {
  const data = parseMarkdownFile<{ technical?: { name: string; level: number; category: string }[]; languages?: any[]; soft?: string[] }>(path.join(profileDirectory, 'skills.md'))
  console.log("Skills raw data:", data)
  const allSkills: Skill[] = [];

  const categoryIcons: { [key: string]: string } = {
    "AI": "/assets/icons/ai.svg",
    "Programming": "/assets/icons/programming.svg",
    "Data": "/assets/icons/data.svg",
    "Frameworks": "/assets/icons/programming.svg",
    "Infrastructure": "/assets/icons/data.svg",
    "DevOps": "/assets/icons/programming.svg",
  };

  if (data?.technical) {
    allSkills.push(
      ...data.technical.map(s => ({
        name: s.name,
        icon: (s.category && categoryIcons[s.category]) || `/placeholder.svg?height=24&width=24&text=${s.name.charAt(0)}`, // Ensure icon is always a string
        category: s.category,
      }))
    );
  }
  // Add tools if needed, assuming tools are also in technical or a separate 'tools' array in markdown
  // Currently, the `tools` array is not explicitly present in the markdown structure
  // If you add a 'tools' section to skills.md, you would uncomment and adjust this.
  // Example of what the markdown might look like for tools:
  // tools:
  //   - name: "Docker"
  //     icon: "/assets/icons/docker.svg"
  //   - name: "Kubernetes"
  //     icon: "/assets/icons/kubernetes.svg"
  // if (data?.tools) {
  //   allSkills.push(
  //     ...data.tools.map(t => ({
  //       name: t.name,
  //       icon: t.icon && typeof t.icon === 'string' && t.icon.startsWith('/') ? t.icon : `/placeholder.svg?height=24&width=24&text=${t.name.charAt(0)}`,
  //       category: "Tools", // Assign a default category for tools
  //     }))
  //   );
  // }
  console.log("Formatted Skills:", allSkills)
  return allSkills
}

export const getEducation = (): EducationItem[] => {
  const data = parseMarkdownFile<{ degrees: any[] }>(path.join(profileDirectory, 'education.md'))
  console.log("Education raw data:", data)
  const educationItems: EducationItem[] = data?.degrees ? data.degrees.map(item => ({
    degree: item.degree,
    institution: item.institution || item.school, // Use institution if available, fallback to school
    years: item.years || item.period, // Use years if available, fallback to period
    description: `${item.focus || ''}${item.gpa ? ` - GPA: ${item.gpa}` : ''}${item.thesis ? ` - Thesis: ${item.thesis}` : ''}`.trim(),
    logo: item.logo && typeof item.logo === 'string' && item.logo.startsWith('/') ? item.logo : "/placeholder.svg?height=48&width=48&text=Edu", // Placeholder logo
  })) : []
  console.log("Formatted Education:", educationItems)
  return educationItems
}

export const getExperience = (): ExperienceItem[] => {
  const data = parseMarkdownFile<{ jobs: any[] }>(path.join(profileDirectory, 'experience.md'))
  console.log("Experience raw data:", data)
  const experienceItems: ExperienceItem[] = data?.jobs ? data.jobs.map(job => ({
    position: job.position || job.title, // Use position if available, fallback to title
    company: job.company,
    years: job.years || job.period, // Use years if available, fallback to period
    description: `${job.description || ''}${job.achievements && job.achievements.length > 0 ? `\nAchievements:\n- ${job.achievements.join('\n- ')}` : ''}`.trim(),
    logo: job.logo && typeof job.logo === 'string' && job.logo.startsWith('/') ? job.logo : "/placeholder.svg?height=48&width=48&text=Exp", // Placeholder logo
  })) : []
  console.log("Formatted Experience:", experienceItems)
  return experienceItems
}

export const getResearchInterests = (): ResearchInterest[] => {
  // This function will be replaced by getResearchContent for a more comprehensive data fetch
  // For now, it remains for compatibility but will be removed soon.
  const data = parseMarkdownFile<{ interests: string[] }>(path.join(profileDirectory, 'research.md'))
  console.log("Research Interests raw data (legacy):", data)
  return data?.interests ? data.interests.map(name => ({
    name: name,
    description: `Exploring ${name.toLowerCase()} and its applications.`,
    image: "/placeholder.svg?height=300&width=400&text=Research",
    icon: "/assets/icons/ai.svg",
  })) : []
}

export const getResearchContent = (): { interests: ResearchInterest[]; publications: Publication[]; collaborations: Collaboration[] } => {
  const data = parseMarkdownFile<any>(path.join(profileDirectory, 'research.md'))
  console.log("Research Content raw data:", data)

  const defaultResearchImage = "/placeholder.svg?height=300&width=400&text=Research";
  const defaultPublicationIcon = "/placeholder.svg?height=48&width=48&text=Pub";
  const defaultCollaborationLogo = "/placeholder.svg?height=60&width=60&text=Collab";

  const researchInterests: ResearchInterest[] = data?.interests ? data.interests.map((item: any) => {
    const name = typeof item === 'string' ? item : item.name;
    const description = typeof item === 'string' ? `Exploring ${name.toLowerCase()} and its applications.` : (item.description || `Exploring ${name.toLowerCase()} and its applications.`);

    return {
      name: name,
      description: description,
      image: item.image && typeof item.image === 'string' && item.image.startsWith('/') ? item.image : defaultResearchImage,
      icon: (item.icon && typeof item.icon === 'string' && item.icon.startsWith('/')) ? item.icon : "/assets/icons/ai.svg", // Ensure icon is always a string
    };
  }) : [];

  const publications: Publication[] = data?.publications ? data.publications.map((item: any) => ({
    title: item.title,
    journal: item.journal,
    conference: item.conference,
    year: item.year,
    url: item.url,
    description: item.description,
    authors: item.authors || "Unknown Authors",
  })) : []

  const collaborations: Collaboration[] = data?.collaborations ? data.collaborations.map((item: any) => ({
    name: item.name,
    logo: item.logo && typeof item.logo === 'string' && item.logo.startsWith('/') ? item.logo : defaultCollaborationLogo,
    description: item.description,
  })) : []

  return {
    interests: researchInterests,
    publications: publications,
    collaborations: collaborations,
  }
}

export const getAboutContent = (): AboutContent | null => {
  const data = parseMarkdownFile<{ mission: string; values: { name: string; description: string }[]; team: { name: string; role: string; image: string; bio: string }[] }>(path.join(profileDirectory, 'about.md'))
  console.log("About Content raw data:", data)
  const aboutContent: AboutContent | null = data ? {
    mission: data.mission,
    values: data.values || [],
    team: data.team ? data.team.map(member => ({
      name: member.name,
      role: member.role,
      image: member.image && typeof member.image === 'string' && member.image.startsWith('/') ? member.image : "/placeholder.svg?height=300&width=300&text=Team",
      bio: member.bio,
    })) : [],
  } : null;
  console.log("Formatted About Content:", aboutContent);
  return aboutContent;
}

export const getContactInfo = (): any | null => {
  const data = parseMarkdownFile<any>(path.join(profileDirectory, 'contact.md'))
  console.log("Contact Info:", data)
  return data
}

export async function getContactContent(): Promise<ContactContent> {
  const filePath = path.join(process.cwd(), "_profile", "contact.md");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  // Pass raw markdown content to the client component for rendering with ReactMarkdown
  const contentMarkdown = content;

  const items: ContactInfoItem[] = [];
  if (data.email) {
    items.push({ icon: "Mail", label: "Email", value: data.email, href: `mailto:${data.email}` });
  }
  if (data.phone) {
    items.push({ icon: "Phone", label: "Phone", value: data.phone, href: `tel:${data.phone.replace(/\s/g, '')}` });
  }
  if (data.location) {
    items.push({ icon: "MapPin", label: "Location", value: data.location, href: `https://maps.google.com/?q=${encodeURIComponent(data.location)}` });
  }
  if (data.availability) {
    items.push({ icon: "Clock", label: "Availability", value: data.availability, href: null });
  }

  const contactInfo: ContactContent = {
    contactInfo: items,
    socialLinks: data.socialLinks || [],
    faqs: data.faqs || [],
    contentHtml: contentMarkdown, // Now holds raw Markdown
  };

  return contactInfo;
} 
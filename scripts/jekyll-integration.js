const fs = require("fs")
const path = require("path")
const matter = require("gray-matter")

// Paths
const JEKYLL_POSTS_DIR = path.join(process.cwd(), "_posts")
const JEKYLL_CERTIFICATIONS_DIR = path.join(process.cwd(), "_certifications")
const JEKYLL_PROJECTS_DIR = path.join(process.cwd(), "_projects")
const JEKYLL_PROFILE_DIR = path.join(process.cwd(), "_profile")
const NEXT_DATA_DIR = path.join(process.cwd(), "lib", "jekyll-data")

// Ensure the Next.js data directory exists
function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
    console.log(`✅ Created directory: ${dir}`)
  }
}

// Function to convert Jekyll profile data to Next.js compatible format
function convertJekyllProfile() {
  console.log("🔄 Converting Jekyll profile data to Next.js format...")

  ensureDirectoryExists(JEKYLL_PROFILE_DIR)

  // Get all profile data files
  const profileFiles = fs
    .readdirSync(JEKYLL_PROFILE_DIR)
    .filter((file) => file.endsWith(".md") || file.endsWith(".markdown"))

  if (profileFiles.length === 0) {
    console.log("📝 No Jekyll profile data found. Creating sample data...")
    return createSampleProfile()
  }

  const profileData = {}

  // Process each profile data file
  profileFiles.forEach((file) => {
    const filePath = path.join(JEKYLL_PROFILE_DIR, file)

    try {
      const fileContent = fs.readFileSync(filePath, "utf8")
      const { data, content } = matter(fileContent)
      const section = file.replace(/\.(md|markdown)$/, "")

      profileData[section] = {
        ...data,
        content: content.trim(),
      }

      console.log(`✅ Processed profile section: ${section}`)
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error.message)
    }
  })

  // Write to Next.js data file
  fs.writeFileSync(path.join(NEXT_DATA_DIR, "profile.json"), JSON.stringify(profileData, null, 2))
  console.log(`✅ Converted profile data to Next.js format`)
  return profileData
}

// Function to create sample profile data
function createSampleProfile() {
  const profileSections = {
    "basic-info": {
      frontMatter: {
        name: "Dr. Vu Huy",
        title: "AI Researcher & Specialist",
        email: "contact@vuhuy.ai",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
        website: "https://vuhuy.ai",
        profileImage: "/placeholder.svg?height=600&width=600&text=Profile+Image",
        bio: "I'm a passionate AI researcher and engineer with over 6 years of experience in machine learning, data science, and artificial intelligence.",
        socialLinks: [
          { platform: "github", url: "https://github.com/vuhuyai" },
          { platform: "linkedin", url: "https://linkedin.com/in/vuhuyai" },
          { platform: "twitter", url: "https://twitter.com/vuhuyai" },
        ],
      },
      content: `# Thông tin cá nhân cơ bản

Chỉnh sửa file này để cập nhật thông tin cá nhân của bạn.

## Hướng dẫn:
1. Chỉnh sửa phần YAML frontmatter ở trên
2. Chạy \`npm run jekyll:update\` để cập nhật
3. Khởi động lại server development`,
    },
    about: {
      frontMatter: {
        mission:
          "At VUHUY AI, we're dedicated to pushing the boundaries of artificial intelligence through innovative research and practical applications.",
        values: [
          {
            name: "Innovation",
            description: "Constantly exploring new ideas and approaches to solve complex problems.",
          },
          {
            name: "Collaboration",
            description: "Working together with researchers, developers, and organizations to achieve greater impact.",
          },
          {
            name: "Accessibility",
            description: "Making AI technologies and knowledge available to diverse communities worldwide.",
          },
        ],
        team: [
          {
            name: "Dr. Vu Huy",
            role: "Founder & Lead Researcher",
            image: "/placeholder.svg?height=300&width=300&text=VH",
            bio: "Expert in NLP and machine learning with over 10 years of research experience.",
          },
        ],
      },
      content: `# Nội dung trang About

Chỉnh sửa file này để cập nhật nội dung trang About.`,
    },
    contact: {
      frontMatter: {
        email: "contact@vuhuy.ai",
        phone: "+1 (555) 123-4567",
        address: "123 AI Street, San Francisco, CA 94105",
        mapLocation: { lat: 37.7749, lng: -122.4194, zoom: 13 },
        socialLinks: [
          { platform: "github", url: "https://github.com/vuhuyai" },
          { platform: "linkedin", url: "https://linkedin.com/in/vuhuyai" },
          { platform: "twitter", url: "https://twitter.com/vuhuyai" },
        ],
        formEndpoint: "https://formspree.io/f/your-form-id",
        availabilityHours: "Monday - Friday: 9:00 AM - 5:00 PM (PST)",
      },
      content: `# Thông tin liên hệ

Chỉnh sửa file này để cập nhật thông tin liên hệ.`,
    },
    skills: {
      frontMatter: {
        technical: [
          { name: "Machine Learning", level: 95, category: "AI" },
          { name: "Python", level: 90, category: "Programming" },
          { name: "Data Science", level: 88, category: "Data" },
          { name: "Deep Learning", level: 85, category: "AI" },
          { name: "NLP", level: 82, category: "AI" },
          { name: "Computer Vision", level: 80, category: "AI" },
        ],
        languages: [
          { name: "English", level: "Native" },
          { name: "Vietnamese", level: "Native" },
          { name: "French", level: "Intermediate" },
        ],
        soft: ["Research", "Technical Writing", "Public Speaking", "Team Leadership"],
      },
      content: `# Kỹ năng

Chỉnh sửa file này để cập nhật kỹ năng của bạn.`,
    },
    experience: {
      frontMatter: {
        jobs: [
          {
            title: "Senior AI Research Engineer",
            company: "Tech Innovation Lab",
            location: "San Francisco, CA",
            period: "2022 - Present",
            description:
              "Leading AI research projects focusing on natural language processing and computer vision applications.",
            achievements: [
              "Developed state-of-the-art NLP models with 15% performance improvement",
              "Published 5 research papers in top-tier conferences",
              "Led a team of 8 researchers and engineers",
            ],
          },
        ],
      },
      content: `# Kinh nghiệm làm việc

Chỉnh sửa file này để cập nhật kinh nghiệm làm việc.`,
    },
    education: {
      frontMatter: {
        degrees: [
          {
            degree: "Ph.D. in Computer Science",
            school: "Stanford University",
            location: "Stanford, CA",
            period: "2016 - 2020",
            focus: "Artificial Intelligence & Machine Learning",
            gpa: "3.9/4.0",
          },
        ],
      },
      content: `# Học vấn

Chỉnh sửa file này để cập nhật thông tin học vấn.`,
    },
  }

  // Create sample profile files
  Object.entries(profileSections).forEach(([section, data]) => {
    const fileName = `${section}.md`
    const filePath = path.join(JEKYLL_PROFILE_DIR, fileName)

    const yamlContent = Object.entries(data.frontMatter)
      .map(([key, value]) => {
        if (typeof value === "string") {
          return `${key}: "${value}"`
        } else {
          return `${key}: ${JSON.stringify(value, null, 2)}`
        }
      })
      .join("\n")

    const fileContent = `---
${yamlContent}
---

${data.content}
`

    fs.writeFileSync(filePath, fileContent)
    console.log(`✅ Created ${fileName}`)
  })

  // Convert to JSON format
  const profileData = {}
  Object.entries(profileSections).forEach(([section, data]) => {
    profileData[section] = {
      ...data.frontMatter,
      content: data.content,
    }
  })

  fs.writeFileSync(path.join(NEXT_DATA_DIR, "profile.json"), JSON.stringify(profileData, null, 2))
  console.log(`✅ Created sample profile data`)
  return profileData
}

// Function to convert Jekyll posts
function convertJekyllPosts() {
  console.log("🔄 Converting Jekyll posts to Next.js format...")

  ensureDirectoryExists(JEKYLL_POSTS_DIR)

  const postFiles = fs
    .readdirSync(JEKYLL_POSTS_DIR)
    .filter((file) => file.endsWith(".md") || file.endsWith(".markdown"))

  if (postFiles.length === 0) {
    console.log("📝 No Jekyll posts found. Creating sample data...")
    return createSamplePosts()
  }

  const posts = postFiles.map((file) => {
    const filePath = path.join(JEKYLL_POSTS_DIR, file)
    const fileContent = fs.readFileSync(filePath, "utf8")
    const { data, content } = matter(fileContent)
    const slug = file.replace(/^\d{4}-\d{2}-\d{2}-(.+)\.md$/, "$1")

    return {
      slug,
      title: data.title,
      date: data.date ? (data.date instanceof Date ? data.date.toISOString() : data.date) : new Date().toISOString(),
      excerpt: data.excerpt || "",
      content: content,
      coverImage: data.coverImage || null,
      readingTime: data.readingTime || 5,
      tags: data.tags || [],
      author: data.author || "VUHUY AI",
    }
  })

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  fs.writeFileSync(path.join(NEXT_DATA_DIR, "posts.json"), JSON.stringify(posts, null, 2))
  console.log(`✅ Converted ${posts.length} posts to Next.js format`)
  return posts
}

// Function to create sample posts
function createSamplePosts() {
  const samplePost = {
    slug: "introduction-to-nlp",
    title: "Introduction to Natural Language Processing",
    date: new Date("2023-06-15").toISOString(),
    excerpt: "An overview of NLP concepts and techniques for beginners.",
    content: `Natural Language Processing (NLP) is a field of artificial intelligence that focuses on the interaction between computers and humans through natural language.

## Key Concepts in NLP

- **Tokenization**: Breaking down text into smaller units
- **Part-of-speech tagging**: Identifying grammatical parts of speech
- **Named entity recognition**: Identifying and classifying named entities
- **Sentiment analysis**: Determining emotional tone

## Applications

- Virtual assistants
- Email filters and spam detection
- Language translation services
- Text summarization tools`,
    coverImage: "/placeholder.svg?height=400&width=800&text=NLP+Introduction",
    readingTime: 5,
    tags: ["NLP", "AI", "Machine Learning"],
    author: "Dr. Vu Huy",
  }

  const date = new Date(samplePost.date)
  const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
  const fileName = `${formattedDate}-${samplePost.slug}.md`
  const filePath = path.join(JEKYLL_POSTS_DIR, fileName)

  const frontMatter = `---
layout: post
title: "${samplePost.title}"
date: ${formattedDate}
excerpt: "${samplePost.excerpt}"
coverImage: "${samplePost.coverImage}"
readingTime: ${samplePost.readingTime}
tags: ${JSON.stringify(samplePost.tags)}
author: "${samplePost.author}"
---

${samplePost.content}
`

  fs.writeFileSync(filePath, frontMatter)
  fs.writeFileSync(path.join(NEXT_DATA_DIR, "posts.json"), JSON.stringify([samplePost], null, 2))
  console.log(`✅ Created sample post`)
  return [samplePost]
}

// Function to convert Jekyll certifications
function convertJekyllCertifications() {
  console.log("🔄 Converting Jekyll certifications to Next.js format...")

  ensureDirectoryExists(JEKYLL_CERTIFICATIONS_DIR)

  const certFiles = fs
    .readdirSync(JEKYLL_CERTIFICATIONS_DIR)
    .filter((file) => file.endsWith(".md") || file.endsWith(".markdown"))

  if (certFiles.length === 0) {
    console.log("📝 No Jekyll certifications found. Creating sample data...")
    return createSampleCertifications()
  }

  const certifications = certFiles.map((file) => {
    const filePath = path.join(JEKYLL_CERTIFICATIONS_DIR, file)
    const fileContent = fs.readFileSync(filePath, "utf8")
    const { data, content } = matter(fileContent)
    const id = file.replace(/\.md$/, "")

    return {
      id,
      name: data.title,
      platform: data.platform,
      issueDate: data.issueDate,
      expiryDate: data.expiryDate || null,
      description: data.description,
      image: data.image || null,
      url: data.url,
      skills: data.skills || [],
      content: content,
    }
  })

  certifications.sort((a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime())
  fs.writeFileSync(path.join(NEXT_DATA_DIR, "certifications.json"), JSON.stringify(certifications, null, 2))
  console.log(`✅ Converted ${certifications.length} certifications to Next.js format`)
  return certifications
}

// Function to create sample certifications
function createSampleCertifications() {
  const sampleCert = {
    id: "machine-learning",
    name: "Machine Learning",
    platform: "Coursera",
    issueDate: "2023-01-15",
    expiryDate: "",
    description: "Comprehensive course covering machine learning algorithms and their applications.",
    image: "/placeholder.svg?height=400&width=800&text=Machine+Learning",
    url: "https://www.coursera.org/account/accomplishments/verify/123456",
    skills: ["Python", "Scikit-Learn", "TensorFlow", "Neural Networks"],
    content: `This certification validates expertise in machine learning fundamentals, including supervised and unsupervised learning algorithms.`,
  }

  const fileName = `${sampleCert.id}.md`
  const filePath = path.join(JEKYLL_CERTIFICATIONS_DIR, fileName)

  const frontMatter = `---
layout: certification
title: "${sampleCert.name}"
platform: "${sampleCert.platform}"
issueDate: "${sampleCert.issueDate}"
expiryDate: "${sampleCert.expiryDate}"
description: "${sampleCert.description}"
image: "${sampleCert.image}"
url: "${sampleCert.url}"
skills: ${JSON.stringify(sampleCert.skills)}
---

${sampleCert.content}
`

  fs.writeFileSync(filePath, frontMatter)
  fs.writeFileSync(path.join(NEXT_DATA_DIR, "certifications.json"), JSON.stringify([sampleCert], null, 2))
  console.log(`✅ Created sample certification`)
  return [sampleCert]
}

// Function to convert Jekyll projects
function convertJekyllProjects() {
  console.log("🔄 Converting Jekyll projects to Next.js format...")

  ensureDirectoryExists(JEKYLL_PROJECTS_DIR)

  const projectFiles = fs
    .readdirSync(JEKYLL_PROJECTS_DIR)
    .filter((file) => file.endsWith(".md") || file.endsWith(".markdown"))

  if (projectFiles.length === 0) {
    console.log("📝 No Jekyll projects found. Creating sample data...")
    return createSampleProjects()
  }

  const projects = projectFiles.map((file) => {
    const filePath = path.join(JEKYLL_PROJECTS_DIR, file)
    const fileContent = fs.readFileSync(filePath, "utf8")
    const { data, content } = matter(fileContent)
    const id = file.replace(/\.md$/, "")

    return {
      id,
      title: data.title,
      description: data.description,
      image: data.image || null,
      demoUrl: data.demoUrl || null,
      repoUrl: data.repoUrl || null,
      technologies: data.technologies || [],
      featured: data.featured || false,
      date: data.date ? (data.date instanceof Date ? data.date.toISOString() : data.date) : new Date().toISOString(),
      content: content,
    }
  })

  projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  fs.writeFileSync(path.join(NEXT_DATA_DIR, "projects.json"), JSON.stringify(projects, null, 2))
  console.log(`✅ Converted ${projects.length} projects to Next.js format`)
  return projects
}

// Function to create sample projects
function createSampleProjects() {
  const sampleProject = {
    id: "multilingual-sentiment-analysis",
    title: "Multilingual Sentiment Analysis",
    description: "A deep learning model for sentiment analysis across 100+ languages with minimal training data.",
    image: "/placeholder.svg?height=400&width=800&text=Sentiment+Analysis",
    demoUrl: "https://demo.example.com/sentiment",
    repoUrl: "https://github.com/yourusername/multilingual-sentiment",
    technologies: ["PyTorch", "Transformers", "FastAPI", "React"],
    featured: true,
    date: new Date("2023-05-15").toISOString(),
    content: `## Project Overview

This project implements a multilingual sentiment analysis system that can detect sentiment in over 100 languages.

## Key Features

- Sentiment analysis in 100+ languages
- High accuracy even for low-resource languages
- Fast inference time suitable for production use`,
  }

  const date = new Date(sampleProject.date)
  const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
  const fileName = `${sampleProject.id}.md`
  const filePath = path.join(JEKYLL_PROJECTS_DIR, fileName)

  const frontMatter = `---
layout: project
title: "${sampleProject.title}"
description: "${sampleProject.description}"
image: "${sampleProject.image}"
demoUrl: "${sampleProject.demoUrl}"
repoUrl: "${sampleProject.repoUrl}"
technologies: ${JSON.stringify(sampleProject.technologies)}
featured: ${sampleProject.featured}
date: ${formattedDate}
---

${sampleProject.content}
`

  fs.writeFileSync(filePath, frontMatter)
  fs.writeFileSync(path.join(NEXT_DATA_DIR, "projects.json"), JSON.stringify([sampleProject], null, 2))
  console.log(`✅ Created sample project`)
  return [sampleProject]
}

// Main function
function main() {
  console.log("🚀 Starting Jekyll integration...")

  // Ensure data directory exists
  ensureDirectoryExists(NEXT_DATA_DIR)

  try {
    // Convert all content
    convertJekyllProfile()
    convertJekyllPosts()
    convertJekyllCertifications()
    convertJekyllProjects()

    console.log("✅ Jekyll integration completed successfully!")
    console.log("📝 You can now edit the Markdown files in _profile/, _posts/, _certifications/, and _projects/")
    console.log("🔄 Run 'npm run jekyll:update' after making changes to update the website data")
  } catch (error) {
    console.error("❌ Error during Jekyll integration:", error)
    process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  main()
}

module.exports = {
  convertJekyllProfile,
  convertJekyllPosts,
  convertJekyllCertifications,
  convertJekyllProjects,
}

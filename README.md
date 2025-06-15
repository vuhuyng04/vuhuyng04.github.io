# VUHUY AI - Personal Website & Blog

A modern, responsive personal website and blog built with Next.js, featuring AI-themed design and Jekyll-style content management.

## 🚀 Features

### Blog System
- **Advanced Filtering**: Filter by categories, tags, and search terms
- **Pagination**: Efficient pagination for large numbers of posts
- **Statistics**: Blog statistics and popular tags display
- **Responsive Design**: Optimized for all device sizes
- **SEO Optimized**: Meta tags and structured data

### Content Management
- **Jekyll-style Markdown**: Write posts in Markdown with frontmatter
- **Image Organization**: Structured image directories for posts
- **Categories & Tags**: Flexible categorization system
- **Reading Time**: Automatic reading time calculation

### Design & UX
- **AI-themed Design**: Modern design with AI/tech aesthetics
- **Dark/Light Mode**: Theme switching support
- **Animations**: Smooth animations and transitions
- **Interactive Elements**: Hover effects and micro-interactions

## 📁 Project Structure

```
├── _posts/                     # Blog posts (Markdown)
├── _certifications/            # Certifications (Markdown)
├── _projects/                  # Projects (Markdown)
├── _profile/                   # Profile information (Markdown)
├── app/                        # Next.js app directory
├── components/                 # React components
├── lib/                        # Utility functions and data
├── public/
│   └── assets/
│       └── images/
│           ├── blog/
│           │   ├── posts/      # Blog post images
│           │   └── categories/ # Category images
│           ├── certifications/ # Certification images
│           ├── projects/       # Project images
│           └── logos/          # Company/organization logos
└── styles/                     # Global styles
```

## 🖼️ Image Organization

### Blog Post Images
Place your blog post images in `public/assets/images/blog/posts/`:

```
public/assets/images/blog/posts/
├── ai-trends-2024.jpg
├── ml-production-best-practices.png
├── deep-learning-optimization.svg
└── ...
```

### Naming Convention
- Use descriptive names that match your post content
- Use lowercase with hyphens for consistency
- Include relevant keywords for SEO

### Supported Formats
- **JPEG/JPG**: For photographs and complex images
- **PNG**: For images with transparency or simple graphics
- **SVG**: For scalable vector graphics and diagrams
- **WebP**: For optimized web images (recommended)

## 📝 Writing Blog Posts

### Creating a New Post

1. Create a new Markdown file in `_posts/` with the format: `YYYY-MM-DD-post-slug.md`
2. Add frontmatter with required fields:

```markdown
---
layout: post
title: "Your Post Title"
date: 2024-01-15
excerpt: "Brief description of your post"
coverImage: "/assets/images/blog/posts/your-image.jpg"
readingTime: 7
tags: ["AI", "Machine Learning", "Technology"]
author:
  name: "Your Name"
  image: "/assets/images/photo.jpg"
---

Your post content goes here...
```

### Required Frontmatter Fields
- `title`: Post title
- `date`: Publication date (YYYY-MM-DD)
- `excerpt`: Brief description for previews
- `coverImage`: Path to cover image
- `readingTime`: Estimated reading time in minutes
- `tags`: Array of tags for categorization

### Optional Fields
- `author`: Author information with name and image
- `featured`: Boolean to mark as featured post
- `category`: Primary category for the post

## 🏷️ Categories and Tags

### Categories
Categories are automatically generated from your tags. The most frequently used tags become categories in the filter dropdown.

### Tags
Use descriptive tags to help readers find related content:
- **Technical**: "AI", "Machine Learning", "Deep Learning", "NLP"
- **Topics**: "Research", "Tutorial", "Best Practices", "Trends"
- **Difficulty**: "Beginner", "Intermediate", "Advanced"

## 🎨 Customization

### Theme Colors
Modify the color scheme in `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      primary: "your-primary-color",
      secondary: "your-secondary-color",
      // ... other colors
    }
  }
}
```

### Typography
Update fonts in `app/layout.tsx`:

```typescript
import { Inter, Roboto } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })
const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] })
```

## 🚀 Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd vuhuy-ai-website

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint
- `npm run deploy`: Deploy to GitHub Pages

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔍 SEO Features

- Meta tags for all pages
- Open Graph tags for social sharing
- Structured data for blog posts
- Sitemap generation
- Optimized images with alt text

## 🌐 Deployment

### GitHub Pages
The site is configured for automatic deployment to GitHub Pages:

1. Push to the main branch
2. GitHub Actions will build and deploy automatically
3. Site will be available at `https://yourusername.github.io`

### Custom Domain
To use a custom domain:

1. Add a `CNAME` file to the `public/` directory
2. Configure DNS settings with your domain provider
3. Update the repository settings in GitHub

## 📊 Analytics

To add analytics:

1. **Google Analytics**: Add your tracking ID to `app/layout.tsx`
2. **Vercel Analytics**: Install `@vercel/analytics` package
3. **Custom Analytics**: Implement in the layout component

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the documentation
2. Search existing issues
3. Create a new issue with detailed information
4. Contact: huynvce180384@fpt.edu.vn

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Animations with [Framer Motion](https://www.framer.com/motion/)

---

**Happy blogging!** 🎉
const fs = require("fs")
const path = require("path")
const { execSync } = require("child_process")

console.log("🚀 Setting up Personal Website with Jekyll Integration...")

// Create necessary directories
const directories = [
  "lib/jekyll-data",
  "_posts",
  "_certifications",
  "_projects",
  "_profile",
  "public/images/posts",
  "public/images/projects",
  "public/images/certifications",
]

directories.forEach((dir) => {
  const fullPath = path.join(process.cwd(), dir)
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true })
    console.log(`✅ Created directory: ${dir}`)
  }
})

// Check if gray-matter is installed
try {
  require("gray-matter")
  console.log("✅ gray-matter dependency found")
} catch (error) {
  console.log("📦 Installing gray-matter...")
  try {
    execSync("npm install gray-matter", { stdio: "inherit" })
    console.log("✅ gray-matter installed successfully")
  } catch (installError) {
    console.error("❌ Failed to install gray-matter:", installError.message)
    console.log("Please run: npm install gray-matter")
  }
}

// Run Jekyll integration
console.log("🔄 Running Jekyll integration...")
try {
  const jekyllIntegration = require("./jekyll-integration.js")
  console.log("✅ Jekyll integration completed!")
} catch (error) {
  console.error("❌ Error running Jekyll integration:", error.message)
}

// Create .gitignore if it doesn't exist
const gitignorePath = path.join(process.cwd(), ".gitignore")
if (!fs.existsSync(gitignorePath)) {
  const gitignoreContent = `# Dependencies
node_modules/
/.pnp
.pnp.js

# Testing
/coverage

# Next.js
/.next/
/out/

# Production
/build

# Misc
.DS_Store
*.tsbuildinfo
next-env.d.ts

# Environment variables
.env*.local

# IDE
.vscode/
.idea/

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Jekyll data (auto-generated)
lib/jekyll-data/
`
  fs.writeFileSync(gitignorePath, gitignoreContent)
  console.log("✅ Created .gitignore")
}

console.log(`
🎉 Setup completed successfully!

📁 Directory structure created:
   ├── _profile/          # Personal information (Markdown)
   ├── _posts/            # Blog posts (Markdown)
   ├── _certifications/   # Certifications (Markdown)
   ├── _projects/         # Projects (Markdown)
   └── lib/jekyll-data/   # Generated JSON data

🚀 Next steps:
   1. Edit Markdown files in _profile/, _posts/, etc.
   2. Run 'npm run jekyll:update' to process changes
   3. Run 'npm run dev' to start development server
   4. Push to GitHub for automatic deployment

📝 Available commands:
   npm run dev           # Start development server
   npm run build         # Build for production
   npm run jekyll:update # Process Markdown files
   npm run setup         # Run this setup again
   npm run clean         # Clean build files

Happy coding! 🎯
`)

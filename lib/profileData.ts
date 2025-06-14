export interface ProfileBasicInfo {
  name: string
  title: string
  email: string
  phone: string
  location: string
  website: string
  profileImage: string
  bio: string
  socialLinks: { platform: string; url: string }[]
}

export interface Skill {
  name: string;
  icon: string;
  category?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  years: string;
  description: string;
  logo: string;
}

export interface ExperienceItem {
  position: string;
  company: string;
  years: string;
  description: string;
  logo: string;
}

export interface ResearchInterest {
  name: string;
  description?: string;
  image?: string;
  icon?: string;
}

export interface Publication {
  title: string;
  journal?: string;
  conference?: string;
  year: number;
  url?: string;
  description?: string;
  authors: string;
}

export interface Collaboration {
  name: string;
  logo: string;
  description: string;
}

export interface AboutContent {
  mission: string;
  values: { name: string; description: string }[];
  team: { name: string; role: string; image: string; bio: string }[];
}

export interface ContactInfoItem {
  icon?: string; // Optional icon path or type if using dynamic icons
  label: string;
  value: string;
  href: string | null;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon?: string; // Optional icon path, e.g., for LucideReact
  color?: string; // Optional color for styling, if needed
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ContactContent {
  contactInfo: ContactInfoItem[];
  socialLinks: SocialLink[];
  faqs: FAQ[];
  contentHtml: string;
  title?: string;
} 
"use client"

import React from "react"

import Link from "next/link"
import { Github, Twitter, Linkedin, Mail, ArrowRight, Cpu, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { ContactInfoItem, SocialLink } from "@/lib/profileData"

interface FooterProps {
  contactInfo: ContactInfoItem[];
  socialLinks: SocialLink[];
}

export function Footer({ contactInfo = [], socialLinks = [] }: FooterProps) {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // Here you would typically send this to your backend
      console.log("Subscribing email:", email)
      setSubscribed(true)
      setEmail("")
      setTimeout(() => setSubscribed(false), 5000)
    }
  }

  const getContactDetail = (label: "Email" | "Phone" | "Location") => {
    return (contactInfo ?? []).find(item => item.label === label);
  };

  const emailDetail = getContactDetail("Email");
  const phoneDetail = getContactDetail("Phone");
  const locationDetail = getContactDetail("Location");

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return <Github className="h-6 w-6" />;
      case 'twitter':
        return <Twitter className="h-6 w-6" />;
      case 'linkedin':
        return <Linkedin className="h-6 w-6" />;
      case 'mail':
        return <Mail className="h-6 w-6" />;
      default:
        return null;
    }
  };

  return (
    <footer className="relative z-10 bg-gradient-to-br from-gray-900 to-blue-900 text-white pt-20 pb-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center mb-6">
              <div className="flex items-center">
                <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center rounded-md shadow-lg relative overflow-hidden">
                  <div className="relative z-10">
                    <Cpu className="h-6 w-6 text-white" />
                  </div>
                  <div className="absolute -bottom-10 -right-10 w-16 h-16 bg-blue-400/20 rounded-full"></div>
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-indigo-400/20 rounded-full"></div>
                </div>
                <span className="ml-3 text-2xl font-bold text-white">
                  <span className="text-red-400">VU</span>
                  <span className="text-blue-300">HUY</span>
                  <span className="text-xs ml-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-2 py-0.5 rounded-md">
                    AI
                  </span>
                </span>
              </div>
            </Link>
            <p className="text-gray-300 mb-8 text-lg leading-relaxed">
              Advancing AI-driven technologies with a focus on machine learning, data science, and applied AI research.
            </p>

            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-white">Subscribe to my newsletter</h4>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  {subscribed ? "Subscribed!" : "Subscribe"}
                </Button>
              </form>
              {subscribed && <p className="text-green-400 text-sm mt-2">Thank you for subscribing!</p>}
            </div>

            <div className="flex space-x-5">
              {socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  aria-label={link.platform}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {getSocialIcon(link.platform)}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { name: "Home", href: "/" },
                { name: "About", href: "/about" },
                { name: "Research", href: "/research" },
                { name: "Projects", href: "/projects" },
                { name: "Certifications", href: "/certifications" },
                { name: "Blog", href: "/blog" },
                { name: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <ArrowRight className="h-4 w-0 mr-0 opacity-0 group-hover:w-4 group-hover:mr-2 group-hover:opacity-100 transition-all duration-300" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-lg font-semibold mb-6 text-white">Contact</h3>
            <address className="not-italic text-gray-300 space-y-3">
              {locationDetail && (
                <p className="flex items-start">
                  <MapPin
                    className="h-5 w-5 mr-3 text-blue-400 flex-shrink-0 mt-1"
                  />
                  <span>{locationDetail.value}</span>
                </p>
              )}
              {emailDetail && (
                <p className="flex items-center">
                  <Mail
                    className="h-5 w-5 mr-3 text-blue-400 flex-shrink-0"
                  />
                  <a href={emailDetail.href} className="hover:underline">{emailDetail.value}</a>
                </p>
              )}
              {phoneDetail && (
                <p className="flex items-center">
                  <Phone
                    className="h-5 w-5 mr-3 text-blue-400 flex-shrink-0"
                  />
                  <a href={phoneDetail.href} className="hover:underline">{phoneDetail.value}</a>
                </p>
              )}
            </address>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} VUHUY AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;

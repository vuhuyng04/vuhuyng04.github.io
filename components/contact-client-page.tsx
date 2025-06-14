"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Github,
  Linkedin,
  Twitter,
  MessageSquare,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { ContactContent, ContactInfoItem, SocialLink, FAQ } from "@/lib/profileData" // Import interfaces
import ReactMarkdown from 'react-markdown'; // Import ReactMarkdown

interface ContactClientPageProps {
  contactData: ContactContent;
}

export default function ContactClientPage({ contactData }: ContactClientPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Here you would typically send the form data to your backend or form service
      console.log("Form submitted:", formData)

      setSubmitStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Use data from contactData prop instead of hardcoded arrays
  const contactInfoDisplayItems = contactData.contactInfo.map(item => {
    let IconComponent: React.ElementType | null = null;
    switch (item.label) {
      case "Email": IconComponent = Mail; break;
      case "Phone": IconComponent = Phone; break;
      case "Location": IconComponent = MapPin; break;
      case "Availability": IconComponent = Clock; break;
      default: IconComponent = null; // Or a default icon if preferred
    }

    const href = item.label === "Phone" ? `tel:${item.value?.replace(/\s/g, '') || ""}` :
                 item.label === "Email" ? `mailto:${item.value || ""}` :
                 item.label === "Location" ? `https://maps.google.com/?q=${encodeURIComponent(item.value || "")}` :
                 null;

    return {
      IconComponent: IconComponent,
      label: item.label,
      value: item.value,
      href: href,
    };
  }).filter(item => item.IconComponent !== null); // Filter out items with no icon

  const socialLinks: SocialLink[] = contactData.socialLinks.map(link => {
    let iconComponent;
    let colorClass;
    switch (link.platform.toLowerCase()) {
      case 'github':
        iconComponent = <Github className="h-5 w-5" />;
        colorClass = "bg-gray-800 hover:bg-gray-700";
        break;
      case 'linkedin':
        iconComponent = <Linkedin className="h-5 w-5" />;
        colorClass = "bg-blue-600 hover:bg-blue-700";
        break;
      case 'twitter':
        iconComponent = <Twitter className="h-5 w-5" />;
        colorClass = "bg-sky-500 hover:bg-sky-600";
        break;
      default:
        iconComponent = null; // Or a default generic icon
        colorClass = "";
    }
    return {
      ...link,
      icon: iconComponent as unknown as string,
      color: colorClass
    };
  }).filter(link => link.icon !== null); // Filter out unsupported platforms

  const faqs: FAQ[] = contactData.faqs;

  return (
    <div className="flex-grow">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 to-indigo-900 text-white py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100&text=+')] opacity-5"></div>
          <div className="tech-pattern absolute inset-0 opacity-10"></div>
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-500 rounded-full filter blur-3xl opacity-10 animate-blob"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-indigo-500 rounded-full filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{contactData.title || "Get In Touch"}</h1>
            {/* Render content HTML if available */}
            {contactData.contentHtml && (
              <div className="text-xl md:text-2xl text-blue-100 leading-relaxed">
                <ReactMarkdown>
                  {contactData.contentHtml}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold flex items-center">
                    <MessageSquare className="mr-3 h-6 w-6 text-blue-600" />
                    Send a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="What's this about?"
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell me more about your project or inquiry..."
                        rows={6}
                        className="w-full"
                      />
                    </div>

                    {submitStatus === "success" && (
                      <div className="flex items-center p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                        <span className="text-green-800 dark:text-green-200">
                          Message sent successfully! I'll get back to you soon.
                        </span>
                      </div>
                    )}

                    {submitStatus === "error" && (
                      <div className="flex items-center p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
                        <span className="text-red-800 dark:text-red-200">
                          Failed to send message. Please try again or contact me directly.
                        </span>
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                          Sending...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </div>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Details */}
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Contact Info List */}
                  <div className="space-y-6">
                    {contactInfoDisplayItems.map((item, index) => (
                      <div key={index} className="flex items-start">
                        {item.IconComponent && <item.IconComponent className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-4 flex-shrink-0" />}
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-gray-200">{item.label}</p>
                          {item.href ? (
                            <a href={item.href} className="text-blue-600 hover:underline dark:text-blue-400 break-words">
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-gray-700 dark:text-gray-300 break-words">{item.value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Connect With Me</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-3 rounded-lg text-white transition-colors duration-200 ${social.color}`}
                        aria-label={social.platform}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mt-4">
                    Follow me on social media for the latest updates on AI research and projects.
                  </p>
                </CardContent>
              </Card>

              {/* Response Time */}
              <Card className="shadow-xl">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Badge variant="secondary" className="mb-2">
                      Quick Response
                    </Badge>
                    <p className="text-gray-600 dark:text-gray-400">
                      I typically respond to messages within 24-48 hours during business days.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Common questions about my work and collaboration opportunities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {faqs.map((faq, index) => (
                <Card key={index} className="shadow-lg">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-3 text-gray-900 dark:text-white">{faq.question}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .tech-pattern {
          background-image: radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0);
          background-size: 20px 20px;
        }

        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  )
} 
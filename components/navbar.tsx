"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, Cpu } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Research", href: "/research" },
    { name: "Projects", href: "/projects" },
    { name: "Certifications", href: "/certifications" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ]

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/90 dark:bg-gray-900/90 shadow-md backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <div className="flex items-center">
                <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center rounded-md shadow-md group-hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative z-10">
                    <Cpu className="h-6 w-6 text-white" />
                  </div>
                  <div className="absolute -bottom-10 -right-10 w-16 h-16 bg-blue-400/20 rounded-full"></div>
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-indigo-400/20 rounded-full"></div>
                </div>
                <span
                  className={cn(
                    "ml-3 text-2xl font-bold transition-colors duration-300",
                    scrolled ? "text-gray-900 dark:text-white" : "text-white",
                  )}
                >
                  <span className="text-red-500 dark:text-red-400">VU</span>
                  <span className={scrolled ? "text-blue-700 dark:text-blue-400" : "text-white"}>HUY</span>
                  <span className="text-xs ml-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-2 py-0.5 rounded-md">
                    AI
                  </span>
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium transition-colors duration-300",
                  scrolled
                    ? "text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                    : "text-white/90 hover:text-white",
                  isActive(item.href) && (scrolled ? "text-blue-600 dark:text-blue-400" : "text-white"),
                )}
              >
                {item.name}
                {isActive(item.href) && (
                  <motion.div
                    layoutId="activeTab"
                    className={cn(
                      "absolute bottom-0 left-0 right-0 h-0.5 rounded-full",
                      scrolled ? "bg-blue-600 dark:bg-blue-400" : "bg-white",
                    )}
                    initial={false}
                  />
                )}
              </Link>
            ))}
            <div className="ml-2">
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <button
              type="button"
              className={cn(
                "ml-2 inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-100/20 dark:hover:bg-gray-800/20 focus:outline-none",
                scrolled ? "text-gray-700 dark:text-gray-200" : "text-white",
              )}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 shadow-lg"
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "block px-3 py-2 rounded-md text-base font-medium",
                      isActive(item.href)
                        ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                        : "text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800",
                    )}
                    onClick={() => {
                      setMobileMenuOpen(false)
                    }}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

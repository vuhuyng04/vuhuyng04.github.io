"use client"

import { useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CertificateCard } from "@/components/certificate-card"
import { motion, useInView } from "framer-motion"
import { Certificate } from "@/lib/certificationsData"

interface FeaturedCertificationsProps {
  certifications: Certificate[];
}

export default function FeaturedCertifications({ certifications }: FeaturedCertificationsProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  // Duplicate certifications to create a seamless loop effect
  const allCertifications = [...certifications, ...certifications];

  return (
    <section ref={ref} className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-center mb-16"
        >
          <h2 className="text-4xl font-bold dark:text-white mb-4 md:mb-0 inline-block relative">
            Certifications
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></span>
          </h2>
          <Link href="/certifications">
            <Button
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-600 transition-colors duration-300"
            >
              View All Certifications
            </Button>
          </Link>
        </motion.div>

        <div className="relative w-full overflow-hidden py-4">
          <div className="flex flex-row space-x-8 animate-scroll-certifications w-max">
            {allCertifications.map((cert, index) => (
              <div key={index} className="flex-shrink-0 w-[300px]"> {/* Fixed width for each card */}
                <CertificateCard certificate={cert} index={index} />
              </div>
          ))}
          </div>
        </div>

      </div>
    </section>
  )
}

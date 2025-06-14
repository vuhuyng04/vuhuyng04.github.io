"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { formatDate } from "@/lib/date-utils"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Certificate } from "@/lib/certification-utils"

interface CertificateCardProps {
  certificate: Certificate
  index?: number
}

export function CertificateCard({ certificate, index = 0 }: CertificateCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="overflow-hidden flex flex-col h-full rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={certificate.image || "/placeholder.svg?height=200&width=400"}
            alt={certificate.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>

          <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full">
            {certificate.platform}
          </div>
        </div>

        <div className="p-6 flex-grow">
          <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {certificate.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            Issued: {formatDate(new Date(certificate.issueDate), "MMMM yyyy")}
            {certificate.expiryDate && <> • Expires: {formatDate(new Date(certificate.expiryDate), "MMMM yyyy")}</>}
          </p>
          <p className="text-gray-700 dark:text-gray-300">{certificate.description}</p>

          {certificate.skills && certificate.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {certificate.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="px-6 pb-6 pt-0">
          <a href={certificate.url} target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center"
            >
              View Certificate
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </motion.div>
  )
}

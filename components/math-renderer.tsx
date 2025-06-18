"use client"

import { useEffect, useRef } from 'react'

interface MathRendererProps {
  content: string
  className?: string
}

export default function MathRenderer({ content, className = "" }: MathRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadMathJax = async () => {
      // Check if MathJax is already loaded
      if (typeof window !== 'undefined' && !(window as any).MathJax) {
        // Configure MathJax
        (window as any).MathJax = {
          tex: {
            inlineMath: [['$', '$'], ['\\(', '\\)']],
            displayMath: [['$$', '$$'], ['\\[', '\\]']],
            processEscapes: true,
            processEnvironments: true
          },
          options: {
            skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
            ignoreHtmlClass: 'tex2jax_ignore',
            processHtmlClass: 'tex2jax_process'
          },
          svg: {
            fontCache: 'global'
          }
        }

        // Load MathJax script
        const script = document.createElement('script')
        script.src = 'https://polyfill.io/v3/polyfill.min.js?features=es6'
        document.head.appendChild(script)

        const mathJaxScript = document.createElement('script')
        mathJaxScript.id = 'MathJax-script'
        mathJaxScript.async = true
        mathJaxScript.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js'
        document.head.appendChild(mathJaxScript)
      }

      // Wait for MathJax to load and then typeset
      const checkMathJax = () => {
        if ((window as any).MathJax && (window as any).MathJax.typesetPromise) {
          (window as any).MathJax.typesetPromise([containerRef.current]).catch((err: any) => {
            console.error('MathJax typeset error:', err)
          })
        } else {
          setTimeout(checkMathJax, 100)
        }
      }
      checkMathJax()
    }

    loadMathJax()
  }, [content])

  // Re-render math when content changes
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).MathJax && (window as any).MathJax.typesetPromise) {
      (window as any).MathJax.typesetPromise([containerRef.current]).catch((err: any) => {
        console.error('MathJax typeset error:', err)
      })
    }
  }, [content])

  return (
    <div 
      ref={containerRef}
      className={`prose prose-lg max-w-none dark:prose-invert ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
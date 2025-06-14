"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

export default function CursorEffect() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const dataPointsRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    const dataPoints = dataPointsRef.current
    if (!cursor || !cursorDot || !dataPoints) return

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e

      // Main cursor follows immediately
      cursor.style.left = `${clientX}px`
      cursor.style.top = `${clientY}px`

      // Dot follows with delay
      setTimeout(() => {
        if (cursorDot) {
          cursorDot.style.left = `${clientX}px`
          cursorDot.style.top = `${clientY}px`
        }
      }, 50)

      // Data points follow with more delay
      setTimeout(() => {
        if (dataPoints) {
          dataPoints.style.left = `${clientX}px`
          dataPoints.style.top = `${clientY}px`
        }
      }, 100)

      // Add ripple effect on click
      if (e.type === "click") {
        const ripple = document.createElement("div")
        ripple.className = "ripple"
        ripple.style.left = `${clientX}px`
        ripple.style.top = `${clientY}px`
        ripple.style.backgroundColor = isDark ? "rgba(100, 150, 255, 0.3)" : "rgba(0, 50, 150, 0.2)"
        document.body.appendChild(ripple)

        setTimeout(() => {
          document.body.removeChild(ripple)
        }, 1000)
      }
    }

    const onMouseDown = () => {
      cursor.classList.add("cursor-clicked")
      cursorDot.classList.add("cursor-dot-clicked")
    }

    const onMouseUp = () => {
      cursor.classList.remove("cursor-clicked")
      cursorDot.classList.remove("cursor-dot-clicked")
    }

    const onMouseEnter = (e: MouseEvent) => {
      if (
        (e.target as HTMLElement).tagName === "A" ||
        (e.target as HTMLElement).tagName === "BUTTON" ||
        (e.target as HTMLElement).getAttribute("role") === "button"
      ) {
        setIsHovering(true)
      }
    }

    const onMouseLeave = () => {
      setIsHovering(false)
    }

    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mousedown", onMouseDown)
    document.addEventListener("mouseup", onMouseUp)
    document.addEventListener("click", onMouseMove as EventListener)

    // Add event listeners to all interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]')
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnter as EventListener)
      el.addEventListener("mouseleave", onMouseLeave)
    })

    return () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mouseup", onMouseUp)
      document.removeEventListener("click", onMouseMove as EventListener)

      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnter as EventListener)
        el.removeEventListener("mouseleave", onMouseLeave)
      })
    }
  }, [isDark])

  return (
    <>
      <div
        ref={cursorRef}
        className={`fixed pointer-events-none z-50 w-8 h-8 rounded-full border-2 border-blue-500 dark:border-blue-400 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-100 ease-out ${isHovering ? "scale-150" : ""}`}
      ></div>

      <div
        ref={cursorDotRef}
        className="fixed pointer-events-none z-50 w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out"
      ></div>

      <div ref={dataPointsRef} className="fixed pointer-events-none z-49 transform -translate-x-1/2 -translate-y-1/2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-500/30 dark:bg-blue-400/30"
            style={{
              width: `${4 + Math.random() * 4}px`,
              height: `${4 + Math.random() * 4}px`,
              left: `${(Math.random() - 0.5) * 40}px`,
              top: `${(Math.random() - 0.5) * 40}px`,
              animationDelay: `${i * 0.1}s`,
            }}
          ></div>
        ))}
      </div>

      <style jsx global>{`
        .ripple {
          position: fixed;
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
          z-index: 49;
          animation: ripple-animation 1s ease-out;
          width: 5px;
          height: 5px;
        }
        
        @keyframes ripple-animation {
          0% {
            width: 5px;
            height: 5px;
            opacity: 1;
          }
          100% {
            width: 100px;
            height: 100px;
            opacity: 0;
          }
        }
        
        .cursor-clicked {
          transform: translate(-50%, -50%) scale(0.8);
          background-color: ${isDark ? "rgba(100, 150, 255, 0.2)" : "rgba(0, 50, 150, 0.1)"};
        }
        
        .cursor-dot-clicked {
          transform: translate(-50%, -50%) scale(1.5);
        }
        
        body {
          cursor: none;
        }
        
        a, button, [role="button"] {
          cursor: none;
        }
        
        @media (max-width: 768px) {
          body {
            cursor: auto;
          }
          
          a, button, [role="button"] {
            cursor: pointer;
          }
          
          .fixed.pointer-events-none {
            display: none;
          }
        }
      `}</style>
    </>
  )
}

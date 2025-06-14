import { useEffect } from "react"
import { useTheme } from "next-themes"

export const useParticlesAnimation = (particlesRef: React.RefObject<HTMLCanvasElement>) => {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  useEffect(() => {
    const canvas = particlesRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      shape: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.color = isDark
          ? `rgba(${100 + Math.random() * 155}, ${100 + Math.random() * 155}, 255, ${0.5 + Math.random() * 0.5})`
          : `rgba(0, ${50 + Math.random() * 100}, ${150 + Math.random() * 105}, ${0.5 + Math.random() * 0.5})`
        this.shape = Math.random() > 0.7 ? "square" : "circle"
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX
        if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color

        if (this.shape === "square") {
          ctx.fillRect(this.x, this.y, this.size, this.size)
        } else {
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    const particlesArray: Particle[] = []
    const numberOfParticles = Math.floor(window.innerWidth / 30)
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle())
    }

    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [isDark, particlesRef])
} 
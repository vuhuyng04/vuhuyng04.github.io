import { useEffect } from "react"
import { useTheme } from "next-themes"

export const useNeuralNetworkAnimation = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    class Node {
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      color: string
      pulseRadius: number
      pulseOpacity: number
      pulseSpeed: number

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
        this.radius = Math.random() * 2 + 1
        this.color = isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 150, 0.7)"
        this.pulseRadius = 0
        this.pulseOpacity = 1
        this.pulseSpeed = Math.random() * 0.02 + 0.01
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy

        if (Math.random() < 0.005) {
          this.pulseRadius = 0
          this.pulseOpacity = 1
        }

        if (this.pulseRadius > 0) {
          this.pulseRadius += this.pulseSpeed
          this.pulseOpacity -= 0.01
          if (this.pulseOpacity < 0) this.pulseOpacity = 0
        }
      }

      draw() {
        if (!ctx) return

        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()

        if (this.pulseRadius > 0 && this.pulseOpacity > 0) {
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.pulseRadius, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(100, 150, 255, ${this.pulseOpacity})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }
    }

    const nodeCount = Math.floor(window.innerWidth / 20)
    const nodes: Node[] = []

    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new Node(Math.random() * canvas.width, Math.random() * canvas.height))
    }

    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      nodes.forEach((node) => {
        node.update()
        node.draw()
      })

      ctx.strokeStyle = isDark ? "rgba(100, 150, 255, 0.2)" : "rgba(0, 50, 150, 0.2)"
      ctx.lineWidth = 1

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [isDark, canvasRef])
} 
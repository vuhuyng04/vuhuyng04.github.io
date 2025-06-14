import { useEffect } from "react"
import { useTheme } from "next-themes"

export const useCircuitAnimation = (circuitCanvasRef: React.RefObject<HTMLCanvasElement>) => {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  useEffect(() => {
    const canvas = circuitCanvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    class Circuit {
      points: { x: number; y: number }[]
      color: string
      lineWidth: number
      progress: number
      speed: number
      completed: boolean

      constructor() {
        this.points = []
        this.generatePoints()
        this.color = isDark
          ? `rgba(${100 + Math.random() * 155}, ${100 + Math.random() * 155}, 255, 0.6)`
          : `rgba(0, ${50 + Math.random() * 100}, ${150 + Math.random() * 105}, 0.6)`
        this.lineWidth = Math.random() * 1.5 + 0.5
        this.progress = 0
        this.speed = Math.random() * 0.01 + 0.002
        this.completed = false
      }

      generatePoints() {
        const startX = Math.random() * canvas.width
        const startY = Math.random() * canvas.height
        this.points.push({ x: startX, y: startY })

        let currentX = startX
        let currentY = startY
        const segments = Math.floor(Math.random() * 5) + 3

        for (let i = 0; i < segments; i++) {
          const direction = Math.floor(Math.random() * 4)
          const length = Math.random() * 100 + 50

          switch (direction) {
            case 0:
              currentX += length
              break
            case 1:
              currentY += length
              break
            case 2:
              currentX -= length
              break
            case 3:
              currentY -= length
              break
          }

          currentX = Math.max(0, Math.min(canvas.width, currentX))
          currentY = Math.max(0, Math.min(canvas.height, currentY))

          this.points.push({ x: currentX, y: currentY })
        }
      }

      update() {
        if (this.progress < 1) {
          this.progress += this.speed
        } else if (!this.completed) {
          this.completed = true
          setTimeout(
            () => {
              this.points = []
              this.generatePoints()
              this.progress = 0
              this.completed = false
              this.color = isDark
                ? `rgba(${100 + Math.random() * 155}, ${100 + Math.random() * 155}, 255, 0.6)`
                : `rgba(0, ${50 + Math.random() * 100}, ${150 + Math.random() * 105}, 0.6)`
            },
            Math.random() * 2000 + 1000,
          )
        }
      }

      draw() {
        if (!ctx || this.points.length < 2) return

        ctx.strokeStyle = this.color
        ctx.lineWidth = this.lineWidth
        ctx.lineCap = "round"
        ctx.lineJoin = "round"

        ctx.beginPath()
        ctx.moveTo(this.points[0].x, this.points[0].y)

        const totalSegments = this.points.length - 1
        const progressSegments = Math.min(totalSegments, Math.floor(this.progress * totalSegments))
        const partialSegment = (this.progress * totalSegments) % 1

        for (let i = 1; i <= progressSegments; i++) {
          ctx.lineTo(this.points[i].x, this.points[i].y)
        }

        if (progressSegments < totalSegments && partialSegment > 0) {
          const startX = this.points[progressSegments].x
          const startY = this.points[progressSegments].y
          const endX = this.points[progressSegments + 1].x
          const endY = this.points[progressSegments + 1].y

          const currentX = startX + (endX - startX) * partialSegment
          const currentY = startY + (endY - startY) * partialSegment

          ctx.lineTo(currentX, currentY)
        }

        ctx.stroke()

        ctx.fillStyle = this.color
        this.points.forEach((point, index) => {
          if (index <= progressSegments || (index === progressSegments + 1 && partialSegment > 0)) {
            ctx.beginPath()
            ctx.arc(point.x, point.y, this.lineWidth * 2, 0, Math.PI * 2)
            ctx.fill()
          }
        })
      }
    }

    const circuits: Circuit[] = []
    const numberOfCircuits = Math.floor(window.innerWidth / 200) + 5

    for (let i = 0; i < numberOfCircuits; i++) {
      circuits.push(new Circuit())
    }

    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      circuits.forEach((circuit) => {
        circuit.update()
        circuit.draw()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [isDark, circuitCanvasRef])
} 
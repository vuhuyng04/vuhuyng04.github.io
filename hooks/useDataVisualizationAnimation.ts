import { useEffect } from "react"

export const useDataVisualizationAnimation = (dataVisualizationRef: React.RefObject<HTMLCanvasElement>) => {
  useEffect(() => {
    const canvas = dataVisualizationRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const dataPoints = Array.from({ length: 50 }, () => Math.random() * 100)
    const barWidth = canvas.width / dataPoints.length
    let hue = 0

    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < dataPoints.length; i++) {
        dataPoints[i] += (Math.random() - 0.5) * 5
        dataPoints[i] = Math.max(0, Math.min(100, dataPoints[i]))
      }

      for (let i = 0; i < dataPoints.length; i++) {
        const barHeight = (dataPoints[i] / 100) * (canvas.height / 4)
        const x = i * barWidth
        const y = canvas.height - barHeight - 50

        ctx.fillStyle = `hsla(${hue}, 100%, 50%, 0.2)`
        ctx.fillRect(x, y, barWidth - 1, barHeight)

        ctx.strokeStyle = `hsla(${hue}, 100%, 50%, 0.4)`
        ctx.strokeRect(x, y, barWidth - 1, barHeight)
      }

      hue = (hue + 0.5) % 360

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [dataVisualizationRef])
} 
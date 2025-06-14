"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { ChevronDown } from "lucide-react"
import { useNeuralNetworkAnimation } from "@/hooks/useNeuralNetworkAnimation"
import { useParticlesAnimation } from "@/hooks/useParticlesAnimation"
import { useDataVisualizationAnimation } from "@/hooks/useDataVisualizationAnimation"
import { useCircuitAnimation } from "@/hooks/useCircuitAnimation"

export default function Hero() {
  const [text, setText] = useState("")
  const fullText = "Welcome to VUHUY AI !"
  const [showCursor, setShowCursor] = useState(true)
  const [isComplete, setIsComplete] = useState(false)
  const [isRestarting, setIsRestarting] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<HTMLCanvasElement>(null)
  const dataVisualizationRef = useRef<HTMLCanvasElement>(null)
  const circuitCanvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const [floatingElementsPositions, setFloatingElementsPositions] = useState<{ x: number, y: number }[]>([]);
  const [binaryElements, setBinaryElements] = useState<any[]>([]);

  useNeuralNetworkAnimation(canvasRef)
  useParticlesAnimation(particlesRef)
  useDataVisualizationAnimation(dataVisualizationRef)
  useCircuitAnimation(circuitCanvasRef)

  const isDark = theme === "dark"

  // Typing effect with restart
  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (isRestarting) {
      setText("")
      setIsRestarting(false)
      return
    }

    if (text.length < fullText.length) {
      timeout = setTimeout(() => {
        setText(fullText.slice(0, text.length + 1))
        if (text.length + 1 === fullText.length) {
          setIsComplete(true)
          // Schedule restart after completion
          setTimeout(() => {
            setIsRestarting(true)
            setIsComplete(false)
          }, 3000) // Wait 3 seconds before restarting
        }
      }, 150)
    }

    return () => clearTimeout(timeout)
  }, [text, isRestarting])

  // Cursor blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  // Parallax effect
  useEffect(() => {
    const handleParallax = (e: MouseEvent) => {
      if (!imageRef.current) return

      const x = (window.innerWidth - e.pageX) / 100
      const y = (window.innerHeight - e.pageY) / 100

      imageRef.current.style.transform = `translateX(${x}px) translateY(${y}px)`
    }

    document.addEventListener("mousemove", handleParallax)
    return () => document.removeEventListener("mousemove", handleParallax)
  }, [])

  // Initialize floating elements positions on client-side only
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const positions = Array.from({ length: 15 }).map(() => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      }));
      setFloatingElementsPositions(positions);

      // Initialize binary elements on client-side only
      const newBinaryElements = Array.from({ length: 20 }).map(() => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        transform: `rotate(${Math.random() * 360}deg)`,
        opacity: 0.3 + Math.random() * 0.7,
        content: Array.from({ length: 50 }).map(() => Math.round(Math.random())).join(""),
      }));
      setBinaryElements(newBinaryElements);
    }
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-blue-950 to-indigo-900 dark:from-gray-900 dark:to-blue-950">
      {/* Neural network canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-80" />

      {/* Particles canvas */}
      <canvas ref={particlesRef} className="absolute inset-0 z-0 opacity-70" />

      {/* Data visualization canvas */}
      <canvas ref={dataVisualizationRef} className="absolute inset-0 z-0 opacity-60" />

      {/* Circuit animation canvas */}
      <canvas ref={circuitCanvasRef} className="absolute inset-0 z-0 opacity-80" />

      {/* Binary code background */}
      <div className="absolute inset-0 z-0 opacity-30 overflow-hidden">
        {binaryElements.map((el, i) => (
          <div
            key={i}
            className="absolute text-xs font-mono whitespace-nowrap"
            style={{
              top: el.top,
              left: el.left,
              color: isDark ? "rgba(150, 200, 255, 0.7)" : "rgba(0, 50, 150, 0.7)",
              transform: el.transform,
              opacity: el.opacity,
            }}
          >
            {el.content}
          </div>
        ))}
      </div>

      {/* Particles background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-indigo-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      {/* Main image with parallax effect */}
      <div className="absolute inset-0 z-0">
        <div
          ref={imageRef}
          className="absolute inset-0 transition-transform duration-200 ease-out"
          style={{ willChange: "transform" }}
        >
          <Image
            src="/assets/images/new-hero-background.jpg"
            alt="Hero background"
            fill
            className="object-cover opacity-40"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-gray-900/40 dark:from-black/20 dark:to-gray-900/40"></div>
      </div>

      {/* Floating data elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingElementsPositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute text-blue-200/20 dark:text-blue-300/10 text-xs md:text-sm font-mono"
            initial={{
              x: pos.x,
              y: pos.y,
              opacity: 0,
            }}
            animate={{
              y: [null, Math.random() * -500 - 100],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
          >
            {
              [
                "import tensorflow as tf",
                "model = tf.keras.Sequential()",
                "X_train, X_test = train_test_split()",
                "accuracy = model.evaluate(X_test, y_test)",
                "plt.plot(history.history['accuracy'])",
                "from transformers import BertModel",
                "tokenizer = AutoTokenizer.from_pretrained()",
                "outputs = model(input_ids, attention_mask=mask)",
                "import torch.nn as nn",
                "class NeuralNetwork(nn.Module):",
                "def __init__(self):",
                "super().__init__()",
                "self.flatten = nn.Flatten()",
                "loss_fn = nn.CrossEntropyLoss()",
                "optimizer = torch.optim.Adam()",
              ][i % 15]
            }
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-2 tracking-tight">
            {text}
            <span className={`${showCursor ? "opacity-100" : "opacity-0"} transition-opacity duration-100`}>|</span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: isComplete ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl md:text-2xl text-blue-100/90 max-w-2xl mx-auto font-light"
          >
            Exploring the frontiers of Artificial Intelligence and Data Science research
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isComplete ? 1 : 0, y: isComplete ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="space-x-4"
        >
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
            Explore My Work
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
            Contact Me
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isComplete ? 1 : 0, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 1.5, duration: 1 },
            y: { delay: 2, duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" },
          }}
          className="absolute bottom-10"
        >
          <div className="flex flex-col items-center">
            <span className="text-blue-200 text-sm mb-2">Scroll Down</span>
            <div className="w-10 h-10 rounded-full border-2 border-blue-200 flex items-center justify-center">
              <ChevronDown className="h-6 w-6 text-blue-200 animate-bounce" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

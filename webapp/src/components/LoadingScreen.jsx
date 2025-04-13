import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function LoadingScreen() {
  const [dots, setDots] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev + 1) % 4)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <div className="text-2xl md:text-3xl font-bold tracking-wider mb-2 animate-pulse">
          Загрузка The Memorify{".".repeat(dots)}
        </div>
        <div className="text-sm text-gray-400">
          Подключение к бесконечности...
        </div>
      </motion.div>
    </div>
  )
}

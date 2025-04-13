import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LoadingScreen from './LoadingScreen'

const stars = new URL('../assets/stars.png', import.meta.url).href
const introSound = new Audio('/sounds/bg.mp3')
const clickSound = new Audio('/sounds/click.mp3')

const slides = [
  {
    title: 'Оставь след во Вселенной',
    description: 'Одно послание. Один шанс. Навсегда в The Memorify.',
  },
  {
    title: 'Без имени. Без возврата.',
    description: 'Лишь ты и твои слова. Мы зафиксируем их в вечности.',
  },
  {
    title: 'Начни сейчас',
    description: 'Просто напиши то, что должен сказать. Возможно, это прочтёт весь мир.',
  },
]

export default function IntroSlides() {
  const [index, setIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [autoSlide, setAutoSlide] = useState(true)
  const hasPlayed = useRef(false)
  const touchStartX = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)

    const handleUserInteraction = () => {
      if (!hasPlayed.current) {
        introSound.volume = 0.3
        introSound.loop = true
        introSound.play().catch(() => {})
        hasPlayed.current = true
      }
    }

    window.addEventListener('click', handleUserInteraction, { once: true })

    return () => {
      clearTimeout(timer)
      introSound.pause()
      introSound.currentTime = 0
      window.removeEventListener('click', handleUserInteraction)
    }
  }, [])

  useEffect(() => {
    if (!autoSlide) return
    const autoTimer = setTimeout(() => {
      if (index < slides.length - 1) setIndex(index + 1)
    }, 6000)
    return () => clearTimeout(autoTimer)
  }, [index, autoSlide])

  const nextSlide = () => {
    clickSound.volume = 0.3
    clickSound.play().catch(() => {})
    if (index < slides.length - 1) setIndex(index + 1)
    else {
      // переход к следующему этапу
    }
  }

  const prevSlide = () => {
    if (index > 0) setIndex(index - 1)
  }

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].clientX
  }

  const handleTouchEnd = (e) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current
    if (deltaX < -50) nextSlide()
    if (deltaX > 50) prevSlide()
  }

  if (loading) return <LoadingScreen />

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 relative overflow-hidden font-['Syne'] bg-cover bg-center"
      style={{ backgroundImage: `url(${stars})` }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 flex flex-col justify-between items-center text-white p-6 sm:p-10 z-10"
        >
          <motion.h1
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-6xl font-extrabold drop-shadow text-left self-start"
          >
            {slides[index].title}
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-md sm:text-xl text-white/80 text-center max-w-md"
          >
            {slides[index].description}
          </motion.p>

          <motion.button
            onClick={nextSlide}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="px-6 py-2 sm:px-8 sm:py-3 bg-white/10 text-white font-semibold rounded-xl backdrop-blur-md hover:bg-white/20 transition-all duration-300 shadow-lg active:scale-95"
          >
            {index < slides.length - 1 ? 'Продолжить' : 'Начать'}
          </motion.button>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
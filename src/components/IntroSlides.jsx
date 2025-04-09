import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LoadingScreen from './LoadingScreen'
const stars = new URL('../assets/stars.png', import.meta.url).href

// 🎧 Звуки из public
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
        introSound.play().catch(() => {
          console.warn('🔇 Фоновый звук не воспроизводится')
        })
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
      if (index < slides.length - 1) {
        setIndex(index + 1)
      }
    }, 6000)

    return () => clearTimeout(autoTimer)
  }, [index, autoSlide])

  const nextSlide = () => {
    clickSound.volume = 0.3
    clickSound.play().catch(() => {})

    if (index < slides.length - 1) {
      setIndex(index + 1)
    } else {
      // переход к следующему шагу
    }
  }

  const prevSlide = () => {
    if (index > 0) {
      setIndex(index - 1)
    }
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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.6 }}
          className="max-w-sm sm:max-w-md text-center z-10 bg-white/10 backdrop-blur-2xl p-6 sm:p-10 rounded-2xl shadow-2xl border-none"
        >
          <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-white drop-shadow">
            {slides[index].title}
          </h1>
          <p className="text-sm sm:text-lg text-white/70 mb-6">
            {slides[index].description}
          </p>
          <button
            onClick={nextSlide}
            className="px-6 py-2 sm:px-8 sm:py-3 bg-white/10 text-white font-medium rounded-xl backdrop-blur-md hover:bg-white/20 transition-all duration-300 shadow-md active:scale-95"
          >
            {index < slides.length - 1 ? 'Продолжить' : 'Начать'}
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
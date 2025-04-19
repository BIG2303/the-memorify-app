import CapsuleScene from './components/CapsuleScene'

export default function App() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black text-white font-manrope">
      {/* 3D сцена — позади */}
      <div className="absolute inset-0 z-0">
        <CapsuleScene />
      </div>

      {/* Контент поверх сцены */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white/90 backdrop-blur-xl px-4 py-2 rounded-xl shadow-lg">
          Добро пожаловать в <span className="text-white">The Memorify</span>
        </h1>
        <p className="mt-4 text-white/70 text-lg sm:text-xl">
          Оставь единственное послание, которое навсегда останется во вселенной.
        </p>
        <button className="mt-8 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl text-white text-lg hover:bg-white/20 transition-all shadow-md">
          Начать
        </button>
      </div>
    </div>
  )
}

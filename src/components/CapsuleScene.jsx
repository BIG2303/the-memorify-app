import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'

function FloatingCapsule({ position }) {
  const ref = useRef()
  const [hovered, setHovered] = useState(false)
  const [opacity, setOpacity] = useState(0)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref.current.rotation.y += 0.002
    ref.current.position.y = position[1] + Math.sin(t + position[0]) * 0.1

    // Параллакс
    const mouseX = state.mouse.x
    const mouseY = state.mouse.y
    ref.current.rotation.x = mouseY * 0.2
    ref.current.rotation.z = mouseX * 0.2
  })

  useEffect(() => {
    // Анимация появления
    let frame
    const animate = () => {
      setOpacity((prev) => {
        if (prev < 1) {
          frame = requestAnimationFrame(animate)
          return prev + 0.02
        }
        return 1
      })
    }
    animate()
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <mesh
      ref={ref}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.3 : 1}
    >
      <capsuleGeometry args={[0.2, 0.5, 8, 16]} />
      <meshStandardMaterial color="#ffffff" transparent opacity={opacity} />
    </mesh>
  )
}

export default function CapsuleScene() {
  const positions = Array.from({ length: 15 }, () => [
    (Math.random() - 0.5) * 6,
    (Math.random() - 0.5) * 4,
    (Math.random() - 0.5) * 3,
  ])

  return (
    <Canvas
      className="absolute inset-0 z-0"
      camera={{ position: [0, 0, 5], fov: 75 }}
      gl={{ preserveDrawingBuffer: true }}
    >  
      <ambientLight intensity={1.2} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#f7f7f7" />
      {positions.map((pos, idx) => (
        <FloatingCapsule key={idx} position={pos} />
      ))}
    </Canvas>
  )
}

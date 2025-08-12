'use client'

import React, { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import ConsultationFormModal from "./ConsultationFormModal";
import * as THREE from 'three'

function AnimatedPolyhedron() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const materialRef = useRef<THREE.MeshStandardMaterial>(null!)
  const color1 = new THREE.Color('#4f46e5')
  const color2 = new THREE.Color('#06b6d4')

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.y += delta * 0.25
    meshRef.current.rotation.x += delta * 0.15
    const mix = (Math.sin(t) + 1) / 2
    materialRef.current.color.copy(color1).lerp(color2, mix)
  })

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2, 0]} />
      <meshStandardMaterial
        ref={materialRef}
        wireframe={true}
        emissive={'#ffffff'}
        emissiveIntensity={0.1}
        flatShading
      />
    </mesh>
  )
}

export default function HeroSection() {
  const [dpr, setDpr] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    setDpr(Math.min(2, window.devicePixelRatio))
  }, [])

  return (
    <>
      <section className="relative h-screen overflow-hidden bg-black">
        <Canvas
          dpr={dpr}
          camera={{ position: [0, 0, 6] }}
          style={{ position: 'absolute', inset: 0, zIndex: 0 }}
        >
          <color attach="background" args={['#070616']} />
          <fog attach="fog" args={['#070616', 8, 15]} />
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 5]} intensity={1.2} color={'#4f46e5'} />
          <pointLight position={[-5, -5, -5]} intensity={1.2} color={'#06b6d4'} />
          <Stars radius={50} depth={20} count={5000} factor={4} fade speed={1} />
          <Suspense fallback={null}>
            <AnimatedPolyhedron />
          </Suspense>
          <OrbitControls enableZoom={false} />
        </Canvas>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold">
            Больше нуля — больше успеха
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-300">
            Профессиональный платный аудит Wildberries — глубокий разбор карточек,
            логистики и рекламных стратегий. Результат или возврат денег.
          </p>
          <div className="mt-6 flex gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg hover:scale-105 transition"
            >
              Получить консультацию
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 rounded-full border border-gray-500 text-white font-semibold hover:bg-white/10 transition"
            >
              Заказать аудит — 40 000₽
            </button>
          </div>
        </div>
      </section>

      <ConsultationFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}

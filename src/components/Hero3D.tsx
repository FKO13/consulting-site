'use client'

import React, { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshWobbleMaterial, OrbitControls } from '@react-three/drei'
import type { Mesh } from 'three'

function AnimatedPolyhedron() {
  const mesh = useRef<Mesh | null>(null)

  useFrame((state, delta) => {
    if (!mesh.current) return
    mesh.current.rotation.y += delta * 0.45
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.12
  })

  return (
    <mesh ref={mesh} scale={1.15} position={[0, 0, 0]}>
      <icosahedronGeometry args={[1.2, 0]} />
      <MeshWobbleMaterial
        factor={0.6}
        speed={1}
        roughness={0.25}
        metalness={0.25}
        envMapIntensity={0.6}
        color="#00aef0"
      />
    </mesh>
  )
}

export default function Hero3D() {
  const [dpr, setDpr] = useState<number>(1)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDpr(Math.min(2, window.devicePixelRatio || 1))
    }
  }, [])

  return (
    <div className="hero-3d-canvas absolute inset-0 -z-10 pointer-events-none">
      <Canvas dpr={dpr} camera={{ position: [0, 0, 4.5], fov: 45 }} style={{ width: '100%', height: '100%' }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.9} />
        <Suspense fallback={null}>
          <AnimatedPolyhedron />
        </Suspense>

        {/* autoRotate + controls for subtle motion; pointer events disabled via container */}
        <OrbitControls enablePan={false} enableZoom={false} enableRotate autoRotate autoRotateSpeed={0.45} maxPolarAngle={Math.PI / 2} />
      </Canvas>
    </div>
  )
}

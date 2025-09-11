/* src/components/Hero3D.tsx */
"use client"

import React, { Suspense, useMemo, useRef, useState, useEffect } from "react"
import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import { EffectComposer, Bloom, Vignette, Noise } from "@react-three/postprocessing"
import { BlendFunction } from "postprocessing"
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment"

function buildMorphTargets(base: THREE.BufferGeometry) {
  const pos = base.attributes.position as THREE.BufferAttribute
  const count = pos.count
  const basePositions = pos.array as Float32Array
  const toArray = () => new Float32Array(basePositions)

  base.computeVertexNormals()
  const normals = (base.attributes.normal as THREE.BufferAttribute).array as Float32Array

  const forEachVertex = (cb: (i: number, v: THREE.Vector3, n: THREE.Vector3) => void, target: Float32Array) => {
    const v = new THREE.Vector3()
    const no = new THREE.Vector3()
    for (let i = 0; i < count; i++) {
      v.set(basePositions[i * 3], basePositions[i * 3 + 1], basePositions[i * 3 + 2])
      no.set(normals[i * 3], normals[i * 3 + 1], normals[i * 3 + 2]).normalize()
      cb(i, v, no)
      target[i * 3] = v.x
      target[i * 3 + 1] = v.y
      target[i * 3 + 2] = v.z
    }
  }

  // Базовая форма
  const A = toArray()

  // Форма с сильным "разлетом" (толще осколки)
  const B = new Float32Array(count * 3)
  forEachVertex((_, v, no) => {
    v.copy(no).multiplyScalar(3.5) // было 1.9, увеличил почти в 2 раза
  }, B)

  return { A, B, count }
}

function useDevice() {
  const [isMobile, setIsMobile] = useState<boolean>(false)
  useEffect(() => {
    const check = () => {
      const w = typeof window !== "undefined" ? window.innerWidth : 1024
      setIsMobile(w < 768)
    }
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])
  return { isMobile }
}

function MorphingCore({ detail }: { detail: number }) {
  const mesh = useRef<THREE.Mesh>(null!)
  const wire = useRef<THREE.Mesh>(null!)

  const palette = useMemo(
    () => [
      new THREE.Color("#235d6e"),
      new THREE.Color("#4361ee"),
      new THREE.Color("#3e0166"),
      new THREE.Color("#1d1433"),
      new THREE.Color("#970505"),
    ],
    []
  )

  const baseGeom = useMemo(() => {
    const g = new THREE.IcosahedronGeometry(1.0, detail)
    g.applyMatrix4(new THREE.Matrix4().makeScale(1.9, 1.9, 1.9))
    return g
  }, [detail])

  const morph = useMemo(() => buildMorphTargets(baseGeom.clone()), [baseGeom])
  const working = useMemo(() => new Float32Array(morph.count * 3), [morph.count])

  useFrame((state) => {
    if (!mesh.current || !wire.current) return
    const t = state.clock.getElapsedTime()

    const period = 20.0
    const local = (Math.sin((t / period) * Math.PI * 2) + 1) / 2 // туда-сюда [0,1]

    const from = morph.A
    const to = morph.B

    for (let k = 0; k < working.length; k++) {
      working[k] = from[k] * (1 - local) + to[k] * local
    }

    const geo = mesh.current.geometry as THREE.BufferGeometry
    geo.attributes.position.array.set(working)
    geo.attributes.position.needsUpdate = true
    geo.computeVertexNormals()

    const wgeo = wire.current.geometry as THREE.BufferGeometry
    wgeo.attributes.position.array.set(working)
    wgeo.attributes.position.needsUpdate = true

    const s = 1 + Math.sin(t * 1.05) * 0.05
    mesh.current.scale.setScalar(s)
    wire.current.scale.setScalar(s * 1.001)

    const { x, y } = state.mouse
    mesh.current.rotation.x = Math.sin(t * 0.6) * 0.22 + y * 0.18
    mesh.current.rotation.y = t * 0.32 + x * 0.18
    wire.current.rotation.copy(mesh.current.rotation)

    const colorPhase = (t * 0.25) % palette.length
    const ci = Math.floor(colorPhase)
    const cw = colorPhase - ci
    const current = palette[ci].clone().lerp(palette[(ci + 1) % palette.length], cw)

    const solid = mesh.current.material as THREE.MeshPhysicalMaterial
    solid.color.copy(current)

    const wf = wire.current.material as THREE.MeshBasicMaterial
    wf.opacity = 0.2
  })

  return (
    <group position={[0, 0.35, 0]}>
      <mesh ref={mesh} geometry={baseGeom.clone()}>
        <meshPhysicalMaterial
          roughness={0.12}
          metalness={1.0}
          clearcoat={0.35}
          clearcoatRoughness={0.18}
          envMapIntensity={1.2}
          transparent={false}
          opacity={1}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh ref={wire} geometry={baseGeom.clone()}>
        <meshBasicMaterial color="#e5e7eb" wireframe transparent opacity={0.25} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  )
}

function Scene({ isMobile }: { isMobile: boolean }) {
  const dirIntensity = isMobile ? 0.7 : 1.0
  const dir2Intensity = isMobile ? 0.35 : 0.55

  return (
    <group>
      <MorphingCore detail={isMobile ? 2 : 3} />
      <ambientLight intensity={isMobile ? 0.22 : 0.35} />
      <hemisphereLight args={["#e0e7ff", "#0b1020", isMobile ? 0.25 : 0.35]} />
      <directionalLight position={[5, 5, 6]} intensity={dirIntensity} color={"#a78bfa"} />
      <directionalLight position={[-6, -4, 2]} intensity={dir2Intensity} color={"#67e8f9"} />
      <pointLight position={[0, 0, 6]} intensity={isMobile ? 0.45 : 0.6} distance={20} />
      <fog attach="fog" args={[new THREE.Color("#05060d"), 20, 160]} />
    </group>
  )
}

export default function Hero3D() {
  const { isMobile } = useDevice()

  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Canvas
        dpr={isMobile ? [1, 1.25] : [1, 1.75]}
        camera={{ position: [0, 0, isMobile ? 9.5 : 8], fov: isMobile ? 58 : 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        shadows={false}
        style={{ background: "transparent" }}
        onCreated={({ gl, scene }) => {
          gl.setClearAlpha(0)
          gl.toneMapping = THREE.ACESFilmicToneMapping
          gl.toneMappingExposure = 1.0
          gl.outputColorSpace = THREE.SRGBColorSpace

          const pmrem = new THREE.PMREMGenerator(gl)
          pmrem.compileEquirectangularShader()
          const roomEnv = new RoomEnvironment()
          const envRenderTarget: THREE.WebGLRenderTarget = pmrem.fromScene(roomEnv, 0.04)
          scene.environment = envRenderTarget.texture
        }}
      >
        <Suspense fallback={null}>
          <Scene isMobile={isMobile} />

          {!isMobile && (
            <EffectComposer multisampling={0}>
              <Bloom intensity={0.5} luminanceThreshold={0.12} luminanceSmoothing={0.22} blendFunction={BlendFunction.SCREEN} />
              <Vignette eskil={false} offset={0.18} darkness={0.65} />
              <Noise opacity={0.01} premultiply />
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>
    </div>
  )
}

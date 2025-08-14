'use client'

import React, { Suspense, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom, Vignette, ChromaticAberration, Noise } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

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
      v.set(basePositions[i*3], basePositions[i*3+1], basePositions[i*3+2])
      no.set(normals[i*3], normals[i*3+1], normals[i*3+2]).normalize()
      cb(i, v, no)
      target[i*3] = v.x; target[i*3+1] = v.y; target[i*3+2] = v.z
    }
  }

  const A = toArray()

  const B = new Float32Array(count * 3)
  forEachVertex((_, v, no) => {
    const k = Math.pow(Math.abs(no.x) + Math.abs(no.y) + Math.abs(no.z), 0.85)
    v.copy(no).multiplyScalar(1.9 * k)
  }, B)

  const C = new Float32Array(count * 3)
  forEachVertex((_, v, no) => {
    const m = Math.max(Math.abs(no.x), Math.abs(no.y), Math.abs(no.z))
    const k = Math.pow(m, 1.1)
    v.copy(no).multiplyScalar(1.9 * k)
  }, C)

  const D = new Float32Array(count * 3)
  forEachVertex((_, v, no) => {
    const theta = Math.atan2(no.y, no.x)
    const phi = Math.acos(THREE.MathUtils.clamp(no.z, -1, 1))
    const r = 1.9 * (1.0 + 0.16 * Math.sin(5.0 * theta) * Math.cos(5.0 * phi))
    v.copy(no).multiplyScalar(r)
  }, D)

  const E = new Float32Array(count * 3)
  const n3 = (x: number, y: number, z: number) => {
    const s = Math.sin(x * 12.9898 + y * 78.233 + z * 37.719)
    return (Math.sin(s) + 1) * 0.5
  }
  forEachVertex((i, v, no) => {
    const k = 0.12 + 0.12 * n3(no.x + i * 0.0003, no.y - i * 0.0007, no.z + i * 0.00011)
    v.copy(no).multiplyScalar(1.9 * (1.0 + k))
  }, E)

  return { A, B, C, D, E, count }
}

function MorphingCore() {
  const mesh = useRef<THREE.Mesh>(null)
  const wire = useRef<THREE.Mesh>(null)

  const palette = useMemo(
    () => [
      new THREE.Color('#4cc9f0'),
      new THREE.Color('#4361ee'),
      new THREE.Color('#7209b7'),
      new THREE.Color('#3a0ca3'),
      new THREE.Color('#f1f1f1'),
    ],
    []
  )

  const baseGeom = useMemo(() => {
    const g = new THREE.IcosahedronGeometry(1.0, 3)
    g.applyMatrix4(new THREE.Matrix4().makeScale(1.9, 1.9, 1.9))
    return g
  }, [])

  const morph = useMemo(() => buildMorphTargets(baseGeom.clone()), [baseGeom])
  const working = useMemo(() => new Float32Array(morph.count * 3), [morph.count])

  useFrame((state) => {
    if (!mesh.current || !wire.current) return
    const t = state.clock.getElapsedTime()

    const period = 5.0
    const total = 5
    const phase = (t / period) % total
    const i = Math.floor(phase)
    const local = phase - i

    const targets = [morph.A, morph.B, morph.C, morph.D, morph.E, morph.A]
    const from = targets[i]
    const to = targets[i + 1]

    const ease = (x: number) => 0.5 - 0.5 * Math.cos(Math.PI * x)
    const w = ease(local)

    for (let k = 0; k < working.length; k++) working[k] = from[k] * (1 - w) + to[k] * w

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
    const cFrom = palette[ci]
    const cTo = palette[(ci + 1) % palette.length]
    const current = cFrom.clone().lerp(cTo, ease(cw))

    const solid = mesh.current.material as THREE.MeshPhysicalMaterial
    solid.color = current
    solid.opacity = 0.65 + 0.15 * Math.sin(t * 1.2)
    solid.transparent = true
    solid.emissive = current.clone().multiplyScalar(0.16 + 0.12 * Math.sin(t * 0.8 + 0.5) * 0.5)

    const wf = wire.current.material as THREE.MeshBasicMaterial
    wf.opacity = 0.16 + 0.2 * Math.abs(Math.sin(t * 0.9))
  })

  return (
    <group position={[0, 0.35, 0]}>
      <mesh ref={mesh} geometry={baseGeom.clone()}>
        <meshPhysicalMaterial
          roughness={0.15}
          metalness={0.15}
          clearcoat={0.65}
          clearcoatRoughness={0.23}
          transmission={0.0}
          thickness={0.6}
          transparent
        />
      </mesh>
      <mesh ref={wire} geometry={baseGeom.clone()}>
        <meshBasicMaterial color="#e5e7eb" wireframe transparent opacity={0.26} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  )
}

function Scene() {
  return (
    <group>
      <MorphingCore />
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 5, 6]} intensity={1.0} color={'#a78bfa'} />
      <directionalLight position={[-6, -4, 2]} intensity={0.55} color={'#67e8f9'} />
      <fog attach="fog" args={[new THREE.Color('#05060d'), 20, 160]} />
    </group>
  )
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        shadows={false}
        style={{ background: 'transparent' }}
        onCreated={({ gl }) => gl.setClearAlpha(0)}
      >
        {/* УБРАНО: <color attach="background" args={['#05060d']} /> — чтобы видеть глобальные звёзды */}
        <Suspense fallback={null}>
          <Scene />
          <EffectComposer multisampling={0}>
            <Bloom intensity={0.7} luminanceThreshold={0.1} luminanceSmoothing={0.22} blendFunction={BlendFunction.SCREEN} />
            <ChromaticAberration offset={[0.0012, 0.001]} />
            <Vignette eskil={false} offset={0.22} darkness={0.82} />
            <Noise opacity={0.02} premultiply />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  )
}

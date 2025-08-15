'use client'

import React, { Suspense, useRef, useMemo } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

interface StarLayerProps {
  count?: number
  depth?: number
  speed?: number
  size?: number
  seed?: number
}

function StarLayer({ count = 1100, depth = 140, speed = 7, size = 90, seed = 0 }: StarLayerProps) {
  const matRef = useRef<THREE.ShaderMaterial>(null)
  const geom = useMemo(() => new THREE.BufferGeometry(), [])

  const positions = useMemo(() => {
    const p = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      p[i * 3 + 0] = (Math.random() - 0.5) * size
      p[i * 3 + 1] = (Math.random() - 0.5) * size
      p[i * 3 + 2] = -Math.random() * depth - 10
    }
    return p
  }, [count, depth, size])

  const scales = useMemo(() => {
    const s = new Float32Array(count)
    for (let i = 0; i < count; i++) s[i] = Math.random()
    return s
  }, [count])

  useMemo(() => {
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geom.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))
  }, [geom, positions, scales])

  const material = useMemo(() =>
    new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uParallax: { value: new THREE.Vector2(0, 0) },
        uDepth: { value: depth },
        uSpeed: { value: speed },
        uSeed: { value: seed },
      },
      vertexShader: /* glsl */ `
        uniform float uTime;
        uniform float uDepth;
        uniform float uSpeed;
        uniform vec2 uParallax;
        attribute float aScale;
        varying float vScale;
        void main(){
          vec3 pos = position;
          float z = pos.z + mod(uTime * uSpeed * (0.3 + aScale), uDepth);
          pos.z = -mod(z + uDepth, uDepth);
          vScale = aScale;
          vec4 mv = modelViewMatrix * vec4(pos + vec3(uParallax * (0.40 + aScale * 0.60), 0.0), 1.0);
          gl_PointSize = (aScale * 1.6 + 0.6) * (180.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: /* glsl */ `
        precision mediump float;
        varying float vScale;
        void main(){
          vec2 uv = gl_PointCoord - 0.5;
          float r = length(uv);
          if (r > 0.5) discard;

          float core = smoothstep(0.15, 0.0, r);
          float glow = smoothstep(0.5, 0.15, r);

          vec3 starColor = mix(vec3(0.8, 0.85, 1.0), vec3(1.0), vScale);
          float alpha = (0.6 + vScale * 0.4) * (core + glow * 0.4);

          gl_FragColor = vec4(starColor, alpha);
        }
      `
    }), [depth, speed, seed]
  )

  const { viewport, mouse } = useThree()

  useFrame((state, delta) => {
    if (!matRef.current) return
    matRef.current.uniforms.uTime.value += delta

    const scrollOffset = window.scrollY * 0.002
    matRef.current.uniforms.uParallax.value.set(
      mouse.x * 0.14 * viewport.width,
      mouse.y * 0.14 * viewport.height + scrollOffset
    )
  })

  return (
    <points geometry={geom} frustumCulled>
      <primitive object={material} ref={matRef} attach="material" />
    </points>
  )
}

function Starfield() {
  return (
    <group>
      <StarLayer count={900} depth={140} speed={6} size={90} seed={1} />
      <StarLayer count={700} depth={180} speed={10} size={130} seed={2} />
      <StarLayer count={500} depth={220} speed={4} size={150} seed={3} />
    </group>
  )
}

function Scene() {
  return (
    <group>
      <Starfield />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 6]} intensity={0.6} color={'#a78bfa'} />
      <fog attach="fog" args={[new THREE.Color('#05060d'), 20, 160]} />
    </group>
  )
}

export default function Starfield3D() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <Canvas
        style={{ position: 'fixed', top: 0, left: 0 }}
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        shadows={false}
      >
        <Suspense fallback={null}>
          <Scene />
          <EffectComposer multisampling={0}>
            <Bloom
              intensity={0.6}
              luminanceThreshold={0.1}
              luminanceSmoothing={0.22}
              blendFunction={BlendFunction.SCREEN}
            />
            <Vignette eskil={false} offset={0.22} darkness={0.82} />
            <Noise opacity={0.015} premultiply />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  )
}

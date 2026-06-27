import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { DefencePostFX, MinimalPostFX } from './PostProcessing'
import * as THREE from 'three'

function ParticleField({ count = 1200 }) {
  const ref = useRef()

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x = state.clock.elapsedTime * 0.02
    ref.current.rotation.y = state.clock.elapsedTime * 0.015
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent color="#00d4ff" size={0.04}
        sizeAttenuation depthWrite={false} opacity={0.7}
      />
    </Points>
  )
}

function GridPlane() {
  const ref = useRef()
  const matRef = useRef()

  useFrame((state) => {
    if (ref.current) ref.current.position.z = (state.clock.elapsedTime * 0.3) % 2
    if (matRef.current) matRef.current.opacity = 0.12 + Math.sin(state.clock.elapsedTime * 0.5) * 0.03
  })

  return (
    <group ref={ref} rotation={[-Math.PI / 2.8, 0, 0]} position={[0, -3, 0]}>
      <gridHelper args={[40, 40, '#00d4ff', '#00d4ff']}>
        <meshBasicMaterial ref={matRef} color="#00d4ff" transparent opacity={0.12} />
      </gridHelper>
    </group>
  )
}

function FloatingHexagon() {
  const ref = useRef()

  const hexPoints = useMemo(() => {
    const pts = []
    for (let i = 0; i <= 6; i++) {
      const angle = (i / 6) * Math.PI * 2
      pts.push(new THREE.Vector3(Math.cos(angle) * 1.5, Math.sin(angle) * 1.5, 0))
    }
    return pts
  }, [])

  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(hexPoints), [hexPoints])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.3
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.15
  })

  return (
    <group ref={ref} position={[0, 0.5, -2]}>
      <line geometry={geometry}>
        <lineBasicMaterial color="#00d4ff" transparent opacity={0.6} />
      </line>
      <group scale={0.65}>
        <line geometry={geometry}>
          <lineBasicMaterial color="#00d4ff" transparent opacity={0.3} />
        </line>
      </group>
      <mesh>
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshBasicMaterial color="#00d4ff" />
      </mesh>
    </group>
  )
}

function ScanPlane() {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 3
    ref.current.material.opacity = 0.05 + Math.abs(Math.sin(state.clock.elapsedTime * 0.6)) * 0.04
  })
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[30, 30]} />
      <meshBasicMaterial color="#00d4ff" transparent opacity={0.05} side={THREE.DoubleSide} />
    </mesh>
  )
}

export default function HeroCanvas({ variant = 'full' }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{ background: 'transparent' }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.4} />
      <ParticleField count={variant === 'minimal' ? 600 : 1200} />
      <GridPlane />
      <FloatingHexagon />
      <ScanPlane />
      <fog attach="fog" args={['#050607', 8, 25]} />
      <DefencePostFX bloomIntensity={1.2} bloomThreshold={0.15} />
    </Canvas>
  )
}

function TerrainGrid() {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) ref.current.position.z = (state.clock.elapsedTime * 0.2) % 3
  })
  return (
    <group ref={ref} rotation={[-Math.PI / 3, 0, 0]} position={[0, -2, 0]}>
      <gridHelper args={[60, 60, '#00d4ff', '#00d4ff']}>
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.08} />
      </gridHelper>
    </group>
  )
}

export function BannerCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 2, 6], fov: 50 }}
      style={{ background: 'transparent' }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
    >
      <ParticleField count={400} />
      <TerrainGrid />
      <fog attach="fog" args={['#050607', 5, 18]} />
      <MinimalPostFX bloomIntensity={0.6} />
    </Canvas>
  )
}

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

// ─── Particle Field ────────────────────────────────────────────────────────
// Floating cyan particles that slowly drift — the hero background
function ParticleField({ count = 1200 }) {
  const ref = useRef()

  // Generate random positions for all particles once
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 20  // x: -10 to 10
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20  // y: -10 to 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20  // z: -10 to 10
    }
    return pos
  }, [count])

  // Rotate the whole particle cloud slowly every frame
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x = state.clock.elapsedTime * 0.02
    ref.current.rotation.y = state.clock.elapsedTime * 0.015
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00d4ff"
        size={0.04}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  )
}

// ─── Grid Plane ────────────────────────────────────────────────────────────
// The animated wireframe grid that appears in the lower portion of the hero
function GridPlane() {
  const ref = useRef()
  const materialRef = useRef()

  useFrame((state) => {
    if (!ref.current) return
    // Very slow downward drift — creates feeling of movement through space
    ref.current.position.z = (state.clock.elapsedTime * 0.3) % 2

    // Pulse the opacity slightly
    if (materialRef.current) {
      materialRef.current.opacity = 0.12 + Math.sin(state.clock.elapsedTime * 0.5) * 0.03
    }
  })

  return (
    <group ref={ref} rotation={[-Math.PI / 2.8, 0, 0]} position={[0, -3, 0]}>
      <gridHelper args={[40, 40, '#00d4ff', '#00d4ff']}>
        <meshBasicMaterial
          ref={materialRef}
          color="#00d4ff"
          transparent
          opacity={0.12}
        />
      </gridHelper>
    </group>
  )
}

// ─── Floating Hexagon ──────────────────────────────────────────────────────
// A slowly rotating wireframe hexagon — the Vayuron logo shape in 3D
function FloatingHexagon() {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.3
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    // Gentle floating bob
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.15
  })

  // Build a hexagonal ring from line segments
  const hexPoints = useMemo(() => {
    const pts = []
    for (let i = 0; i <= 6; i++) {
      const angle = (i / 6) * Math.PI * 2
      pts.push(new THREE.Vector3(
        Math.cos(angle) * 1.5,
        Math.sin(angle) * 1.5,
        0
      ))
    }
    return pts
  }, [])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(hexPoints)
    return geo
  }, [hexPoints])

  return (
    <group ref={ref} position={[0, 0.5, -2]}>
      {/* Outer hexagon ring */}
      <line geometry={geometry}>
        <lineBasicMaterial color="#00d4ff" transparent opacity={0.5} />
      </line>
      {/* Inner hexagon ring — scaled down */}
      <group scale={0.65}>
        <line geometry={geometry}>
          <lineBasicMaterial color="#00d4ff" transparent opacity={0.25} />
        </line>
      </group>
      {/* Centre sphere — the core dot */}
      <mesh>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial color="#00d4ff" />
      </mesh>
      {/* Spoke lines from centre to each vertex */}
      {[0,1,2,3,4,5].map((i) => {
        const angle = (i / 6) * Math.PI * 2
        const x = Math.cos(angle) * 1.5
        const y = Math.sin(angle) * 1.5
        const lineGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(x, y, 0),
        ])
        return (
          <line key={i} geometry={lineGeo}>
            <lineBasicMaterial color="#00d4ff" transparent opacity={0.1} />
          </line>
        )
      })}
    </group>
  )
}

// ─── Scanning Plane ────────────────────────────────────────────────────────
// A thin horizontal plane that sweeps up and down — radar sweep effect
function ScanPlane() {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return
    // Oscillate y position between -3 and 3
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 3
    // Fade opacity based on position
    ref.current.material.opacity = 0.06 + Math.abs(Math.sin(state.clock.elapsedTime * 0.6)) * 0.04
  })

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[30, 30]} />
      <meshBasicMaterial
        color="#00d4ff"
        transparent
        opacity={0.06}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// ─── Main Canvas Export ────────────────────────────────────────────────────
export default function HeroCanvas({ variant = 'full' }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{ background: 'transparent' }}
      gl={{
        antialias: true,
        alpha: true,              // Transparent background — page bg shows through
        powerPreference: 'high-performance',
      }}
      dpr={[1, 2]}               // Respect device pixel ratio up to 2x for sharp rendering
    >
      {/* Ambient light — gives everything a slight overall brightness */}
      <ambientLight intensity={0.4} />

      {/* The 3D scene elements */}
      <ParticleField count={variant === 'minimal' ? 600 : 1200} />
      <GridPlane />
      <FloatingHexagon />
      <ScanPlane />

      {/* Fog makes distant particles fade out naturally */}
      <fog attach="fog" args={['#050607', 8, 25]} />
    </Canvas>
  )
}

// ─── Sector-specific canvas variants ──────────────────────────────────────
// These are simpler canvases used on sector/product page banners

function TerrainGrid() {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return
    ref.current.position.z = (state.clock.elapsedTime * 0.2) % 3
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
    </Canvas>
  )
}

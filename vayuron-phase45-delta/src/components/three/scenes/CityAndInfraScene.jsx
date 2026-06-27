import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Box, Cylinder, Sphere, Line } from '@react-three/drei'
import * as THREE from 'three'
import { DefencePostFX } from '../PostProcessing'

// ─── Smart City Scene ──────────────────────────────────────────────────────
function CityBuildings() {
  const buildings = useMemo(() => {
    const b = []
    for (let x = -4; x <= 4; x += 1.4) {
      for (let z = -4; z <= 4; z += 1.4) {
        if (Math.abs(x) < 0.5 && Math.abs(z) < 0.5) continue // centre open
        const h = 0.4 + Math.random() * 1.8
        b.push({ x, z, h, w: 0.6 + Math.random() * 0.3 })
      }
    }
    return b
  }, [])

  return (
    <>
      {buildings.map((b, i) => (
        <group key={i} position={[b.x, b.h / 2, b.z]}>
          <Box args={[b.w, b.h, b.w]}>
            <meshStandardMaterial
              color="#0a1520"
              metalness={0.6}
              roughness={0.4}
              emissive={new THREE.Color('#001a2e')}
              emissiveIntensity={0.3}
            />
          </Box>
          {/* Wireframe outline */}
          <Box args={[b.w + 0.01, b.h + 0.01, b.w + 0.01]}>
            <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.08} />
          </Box>
          {/* Rooftop light */}
          <Sphere args={[0.03, 4, 4]} position={[0, b.h / 2 + 0.04, 0]}>
            <meshBasicMaterial color="#00d4ff" />
          </Sphere>
        </group>
      ))}
    </>
  )
}

function DroneFlightPath() {
  const ref = useRef()
  const t = useRef(0)

  const path = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-4, 2.5, -4),
      new THREE.Vector3(0, 3, -4),
      new THREE.Vector3(4, 2, 0),
      new THREE.Vector3(0, 3.5, 4),
      new THREE.Vector3(-4, 2.5, 4),
      new THREE.Vector3(-4, 2.5, -4),
    ], true)
  }, [])

  const pathPoints = useMemo(() => path.getPoints(80), [path])

  useFrame((state, delta) => {
    if (ref.current) {
      t.current = (t.current + delta * 0.08) % 1
      const pos = path.getPoint(t.current)
      const tan = path.getTangent(t.current)
      ref.current.position.copy(pos)
      ref.current.lookAt(pos.clone().add(tan))
    }
  })

  return (
    <>
      {/* Flight path line */}
      <Line points={pathPoints} color="#00d4ff" lineWidth={0.5} transparent opacity={0.2} />
      {/* Moving drone dot */}
      <group ref={ref}>
        <Sphere args={[0.08, 6, 6]}>
          <meshBasicMaterial color="#00d4ff" />
        </Sphere>
        <Sphere args={[0.16, 6, 6]}>
          <meshBasicMaterial color="#00d4ff" transparent opacity={0.15} />
        </Sphere>
      </group>
    </>
  )
}

function CityGrid() {
  return (
    <group position={[0, 0, 0]}>
      <gridHelper args={[12, 12, '#00d4ff', '#00d4ff']}>
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.04} />
      </gridHelper>
    </group>
  )
}

export function SmartCityScene() {
  return (
    <Canvas
      camera={{ position: [8, 8, 8], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 10, 0]} intensity={1} color="#00d4ff" />
      <pointLight position={[-5, 5, 5]} intensity={0.4} color="#0044aa" />

      <CityGrid />
      <CityBuildings />
      <DroneFlightPath />

      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} maxPolarAngle={Math.PI / 2.2} />
      <fog attach="fog" args={['#050607', 15, 30]} />
      <DefencePostFX bloomIntensity={0.9} bloomThreshold={0.15} chromatic vignette />
    </Canvas>
  )
}

// ─── Infrastructure Scene — Pipeline / Bridge ──────────────────────────────
function PipelineSegments() {
  const ref = useRef()
  const segCount = 20

  useFrame((state) => {
    if (!ref.current) return
    // Colour segments by "heat" — simulated thermal reading
    ref.current.children.forEach((child, i) => {
      const heat = Math.sin(state.clock.elapsedTime * 0.5 + i * 0.4) * 0.5 + 0.5
      if (child.material) {
        child.material.color.setRGB(heat * 0.1, heat * 0.3 + 0.1, 0.5 - heat * 0.3)
        child.material.emissiveIntensity = heat * 0.4
      }
    })
  })

  return (
    <group ref={ref}>
      {Array.from({ length: segCount }).map((_, i) => {
        const x = (i - segCount / 2) * 0.6
        const y = Math.sin(i * 0.5) * 0.15
        return (
          <group key={i} position={[x, y, 0]}>
            <Cylinder args={[0.12, 0.12, 0.55, 8]} rotation={[0, 0, Math.PI / 2]}>
              <meshStandardMaterial
                color={new THREE.Color(0.1, 0.3, 0.5)}
                emissive={new THREE.Color(0, 0.1, 0.2)}
                emissiveIntensity={0.3}
                metalness={0.8}
                roughness={0.2}
              />
            </Cylinder>
            {/* Joint ring */}
            <Cylinder args={[0.14, 0.14, 0.06, 8]} rotation={[0, 0, Math.PI / 2]}>
              <meshBasicMaterial color="#00d4ff" transparent opacity={0.3} />
            </Cylinder>
          </group>
        )
      })}
    </group>
  )
}

function SensorReadout() {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) {
      ref.current.children.forEach((child, i) => {
        child.position.y = 0.8 + Math.sin(state.clock.elapsedTime * 1.5 + i) * 0.05
      })
    }
  })

  return (
    <group ref={ref}>
      {[-3, 0, 3].map((x, i) => (
        <group key={i} position={[x, 0.8, 0]}>
          <Cylinder args={[0.015, 0.015, 0.6, 4]}>
            <meshBasicMaterial color="#00d4ff" transparent opacity={0.4} />
          </Cylinder>
          <Sphere args={[0.06, 6, 6]} position={[0, 0.33, 0]}>
            <meshBasicMaterial color="#00d4ff" />
          </Sphere>
        </group>
      ))}
    </group>
  )
}

export function InfrastructureScene() {
  return (
    <Canvas
      camera={{ position: [0, 4, 8], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 8, 4]} intensity={1.2} color="#00d4ff" />
      <pointLight position={[0, -3, 4]} intensity={0.4} color="#0044aa" />

      <PipelineSegments />
      <SensorReadout />

      <gridHelper args={[16, 16, '#00d4ff', '#00d4ff']} position={[0, -0.7, 0]}>
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.04} />
      </gridHelper>

      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} maxPolarAngle={Math.PI / 2.2} />
      <fog attach="fog" args={['#050607', 10, 22]} />
      <DefencePostFX bloomIntensity={1.1} bloomThreshold={0.1} chromatic vignette />
    </Canvas>
  )
}

export default SmartCityScene

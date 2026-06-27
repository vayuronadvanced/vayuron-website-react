import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, Trail, Sphere, Box, Cylinder, Torus } from '@react-three/drei'
import * as THREE from 'three'
import { DefencePostFX } from '../PostProcessing'

// ─── Drone Body ────────────────────────────────────────────────────────────
function DroneBody({ highlightedPart, scrollProgress = 0 }) {
  const bodyRef   = useRef()
  const rotorRefs = [useRef(), useRef(), useRef(), useRef()]

  useFrame((state) => {
    if (bodyRef.current) {
      // Slow Y rotation driven by scroll progress
      bodyRef.current.rotation.y = scrollProgress * Math.PI * 2 + state.clock.elapsedTime * 0.15
      bodyRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05
    }
    // Spin rotors fast
    rotorRefs.forEach((ref, i) => {
      if (ref.current) {
        ref.current.rotation.y += (i % 2 === 0 ? 0.4 : -0.4)
      }
    })
  })

  const armPositions = [
    [ 1.2,  0,  1.2],
    [-1.2,  0,  1.2],
    [ 1.2,  0, -1.2],
    [-1.2,  0, -1.2],
  ]

  const isHighlighted = (part) => highlightedPart === part
  const partColor = (part, base = '#00d4ff') =>
    isHighlighted(part) ? '#ffffff' : base
  const partEmissive = (part) =>
    isHighlighted(part) ? new THREE.Color('#00d4ff') : new THREE.Color('#001a22')

  return (
    <group ref={bodyRef}>
      {/* Main fuselage */}
      <Box args={[0.6, 0.18, 0.9]} castShadow>
        <meshStandardMaterial
          color={partColor('fuselage')}
          emissive={partEmissive('fuselage')}
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
          wireframe={false}
        />
      </Box>

      {/* Fuselage wireframe overlay */}
      <Box args={[0.62, 0.2, 0.92]}>
        <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.15} />
      </Box>

      {/* Camera gimbal under body */}
      <group position={[0, -0.14, 0.1]}>
        <Sphere args={[0.1, 8, 8]}>
          <meshStandardMaterial color="#0a1520" metalness={0.9} roughness={0.1} />
        </Sphere>
        {/* Lens */}
        <Cylinder args={[0.04, 0.04, 0.05, 8]} position={[0, -0.07, 0]} rotation={[Math.PI/2, 0, 0]}>
          <meshBasicMaterial color={partColor('sensor')} />
        </Cylinder>
      </group>

      {/* Arms + Rotors */}
      {armPositions.map((pos, i) => (
        <group key={i} position={pos}>
          {/* Arm */}
          <Box args={[0.06, 0.04, 0.06]}>
            <meshStandardMaterial color="#0d1f2e" metalness={0.7} roughness={0.3} />
          </Box>

          {/* Rotor mount */}
          <Cylinder args={[0.06, 0.06, 0.04, 8]} position={[0, 0.04, 0]}>
            <meshStandardMaterial
              color={partColor('rotors')}
              emissive={partEmissive('rotors')}
              emissiveIntensity={0.2}
              metalness={0.6}
              roughness={0.4}
            />
          </Cylinder>

          {/* Spinning rotor blades */}
          <group ref={rotorRefs[i]} position={[0, 0.07, 0]}>
            {[0, Math.PI/2].map((rot, j) => (
              <Box key={j} args={[0.55, 0.01, 0.06]} rotation={[0, rot, 0]}>
                <meshStandardMaterial
                  color="#00a8cc"
                  transparent
                  opacity={0.7}
                  metalness={0.4}
                  roughness={0.6}
                />
              </Box>
            ))}
          </group>

          {/* Rotor glow ring */}
          <Torus args={[0.28, 0.01, 4, 20]} position={[0, 0.07, 0]} rotation={[Math.PI/2, 0, 0]}>
            <meshBasicMaterial color="#00d4ff" transparent opacity={0.4} />
          </Torus>
        </group>
      ))}

      {/* Comms antenna */}
      <Cylinder args={[0.008, 0.004, 0.3, 4]} position={[0, 0.22, -0.2]}>
        <meshBasicMaterial color={partColor('comms')} />
      </Cylinder>

      {/* Sensor array on top */}
      {[-0.15, 0, 0.15].map((x, i) => (
        <Sphere key={i} args={[0.025, 6, 6]} position={[x, 0.12, 0.1]}>
          <meshBasicMaterial color={partColor('sensor')} />
        </Sphere>
      ))}

      {/* Landing gear */}
      {[[-0.25, 0.25], [0.25, 0.25], [-0.25, -0.25], [0.25, -0.25]].map(([x, z], i) => (
        <Cylinder key={i} args={[0.01, 0.01, 0.2, 4]} position={[x, -0.18, z]}>
          <meshStandardMaterial color="#0a1520" metalness={0.7} roughness={0.3} />
        </Cylinder>
      ))}
    </group>
  )
}

// ─── Scan Ring ─────────────────────────────────────────────────────────────
function ScanRing() {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) {
      ref.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 1.2) * 0.3)
      ref.current.material.opacity = 0.3 - Math.sin(state.clock.elapsedTime * 1.2) * 0.2
    }
  })
  return (
    <Torus ref={ref} args={[1.8, 0.01, 4, 60]} rotation={[Math.PI/2, 0, 0]} position={[0, -0.5, 0]}>
      <meshBasicMaterial color="#00d4ff" transparent opacity={0.3} />
    </Torus>
  )
}

// ─── Ground Grid ───────────────────────────────────────────────────────────
function GroundGrid() {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) ref.current.position.z = (state.clock.elapsedTime * 0.3) % 1
  })
  return (
    <group ref={ref} position={[0, -1.5, 0]} rotation={[-Math.PI/2, 0, 0]}>
      <gridHelper args={[20, 20, '#00d4ff', '#00d4ff']} rotation={[Math.PI/2, 0, 0]}>
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.06} />
      </gridHelper>
    </group>
  )
}

// ─── UAV Scene Canvas ──────────────────────────────────────────────────────
export default function UAVScene({ highlightedPart = null, scrollProgress = 0 }) {
  return (
    <Canvas
      camera={{ position: [3, 2, 4], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#00d4ff" />
      <pointLight position={[-5, -2, -5]} intensity={0.5} color="#0066aa" />
      <spotLight position={[0, 8, 0]} intensity={1} color="#ffffff" penumbra={0.5} />

      <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.3}>
        <DroneBody highlightedPart={highlightedPart} scrollProgress={scrollProgress} />
      </Float>

      <ScanRing />
      <GroundGrid />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 4}
      />
      <fog attach="fog" args={['#050607', 8, 20]} />
      <DefencePostFX bloomIntensity={1.5} bloomThreshold={0.1} chromatic vignette />
    </Canvas>
  )
}

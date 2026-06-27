import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere } from '@react-three/drei'
import * as THREE from 'three'
import { DefencePostFX } from '../PostProcessing'

// ─── Network Layer Definition ──────────────────────────────────────────────
const LAYERS = [
  { count: 4, x: -3 },
  { count: 6, x: -1.5 },
  { count: 6, x: 0 },
  { count: 4, x: 1.5 },
  { count: 2, x: 3 },
]

function buildNodes() {
  const nodes = []
  LAYERS.forEach((layer, li) => {
    for (let i = 0; i < layer.count; i++) {
      const y = (i - (layer.count - 1) / 2) * 0.9
      nodes.push({ id: `${li}-${i}`, x: layer.x, y, z: 0, layer: li })
    }
  })
  return nodes
}

function buildEdges(nodes) {
  const edges = []
  for (let li = 0; li < LAYERS.length - 1; li++) {
    const fromNodes = nodes.filter(n => n.layer === li)
    const toNodes   = nodes.filter(n => n.layer === li + 1)
    fromNodes.forEach(from => {
      toNodes.forEach(to => {
        edges.push({ from, to })
      })
    })
  }
  return edges
}

// ─── Connection Lines ──────────────────────────────────────────────────────
function Connections({ edges, activationTime }) {
  const ref = useRef()

  const geometry = useMemo(() => {
    const positions = []
    edges.forEach(({ from, to }) => {
      positions.push(from.x, from.y, from.z)
      positions.push(to.x,   to.y,   to.z)
    })
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    return geo
  }, [edges])

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color="#00d4ff" transparent opacity={0.08} />
    </lineSegments>
  )
}

// ─── Activation Pulse ──────────────────────────────────────────────────────
function ActivationPulse({ edges, speed = 0.6 }) {
  const meshRef = useRef()
  const progressRef = useRef(0)
  const edgeIndexRef = useRef(0)

  useFrame((state, delta) => {
    progressRef.current += delta * speed
    if (progressRef.current >= 1) {
      progressRef.current = 0
      edgeIndexRef.current = (edgeIndexRef.current + 1) % edges.length
    }

    const edge = edges[edgeIndexRef.current]
    if (meshRef.current && edge) {
      const t = progressRef.current
      meshRef.current.position.set(
        edge.from.x + (edge.to.x - edge.from.x) * t,
        edge.from.y + (edge.to.y - edge.from.y) * t,
        0
      )
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.04, 6, 6]} />
      <meshBasicMaterial color="#ffffff" />
    </mesh>
  )
}

// ─── Nodes ─────────────────────────────────────────────────────────────────
function Nodes({ nodes }) {
  const groupRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      {nodes.map((node) => (
        <group key={node.id} position={[node.x, node.y, node.z]}>
          {/* Node sphere */}
          <Sphere args={[0.12, 10, 10]}>
            <meshStandardMaterial
              color="#00d4ff"
              emissive={new THREE.Color('#003344')}
              emissiveIntensity={1}
              metalness={0.3}
              roughness={0.7}
              transparent
              opacity={0.85}
            />
          </Sphere>
          {/* Outer glow ring */}
          <Sphere args={[0.18, 8, 8]}>
            <meshBasicMaterial color="#00d4ff" transparent opacity={0.06} />
          </Sphere>
        </group>
      ))}
    </group>
  )
}

// ─── Neural Network Canvas ─────────────────────────────────────────────────
export default function NeuralNetworkScene() {
  const nodes = useMemo(buildNodes, [])
  const edges = useMemo(() => buildEdges(nodes), [nodes])

  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 55 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#00d4ff" />
      <pointLight position={[-5, -5, 5]} intensity={0.6} color="#0044aa" />

      <Nodes nodes={nodes} />
      <Connections edges={edges} />

      {/* Multiple pulses offset in time */}
      {[0, 0.33, 0.66].map((offset, i) => (
        <ActivationPulse key={i} edges={edges} speed={0.5 + i * 0.1} />
      ))}

      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} />
      <fog attach="fog" args={['#050607', 8, 18]} />
      <DefencePostFX bloomIntensity={1.8} bloomThreshold={0.08} chromatic={false} vignette />
    </Canvas>
  )
}

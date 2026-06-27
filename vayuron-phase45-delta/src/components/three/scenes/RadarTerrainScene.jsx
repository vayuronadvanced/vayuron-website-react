import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Plane } from '@react-three/drei'
import * as THREE from 'three'
import { DefencePostFX } from '../PostProcessing'

// ─── Terrain Mesh ──────────────────────────────────────────────────────────
function TerrainMesh() {
  const ref = useRef()
  const size = 20
  const segments = 40

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(size, size, segments, segments)
    geo.rotateX(-Math.PI / 2)

    // Generate height map — rolling hills
    const positions = geo.attributes.position
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i)
      const z = positions.getZ(i)
      const h =
        Math.sin(x * 0.5) * 0.4 +
        Math.cos(z * 0.4) * 0.3 +
        Math.sin((x + z) * 0.3) * 0.2
      positions.setY(i, h)
    }
    geo.computeVertexNormals()
    return geo
  }, [])

  useFrame((state) => {
    if (ref.current?.material) {
      ref.current.material.uniforms.time.value = state.clock.elapsedTime
    }
  })

  // Custom shader for the terrain — grid lines + colour gradient by height
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time:      { value: 0 },
        gridColor: { value: new THREE.Color('#00d4ff') },
        lowColor:  { value: new THREE.Color('#050607') },
        highColor: { value: new THREE.Color('#003344') },
      },
      vertexShader: `
        varying vec3 vPosition;
        varying vec3 vNormal;
        void main() {
          vPosition = position;
          vNormal = normal;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 gridColor;
        uniform vec3 lowColor;
        uniform vec3 highColor;
        varying vec3 vPosition;
        varying vec3 vNormal;

        void main() {
          // Grid lines
          float gx = abs(fract(vPosition.x * 2.0) - 0.5);
          float gz = abs(fract(vPosition.z * 2.0) - 0.5);
          float grid = 1.0 - step(0.04, min(gx, gz));

          // Height gradient
          float height = (vPosition.y + 0.5) * 0.8;
          vec3 baseColor = mix(lowColor, highColor, clamp(height, 0.0, 1.0));

          // Radar sweep — a rotating line
          float angle = atan(vPosition.z, vPosition.x);
          float sweep = mod(angle + time * 0.8, 3.14159 * 2.0);
          float sweepIntensity = smoothstep(0.3, 0.0, sweep) * 0.4;

          // Distance fade from center
          float dist = length(vPosition.xz) / 10.0;
          float fade = 1.0 - clamp(dist, 0.0, 1.0);

          vec3 finalColor = mix(baseColor, gridColor, grid * 0.4 * fade);
          finalColor += gridColor * sweepIntensity * fade;

          gl_FragColor = vec4(finalColor, 0.9 * fade + 0.1);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    })
  }, [])

  return <mesh ref={ref} geometry={geometry} material={material} />
}

// ─── Target Markers ────────────────────────────────────────────────────────
function TargetMarker({ position, size = 0.15 }) {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) {
      ref.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.15)
      ref.current.rotation.y += 0.02
    }
  })

  return (
    <group ref={ref} position={position}>
      {/* Diamond shape from two planes */}
      {[0, Math.PI / 2].map((rot, i) => (
        <mesh key={i} rotation={[0, rot, 0]}>
          <planeGeometry args={[size, size]} />
          <meshBasicMaterial color="#00d4ff" wireframe />
        </mesh>
      ))}
      {/* Centre dot */}
      <mesh>
        <sphereGeometry args={[0.03, 4, 4]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      {/* Pulse ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.12, 0.008, 4, 16]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.6} />
      </mesh>
    </group>
  )
}

// ─── Radar Sweep Circle ────────────────────────────────────────────────────
function RadarCircles() {
  return (
    <>
      {[3, 6, 9].map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
          <torusGeometry args={[r, 0.015, 4, 60]} />
          <meshBasicMaterial color="#00d4ff" transparent opacity={0.06 - i * 0.015} />
        </mesh>
      ))}
    </>
  )
}

// ─── Radar Terrain Canvas ──────────────────────────────────────────────────
export default function RadarTerrainScene() {
  const targets = [
    [2, 0.7, 1],
    [-3, 0.4, -2],
    [1, 0.3, -3],
    [-1, 0.6, 2],
  ]

  return (
    <Canvas
      camera={{ position: [0, 8, 8], fov: 55 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 10, 0]} intensity={0.5} color="#00d4ff" />

      <TerrainMesh />
      <RadarCircles />

      {targets.map((pos, i) => (
        <TargetMarker key={i} position={pos} />
      ))}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        maxPolarAngle={Math.PI / 2.5}
        minPolarAngle={Math.PI / 5}
      />
      <fog attach="fog" args={['#050607', 12, 30]} />
      <DefencePostFX bloomIntensity={1.0} bloomThreshold={0.12} chromatic vignette />
    </Canvas>
  )
}

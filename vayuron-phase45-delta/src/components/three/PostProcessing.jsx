import { EffectComposer, Bloom, ChromaticAberration, Vignette, Noise } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'

// ─── DefencePostFX ────────────────────────────────────────────────────────
// Full post-processing stack for the hero canvas and major 3D scenes.
// Bloom = the cyan glow on bright elements.
// ChromaticAberration = slight colour fringing on edges (cinematic).
// Vignette = darkened corners (theatre effect).
// Noise = subtle film grain for analogue texture.
export function DefencePostFX({
  bloom = true,
  chromatic = true,
  vignette = true,
  noise = false,
  bloomIntensity = 0.8,
  bloomThreshold = 0.2,
  bloomRadius = 0.6,
}) {
  return (
    <EffectComposer>
      {bloom && (
        <Bloom
          intensity={bloomIntensity}
          luminanceThreshold={bloomThreshold}
          luminanceSmoothing={0.4}
          radius={bloomRadius}
          blendFunction={BlendFunction.ADD}
        />
      )}
      {chromatic && (
        <ChromaticAberration
          offset={new THREE.Vector2(0.0005, 0.0005)}
          blendFunction={BlendFunction.NORMAL}
        />
      )}
      {vignette && (
        <Vignette
          offset={0.4}
          darkness={0.7}
          blendFunction={BlendFunction.NORMAL}
        />
      )}
      {noise && (
        <Noise
          premultiply
          blendFunction={BlendFunction.ADD}
          opacity={0.04}
        />
      )}
    </EffectComposer>
  )
}

// ─── MinimalPostFX ─────────────────────────────────────────────────────────
// Lighter version for banner canvases — bloom + vignette only
export function MinimalPostFX({ bloomIntensity = 0.5 }) {
  return (
    <EffectComposer>
      <Bloom
        intensity={bloomIntensity}
        luminanceThreshold={0.3}
        luminanceSmoothing={0.6}
        radius={0.5}
      />
      <Vignette offset={0.3} darkness={0.6} />
    </EffectComposer>
  )
}

export default DefencePostFX

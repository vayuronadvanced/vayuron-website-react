import { Suspense, lazy } from 'react'
import ProductPageTemplate from './ProductPageTemplate'

const NeuralNetworkScene = lazy(() => import('../../components/three/scenes/NeuralNetworkScene'))

function AIHero3D() {
  return (
    <section className="relative h-[480px] bg-black border-b border-[rgba(0,212,255,0.1)] overflow-hidden">
      <div className="absolute inset-0">
        <Suspense fallback={<div className="w-full h-full grid-overlay animate-pulse-slow" />}>
          <NeuralNetworkScene />
        </Suspense>
      </div>
      <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between pointer-events-none">
        <div>
          <p className="font-mono text-[10px] text-cyan tracking-widest uppercase mb-1">Live Neural Network</p>
          <p className="font-mono text-[10px] text-dim">5-layer deep neural network — real-time inference visualization</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
          <span className="font-mono text-[10px] text-cyan">PROCESSING</span>
        </div>
      </div>
    </section>
  )
}

export default function AIPage() {
  return (
    <>
      <ProductPageTemplate
        eyebrow="Product Line 02"
        title="Artificial Intelligence"
        subtitle="Edge AI, computer vision, and decision intelligence platforms for autonomous and semi-autonomous operations."
        description="Vayuron's AI division develops intelligent software systems that transform raw sensor data into actionable operational intelligence. From real-time object detection on embedded hardware to full command-and-control AI backends, our systems operate at the edge without cloud dependency — critical for contested and denied environments."
        crumbs={[{ label: 'Products', path: '/products' }, { label: 'Artificial Intelligence' }]}
        specGroups={[
          {
            label: 'Performance',
            specs: [
              { label: 'Inference Speed', value: '<10 ms' },
              { label: 'Accuracy',        value: '97.4%' },
              { label: 'Hardware',        value: 'GPU/NPU' },
              { label: 'Frameworks',      value: 'ONNX/TFLite' },
            ],
          },
          {
            label: 'Deployment',
            specs: [
              { label: 'Edge Deployment', value: 'Yes' },
              { label: 'Cloud Required',  value: 'No' },
              { label: 'Languages',       value: 'Python/C++' },
              { label: 'Model Size',      value: 'Configurable' },
            ],
          },
        ]}
        features={[
          { icon: '👁',  title: 'Computer Vision',      description: 'Real-time object detection, classification, and tracking across EO, IR, and multispectral imagery.' },
          { icon: '🧠', title: 'Decision Intelligence', description: 'AI-driven situational awareness engines fusing multi-sensor data into prioritised threat assessments.' },
          { icon: '⚡', title: 'Edge AI Deployment',    description: 'Models optimised for NVIDIA Jetson, Hailo, and custom NPUs — no cloud connectivity required.' },
          { icon: '🛡', title: 'Adversarial Robustness',description: 'Models hardened against adversarial inputs and sensor spoofing in contested environments.' },
          { icon: '📡', title: 'Signal Intelligence',   description: 'AI-powered RF signal classification and spectrum monitoring for EW support.' },
          { icon: '🔄', title: 'Continuous Learning',   description: 'Federated learning pipelines enabling model improvement without centralised data exposure.' },
        ]}
        nextProduct={{ label: 'Software Systems', path: '/products/software-systems' }}
      />
      <AIHero3D />
    </>
  )
}

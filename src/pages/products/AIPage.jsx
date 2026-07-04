import ProductPageTemplate from './templates/ProductPageTemplate'

export default function AIPage() {
  return (
    <ProductPageTemplate
      eyebrow="Product Line 02"
      title="Artificial Intelligence"
      subtitle="Edge AI, computer vision, and decision intelligence platforms for autonomous and semi-autonomous operations."
      heroVideo="/Drone1.mp4"
      backgroundImage="/AI1.png"
      specsBackgroundImage="/AI2.png"
      capabilitiesBackgroundImage="/Product2-Capabilities.png"
      description="Vayuron's AI division develops intelligent software systems that transform raw sensor data into actionable operational intelligence. From real-time object detection on embedded hardware to full command-and-control AI backends, our systems operate at the edge without cloud dependency — critical for contested and denied environments."
      crumbs={[{ label: 'Products', path: '/products' }, { label: 'Artificial Intelligence' }]}
      specs={[
        { label: 'Inference Speed', value: '<10 ms' },
        { label: 'Accuracy',        value: '97.4%' },
        { label: 'Edge Deployment', value: 'Yes' },
        { label: 'Model Size',      value: 'Configurable' },
        { label: 'Hardware',        value: 'GPU/NPU' },
        { label: 'Frameworks',      value: 'ONNX/TFLite' },
        { label: 'Languages',       value: 'Python/C++' },
        { label: 'Cloud Required',  value: 'No' },
      ]}
      features={[
        { title: 'Computer Vision', description: 'Real-time object detection, classification, and tracking across electro-optical, infrared, and multispectral imagery.', bullets: ['Real-time object tracking', 'Multi-sensor imagery support'] },
        { title: 'Decision Intelligence', description: 'AI-driven situational awareness engines that fuse multi-sensor data and present prioritised threat assessments.', bullets: ['Multi-sensor data fusion', 'Prioritised threat scoring'] },
        { title: 'Edge AI Deployment', description: 'Models optimised for embedded hardware — NVIDIA Jetson, Hailo, and custom NPUs — with no cloud connectivity required.', bullets: ['No cloud dependency', 'Custom NPU optimisation'] },
        { title: 'Adversarial Robustness', description: 'Models hardened against adversarial inputs and sensor spoofing common in contested operational environments.', bullets: ['Spoofing-resistant models', 'Contested-environment tested'] },
        { title: 'Signal Intelligence', description: 'AI-powered RF signal classification and spectrum monitoring for electronic warfare support.', bullets: ['RF signal classification', 'Spectrum monitoring'] },
        { title: 'Continuous Learning', description: 'Federated learning pipelines enabling model improvement from field data without centralised data exposure.', bullets: ['Federated learning pipelines', 'No centralised data exposure'] },
      ]}
      nextProduct={{ label: 'Software Systems', path: '/products/software-systems' }}
    />
  )
}

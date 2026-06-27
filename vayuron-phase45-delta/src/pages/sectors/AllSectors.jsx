import { Suspense, lazy } from 'react'
import SectorPageTemplate from './SectorPageTemplate'

const RadarTerrainScene = lazy(() => import('../../components/three/scenes/RadarTerrainScene'))
const SmartCityScene    = lazy(() => import('../../components/three/scenes/CityAndInfraScene').then(m => ({ default: m.SmartCityScene })))
const InfraScene        = lazy(() => import('../../components/three/scenes/CityAndInfraScene').then(m => ({ default: m.InfrastructureScene })))

function Scene3DBlock({ label, desc, children }) {
  return (
    <section className="py-16 px-6 max-w-[1400px] mx-auto">
      <div className="relative h-[360px] bg-surface border border-[rgba(0,212,255,0.1)] overflow-hidden mb-4">
        <Suspense fallback={<div className="w-full h-full grid-overlay animate-pulse-slow" />}>
          {children}
        </Suspense>
        <div className="absolute bottom-4 left-4 pointer-events-none">
          <p className="font-mono text-[10px] text-cyan tracking-widest uppercase">{label}</p>
          <p className="font-mono text-[10px] text-dim">{desc}</p>
        </div>
      </div>
    </section>
  )
}

// ─── Defence & Security ────────────────────────────────────────────────────
export function DefencePage() {
  return (
    <>
      <SectorPageTemplate
        eyebrow="Sector 01"
        title="Defence & Security"
        subtitle="Autonomous systems and AI intelligence platforms for national security and armed forces operations."
        crumbs={[{ label: 'Sectors', path: '/sectors' }, { label: 'Defence & Security' }]}
        stats={[
          { value: 15, suffix: '+', label: 'Defence Deployments' },
          { value: 99, suffix: '%', label: 'Mission Success Rate' },
          { value: 24, suffix: '/7', label: 'Operational Support' },
        ]}
        overview="Modern defence operations demand real-time intelligence, autonomous platform coordination, and resilient communications across contested and denied environments. Vayuron's defence solutions integrate UAV platforms, AI analytics, and encrypted C2 software into a unified operational architecture."
        solution="We deploy multi-domain autonomous systems with AI-powered ISR, encrypted data links, and swarm coordination — purpose-built for Indian defence forces and allied security organisations."
        challenges={[
          { icon: '📡', title: 'Communications Denial',   description: 'Operating in GPS-denied and RF-jammed environments where conventional comms are degraded or unavailable.' },
          { icon: '👁',  title: 'Persistent Surveillance', description: 'Maintaining continuous ISR coverage across wide areas with limited manned aviation assets.' },
          { icon: '⚡', title: 'Rapid Deployment',        description: 'Getting operational capability to forward positions in austere environments with minimal logistics footprint.' },
          { icon: '🛡', title: 'Counter-UAS Threat',      description: 'Defending against adversarial drone swarms and low-signature aerial threats in contested airspace.' },
        ]}
        technologies={[
          { icon: '🛸', label: 'Tactical UAVs',  description: 'Fixed-wing and rotary ISR platforms for forward reconnaissance.', path: '/products/uav-systems' },
          { icon: '🧠', label: 'Target AI',      description: 'Real-time target detection and tracking AI on embedded edge hardware.', path: '/products/artificial-intelligence' },
          { icon: '🎮', label: 'C2 Software',    description: 'Encrypted GCS and mission planning software.', path: '/products/software-systems' },
          { icon: '🔧', label: 'Field Hardware', description: 'Ruggedised electronics built to MIL-STD-810.', path: '/products/advanced-engineering' },
        ]}
      />
      <Scene3DBlock label="RADAR TERRAIN VISUALIZATION" desc="Live tactical terrain mapping with target markers — drag to orbit">
        <RadarTerrainScene />
      </Scene3DBlock>
    </>
  )
}

// ─── Smart Cities ──────────────────────────────────────────────────────────
export function SmartCitiesPage() {
  return (
    <>
      <SectorPageTemplate
        eyebrow="Sector 02"
        title="Smart Cities"
        subtitle="Autonomous aerial monitoring and AI analytics for urban management, safety, and infrastructure."
        crumbs={[{ label: 'Sectors', path: '/sectors' }, { label: 'Smart Cities' }]}
        stats={[
          { value: 8,   suffix: '+', label: 'City Deployments' },
          { value: 60,  suffix: '%', label: 'Incident Response Improvement' },
          { value: 365, suffix: '',  label: 'Days Continuous Coverage' },
        ]}
        overview="Smart city operations require persistent aerial surveillance, traffic analytics, crowd monitoring, and infrastructure inspection without disrupting urban life. Vayuron's electric UAVs and AI video analytics platform provide city administrators with real-time urban intelligence."
        solution="Integrated UAV-as-a-Service for urban centres, combining persistent drone patrols, AI crowd and traffic analytics, and a unified city operations dashboard — managed from a single control centre."
        challenges={[
          { icon: '🏙', title: 'Urban Airspace Complexity', description: 'Navigating dense urban airspace with buildings, wires, and manned aviation requiring precise autonomous flight.' },
          { icon: '🔒', title: 'Data Privacy Compliance',   description: 'Collecting and processing urban video data within PDPA and regulatory frameworks for public surveillance.' },
          { icon: '📱', title: 'Multi-Agency Coordination', description: 'Providing a single operational picture to police, fire, traffic, and utility agencies simultaneously.' },
          { icon: '🌧', title: 'All-Weather Operations',    description: 'Maintaining operational coverage during rain, wind, and reduced visibility conditions.' },
        ]}
        technologies={[
          { icon: '🚁', label: 'Urban UAV Fleet',  description: 'Low-noise electric drones optimised for urban flight corridors.', path: '/products/uav-systems' },
          { icon: '👁',  label: 'Video Analytics', description: 'AI crowd density, anomaly detection, and ANPR from aerial feeds.', path: '/products/artificial-intelligence' },
          { icon: '📊', label: 'City Dashboard',   description: 'Unified operations centre aggregating all sensor and UAV feeds.', path: '/products/software-systems' },
          { icon: '📡', label: 'Comms Infra',      description: 'Mesh radio and 4G/5G datalink for city-wide drone connectivity.', path: '/products/advanced-engineering' },
        ]}
      />
      <Scene3DBlock label="SMART CITY DRONE OPERATIONS" desc="Live drone flight path over urban grid — autonomous waypoint navigation">
        <SmartCityScene />
      </Scene3DBlock>
    </>
  )
}

// ─── Municipal Operations ──────────────────────────────────────────────────
export function MunicipalPage() {
  return (
    <SectorPageTemplate
      eyebrow="Sector 03"
      title="Municipal Operations"
      subtitle="UAV and AI solutions for local government asset management, inspection, and public service delivery."
      crumbs={[{ label: 'Sectors', path: '/sectors' }, { label: 'Municipal Operations' }]}
      stats={[{ value: 40, suffix: '%', label: 'Cost Reduction' }, { value: 12, suffix: '+', label: 'Municipal Clients' }, { value: 500, suffix: '+', label: 'Inspections Completed' }]}
      overview="Municipalities face the challenge of maintaining extensive public infrastructure — roads, bridges, water networks, parks, and public buildings — with constrained budgets and limited inspection resources."
      solution="Municipality-specific drone inspection services and software platforms enabling councils to survey, map, and maintain public assets at a fraction of traditional costs."
      challenges={[
        { icon: '🏗', title: 'Asset Inventory Gaps',    description: 'Maintaining accurate records of all public infrastructure assets across large geographic areas.' },
        { icon: '💰', title: 'Budget Constraints',      description: 'Delivering comprehensive inspection coverage with limited council budgets and reduced staffing.' },
        { icon: '⏱', title: 'Inspection Backlogs',     description: 'Clearing backlogs of scheduled infrastructure inspections that accumulate faster than teams can clear them.' },
        { icon: '📋', title: 'Reporting Requirements', description: 'Generating audit-quality inspection reports and documentation for regulatory compliance.' },
      ]}
      technologies={[
        { icon: '🗺', label: 'Mapping UAVs',       description: 'Photogrammetry drones delivering centimetre-accuracy 3D maps.', path: '/products/uav-systems' },
        { icon: '🔍', label: 'Defect Detection AI',description: 'Automated crack, pothole, and structural defect identification.', path: '/products/artificial-intelligence' },
        { icon: '📁', label: 'Asset Management',   description: 'Municipal asset register with inspection history and scheduling.', path: '/products/software-systems' },
        { icon: '📸', label: 'Survey Sensors',     description: 'RGB, multispectral, and LiDAR payloads for comprehensive surveys.', path: '/products/advanced-engineering' },
      ]}
    />
  )
}

// ─── Infrastructure Monitoring ─────────────────────────────────────────────
export function InfrastructurePage() {
  return (
    <>
      <SectorPageTemplate
        eyebrow="Sector 04"
        title="Infrastructure Monitoring"
        subtitle="Autonomous inspection and AI-powered condition monitoring for critical national infrastructure."
        crumbs={[{ label: 'Sectors', path: '/sectors' }, { label: 'Infrastructure Monitoring' }]}
        stats={[{ value: 300, suffix: '+', label: 'km Pipeline Inspected' }, { value: 85, suffix: '%', label: 'Faster than Manual' }, { value: 20, suffix: '+', label: 'Bridge Surveys' }]}
        overview="Power lines, pipelines, railways, bridges, and towers form the backbone of national infrastructure. Traditional inspection is slow, dangerous, and expensive. Vayuron UAV systems enable rapid, repeatable inspection with AI-powered defect detection."
        solution="Fixed-wing and rotary UAVs with thermal, LiDAR, and visual sensors inspect hundreds of kilometres of infrastructure daily, with AI automatically flagging anomalies for engineer review."
        challenges={[
          { icon: '⚡', title: 'Hazardous Access',       description: 'Inspecting energised power lines, elevated structures, and confined spaces that pose serious risk.' },
          { icon: '📏', title: 'Linear Scale',           description: 'Covering hundreds of kilometres of pipeline, railway, or powerline efficiently.' },
          { icon: '🌡', title: 'Thermal Anomalies',     description: 'Detecting heat signatures indicating electrical faults or mechanical wear before failures occur.' },
          { icon: '📄', title: 'Regulatory Compliance', description: 'Meeting statutory inspection frequency requirements and maintaining audit trails.' },
        ]}
        technologies={[
          { icon: '✈', label: 'Fixed-Wing UAV',    description: 'Long-endurance platforms covering 200+ km per sortie.', path: '/products/uav-systems' },
          { icon: '🌡', label: 'Thermal AI',        description: 'AI analysis of thermal imagery to detect faults and anomalies.', path: '/products/artificial-intelligence' },
          { icon: '📊', label: 'Inspection Reports',description: 'Automated report generation with GPS-tagged defect locations.', path: '/products/software-systems' },
          { icon: '🔭', label: 'Multi-Sensor Payload',description: 'Thermal, visual, and LiDAR for comprehensive assessment.', path: '/products/advanced-engineering' },
        ]}
      />
      <Scene3DBlock label="PIPELINE THERMAL MONITORING" desc="Thermal gradient visualization across pipeline segments — simulated sensor data">
        <InfraScene />
      </Scene3DBlock>
    </>
  )
}

// ─── Agriculture ───────────────────────────────────────────────────────────
export function AgriculturePage() {
  return (
    <SectorPageTemplate
      eyebrow="Sector 05" title="Agriculture"
      subtitle="Precision agriculture UAV systems delivering crop health monitoring, spraying, and yield analytics."
      crumbs={[{ label: 'Sectors', path: '/sectors' }, { label: 'Agriculture' }]}
      stats={[{ value: 25, suffix: '%', label: 'Input Cost Reduction' }, { value: 10000, suffix: '+', label: 'Hectares Covered' }, { value: 30, suffix: '%', label: 'Yield Improvement' }]}
      overview="Indian agriculture faces productivity, water efficiency, and input cost challenges at massive scale. Vayuron agricultural UAVs deliver precision crop monitoring, targeted spraying, and AI-powered yield prediction."
      solution="Multi-rotor spray drones, multispectral survey platforms, and an agricultural AI analytics platform — delivering the full precision agriculture stack from field survey to application and reporting."
      challenges={[
        { icon: '🌾', title: 'Crop Health Monitoring', description: 'Detecting disease, pest infestation, and nutrient deficiency across large farming areas before visible damage.' },
        { icon: '💧', title: 'Water Efficiency',       description: 'Targeting irrigation precisely to areas of moisture stress rather than applying uniformly.' },
        { icon: '🐛', title: 'Pest Management',        description: 'Identifying pest pressure hotspots early and applying targeted treatment to reduce chemical usage.' },
        { icon: '📈', title: 'Yield Prediction',       description: 'Generating accurate pre-harvest yield estimates to optimise supply chain planning.' },
      ]}
      technologies={[
        { icon: '🌿', label: 'Spray Drones',       description: 'High-capacity agricultural spray UAVs covering 10 hectares per hour.', path: '/products/uav-systems' },
        { icon: '🔬', label: 'Crop AI',             description: 'Multispectral AI models for NDVI mapping and disease classification.', path: '/products/artificial-intelligence' },
        { icon: '📱', label: 'Farm Dashboard',      description: 'Field-by-field analytics portal with prescription maps.', path: '/products/software-systems' },
        { icon: '🌈', label: 'Multispectral Sensor',description: 'Six-band cameras for crop health analysis.', path: '/products/advanced-engineering' },
      ]}
    />
  )
}

// ─── Disaster Management ───────────────────────────────────────────────────
export function DisasterPage() {
  return (
    <SectorPageTemplate
      eyebrow="Sector 06" title="Disaster Management"
      subtitle="Rapid-response UAV systems for disaster assessment, search and rescue, and relief coordination."
      crumbs={[{ label: 'Sectors', path: '/sectors' }, { label: 'Disaster Management' }]}
      stats={[{ value: 2, suffix: 'hr', label: 'Deployment Time' }, { value: 50, suffix: '+', label: 'Disaster Responses' }, { value: 90, suffix: '%', label: 'Faster Damage Assessment' }]}
      overview="Natural disasters demand immediate situational awareness and coordinated response. Vayuron UAV systems are deployable within hours of a disaster event, providing real-time imagery, survivor detection, and logistics support."
      solution="Rapid-deployment UAV kits with man-portable airframes, satellite comms-enabled datalinks, and AI survivor detection operate independently of ground infrastructure."
      challenges={[
        { icon: '⏱', title: 'Speed of Response',         description: 'Generating situational awareness in the first critical hours after a disaster when ground access is blocked.' },
        { icon: '📡', title: 'Comms Infrastructure Loss', description: 'Operating when terrestrial communications and roads are destroyed by the disaster.' },
        { icon: '🔍', title: 'Survivor Location',         description: 'Detecting and locating survivors in collapsed structures, floodwater, or remote terrain.' },
        { icon: '🚁', title: 'Airspace Coordination',     description: 'Operating safely alongside manned rescue helicopters in uncontrolled airspace.' },
      ]}
      technologies={[
        { icon: '📦', label: 'Rapid Deploy Kit',    description: 'Man-portable UAV systems deployable in under 20 minutes.', path: '/products/uav-systems' },
        { icon: '🧑‍🤝‍🧑', label: 'Survivor Detection AI', description: 'Thermal AI models trained to identify human heat signatures.', path: '/products/artificial-intelligence' },
        { icon: '🗺', label: 'Relief Dashboard',    description: 'Real-time damage mapping and resource allocation software.', path: '/products/software-systems' },
        { icon: '📡', label: 'SATCOM Datalink',     description: 'Satellite communication-enabled datalinks for remote areas.', path: '/products/advanced-engineering' },
      ]}
    />
  )
}

// ─── Environmental Monitoring ──────────────────────────────────────────────
export function EnvironmentalPage() {
  return (
    <SectorPageTemplate
      eyebrow="Sector 07" title="Environmental Monitoring"
      subtitle="UAV and AI platforms for environmental compliance, pollution monitoring, and ecological assessment."
      crumbs={[{ label: 'Sectors', path: '/sectors' }, { label: 'Environmental Monitoring' }]}
      stats={[{ value: 5000, suffix: '+', label: 'sq km Surveyed' }, { value: 95, suffix: '%', label: 'Detection Accuracy' }, { value: 40, suffix: '+', label: 'Environmental Projects' }]}
      overview="Regulatory agencies, conservation organisations, and industry face growing pressure to monitor environmental conditions at scale. Vayuron provides autonomous monitoring replacing expensive manned surveys and satellite data."
      solution="Multi-sensor UAV platforms with gas detection, multispectral imaging, and water sampling — feeding data into environmental compliance reporting platforms."
      challenges={[
        { icon: '🌍', title: 'Scale of Coverage',      description: 'Monitoring vast forest, coastal, and watershed areas impractical to survey with manned resources.' },
        { icon: '💨', title: 'Emissions Detection',    description: 'Detecting and quantifying industrial emissions and methane leaks at the source level.' },
        { icon: '🐘', title: 'Wildlife Monitoring',    description: 'Population surveys and tracking of endangered species with minimal ecological disturbance.' },
        { icon: '📜', title: 'Compliance Reporting',   description: 'Generating auditable environmental impact data for regulatory submission and ESG reporting.' },
      ]}
      technologies={[
        { icon: '🌿', label: 'Survey UAV',         description: 'Fixed-wing platforms for large-area ecological surveys.', path: '/products/uav-systems' },
        { icon: '🔬', label: 'Species AI',          description: 'Computer vision models for wildlife species identification.', path: '/products/artificial-intelligence' },
        { icon: '📋', label: 'Compliance Platform', description: 'Environmental data management and regulatory reporting software.', path: '/products/software-systems' },
        { icon: '🧪', label: 'Gas Sensors',         description: 'Miniaturised gas detection payloads for pollutant mapping.', path: '/products/advanced-engineering' },
      ]}
    />
  )
}

// ─── Industrial Inspection ─────────────────────────────────────────────────
export function IndustrialPage() {
  return (
    <SectorPageTemplate
      eyebrow="Sector 08" title="Industrial Inspection"
      subtitle="Autonomous UAV inspection platforms for oil & gas, manufacturing, mining, and heavy industry."
      crumbs={[{ label: 'Sectors', path: '/sectors' }, { label: 'Industrial Inspection' }]}
      stats={[{ value: 70, suffix: '%', label: 'Downtime Reduction' }, { value: 200, suffix: '+', label: 'Facility Inspections' }, { value: 100, suffix: '%', label: 'Coverage vs Manual' }]}
      overview="Industrial facilities — refineries, chemical plants, power stations, and mining operations — require regular inspection of assets that are hazardous, elevated, or confined. Vayuron UAV inspection systems eliminate human exposure to risk."
      solution="UAV platforms with non-destructive testing sensors, corrosion detection AI, and digital twin integration — delivering inspection-as-a-service for major industrial clients."
      challenges={[
        { icon: '⚠', title: 'Worker Safety Risk',       description: 'Eliminating human exposure to heights, confined spaces, and toxic atmospheres during inspection.' },
        { icon: '🏭', title: 'Production Continuity',   description: 'Conducting inspections without shutting down production to avoid costly downtime.' },
        { icon: '🔩', title: 'Corrosion & Defect Detection', description: 'Identifying early-stage corrosion and structural defects before they become critical failures.' },
        { icon: '📊', title: 'Digital Twin Integration', description: 'Feeding inspection data into 3D digital twins and predictive maintenance systems.' },
      ]}
      technologies={[
        { icon: '🏗', label: 'Industrial UAV',   description: 'Confined-space and ex-zone rated UAVs for vessel inspection.', path: '/products/uav-systems' },
        { icon: '🔍', label: 'Corrosion AI',     description: 'AI models for automated corrosion grading and coating assessment.', path: '/products/artificial-intelligence' },
        { icon: '🔧', label: 'Maintenance Platform', description: 'Work order generation and predictive maintenance scheduling.', path: '/products/software-systems' },
        { icon: '📡', label: 'NDT Sensors',      description: 'Ultrasonic, eddy current, and radiographic NDT sensor payloads.', path: '/products/advanced-engineering' },
      ]}
    />
  )
}

export default DefencePage

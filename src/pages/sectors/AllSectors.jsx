import SectorPageTemplate from './SectorPageTemplate'

// ─── Defence & Security ────────────────────────────────────────────────────
export function DefencePage() {
  return (
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
      solution="We deploy multi-domain autonomous systems with AI-powered ISR, encrypted data links, and swarm coordination capabilities — purpose-built for Indian defence forces and allied security organisations."
      challenges={[
        { title: 'Communications Denial', description: 'Operating in GPS-denied and RF-jammed environments where conventional comms are degraded or unavailable.' },
        { title: 'Persistent Surveillance', description: 'Maintaining continuous ISR coverage across wide areas with limited manned aviation assets.' },
        { title: 'Rapid Deployment', description: 'Getting operational capability to forward positions in austere environments with minimal logistics footprint.' },
        { title: 'Counter-UAS Threat', description: 'Defending against adversarial drone swarms and low-signature aerial threats in contested airspace.' },
      ]}
      technologies={[
        { label: 'Tactical UAVs', description: 'Fixed-wing and rotary ISR platforms for forward reconnaissance and target acquisition.', path: '/products/uav-systems' },
        { label: 'Target AI', description: 'Real-time target detection and tracking AI operating on embedded edge hardware.', path: '/products/artificial-intelligence' },
        { label: 'C2 Software', description: 'Encrypted ground control station and mission planning software.', path: '/products/software-systems' },
        { label: 'Field Hardware', description: 'Ruggedised electronics and structures built to MIL-STD-810 standards.', path: '/products/advanced-engineering' },
      ]}
    />
  )
}

// ─── Smart Cities ──────────────────────────────────────────────────────────
export function SmartCitiesPage() {
  return (
    <SectorPageTemplate
      eyebrow="Sector 02"
      title="Smart Cities"
      subtitle="Autonomous aerial monitoring and AI analytics for urban management, safety, and infrastructure."
      crumbs={[{ label: 'Sectors', path: '/sectors' }, { label: 'Smart Cities' }]}
      stats={[
        { value: 8, suffix: '+', label: 'City Deployments' },
        { value: 60, suffix: '%', label: 'Incident Response Improvement' },
        { value: 365, suffix: '', label: 'Days Continuous Coverage' },
      ]}
      overview="Smart city operations require persistent aerial surveillance, traffic analytics, crowd monitoring, and infrastructure inspection — all delivered without disrupting urban life. Vayuron's quiet electric UAVs and AI video analytics platform provide city administrators with real-time urban intelligence."
      solution="We deliver integrated UAV-as-a-Service for urban centres, combining persistent drone patrols, AI crowd and traffic analytics, and a unified city operations dashboard — all managed from a single control centre."
      challenges={[
        { title: 'Urban Airspace Complexity', description: 'Navigating dense urban airspace with buildings, wires, and manned aviation requiring precise autonomous flight.' },
        { title: 'Data Privacy Compliance', description: 'Collecting and processing urban video data within PDPA and regulatory frameworks for public surveillance.' },
        { title: 'Multi-Agency Coordination', description: 'Providing a single operational picture to police, fire, traffic, and utility agencies simultaneously.' },
        { title: 'All-Weather Operations', description: 'Maintaining operational coverage during rain, wind, and reduced visibility conditions.' },
      ]}
      technologies={[
        { label: 'Urban UAV Fleet', description: 'Low-noise electric drones optimised for urban flight corridors and public safety operations.', path: '/products/uav-systems' },
        { label: 'Video Analytics', description: 'AI crowd density, anomaly detection, and licence plate recognition from aerial feeds.', path: '/products/artificial-intelligence' },
        { label: 'City Dashboard', description: 'Unified operations centre software aggregating all sensor and UAV feeds.', path: '/products/software-systems' },
        { label: 'Comms Infrastructure', description: 'Mesh radio and 4G/5G datalink integration for city-wide drone connectivity.', path: '/products/advanced-engineering' },
      ]}
    />
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
      stats={[
        { value: 40, suffix: '%', label: 'Cost Reduction' },
        { value: 12, suffix: '+', label: 'Municipal Clients' },
        { value: 500, suffix: '+', label: 'Inspections Completed' },
      ]}
      overview="Municipalities face the challenge of maintaining extensive public infrastructure — roads, bridges, water networks, parks, and public buildings — with constrained budgets and limited inspection resources. Vayuron UAV systems provide rapid, cost-effective inspection and mapping services for local government bodies."
      solution="We provide municipality-specific drone inspection services and software platforms enabling councils to survey, map, and maintain public assets at a fraction of the cost of traditional methods."
      challenges={[
        { title: 'Asset Inventory Gaps', description: 'Maintaining accurate, up-to-date records of all public infrastructure assets across large geographic areas.' },
        { title: 'Budget Constraints', description: 'Delivering comprehensive inspection coverage with limited council budgets and reduced staffing.' },
        { title: 'Inspection Backlogs', description: 'Clearing backlogs of scheduled infrastructure inspections that accumulate faster than teams can clear them.' },
        { title: 'Reporting Requirements', description: 'Generating audit-quality inspection reports and documentation for regulatory compliance and public accountability.' },
      ]}
      technologies={[
        { label: 'Mapping UAVs', description: 'Photogrammetry drones delivering centimetre-accuracy 3D maps of municipal assets.', path: '/products/uav-systems' },
        { label: 'Defect Detection AI', description: 'Automated crack, pothole, and structural defect identification from aerial imagery.', path: '/products/artificial-intelligence' },
        { label: 'Asset Management', description: 'Municipal asset register software with inspection history, scheduling, and work order generation.', path: '/products/software-systems' },
        { label: 'Survey Sensors', description: 'High-resolution RGB, multispectral, and LiDAR payloads for comprehensive asset surveys.', path: '/products/advanced-engineering' },
      ]}
    />
  )
}

// ─── Infrastructure Monitoring ─────────────────────────────────────────────
export function InfrastructurePage() {
  return (
    <SectorPageTemplate
      eyebrow="Sector 04"
      title="Infrastructure Monitoring"
      subtitle="Autonomous inspection and AI-powered condition monitoring for critical national infrastructure."
      crumbs={[{ label: 'Sectors', path: '/sectors' }, { label: 'Infrastructure Monitoring' }]}
      stats={[
        { value: 300, suffix: '+', label: 'km Pipeline Inspected' },
        { value: 85, suffix: '%', label: 'Faster than Manual' },
        { value: 20, suffix: '+', label: 'Bridge Surveys' },
      ]}
      overview="Power lines, pipelines, railways, bridges, and telecommunications towers form the backbone of national infrastructure. Traditional inspection is slow, dangerous, and expensive. Vayuron UAV systems enable rapid, repeatable inspection of linear and vertical infrastructure with AI-powered defect detection."
      solution="We deploy fixed-wing and rotary UAVs with thermal, LiDAR, and visual sensors to inspect hundreds of kilometres of infrastructure daily, with AI automatically flagging anomalies for engineer review."
      challenges={[
        { title: 'Hazardous Access', description: 'Inspecting energised power lines, elevated structures, and confined spaces that pose serious risk to human inspectors.' },
        { title: 'Linear Scale', description: 'Covering hundreds or thousands of kilometres of pipeline, railway, or powerline efficiently and repeatedly.' },
        { title: 'Thermal Anomalies', description: 'Detecting heat signatures indicating electrical faults, corrosion, or mechanical wear before failures occur.' },
        { title: 'Regulatory Compliance', description: 'Meeting statutory inspection frequency requirements and maintaining audit trails for regulatory bodies.' },
      ]}
      technologies={[
        { label: 'Fixed-Wing UAV', description: 'Long-endurance fixed-wing platforms covering 200+ km per sortie for linear infrastructure surveys.', path: '/products/uav-systems' },
        { label: 'Thermal AI', description: 'AI analysis of thermal imagery to detect electrical faults, corrosion, and structural anomalies.', path: '/products/artificial-intelligence' },
        { label: 'Inspection Reports', description: 'Automated inspection report generation with GPS-tagged defect locations and severity classifications.', path: '/products/software-systems' },
        { label: 'Multi-Sensor Payload', description: 'Integrated thermal, visual, and LiDAR sensor packages for comprehensive infrastructure assessment.', path: '/products/advanced-engineering' },
      ]}
    />
  )
}

// ─── Agriculture ───────────────────────────────────────────────────────────
export function AgriculturePage() {
  return (
    <SectorPageTemplate
      eyebrow="Sector 05"
      title="Agriculture"
      subtitle="Precision agriculture UAV systems delivering crop health monitoring, spraying, and yield analytics."
      crumbs={[{ label: 'Sectors', path: '/sectors' }, { label: 'Agriculture' }]}
      stats={[
        { value: 25, suffix: '%', label: 'Input Cost Reduction' },
        { value: 10000, suffix: '+', label: 'Hectares Covered' },
        { value: 30, suffix: '%', label: 'Yield Improvement' },
      ]}
      overview="Indian agriculture faces productivity, water efficiency, and input cost challenges at a massive scale. Vayuron agricultural UAVs deliver precision crop monitoring, targeted spraying, and AI-powered yield prediction — enabling farmers and agri-businesses to maximise output while reducing costs and environmental impact."
      solution="We provide multi-rotor spray drones, multispectral survey platforms, and an agricultural AI analytics platform — delivering the full precision agriculture stack from field survey to application and reporting."
      challenges={[
        { title: 'Crop Health Monitoring', description: 'Detecting disease, pest infestation, and nutrient deficiency across large farming areas before visible damage occurs.' },
        { title: 'Water Efficiency', description: 'Targeting irrigation precisely to areas of moisture stress rather than applying uniformly across entire fields.' },
        { title: 'Pest Management', description: 'Identifying pest pressure hotspots early and applying targeted treatment to reduce chemical usage.' },
        { title: 'Yield Prediction', description: 'Generating accurate pre-harvest yield estimates to optimise supply chain planning and commodity management.' },
      ]}
      technologies={[
        { label: 'Spray Drones', description: 'High-capacity agricultural spray UAVs covering 10 hectares per hour with precision application.', path: '/products/uav-systems' },
        { label: 'Crop AI', description: 'Multispectral AI models for NDVI mapping, disease classification, and yield prediction.', path: '/products/artificial-intelligence' },
        { label: 'Farm Dashboard', description: 'Field-by-field analytics portal with prescription maps and application records.', path: '/products/software-systems' },
        { label: 'Multispectral Sensor', description: 'Six-band multispectral cameras capturing data beyond visible spectrum for crop health analysis.', path: '/products/advanced-engineering' },
      ]}
    />
  )
}

// ─── Disaster Management ───────────────────────────────────────────────────
export function DisasterPage() {
  return (
    <SectorPageTemplate
      eyebrow="Sector 06"
      title="Disaster Management"
      subtitle="Rapid-response UAV systems for disaster assessment, search and rescue, and relief coordination."
      crumbs={[{ label: 'Sectors', path: '/sectors' }, { label: 'Disaster Management' }]}
      stats={[
        { value: 2, suffix: 'hr', label: 'Deployment Time' },
        { value: 50, suffix: '+', label: 'Disaster Responses' },
        { value: 90, suffix: '%', label: 'Faster Damage Assessment' },
      ]}
      overview="Natural disasters — floods, earthquakes, cyclones, and wildfires — demand immediate situational awareness and coordinated response. Vayuron UAV systems are deployable within hours of a disaster event, providing real-time imagery, survivor detection, and logistics support to relief agencies."
      solution="Rapid-deployment UAV kits with man-portable airframes, satellite comms-enabled datalinks, and AI survivor detection operate independently of ground infrastructure — enabling effective response even when terrestrial communications are destroyed."
      challenges={[
        { title: 'Speed of Response', description: 'Generating situational awareness in the first critical hours after a disaster when ground access is blocked.' },
        { title: 'Comms Infrastructure Loss', description: 'Operating when terrestrial communications, roads, and power infrastructure are destroyed by the disaster.' },
        { title: 'Survivor Location', description: 'Detecting and locating survivors in collapsed structures, floodwater, or remote terrain rapidly.' },
        {  title: 'Airspace Coordination', description: 'Operating safely alongside manned rescue helicopters and military aviation in uncontrolled airspace.' },
      ]}
      technologies={[
        { label: 'Rapid Deploy Kit', description: 'Man-portable UAV systems deployable by two operators in under 20 minutes.', path: '/products/uav-systems' },
        { label: 'Survivor Detection AI', description: 'Thermal AI models trained to identify human heat signatures in debris and water.', path: '/products/artificial-intelligence' },
        { label: 'Relief Dashboard', description: 'Real-time damage mapping and resource allocation software for relief coordinators.', path: '/products/software-systems' },
        { label: 'SATCOM Datalink', description: 'Satellite communication-enabled datalinks for beyond-line-of-sight operations in remote areas.', path: '/products/advanced-engineering' },
      ]}
    />
  )
}

// ─── Environmental Monitoring ──────────────────────────────────────────────
export function EnvironmentalPage() {
  return (
    <SectorPageTemplate
      eyebrow="Sector 07"
      title="Environmental Monitoring"
      subtitle="UAV and AI platforms for environmental compliance, pollution monitoring, and ecological assessment."
      crumbs={[{ label: 'Sectors', path: '/sectors' }, { label: 'Environmental Monitoring' }]}
      stats={[
        { value: 5000, suffix: '+', label: 'sq km Surveyed' },
        { value: 95, suffix: '%', label: 'Detection Accuracy' },
        { value: 40, suffix: '+', label: 'Environmental Projects' },
      ]}
      overview="Regulatory agencies, conservation organisations, and industry face growing pressure to monitor environmental conditions at scale — air quality, water bodies, deforestation, wildlife, and emissions. Vayuron provides cost-effective autonomous monitoring replacing expensive manned surveys and satellite data with high-resolution, high-frequency aerial intelligence."
      solution="We deploy multi-sensor UAV platforms with gas detection, multispectral imaging, and water sampling capabilities — feeding data directly into environmental compliance reporting platforms and conservation management systems."
      challenges={[
        { title: 'Scale of Coverage', description: 'Monitoring vast forest, coastal, and watershed areas that are impractical to survey with manned resources.' },
        { title: 'Emissions Detection', description: 'Detecting and quantifying industrial emissions, methane leaks, and air pollutants at the source level.' },
        { title: 'Wildlife Monitoring', description: 'Conducting population surveys and tracking of endangered species with minimal ecological disturbance.' },
        { title: 'Compliance Reporting', description: 'Generating auditable environmental impact data for regulatory submission and ESG reporting frameworks.' },
      ]}
      technologies={[
        { label: 'Survey UAV', description: 'Fixed-wing platforms for large-area ecological and environmental baseline surveys.', path: '/products/uav-systems' },
        { label: 'Species AI', description: 'Computer vision models for wildlife species identification and population counting from aerial imagery.', path: '/products/artificial-intelligence' },
        { label: 'Compliance Platform', description: 'Environmental data management and regulatory reporting software.', path: '/products/software-systems' },
        { label: 'Gas Sensors', description: 'Miniaturised gas detection payloads for methane, CO2, and pollutant concentration mapping.', path: '/products/advanced-engineering' },
      ]}
    />
  )
}

// ─── Industrial Inspection ─────────────────────────────────────────────────
export function IndustrialPage() {
  return (
    <SectorPageTemplate
      eyebrow="Sector 08"
      title="Industrial Inspection"
      subtitle="Autonomous UAV inspection platforms for oil & gas, manufacturing, mining, and heavy industry."
      crumbs={[{ label: 'Sectors', path: '/sectors' }, { label: 'Industrial Inspection' }]}
      stats={[
        { value: 70, suffix: '%', label: 'Downtime Reduction' },
        { value: 200, suffix: '+', label: 'Facility Inspections' },
        { value: 100, suffix: '%', label: 'Coverage vs Manual' },
      ]}
      overview="Industrial facilities — refineries, chemical plants, power stations, mining operations, and manufacturing plants — require regular inspection of assets that are hazardous, elevated, or confined. Vayuron UAV inspection systems eliminate human exposure to risk while delivering higher inspection frequency and data quality than traditional methods."
      solution="We integrate UAV platforms with non-destructive testing sensors, corrosion detection AI, and digital twin integration — delivering inspection-as-a-service for major industrial clients with measurable safety and productivity benefits."
      challenges={[
        { title: 'Worker Safety Risk', description: 'Eliminating human exposure to heights, confined spaces, toxic atmospheres, and energised equipment during inspection.' },
        { title: 'Production Continuity', description: 'Conducting inspections without shutting down production, avoiding costly planned and unplanned downtime.' },
        { title: 'Corrosion & Defect Detection', description: 'Identifying early-stage corrosion, coating failure, and structural defects before they become critical failures.' },
        { title: 'Digital Twin Integration', description: 'Feeding inspection data into 3D digital twins and asset management systems for predictive maintenance.' },
      ]}
      technologies={[
        { label: 'Industrial UAV', description: 'Confined-space and ex-zone rated UAVs for tank, vessel, and facility inspection.', path: '/products/uav-systems' },
        { label: 'Corrosion AI', description: 'AI models for automated corrosion grading, coating assessment, and anomaly classification.', path: '/products/artificial-intelligence' },
        { label: 'Maintenance Platform', description: 'Work order generation and predictive maintenance scheduling driven by inspection AI outputs.', path: '/products/software-systems' },
        { label: 'NDT Sensors', description: 'Ultrasonic, eddy current, and radiographic NDT sensor payloads for non-contact material testing.', path: '/products/advanced-engineering' },
      ]}
    />
  )
}

// ─── Default export for direct import ─────────────────────────────────────
export default DefencePage

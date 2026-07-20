import SectorApplicationsTemplate from './templates/SectorApplicationsTemplate'

export default function EnergyIndustrialPage() {
  return (
    <SectorApplicationsTemplate
      eyebrow="Sector 03"
      title="Energy, Industrial & Critical Infrastructure"
      subtitle="Autonomous inspection and monitoring platforms for power grids, renewable assets, pipelines, and heavy industrial facilities."
      crumbs={[{ label: 'Sectors', path: '/sectors' }, { label: 'Energy, Industrial & Critical Infrastructure' }]}
      backgroundVideoMp4="/Drone1.mp4"
      stats={[
        { value: 70, suffix: '%', label: 'Downtime Reduction' },
        { value: 200, suffix: '+', label: 'Facility Inspections' },
        { value: 100, suffix: '%', label: 'Coverage vs Manual' },
      ]}
      overview="Energy and industrial operators must inspect critical, often hazardous assets — grids, pipelines, turbines, and plants — on a continuous basis to maintain safety, uptime, and regulatory compliance."
      solution="Vayuron integrates UAV platforms with thermal, NDT, and high-resolution imaging sensors, backed by AI defect-detection models, to deliver inspection-as-a-service across the energy and industrial value chain — cutting cost, downtime, and human risk exposure."
      applications={[
        {
          title: 'Electrical Network Inspection & Fault Detection',
          mission: 'Inspect transmission lines, towers, and substations for faults, corrosion, and vegetation encroachment without de-energising the network.',
          capabilities: ['Thermal and corona-discharge imaging payloads', 'Automated corridor flight paths along transmission lines', 'AI fault and hotspot detection'],
          advantages: 'Removes the need for linemen to climb energised towers, inspecting entire grid corridors far faster and more safely than ground crews.',
          impact: 'Earlier fault detection reduces unplanned outages and improves grid reliability for utility operators.',
        },
        {
          title: 'Renewable Energy Asset Assessment',
          mission: 'Assess solar farms and renewable installations for performance loss, panel damage, and site-level anomalies.',
          capabilities: ['Multispectral and thermal imaging for solar panels', 'AI-based hotspot and micro-crack detection', 'Automated repeatable site survey routes'],
          advantages: 'A single flight can survey an entire solar farm in the time it would take a technician to manually check a fraction of the panels.',
          impact: 'Faster fault identification protects energy yield and extends the operational life of renewable assets.',
        },
        {
          title: 'Blade Inspection & Performance Analysis',
          mission: 'Inspect wind turbine blades at height for cracks, erosion, and structural wear without stopping turbine operations for manual access.',
          capabilities: ['Close-range high-resolution blade imaging', 'AI-based crack and delamination detection', 'Automated blade-scan flight profiles'],
          advantages: 'Eliminates the need for rope-access technicians or turbine shutdowns for routine inspection, cutting both cost and safety risk.',
          impact: 'Reduced turbine downtime and earlier detection of blade damage before it escalates into costly failure.',
        },
        {
          title: 'Pipeline Monitoring & Industrial Safety Surveillance',
          mission: 'Monitor pipeline corridors and industrial sites for leaks, encroachment, and safety violations across long, remote distances.',
          capabilities: ['Gas-detection sensor payloads', 'Long-range corridor patrol UAVs', 'Ex-zone rated platforms for hazardous sites'],
          advantages: 'Covers pipeline routes that are impractical to patrol on foot or by vehicle, detecting leaks and encroachment at the source far sooner.',
          impact: 'Faster leak detection reduces environmental risk and supports regulatory safety compliance for pipeline operators.',
        },
        {
          title: 'Automated Facility Inspection & Maintenance Support',
          mission: 'Conduct routine inspection of tanks, vessels, flare stacks, and plant structures without exposing personnel to height or confined-space risk.',
          capabilities: ['Confined-space and ex-zone rated UAVs', 'Ultrasonic and NDT sensor payloads', 'Digital-twin-ready inspection data feeds'],
          advantages: 'Inspections proceed without shutting down production, avoiding the costly downtime that ground-based access methods require.',
          impact: 'Improved plant safety and predictive maintenance planning, backed by consistent, repeatable inspection data.',
        },
        {
          title: 'Project Progress Tracking & Site Intelligence',
          mission: 'Track construction and industrial project progress with regular aerial surveys for stakeholders and site management.',
          capabilities: ['Scheduled progress-mapping flights', 'Orthomosaic and volumetric site imaging', 'Time-series comparison reporting'],
          advantages: 'Delivers an objective, site-wide progress record in a single flight, replacing slow manual site walks and disconnected photo logs.',
          impact: 'Better-informed project decisions and faster identification of schedule or resource issues on large sites.',
        },
        {
          title: 'Harbour Operations & Cargo Area Monitoring',
          mission: 'Monitor port, harbour, and cargo yard operations for security, congestion, and asset tracking.',
          capabilities: ['Wide-area port surveillance UAVs', 'AI container and vessel tracking', 'Live feed integration with port operations centres'],
          advantages: 'Provides continuous overhead visibility across sprawling port and yard areas that ground-based CCTV cannot fully cover.',
          impact: 'Improved cargo security and more efficient yard and berth utilisation for port operators.',
        },
        {
          title: 'High-Value Asset Protection & Remote Surveillance',
          mission: 'Provide continuous perimeter and asset surveillance for critical industrial and energy installations.',
          capabilities: ['Autonomous perimeter patrol routes', 'Thermal and low-light intrusion detection', 'Real-time alerting to site security teams'],
          advantages: 'Extends security coverage across large industrial sites without a proportional increase in guard headcount.',
          impact: 'Stronger protection of high-value assets and critical infrastructure against intrusion and sabotage.',
        },
      ]}
    />
  )
}

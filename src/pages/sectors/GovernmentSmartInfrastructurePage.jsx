import SectorApplicationsTemplate from './templates/SectorApplicationsTemplate'

export default function GovernmentSmartInfrastructurePage() {
  return (
    <SectorApplicationsTemplate
      eyebrow="Sector 02"
      title="Government & Smart Infrastructure"
      subtitle="Autonomous aerial intelligence for urban safety, disaster response, asset inspection, and public infrastructure management."
      crumbs={[{ label: 'Sectors', path: '/sectors' }, { label: 'Government & Smart Infrastructure' }]}
      backgroundVideoMp4="/Drone1.mp4"
      stats={[
        { value: 20, suffix: '+', label: 'Government Deployments' },
        { value: 60, suffix: '%', label: 'Faster Incident Response' },
        { value: 365, suffix: '', label: 'Days Continuous Coverage' },
      ]}
      overview="City and government authorities manage vast public infrastructure, emergency response networks, and urban safety systems while balancing rising demands with limited manpower and budgets."
      solution="Vayuron delivers UAV-as-a-service for public authorities — persistent aerial patrols, AI-driven urban analytics, disaster-response drones, and asset inspection platforms — all feeding into a unified operations dashboard for city and state agencies."
      applications={[
        {
          title: 'Urban Intelligence & Public Area Monitoring',
          mission: 'Provide continuous aerial oversight of public spaces, transit hubs, and high-footfall areas to support urban safety planning.',
          capabilities: ['Low-noise electric UAVs for urban flight corridors', 'AI crowd-density and anomaly detection', 'Live multi-agency video distribution'],
          advantages: 'Persistent coverage across a city delivers a live operational picture that ground patrols and fixed CCTV cannot match, at a fraction of the infrastructure cost.',
          impact: 'Authorities gain faster visibility into crowd build-up, congestion, and unusual activity across public spaces.',
        },
        {
          title: 'Crime Prevention & Emergency Response Support',
          mission: 'Support police and emergency services with rapid aerial situational awareness during incidents, pursuits, and public-safety events.',
          capabilities: ['Rapid-launch response UAVs', 'Real-time video feed to control rooms', 'Night-capable thermal imaging'],
          advantages: 'A drone can be airborne over an incident faster than most ground or air support, giving responders eyes-on before they arrive.',
          impact: 'Improved officer safety and faster, better-informed emergency response decisions.',
        },
        {
          title: 'Rapid Disaster Assessment & Relief Coordination',
          mission: 'Deliver immediate aerial assessment of disaster zones to guide relief resource allocation when ground access is compromised.',
          capabilities: ['Man-portable rapid-deploy UAV kits', 'Thermal survivor-detection AI', 'Satellite-enabled beyond-line-of-sight datalinks'],
          advantages: 'Operates independently of damaged ground infrastructure and roads, generating actionable maps within the first critical hours of a disaster.',
          impact: 'Relief coordinators direct resources to where they are needed fastest, improving response outcomes in floods, earthquakes, and other disasters.',
        },
        {
          title: 'Structural Health Analysis & Asset Inspection',
          mission: 'Inspect bridges, towers, dams, and public buildings for structural defects without exposing inspection teams to height or safety risk.',
          capabilities: ['High-resolution close-range imaging payloads', 'AI-based defect and crack detection', 'Automated repeatable inspection routes'],
          advantages: 'Eliminates the need for scaffolding, rope-access teams, or lane closures, cutting inspection time and cost significantly.', 
          impact: 'Earlier detection of structural deterioration, reducing long-term maintenance costs and public-safety risk.',
        },
        {
          title: 'Road Network Monitoring & Mobility Analytics',
          mission: 'Monitor road conditions, traffic flow, and congestion patterns to support transport planning and maintenance scheduling.',
          capabilities: ['Wide-area traffic-flow imaging', 'AI vehicle counting and flow analytics', 'Automated pavement-condition surveys'],
          advantages: 'Covers entire road corridors in a single flight, producing data traffic authorities would otherwise need multiple fixed sensors or manual surveys to gather.',
          impact: 'Data-driven traffic management and prioritised road maintenance planning for city and highway authorities.',
        },
        {
          title: 'Geospatial Data Collection & Digital Mapping',
          mission: 'Capture accurate, up-to-date geospatial data to support urban planning, land records, and digital twin initiatives.',
          capabilities: ['High-precision photogrammetry surveys', 'Orthomosaic and 3D terrain mapping', 'GIS-ready data output'],
          advantages: 'Produces survey-grade maps in a fraction of the time of ground survey teams, keeping city planning data continuously current.',
          impact: 'More accurate urban planning decisions and land-use records built on current, verifiable aerial data.',
        },
        {
          title: 'Rail Corridor Monitoring & Safety Inspection',
          mission: 'Inspect rail tracks, overhead lines, and corridor right-of-way for safety hazards and encroachment.',
          capabilities: ['Linear-corridor automated flight paths', 'Track and catenary defect detection AI', 'Vegetation-encroachment mapping'],
          advantages: 'Surveys long rail corridors without requiring track closures or manual walk-throughs, keeping inspection cycles frequent and non-disruptive.',
          impact: 'Faster identification of safety hazards along rail networks, supporting safer, more reliable rail operations.',
        },
        {
          title: 'Public Utility Monitoring & Service Management',
          mission: 'Support monitoring of water, sanitation, and public utility networks to improve service reliability and maintenance response.',
          capabilities: ['Utility-asset aerial inspection routes', 'Leak and fault visual detection', 'Integrated reporting for service teams'],
          advantages: 'Provides utility departments a scalable way to check assets spread across large service areas without deploying ground crews to every site.',
          impact: 'Faster fault identification and more efficient allocation of municipal maintenance resources.',
        },
      ]}
    />
  )
}

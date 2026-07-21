import SectorApplicationsTemplate from './templates/SectorApplicationsTemplate'

export default function DefenceHomelandSecurityPage() {
  return (
    <SectorApplicationsTemplate
      eyebrow="Sector 01"
      title="Defence & Security"
      subtitle="Autonomous ISR, tactical support, and force-protection systems engineered for national security and armed forces operations."
      crumbs={[{ label: 'Sectors', path: '/sectors' }, { label: 'Defence & Security' }]}
      backgroundVideoMp4="/videos/Drone1.webm"
      stats={[
        { value: 15, suffix: '+', label: 'Defence Deployments' },
        { value: 99, suffix: '%', label: 'Mission Success Rate' },
        { value: 24, suffix: '/7', label: 'Operational Support' },
      ]}
      overview="Modern defence and homeland security operations depend on real-time intelligence, secure communications, and coordinated autonomous systems to operate effectively across contested borders, urban conflict zones, and maritime frontiers."
      solution="Vayuron builds multi-domain autonomous UAV platforms — from stealth reconnaissance airframes to rugged tactical drones — fused with edge AI, encrypted data links, and swarm coordination, purpose-built for Indian defence forces, paramilitary units, and allied security organisations."
      applications={[
        {
          title: 'Strategic Intelligence & Battlefield Awareness',
          mission: 'Deliver continuous, high-fidelity ISR over contested terrain so commanders can build an accurate, real-time picture of the battlespace before committing forces.',
          capabilities: ['Long-endurance fixed-wing & VTOL ISR platforms', 'Multi-sensor payloads: EO/IR, SAR, multispectral', 'AI-fused target detection and classification'],
          advantages: 'Persistent, high-altitude coverage replaces gaps left by limited manned aviation, giving forces uninterrupted situational awareness with a minimal logistics footprint.',
          impact: 'Commanders gain earlier warning of enemy movement and a decisive intelligence edge before engagement, reducing risk to ground troops.',
        },
        {
          title: 'Border Perimeter Protection & Intrusion Detection',
          mission: 'Provide 24/7 autonomous patrol of long, remote border stretches to detect intrusion, smuggling, and infiltration attempts as they happen.',
          capabilities: ['Autonomous perimeter patrol routes', 'Thermal & night-vision intrusion detection AI', 'Instant geo-tagged alerting to command posts'],
          advantages: 'Replaces sparse foot and vehicle patrols with continuous aerial coverage across terrain that is otherwise impossible to monitor round the clock.',
          impact: 'Faster detection-to-response times along sensitive borders, closing gaps that ground patrols alone cannot cover.',
        },
        {
          title: 'Tactical Operations & Mission Support Systems',
          mission: 'Give forward units and command centres a shared, real-time tactical picture to plan and execute coordinated operations.',
          capabilities: ['Encrypted multi-view tactical video links (MVTX)', 'Rapid-deployment field-ready UAV kits', 'Ruggedised MIL-STD-810 rated hardware'],
          advantages: 'A single live feed can be securely distributed to every echelon simultaneously, keeping forward troops and command in sync without exposing additional assets.',
          impact: 'Tighter coordination between forward units and command posts, improving decision speed during live operations.',
        },
        {
          title: 'Elite Unit Reconnaissance & Stealth Operations',
          mission: 'Enable special forces and elite units to conduct covert reconnaissance ahead of high-risk missions without revealing their position.',
          capabilities: ['Low-acoustic, low-signature stealth airframes', 'Silent electric propulsion for close-range recon', 'Compact, man-portable deployment'],
          advantages: 'Near-silent operation and a minimal radar/visual signature let operators gather intelligence deep in denied areas while remaining undetected.',
          impact: 'Special units enter missions with verified, first-hand intelligence, dramatically reducing the element of surprise against them.',
        },
        {
          title: 'Threat Detection & Counter-Insurgency Support',
          mission: 'Identify and track hostile activity, IED emplacement, and insurgent movement in contested and semi-permissive environments.',
          capabilities: ['AI-powered anomaly and threat-pattern detection', 'Wide-area day/night surveillance sweeps', 'Real-time alerting integrated with ground forces'],
          advantages: 'Continuous automated monitoring flags suspicious activity far faster than manual observation, freeing troops to respond rather than search.',
          impact: 'Improved early warning against ambush and IED threats, directly protecting soldier lives on patrol.',
        },
        {
          title: 'Maritime Domain Awareness & Coastal Patrol',
          mission: 'Extend surveillance across territorial waters, ports, and coastlines to track vessels and detect illegal maritime activity.',
          capabilities: ['Maritime-rated long-range UAVs', 'Vessel detection and classification AI', 'Extended over-water communication links'],
          advantages: 'Aerial coverage reaches far beyond the range of coastal patrol boats and radar shadow zones, at a fraction of the operating cost of manned maritime patrol aircraft.',
          impact: 'Stronger coastal security posture against smuggling, piracy, and unauthorised incursions into territorial waters.',
        },
        {
          title: 'Autonomous Supply Delivery & Field Support',
          mission: 'Deliver critical supplies — ammunition, medical kits, communications equipment — to forward and isolated positions without exposing supply convoys.',
          capabilities: ['Payload-rated cargo UAV platforms', 'GPS-denied autonomous navigation', 'Rapid point-to-point delivery routing'],
          advantages: 'Removes the need to move personnel and vehicles through high-risk supply corridors, cutting exposure time to ambush and IED threats.',
          impact: 'Faster resupply to forward posts and reduced casualties associated with ground logistics convoys.',
        },
        {
          title: 'Combat Search, Rescue & Recovery Missions',
          mission: 'Rapidly locate downed personnel, isolated units, or casualties in hostile or difficult terrain to accelerate rescue operations.',
          capabilities: ['Thermal search-and-locate AI models', 'Rapid-deployment man-portable UAV kits', 'Satellite-enabled beyond-line-of-sight comms'],
          advantages: 'Aerial search covers large hostile or inaccessible areas in minutes rather than hours, without putting additional rescuers at risk during the search phase.',
          impact: 'Reduced time-to-locate for personnel recovery, directly improving survival outcomes in combat search and rescue.',
        },
      ]}
    />
  )
}

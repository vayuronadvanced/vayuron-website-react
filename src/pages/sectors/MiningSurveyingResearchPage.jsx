import SectorApplicationsTemplate from './templates/SectorApplicationsTemplate'

export default function MiningSurveyingResearchPage() {
  return (
    <SectorApplicationsTemplate
      eyebrow="Sector 05"
      title="Mining, Surveying & Research"
      subtitle="High-precision aerial survey, 3D mapping, and exploration support for mining, geospatial, and scientific research operations."
      crumbs={[{ label: 'Sectors', path: '/sectors' }, { label: 'Mining, Surveying & Research' }]}
      backgroundVideoMp4="/videos/Drone1.webm"
      stats={[
        { value: 300, suffix: '+', label: 'Sites Surveyed' },
        { value: 98, suffix: '%', label: 'Survey Accuracy' },
        { value: 50, suffix: '%', label: 'Faster Site Turnaround' },
      ]}
      overview="Mining, surveying, and research operations require precise, up-to-date spatial and geological data across large, often difficult and hazardous terrain to guide planning, exploration, and analysis."
      solution="Vayuron provides high-precision photogrammetry, LiDAR-ready, and multispectral UAV platforms that turn raw terrain into survey-grade maps, volumetric models, and 3D reconstructions — accelerating decisions for mining, survey, and research teams."
      applications={[
        {
          title: 'Mineral Exploration & Mine Intelligence',
          mission: 'Support exploration teams with aerial data to identify and evaluate mineral deposits and mine site conditions.',
          capabilities: ['Multispectral and magnetometer-ready payloads', 'Wide-area exploration survey flights', 'AI-assisted geological feature mapping'],
          advantages: 'Surveys vast, often inaccessible exploration terrain far faster than ground exploration teams, reducing time and cost before drilling decisions.',
          impact: 'Faster, better-informed exploration decisions that reduce wasted drilling and site-access effort.',
        },
        {
          title: 'Terrain Analysis & Geological Data Collection',
          mission: 'Capture detailed terrain and geological data to support site assessment and planning.',
          capabilities: ['High-resolution terrain imaging', 'Digital elevation model (DEM) generation', 'Geological feature classification'],
          advantages: 'Produces consistent, high-resolution terrain datasets across large sites in a fraction of the time of ground geological survey teams.',
          impact: 'More accurate site assessments feeding directly into mine planning and geological research.',
        },
        {
          title: 'Accurate Land Mapping & Spatial Surveying',
          mission: 'Deliver survey-grade land maps for boundary, planning, and spatial-analysis needs.',
          capabilities: ['RTK/PPK-enabled precision photogrammetry', 'Orthomosaic and contour map generation', 'GIS-ready spatial data output'],
          advantages: 'Achieves survey-grade accuracy in a single flight, replacing weeks of ground-based total-station surveying.',
          impact: 'Faster land surveys that accelerate planning, licensing, and land-use decisions.',
        },
        {
          title: 'Advanced 3D Reconstruction & Digital Modelling',
          mission: 'Build detailed 3D models of sites, structures, and terrain for planning, visualisation, and digital twins.',
          capabilities: ['High-overlap photogrammetric capture', 'Point-cloud and mesh model generation', 'Digital-twin-ready model export'],
          advantages: 'Generates accurate 3D digital replicas of entire sites without the need for expensive terrestrial laser scanning teams.',
          impact: 'Richer visualisation and simulation capability for engineering, planning, and stakeholder communication.',
        },
        {
          title: 'Excavation Monitoring & Material Volume Analysis',
          mission: 'Track excavation progress and calculate stockpile and material volumes accurately over time.',
          capabilities: ['Volumetric survey flights', 'AI-based stockpile volume calculation', 'Time-series excavation progress tracking'],
          advantages: 'Delivers accurate volumetric measurements in a single flight, replacing slow and often imprecise manual stockpile estimation methods.',
          impact: 'More accurate material accounting and better-informed extraction and logistics planning for mine operators.',
        },
        {
          title: 'Engineering Survey Support & Site Planning',
          mission: 'Provide engineering teams with accurate spatial data to support infrastructure design and site planning.',
          capabilities: ['High-precision topographic surveys', 'Cut-and-fill and grading analysis data', 'CAD/GIS-compatible survey outputs'],
          advantages: 'Delivers engineering-grade survey data faster than traditional ground crews, keeping design timelines on schedule.',
          impact: 'Faster, more accurate engineering design cycles grounded in current site conditions.',
        },
        {
          title: 'Cultural Heritage Documentation & Preservation',
          mission: 'Document heritage sites and structures with high-resolution aerial imagery to support preservation and research.',
          capabilities: ['High-resolution close-range imaging', 'Detailed 3D heritage-site reconstruction', 'Non-contact, non-invasive documentation'],
          advantages: 'Captures fragile heritage structures without physical contact, preserving delicate sites while producing highly detailed documentation.',
          impact: 'Improved preservation records supporting restoration work and long-term heritage research.',
        },
        {
          title: 'Scientific Exploration & Remote Mission Support',
          mission: 'Support research expeditions and scientific missions in remote, extreme, or difficult-to-access environments.',
          capabilities: ['Rugged, extreme-environment rated UAVs', 'Long-range autonomous mission flight', 'Multi-sensor scientific data payloads'],
          advantages: 'Reaches remote and hazardous research sites that would otherwise require significant expedition time and risk to access on foot.',
          impact: 'Expanded research reach and richer datasets for scientific teams working in remote environments.',
        },
      ]}
    />
  )
}

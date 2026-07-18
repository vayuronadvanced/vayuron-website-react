import SectorApplicationsTemplate from './templates/SectorApplicationsTemplate'

export default function AgricultureEnvironmentalPage() {
  return (
    <SectorApplicationsTemplate
      eyebrow="Sector 04"
      title="Agriculture & Environmental Intelligence"
      subtitle="Precision UAV platforms for crop health, automated spraying, water and forest management, and ecological monitoring."
      crumbs={[{ label: 'Sectors', path: '/sectors' }, { label: 'Agriculture & Environmental Intelligence' }]}
      backgroundVideoMp4="/Drone1.mp4"
      stats={[
        { value: 5000, suffix: '+', label: 'sq km Surveyed' },
        { value: 95, suffix: '%', label: 'Detection Accuracy' },
        { value: 40, suffix: '+', label: 'Field & Ecological Projects' },
      ]}
      overview="Agriculture and environmental management depend on continuous, accurate observation of crops, water resources, forests, and ecosystems to improve yield, sustainability, and conservation outcomes."
      solution="Vayuron deploys multispectral and precision-spray UAV platforms integrated with AI crop and habitat analysis — turning field and ecosystem data into actionable insight for farmers, agri-enterprises, and environmental agencies."
      applications={[
        {
          title: 'Crop Health Analysis & Field Intelligence',
          mission: 'Monitor crop vigour, stress, and disease across large fields to support timely agronomic decisions.',
          capabilities: ['Multispectral and NDVI imaging payloads', 'AI-based crop stress and disease detection', 'Field-level health mapping and reporting'],
          advantages: 'Surveys entire fields in minutes, spotting stress patterns invisible to the naked eye long before they show visually on the ground.',
          impact: 'Earlier intervention protects yield and reduces crop loss from undetected disease or nutrient stress.',
        },
        {
          title: 'Automated Agricultural Spraying Solutions',
          mission: 'Deliver precise, targeted application of pesticides, fertilisers, and nutrients across farmland with minimal waste.',
          capabilities: ['Precision agri-spray UAV platforms', 'Variable-rate application based on field data', 'Autonomous flight-path spraying routes'],
          advantages: 'Applies inputs only where needed, cutting chemical usage and cost compared to blanket ground or manned-aircraft spraying.',
          impact: 'Reduced input costs and lower environmental chemical runoff, with faster field coverage than manual spraying.',
        },
        {
          title: 'Water Resource Analysis & Irrigation Optimization',
          mission: 'Assess water availability, soil moisture, and irrigation efficiency to support better water-use decisions.',
          capabilities: ['Thermal soil-moisture imaging', 'AI irrigation-efficiency analysis', 'Reservoir and canal condition surveys'],
          advantages: 'Identifies over- and under-irrigated zones across a farm or watershed far faster than manual soil sampling.',
          impact: 'More efficient water use and reduced waste in agricultural irrigation systems.',
        },
        {
          title: 'Forest Health Assessment & Plantation Monitoring',
          mission: 'Track forest and plantation health, detect disease outbreaks, and support sustainable forestry management.',
          capabilities: ['Wide-area forest canopy imaging', 'AI tree-health and species classification', 'Repeat-survey change detection'],
          advantages: 'Covers dense, hard-to-access forest terrain that ground survey teams cannot practically reach on a regular schedule.',
          impact: 'Earlier detection of disease and stress supports healthier forests and more sustainable plantation yields.',
        },
        {
          title: 'Wildlife Tracking & Habitat Protection',
          mission: 'Support wildlife population surveys and habitat monitoring with minimal disturbance to animals.',
          capabilities: ['High-altitude, low-noise survey UAVs', 'AI species identification and population counting', 'Thermal wildlife-detection at night'],
          advantages: 'Surveys wildlife populations without the ground disturbance and risk that manual tracking teams introduce.',
          impact: 'More accurate population data supporting conservation planning and anti-poaching efforts.',
        },
        {
          title: 'Ecosystem Observation & Pollution Assessment',
          mission: 'Monitor ecosystem health and detect pollution sources across land and water bodies.',
          capabilities: ['Gas and emissions detection payloads', 'Multispectral water-quality imaging', 'Automated pollution-source mapping'],
          advantages: 'Detects and localises pollution sources across large areas quickly, generating auditable data for regulatory reporting.',
          impact: 'Faster identification of environmental hazards, supporting compliance and ecosystem protection efforts.',
        },
        {
          title: 'Climate Data Collection & Earth Observation',
          mission: 'Gather high-resolution environmental and climate data to support research and long-term monitoring programmes.',
          capabilities: ['Multi-sensor environmental data payloads', 'Repeatable long-term survey routes', 'GIS-integrated climate data output'],
          advantages: 'Provides consistent, repeatable aerial data collection that is far more cost-effective than satellite tasking for localised studies.',
          impact: 'Richer, more frequent datasets for climate research and environmental policy planning.',
        },
        {
          title: 'Coastal Mapping & Marine Environment Analysis',
          mission: 'Map coastlines and assess marine environments to support coastal management and conservation.',
          capabilities: ['Coastal and shoreline mapping UAVs', 'Multispectral marine habitat imaging', 'Erosion and change-detection analytics'],
          advantages: 'Surveys long coastal stretches and shallow marine areas far faster and more safely than boat-based survey teams.',
          impact: 'Better data-driven decisions for coastal erosion management and marine habitat conservation.',
        },
      ]}
    />
  )
}

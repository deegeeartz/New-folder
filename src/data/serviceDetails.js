export const featuredServiceDetails = {
  "ai-consulting": {
    slug: "ai-consulting",
    name: "AI Consulting & Automation",
    shortDescription:
      "Design practical AI systems and automation workflows that save time, improve response quality, and reduce manual bottlenecks.",
    heroTitle: "AI systems that make your team faster and more consistent.",
    heroDescription:
      "We help businesses identify the highest-impact AI opportunities, design the right workflows, and implement tools that support operations, sales, support, and reporting without unnecessary complexity.",
    outcomes: [
      "Reduce manual admin and repetitive support work",
      "Improve response times across customer-facing workflows",
      "Standardize execution with AI-assisted playbooks and automations",
    ],
    deliverables: [
      "AI opportunity assessment",
      "Workflow automation design",
      "Internal assistants and support copilots",
      "Team onboarding and adoption support",
    ],
    idealFor:
      "Teams handling repetitive requests, internal knowledge lookups, manual reporting, or fragmented service delivery.",
  },
  "software-development": {
    slug: "software-development",
    name: "Custom Software Development",
    shortDescription:
      "Build tailored internal tools, client platforms, and digital products aligned to your actual business workflows.",
    heroTitle: "Custom software built around the way your business really works.",
    heroDescription:
      "We design and deliver software for businesses that have outgrown spreadsheets, disconnected tools, or generic platforms. The goal is simple: better operations, stronger customer experience, and room to scale.",
    outcomes: [
      "Replace brittle manual workflows with dependable systems",
      "Improve visibility across teams, tasks, and customer data",
      "Launch products and portals that create new value for clients",
    ],
    deliverables: [
      "Discovery and workflow mapping",
      "Web application development",
      "Admin dashboards and internal tools",
      "Post-launch support and iteration",
    ],
    idealFor:
      "Startups, growth-stage companies, and established businesses that need software matched to their operations.",
  },
  automation: {
    slug: "automation",
    name: "Business Process Automation",
    shortDescription:
      "Connect tools, streamline approvals, and reduce delays across the processes that keep your business moving.",
    heroTitle: "Operational systems that remove friction from your day-to-day work.",
    heroDescription:
      "We redesign high-friction workflows so information moves faster, approvals happen on time, and teams spend more time on valuable work instead of repetitive handoffs and manual updates.",
    outcomes: [
      "Shorten turnaround time for critical processes",
      "Reduce data entry errors and missed handoffs",
      "Improve team accountability with clearer system flows",
    ],
    deliverables: [
      "Process mapping and bottleneck review",
      "Automation workflows and business rules",
      "Dashboard and notification setup",
      "Operational training and documentation",
    ],
    idealFor:
      "Operations, finance, admin, and service teams that rely on repeated manual processes or cross-team coordination.",
  },
  "hardware-procurement": {
    slug: "hardware-procurement",
    name: "Hardware Procurement & Infrastructure",
    shortDescription:
      "Source the right devices and supporting setup for teams that need reliable tools, clear guidance, and ongoing support.",
    heroTitle: "Equip your team with hardware that supports real work, not guesswork.",
    heroDescription:
      "We help businesses choose, source, deploy, and support the right devices for different roles and environments, whether you are equipping a new team or standardizing existing operations.",
    outcomes: [
      "Buy devices suited to actual business usage and budget",
      "Reduce downtime with setup standards and support planning",
      "Simplify purchasing for growing or distributed teams",
    ],
    deliverables: [
      "Device shortlist and sourcing guidance",
      "Procurement support and quoting",
      "Setup, rollout, and handover planning",
      "Maintenance and after-sales support guidance",
    ],
    idealFor:
      "Businesses onboarding teams, refreshing equipment, or standardizing hardware across departments or locations.",
  },
};

export const featuredServiceLinks = {
  "AI Automations": "/services/ai-consulting",
  "Software Development": "/services/software-development",
  "Process Automation": "/services/automation",
  "Device Sales & Procurement": "/services/hardware-procurement",
};

export const featuredServiceList = Object.values(featuredServiceDetails);
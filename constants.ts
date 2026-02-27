import { Experience, Project, Skill } from './types';

export const CV_DATA = {
  name: "Krzysztof Wende",
  title: "Software Engineer & Distributed Systems Architect",
  contact: {
    phone: "+48 533-30-20-90",
    email: "wende@hey.com",
    linkedin: "krzysztofwende",
    github: "wende",
    location: "Kraków, Poland"
  },
  tldr: [
    "Functional programming engineer with 10 years of commercial experience, including four years in executive roles and six years as an individual contributor.",
    "Creator of Elchemy – a type-safe programming language for Erlang VM, heavily inspired by Elm and Haskell.",
    "Forbes 25 under 25 awardee in New Technology category.",
    "Strong at turning ambiguous distributed-systems and AI-product requirements into reliable production software."
  ],
  experience: [
    {
      role: "AI Infrastructure & Elixir Developer",
      company: "Thenvoi",
      location: "Remote",
      period: "2025-2026",
      description: "Built core infrastructure for an agentic mesh platform: a secure communication layer that enables AI agents to discover capabilities, collaborate, and orchestrate tasks across teams and systems.",
      responsibilities: [
        "Implemented components for secure inter-agent messaging, capability discovery, and orchestration flows.",
        "Built centralized agent-management features for lifecycle control and human-in-the-loop collaboration."
      ]
    },
    {
      role: "Elixir Developer",
      company: "Software Mansion",
      location: "Poland (Remote)",
      period: "2024-2025",
      description: "Built observability tooling for Membrane Framework, an open-source Elixir multimedia framework for real-time audio and video processing (WebRTC, HLS, RTMP).",
      responsibilities: [
        "Designed and implemented pipeline observability tooling for Membrane-based multimedia systems.",
        "Improved diagnostics for real-time media pipelines to speed up debugging and production incident triage."
      ]
    },
    {
      role: "Elixir Developer",
      company: "Confly z o.o",
      location: "Poland (Remote)",
      period: "2021-2023",
      description: "Designed and built a telecom platform with VoIP and SMS support, enabling instantaneous acquisition of new numbers while ensuring compliance with Polish telecommunication regulations.",
      responsibilities: [
        "Designed and developed an in-house Event Sourcing system",
        "Designed and developed a telecommunication protocol responsible for handling VoIP calls"
      ]
    },
    {
      role: "Elixir Developer",
      company: "Inflowmatix Ltd",
      location: "Southampton, UK (Remote)",
      period: "2016-2021",
      description: "One of the first three developers to lay the foundation for the InflowNet system, which is now used in over 20 countries by major water companies to deliver real-time telemetry data, preventing outages, bursts, and leakages.",
      responsibilities: [
        "Designed distributed Elixir services for high-throughput telemetry ingestion and processing (multi-gigabyte streams), with strict uptime and consistency targets.",
        "Managed databases including InfluxDB, Mnesia, Timescale, and PostgresDB.",
        "Implemented event-sourced architecture for critical telemetry workflows.",
        "Designed a 20+ node AWS cluster for resilient processing and horizontal scaling."
      ]
    },
    {
      role: "CEO",
      company: "Neon Tree Solutions Ltd",
      location: "Kraków, London",
      period: "2014-2021",
      description: "Led a team of 3-5 in a software house building proofs of concept and experimental systems for contractors. Built the first prototype of the Erlang Performance Lab project.",
      responsibilities: [
        "Technologies used: Erlang/Elixir, Scala, React.js, ReasonML"
      ]
    },
    {
      role: "CTO / Co-founder",
      company: "Man La Mode LLC",
      location: "Kraków & Ann Arbor, MI",
      period: "2015-2016",
      description: "Developed and oversaw a novel affiliate network allowing users to purchase fashion goods directly from the source at significant discounts.",
      responsibilities: [
        "Developed the back-end in Elixir.",
        "Oversaw front-end development in React.js.",
        "Engaged with investors."
      ]
    },
    {
      role: "CTO / Co-founder",
      company: "CloudCab LLC",
      location: "New York (Remote)",
      period: "2013-2015",
      description: "Developed a modern dispatch system for ride-hailing, medical material, and cargo transportation operators; later acquired by WideTech (18+ countries).",
      responsibilities: [
        "Developed and oversaw both customer and driver apps in Java for Android.",
        "Developed the back-end in Node.js.",
        "Oversaw the front-end fleet dispatch administrative panel.",
        "Led a team of four."
      ]
    }
  ] as Experience[],
  portfolio: [
    {
      name: "Cicada",
      description: "Code Intelligence for AI Assistants. Token-efficient code indexing via MCP for Elixir, Python, and 17 other languages.",
      stats: "Internal coding-assistant benchmarks: up to 50% faster responses and up to 70% fewer tokens",
      link: "https://github.com/wende/cicada"
    },
    {
      name: "Elchemy",
      description: "Strongly typed Erlang VM Language. Heavily inspired by Elm and Haskell.",
      stats: "Over 1000 Stars on Github",
      link: "https://github.com/wende/elchemy"
    },
    {
      name: "Autocomplete Elixir",
      description: "#1 Most popular Elixir and Erlang plugin for Atom Editor.",
      stats: "Over 60,000 downloads"
    },
    {
      name: "Forbes 25 under 25",
      description: "Awardee in New Technology Category",
      stats: "Forbes 2020"
    },
    {
      name: "MobileClaw",
      description: "Built an open-source AI chat client for OpenClaw and LM Studio, focused on responsive UX across desktop and mobile.",
      stats: "Open source AI chat client",
      link: "https://github.com/wende/mobileclaw"
    },
    {
      name: "Quora",
      description: "Active knowledge sharing.",
      stats: "Over 350,000 answer reads"
    }
  ] as Project[],
  skills: [
    {
      category: "AI & Agents",
      items: ["Agentic Architectures", "AI-Assisted Development", "Code Intelligence Tooling", "LLM Integration", "Prompt Engineering", "Local Model Deployment"]
    },
    {
      category: "Distributed Systems",
      items: [
        "Elixir / OTP / BEAM",
        "Event-Sourced Architectures",
        "Fault-Tolerant Cluster Architecture",
        "InfluxDB, Mnesia, TimescaleDB, PostgreSQL",
        "VoIP / SIP / RTP & SMS Gateways",
        "WebRTC / HLS / RTMP / RTSP"
      ]
    },
    {
      category: "Core Technologies",
      items: ["Elixir", "Erlang", "TypeScript", "Distributed Systems", "Event-Sourcing"]
    }
  ] as Skill[],
  hobbies: ["Fusion Jazz", "Percussion/Drums", "Nutrition", "Psychology", "Coffee", "Indie Games", "Traveling"]
};

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
  profile: "Distributed systems architect and Elixir specialist with 13 years of commercial experience. Background spanning AI agent infrastructure, real-time multimedia processing, water telemetry systems deployed across 20+ countries, telecom platforms, and open-source language design.",
  highlights: [
    "13 years commercial experience",
    "Elixir / OTP specialist",
    "AI agent infrastructure",
    "Forbes 25 Under 25"
  ],
  tldr: [
    "Distributed systems architect and Elixir specialist with 13 years of commercial experience.",
    "Built AI agent infrastructure, real-time multimedia tooling, water telemetry systems deployed across 20+ countries, and telecom platforms.",
    "Creator of Elchemy, a type-safe programming language for the Erlang VM inspired by Elm and Haskell.",
    "Forbes 25 Under 25 awardee in New Technology category; founded and exited a transportation tech startup at age 19."
  ],
  experience: [
    {
      role: "AI Infrastructure & Elixir Developer",
      company: "Thenvoi",
      location: "Remote",
      period: "2025-2026",
      description: "Built core infrastructure for the Agentic Mesh platform: a secure communication layer enabling AI agents to dynamically discover, collaborate, and orchestrate tasks.",
      responsibilities: [
        "Contributed to AI orchestration, inter-agent communication protocols built on open standards (MCP, A2A), and centralized agent management.",
        "Developed human-agent collaboration features for shared working environments."
      ]
    },
    {
      role: "Elixir Developer",
      company: "Software Mansion",
      location: "Poland (Remote)",
      period: "2024-2025",
      description: "Contributed to Membrane Framework, an open-source multimedia streaming framework for Elixir supporting WebRTC, HLS, RTMP, and various codecs.",
      responsibilities: [
        "Developed observability tooling for real-time multimedia processing pipelines."
      ]
    },
    {
      role: "Elixir Developer",
      company: "Confly z o.o (Priv)",
      location: "Poland (Remote)",
      period: "2021-2023",
      description: "Designed and built the telecom platform for Priv, a virtual phone number app with VoIP and SMS, handling instantaneous number acquisition and Polish telecom compliance.",
      responsibilities: [
        "Designed and developed an in-house Event Sourcing system from scratch.",
        "Designed and developed a custom VoIP telecommunication protocol."
      ]
    },
    {
      role: "Elixir Developer",
      company: "Inflowmatix Ltd (acquired by SUEZ)",
      location: "Southampton, UK (Remote)",
      period: "2016-2021",
      description: "One of the first three developers to build the InflowNet real-time water telemetry platform, now deployed in 20+ countries.",
      responsibilities: [
        "Designed a fully distributed Elixir architecture processing gigabytes/sec with 99.999% annual availability.",
        "Managed databases including InfluxDB, Mnesia, TimescaleDB, and PostgreSQL.",
        "Designed and operated a cluster of 20+ machines on AWS with event-sourced architecture."
      ]
    },
    {
      role: "CEO / Founder",
      company: "Neon Tree Solutions Ltd",
      location: "Kraków & London",
      period: "2014-2021",
      description: "Led a software consultancy of 3-5 engineers specializing in cutting-edge proofs of concept using Erlang, Elixir, Scala, React.js, and ReasonML.",
      responsibilities: [
        "Responsible for the first prototype of the Erlang Performance Lab project.",
        "Managed cross-border operations between Poland and the UK."
      ]
    },
    {
      role: "CTO / Co-founder",
      company: "Man La Mode LLC",
      location: "Kraków & Ann Arbor, MI",
      period: "2015-2016",
      description: "Built the backend in Elixir and oversaw frontend development in React.js for a luxury fashion buyers club.",
      responsibilities: [
        "Engaged directly with investors in Ann Arbor, Michigan."
      ]
    },
    {
      role: "CTO / Co-founder",
      company: "CloudCab LLC → LightDispatch (acquired by WideTech)",
      location: "New York (Remote)",
      period: "2013-2015",
      description: "Built a white-label B2B dispatch platform for taxi, medical, and cargo transportation; later acquired by WideTech, a Colombian GPS/fleet company operating in 18+ countries.",
      responsibilities: [
        "Developed Android apps for customers and drivers, a Node.js backend, and a fleet dispatch admin panel.",
        "Led a team of four."
      ]
    }
  ] as Experience[],
  portfolio: [
    {
      name: "Forbes 25 Under 25",
      description: "Awardee in the New Technology category by Forbes Poland and McKinsey & Company.",
      stats: "New Technology Category (2020)"
    },
    {
      name: "Cicada",
      description: "AST-based code intelligence MCP server for AI assistants, built around tree-sitter and SCIP.",
      stats: "17+ languages; up to 50% faster responses and 70% fewer tokens",
      link: "https://github.com/wende/cicada"
    },
    {
      name: "Elchemy",
      description: "Statically typed language for the Erlang VM, inspired by Elm and Haskell.",
      stats: "1,000+ GitHub stars",
      link: "https://github.com/wende/elchemy"
    },
    {
      name: "Autocomplete Elixir",
      description: "#1 most popular Elixir/Erlang plugin for Atom Editor, with semantic completion via live BEAM introspection.",
      stats: "60,000+ downloads",
      link: "https://github.com/wende/autocomplete-elixir"
    },
    {
      name: "MobileClaw",
      description: "Open-source mobile-first AI chat client for OpenClaw and LM Studio with streaming, tool execution display, inline diffs, and sub-agent feeds.",
      stats: "Open-source AI chat client",
      link: "https://github.com/wende/mobileclaw"
    },
    {
      name: "BUZZArt / Idziemy Na Solo",
      description: "Founder and president of a culture-focused NGO running a free music production program in Gdańsk.",
      stats: "7 editions; 130 songs released; KPO/EU funded"
    }
  ] as Project[],
  skills: [
    {
      category: "Core Technologies",
      items: ["Elixir", "Erlang/OTP", "TypeScript", "Distributed Systems", "Event Sourced Architecture"]
    },
    {
      category: "AI & Agents",
      items: ["Agentic Architectures", "MCP Servers", "A2A", "LLM Integration", "Local Model Deployment"]
    },
    {
      category: "Developer Tooling",
      items: ["Code Intelligence (AST/tree-sitter)", "Language Design", "Editor Tooling", "Data Pipelines"]
    },
    {
      category: "Frontend",
      items: ["React.js", "Next.js", "Tailwind CSS"]
    },
    {
      category: "Infrastructure",
      items: ["InfluxDB", "TimescaleDB", "PostgreSQL", "VoIP/SIP/RTP"]
    }
  ] as Skill[],
  education: {
    school: "Jagiellonian University in Kraków",
    focus: "Theoretical Computer Science",
    details: "Left after one semester in 2013 to take the CTO role at CloudCab, New York."
  },
  community: {
    role: "Founder & President",
    organization: "Stowarzyszenie Twórców Kultury BUZZArt",
    description: "Runs Idziemy Na Solo, a free music production program in Gdańsk.",
    stats: "7 editions, 130 songs released, KPO/EU funded",
    period: "2022-present"
  },
  hobbies: ["Fusion jazz", "Drums & percussion (17 years)", "Recording studio owner", "Indie games", "Nutrition", "Psychology", "Coffee"]
};

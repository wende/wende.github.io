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
    "Functional programming enthusiast with 10 years of commercial experience. Four of which in executive roles and six in developer roles.",
    "Creator of Elchemy – a type-safe programming language for Erlang VM, heavily inspired by Elm and Haskell.",
    "Forbes 25 under 25 awardee in New Technology category.",
    "Founder of CloudCab LLC, Man La Mode LLC and Neon Tree LTD software house."
  ],
  experience: [
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
        "Designed a fully distributed architecture in Elixir capable of processing gigabytes of data per second with 99.999% annual availability and consistency.",
        "Managed databases including InfluxDB, Mnesia, Timescale, and PostgresDB.",
        "Implemented event-sourced architecture.",
        "Designed a cluster of over 20 machines in the AWS Cloud."
      ]
    },
    {
      role: "CEO",
      company: "Neon Tree Solutions Ltd",
      location: "Kraków, London",
      period: "2014-2021",
      description: "Led a team of 3-5 in a software house responsible for developing cutting-edge proofs of concept for contractors. Responsible for the first prototype of the Erlang Performance Lab project.",
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
      description: "Developed a modern dispatch system for a variety of companies, including ride-hailing, medical material, and cargo transportation.",
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
      name: "Stack Overflow",
      description: "11 years active contribution.",
      stats: "Visited on 1500+ days"
    },
    {
      name: "Quora",
      description: "Active knowledge sharing.",
      stats: "Over 350,000 answer reads"
    }
  ] as Project[],
  skills: [
    {
      category: "Core Technologies",
      items: ["Elixir", "Erlang", "React.js", "TypeScript", "Node.js", "Scala", "ReasonML", "Java"]
    },
    {
      category: "Architecture & Systems",
      items: ["Distributed Systems", "Event-Sourcing", "Real-Time Telemetry", "VoIP & SMS", "AWS Cloud Cluster"]
    },
    {
      category: "Data & Storage",
      items: ["InfluxDB", "Mnesia", "Timescale", "PostgresDB"]
    }
  ] as Skill[],
  hobbies: ["Fusion Jazz", "Percussion/Drums", "Nutrition", "Psychology", "Coffee", "Indie Games", "Traveling"]
};

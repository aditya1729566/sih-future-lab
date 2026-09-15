export interface SourcedFact {
  value: string;
  label: string;
  note: string;
  source: string;
}

export interface Theme {
  id: string;
  name: string;
  descriptor: string;
  color: string;
}

export interface Challenge {
  code: string;
  title: string;
  organization: string;
  category: "Software" | "Hardware";
  theme: string;
  source: string;
}

export const facts: SourcedFact[] = [
  {
    value: "06",
    label: "people per team",
    note: "SIH 2024 college guidelines",
    source: "https://www.sih.gov.in/letters/Guidelines-College-SPOC.pdf",
  },
  {
    value: "02",
    label: "problem statements maximum",
    note: "per nominated team, SIH 2024",
    source: "https://www.sih.gov.in/letters/Guidelines-College-SPOC.pdf",
  },
  {
    value: "4–5",
    label: "finalist teams",
    note: "may be selected per statement, SIH 2024",
    source: "https://www.sih.gov.in/letters/Guidelines-College-SPOC.pdf",
  },
  {
    value: "₹1L",
    label: "winner award",
    note: "per problem statement, SIH 2024",
    source: "https://www.sih.gov.in/letters/Guidelines-College-SPOC.pdf",
  },
];

export const process = [
  ["01", "Problems enter the system", "Ministries, industries and public organizations frame real needs."],
  ["02", "Campuses form their teams", "Institutions run internal hackathons and nominate their strongest ideas."],
  ["03", "Ideas face evaluation", "Experts assess novelty, feasibility, sustainability and scale of impact."],
  ["04", "Mentors sharpen the build", "Selected teams turn proposals into working prototypes with expert guidance."],
  ["05", "Finalists build together", "Teams converge at nodal centres for the Grand Finale."],
  ["06", "Solutions move toward use", "Promising work can continue beyond the event with the problem owner."],
] as const;

export const themes: Theme[] = [
  { id: "automation", name: "Smart Automation", descriptor: "Systems that make complex work precise", color: "#54d8ff" },
  { id: "health", name: "MedTech / HealthTech", descriptor: "Care designed around people and access", color: "#ff7417" },
  { id: "agriculture", name: "Agriculture & Rural Development", descriptor: "Resilience from field to market", color: "#77d982" },
  { id: "mobility", name: "Transportation & Logistics", descriptor: "Movement across a nation-scale network", color: "#f2cf5b" },
  { id: "robotics", name: "Robotics & Drones", descriptor: "Machines extending human capability", color: "#a7a1ff" },
  { id: "clean", name: "Clean & Green Technology", descriptor: "Progress within planetary limits", color: "#38bd79" },
  { id: "cyber", name: "Blockchain & Cybersecurity", descriptor: "Trust engineered into digital systems", color: "#64a9ff" },
  { id: "space", name: "Space Technology", descriptor: "Solving on Earth by looking beyond it", color: "#ddd9cb" },
];

export const challenges: Challenge[] = [
  {
    code: "SIH1668",
    title: "Detect government-issued personally identifiable information embedded in documents and data.",
    organization: "UIDAI",
    category: "Software",
    theme: "Blockchain & Cybersecurity",
    source: "https://finale.sih.gov.in/event/NC010",
  },
  {
    code: "SIH1671",
    title: "Demonstrate robust face-liveness detection for browser-based authentication.",
    organization: "UIDAI",
    category: "Software",
    theme: "Smart Automation",
    source: "https://finale.sih.gov.in/event/NC010",
  },
  {
    code: "SIH1670",
    title: "Protect the integrity and security of machine-learning models.",
    organization: "UIDAI",
    category: "Software",
    theme: "Blockchain & Cybersecurity",
    source: "https://finale.sih.gov.in/event/NC010",
  },
];

export const legacy = [
  ["2017", "A national student innovation movement begins."],
  ["2019", "Software and hardware ingenuity meet public problems."],
  ["2022", "The network returns to physical collaboration at scale."],
  ["2024", "Teams build across nodal centres throughout India."],
] as const;

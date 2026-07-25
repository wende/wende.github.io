export interface Experience {
  role: string;
  company: string;
  location: string;
  /** Employment duration (e.g. "1 year"), not a date range. */
  period: string;
  description: string;
  responsibilities: string[];
}

export interface Project {
  name: string;
  description: string;
  stats?: string;
  link?: string;
  /** Date or range for independent work / dated artifacts. */
  period?: string;
  /** Portfolio grouping for sectioned display. */
  group?: 'award' | 'community' | 'independent' | 'open-source';
}

export interface Skill {
  category: string;
  items: string[];
}

export type ExperimentCategory = 'Games' | 'Simulations' | 'Tools';

export interface Experiment {
  name: string;
  repo: string;
  category: ExperimentCategory;
  description: string;
  tags: string[];
  url: string;
  image: string;
  imagePosition?: string;
  hidden?: boolean;
  updated: string;
}

// Curated from GitHub repository homepages; demos verified on 2026-10-02.
// Keep deployment aliases here, rather than guessing URLs from repository names.
export const EXPERIMENT_CATALOG: Experiment[] = [
  {
    name: 'Meshier',
    repo: 'meshier',
    category: 'Tools',
    description: 'From plain geometry to AI-painted surfaces. Compare the raw model, generated artwork, and textured result, then explore it under changing light.',
    tags: ['AI texturing', '3D material lab'],
    url: 'https://meshier.vercel.app',
    image: '/images/experiments/meshier.jpg',
    updated: '2026-10-02',
  },
  {
    name: 'Crystal Cave',
    repo: 'crystal-cave',
    category: 'Simulations',
    description: 'A luminous cavern of reflective crystals, quiet water, and distant glowing mushrooms. Explore a study in light, refraction, and atmosphere.',
    tags: ['Interactive environment', 'Three.js'],
    url: 'https://crystal-cave-tawny.vercel.app',
    image: '/images/experiments/crystal-cave.jpg',
    updated: '2026-10-02',
  },
  {
    name: 'Trouble Child',
    repo: 'trouble-child',
    category: 'Games',
    description: 'One night, five rooms, and three dreams. A small story told in scribbles, with a hand-drawn world to wander through.',
    tags: ['Narrative adventure', 'Three.js'],
    url: 'https://trouble-child.vercel.app',
    image: '/images/experiments/trouble-child.jpg',
    updated: '2026-10-02',
  },
  {
    name: 'Traverse',
    hidden: true,
    repo: 'webwaves-tjs',
    category: 'Simulations',
    description: 'Take a sailboat around a rocky pine island. An experiment in ocean waves, painterly landscapes, and sunrise light.',
    tags: ['Sailing', 'Three.js / WebGPU'],
    url: 'https://webwaves-tjs.vercel.app',
    image: '/images/experiments/traverse.jpg',
    imagePosition: '50% 42%',
    updated: '2026-09-30',
  },
  {
    name: 'Voxel Foundry',
    repo: 'voxel-foundry',
    category: 'Simulations',
    description: 'Dig, build, and break things apart. A voxel material playground exploring destructible worlds and physical interactions.',
    tags: ['Destruction physics', 'WebGPU'],
    url: 'https://voxel-foundry.vercel.app',
    image: '/images/experiments/voxel-foundry.jpg',
    updated: '2026-09-29',
  },
  {
    name: 'Webwaves',
    repo: 'webwaves',
    category: 'Simulations',
    description: 'Open water, changing weather, and a boat at the mercy of the waves. A real-time spectral ocean running in the browser.',
    tags: ['Ocean simulation', 'WebGPU'],
    url: 'https://webwaves-one.vercel.app',
    image: '/images/experiments/webwaves.jpg',
    updated: '2026-09-28',
  },
  {
    name: 'Mossvale',
    repo: 'mossvale',
    category: 'Games',
    description: 'A quiet woodland to explore. Gather resources, meet other travelers, and make a little home in a painterly 3D world.',
    tags: ['World exploration', 'Multiplayer'],
    url: 'https://mossvale.vercel.app',
    image: '/images/experiments/mossvale.jpg',
    updated: '2026-09-22',
  },
];

const FEATURED_REPOS = ['webwaves', 'voxel-foundry', 'meshier'];

export const EXPERIMENTS = EXPERIMENT_CATALOG
  .filter(item => !item.hidden)
  .sort((a, b) => {
    const aRank = FEATURED_REPOS.indexOf(a.repo);
    const bRank = FEATURED_REPOS.indexOf(b.repo);
    return (aRank < 0 ? FEATURED_REPOS.length : aRank) - (bRank < 0 ? FEATURED_REPOS.length : bRank)
      || b.updated.localeCompare(a.updated);
  });

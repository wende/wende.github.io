export type HeroState = 'returning' | 'default' | 'scrolled' | 'returned' | 'dismissed' | 'resumed' | 'always' | 'everything' | 'meta' | 'anyways' | 'keepgoing' | 'withyou' | 'whoknows' | 'greatday' | 'activated';

export type HeroEvent =
  | { type: 'SCROLL' }
  | { type: 'SCROLL_TOP' }
  | { type: 'DISMISS_ARROW' }
  | { type: 'TREELOCATOR_ACTIVATED' }
  | { type: 'CLICK' }
  | { type: 'TIMEOUT' }
  | { type: 'DEBUG_NEXT' }
  | { type: 'DEBUG_PREV' };

const transitions: Record<HeroState, Partial<Record<HeroEvent['type'], HeroState>>> = {
  returning: {
    CLICK: 'resumed',
    SCROLL: 'scrolled',
  },
  default: {
    SCROLL: 'scrolled',
    CLICK: 'always',
    TREELOCATOR_ACTIVATED: 'activated',
  },
  scrolled: {
    SCROLL_TOP: 'returned',
  },
  returned: {
    DISMISS_ARROW: 'dismissed',
  },
  dismissed: {
    CLICK: 'resumed',
    TIMEOUT: 'resumed',
  },
  resumed: {
    CLICK: 'always',
    TREELOCATOR_ACTIVATED: 'activated',
  },
  always: {
    CLICK: 'everything',
  },
  everything: {
    CLICK: 'meta',
  },
  meta: {
    CLICK: 'anyways',
    TREELOCATOR_ACTIVATED: 'activated',
  },
  anyways: {
    CLICK: 'keepgoing',
    TIMEOUT: 'keepgoing',
  },
  keepgoing: {
    CLICK: 'withyou',
  },
  withyou: {
    CLICK: 'whoknows',
  },
  whoknows: {
    CLICK: 'greatday',
  },
  greatday: {},
  activated: {
    CLICK: 'keepgoing',
  },
};

export const heroStates: HeroState[] = ['activated', 'returning', 'default', 'scrolled', 'returned', 'dismissed', 'resumed', 'always', 'everything', 'meta', 'anyways', 'keepgoing', 'withyou', 'whoknows', 'greatday'];

export const HERO_COMPLETED_KEY = 'hero-narrative-completed';

export function getHeroInitialState(): HeroState {
  try {
    return localStorage.getItem(HERO_COMPLETED_KEY) ? 'returning' : 'default';
  } catch {
    return 'default';
  }
}

export const heroInitialState = getHeroInitialState();

export function heroReducer(state: HeroState, event: HeroEvent): HeroState {
  if (event.type === 'DEBUG_NEXT') {
    const i = heroStates.indexOf(state);
    return heroStates[Math.min(i + 1, heroStates.length - 1)];
  }
  if (event.type === 'DEBUG_PREV') {
    const i = heroStates.indexOf(state);
    return heroStates[Math.max(i - 1, 0)];
  }
  return transitions[state][event.type] ?? state;
}

export const heroText: Record<HeroState, string> = {
  returning: "Oh hi! You're back!",
  default: 'I love building tools...',
  scrolled: "Wait. Don't go",
  returned: 'Phew. Alright. Where was I?',
  dismissed: "We won't be needing that",
  resumed: 'So I love building tools...',
  always: 'Always have.',
  everything: 'Apps. Workshops. Open source.',
  meta: 'I even turned this CV into one',
  anyways: 'Anyways...',
  keepgoing: 'I want to keep doing that',
  withyou: 'Maybe with you',
  whoknows: 'Who knows',
  greatday: 'Have a great day!',
  activated: 'Exactly...',
};

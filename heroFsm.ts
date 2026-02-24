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
    TIMEOUT: 'resumed',
  },
  default: {
    SCROLL: 'scrolled',
    CLICK: 'always',
    TREELOCATOR_ACTIVATED: 'activated',
    TIMEOUT: 'always',
  },
  scrolled: {
    SCROLL_TOP: 'returned',
    TIMEOUT: 'returned',
  },
  returned: {
    DISMISS_ARROW: 'dismissed',
    TIMEOUT: 'dismissed',
  },
  dismissed: {
    CLICK: 'resumed',
    TIMEOUT: 'resumed',
  },
  resumed: {
    CLICK: 'always',
    TREELOCATOR_ACTIVATED: 'activated',
    TIMEOUT: 'always',
  },
  always: {
    CLICK: 'everything',
    TIMEOUT: 'everything',
  },
  everything: {
    CLICK: 'meta',
    TIMEOUT: 'meta',
  },
  meta: {
    CLICK: 'anyways',
    TREELOCATOR_ACTIVATED: 'activated',
    TIMEOUT: 'anyways',
  },
  anyways: {
    CLICK: 'keepgoing',
    TIMEOUT: 'keepgoing',
  },
  keepgoing: {
    CLICK: 'withyou',
    TIMEOUT: 'withyou',
  },
  withyou: {
    CLICK: 'whoknows',
    TIMEOUT: 'whoknows',
  },
  whoknows: {
    CLICK: 'greatday',
    TIMEOUT: 'greatday',
  },
  greatday: {},
  activated: {
    CLICK: 'keepgoing',
  },
};

export const heroTimerDurations: Partial<Record<HeroState, number>> = {
  returning: 4000,
  default: 6000,
  scrolled: 3000,
  returned: 1500,
  dismissed: 3000,
  resumed: 4000,
  always: 3000,
  everything: 3500,
  meta: 4000,
  anyways: 1000,
  keepgoing: 3500,
  withyou: 3000,
  whoknows: 3000,
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

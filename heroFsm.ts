export type HeroState = 'default' | 'scrolled' | 'returned' | 'dismissed' | 'resumed' | 'always' | 'everything' | 'meta' | 'anyways' | 'keepgoing' | 'withyou' | 'whoknows' | 'greatday' | 'activated';

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
  default: {
    SCROLL: 'scrolled',
    CLICK: 'always',
    TREELOCATOR_ACTIVATED: 'activated',
  },
  scrolled: {
    SCROLL_TOP: 'returned',
    TREELOCATOR_ACTIVATED: 'activated',
  },
  returned: {
    DISMISS_ARROW: 'dismissed',
    TREELOCATOR_ACTIVATED: 'activated',
  },
  dismissed: {
    CLICK: 'resumed',
    TIMEOUT: 'resumed',
    TREELOCATOR_ACTIVATED: 'activated',
  },
  resumed: {
    CLICK: 'always',
    TREELOCATOR_ACTIVATED: 'activated',
  },
  always: {
    CLICK: 'everything',
    TREELOCATOR_ACTIVATED: 'activated',
  },
  everything: {
    CLICK: 'meta',
    TREELOCATOR_ACTIVATED: 'activated',
  },
  meta: {
    CLICK: 'anyways',
    TREELOCATOR_ACTIVATED: 'activated',
  },
  anyways: {
    CLICK: 'keepgoing',
    TIMEOUT: 'keepgoing',
    TREELOCATOR_ACTIVATED: 'activated',
  },
  keepgoing: {
    CLICK: 'withyou',
    TREELOCATOR_ACTIVATED: 'activated',
  },
  withyou: {
    CLICK: 'whoknows',
    TREELOCATOR_ACTIVATED: 'activated',
  },
  whoknows: {
    CLICK: 'greatday',
    TREELOCATOR_ACTIVATED: 'activated',
  },
  greatday: {
    TREELOCATOR_ACTIVATED: 'activated',
  },
  activated: {},
};

export const heroStates: HeroState[] = ['activated', 'default', 'scrolled', 'returned', 'dismissed', 'resumed', 'always', 'everything', 'meta', 'anyways', 'keepgoing', 'withyou', 'whoknows', 'greatday'];

export const heroInitialState: HeroState = 'default';

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

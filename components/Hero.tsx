import React, { useEffect, useRef, useReducer, useState } from 'react';
import { CV_DATA } from '../constants';
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { AnimatedHeading } from './AnimatedHeading';
import { heroReducer, heroInitialState, heroText, heroStates, heroTimerDurations, HERO_COMPLETED_KEY } from '../heroFsm';
import { useBoringMode } from '../boringMode';

export const Hero: React.FC = () => {
  const { boring } = useBoringMode();
  const sectionRef = useRef<HTMLElement>(null);
  const [textState, dispatch] = useReducer(heroReducer, heroInitialState);
  const [showPop, setShowPop] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const remainingRef = useRef<Record<string, number>>({});
  const mouseX = useSpring(0, { stiffness: 120, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 120, damping: 20 });
  const bobY = useMotionValue(0);
  const translateX = useTransform(mouseX, (v: number) => Math.max(-25, Math.min(25, v)));
  const translateY = useTransform([mouseY, bobY], ([my, by]: number[]) => Math.max(-22, Math.min(22, my + by)));

  useEffect(() => {
    let frame: number;
    const animate = () => {
      bobY.set(Math.sin(Date.now() / 800) * 6);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [bobY]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseX.set((e.clientX - cx) / rect.width * 40);
      mouseY.set((e.clientY - cy) / rect.height * 28);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const onChatOpen = () => dispatch({ type: 'TREELOCATOR_ACTIVATED' });
    window.addEventListener('chat-opened', onChatOpen);
    return () => window.removeEventListener('chat-opened', onChatOpen);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      const threshold = window.innerHeight * 0.05;
      const scrollThreshold = section ? section.offsetHeight * 0.5 : window.innerHeight * 0.5;
      if (window.scrollY > scrollThreshold) {
        dispatch({ type: 'SCROLL' });
      } else if (window.scrollY <= threshold) {
        dispatch({ type: 'SCROLL_TOP' });
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Generic timed transition: auto-advances any state that has a duration in heroTimerDurations
  useEffect(() => {
    const duration = heroTimerDurations[textState];
    if (!duration) { delete remainingRef.current[textState]; return; }
    if (isHovering) return;
    const remaining = remainingRef.current[textState] ?? duration;
    const start = Date.now();
    const timer = setTimeout(() => {
      delete remainingRef.current[textState];
      dispatch({ type: 'TIMEOUT' });
    }, remaining);
    return () => {
      clearTimeout(timer);
      remainingRef.current[textState] = Math.max(0, remaining - (Date.now() - start));
    };
  }, [textState, isHovering]);

  // Pop effect halfway through dismissed state
  useEffect(() => {
    if (textState !== 'dismissed') { setShowPop(false); delete remainingRef.current.pop; return; }
    if (isHovering) return;
    const remaining = remainingRef.current.pop ?? 1500;
    const start = Date.now();
    const timer = setTimeout(() => {
      delete remainingRef.current.pop;
      setShowPop(true);
    }, remaining);
    return () => {
      clearTimeout(timer);
      remainingRef.current.pop = Math.max(0, remaining - (Date.now() - start));
    };
  }, [textState, isHovering]);

  useEffect(() => {
    if (textState === 'greatday') {
      try { localStorage.setItem(HERO_COMPLETED_KEY, '1'); } catch {}
    }
  }, [textState]);

  // Console debug: type heroDebug() in DevTools to enable debug controls
  useEffect(() => {
    (window as any).__heroDispatch = dispatch;
    (window as any).heroDebug = () => {
      console.log(`Current state: ${textState}`);
      console.log(`States: ${heroStates.join(', ')}`);
      console.log('Commands:');
      console.log('  heroNext()        - next state');
      console.log('  heroPrev()        - previous state');
      console.log('  heroReset()       - clear localStorage & reload');
      (window as any).heroNext = () => dispatch({ type: 'DEBUG_NEXT' });
      (window as any).heroPrev = () => dispatch({ type: 'DEBUG_PREV' });
      (window as any).heroReset = () => { localStorage.removeItem(HERO_COMPLETED_KEY); window.location.reload(); };
    };
    return () => {
      delete (window as any).__heroDispatch;
      delete (window as any).heroDebug;
      delete (window as any).heroNext;
      delete (window as any).heroPrev;
      delete (window as any).heroReset;
    };
  });

  return (
    <section ref={sectionRef} className="min-h-screen flex flex-col justify-center px-6 pt-20 relative overflow-hidden bg-off-white">
      {/* Background Abstract Element */}
      <div className="absolute -top-96 bottom-0 right-0 w-1/3 bg-gray-50 opacity-50 skew-x-12 hidden lg:block pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full z-10">
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <p className="text-sm md:text-base tracking-[0.3em] uppercase text-gray-500 mb-4 font-bold">
                Portfolio 2026
            </p>
            <div className="text-5xl md:text-8xl lg:text-9xl font-display font-bold leading-tight tracking-tighter text-ink mb-8">
                <div className="mb-2 md:mb-4 text-muted">
                    <AnimatedHeading text="KRZYSZTOF" />
                </div>
                <div className="text-ink">
                    <AnimatedHeading text="WENDE" />
                </div>
            </div>
        </motion.div>

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-2xl"
        >
             <h2 className="text-xl md:text-2xl font-light text-gray-800 mb-8 leading-relaxed">
                {CV_DATA.title}
             </h2>
             <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-600 mb-12">
                 <span className="px-4 py-2 border border-gray-200 bg-white shadow-sm">Forbes 25 under 25</span>
                 <span className="px-4 py-2 border border-gray-200 bg-white shadow-sm">Elixir Specialist</span>
                 <span className="px-4 py-2 border border-gray-200 bg-white shadow-sm">Systems Architect</span>
             </div>
        </motion.div>

        {!boring && (
        <div className="flex justify-center items-center w-full min-h-[12rem] md:min-h-[16rem]">
          <motion.p
            className="text-5xl md:text-7xl font-sans font-bold text-ink select-none leading-tight text-center cursor-pointer"
            onClick={() => dispatch({ type: 'CLICK' })}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            style={{
              x: translateX,
              y: translateY,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <AnimatePresence mode="wait">
              {textState === 'anyways' ? (
                <motion.span
                  key="anyways"
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  {heroText[textState].split('').map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.08, duration: 0 }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.span>
              ) : (
                <motion.span
                  key={textState}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  {heroText[textState]}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.p>
        </div>
        )}

      </div>

      {!boring && (
      <>
      {/* Hand-drawn arrow pointing at TreeLocator button */}
      <AnimatePresence>
      {(textState === 'default' || textState === 'resumed' || textState === 'meta') && (
      <motion.div
        className="absolute bottom-16 right-12 md:right-20 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.4 } }}
        transition={{ delay: 1.5, duration: 0.3 }}
      >
        <motion.p
          className="text-lg md:text-xl font-sans italic text-gray-400 mb-2 translate-x-[-45px] md:translate-x-[-40px] md:rotate-[-6deg] translate-y-[4.5rem] md:translate-y-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          {textState === 'meta' ? 'Really. Try it!' : 'like this one'}
        </motion.p>
        {/* Mobile: cropped 30% from left */}
        <svg width="84" height="100" viewBox="36 0 84 100" fill="none" className="text-gray-400 translate-x-[6px] -rotate-[40deg] origin-bottom-right md:hidden">
          <motion.path
            d="M10 10 C 25 5, 40 2, 55 8 C 70 14, 78 30, 82 48 C 86 66, 90 78, 100 88"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.6, duration: 1, ease: "easeInOut" }}
          />
          <motion.path
            d="M94 80 L100 88 L90 86" transform="rotate(15, 100, 88)"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.6, duration: 0.15 }}
          />
        </svg>
        {/* Desktop: full arrow */}
        <svg width="120" height="100" viewBox="0 0 120 100" fill="none" className="text-gray-400 translate-x-[20px] hidden md:block">
          <motion.path
            d="M10 10 C 25 5, 40 2, 55 8 C 70 14, 78 30, 82 48 C 86 66, 90 78, 100 88"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.6, duration: 1, ease: "easeInOut" }}
          />
          <motion.path
            d="M94 80 L100 88 L90 86" transform="rotate(15, 100, 88)"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.6, duration: 0.15 }}
          />
        </svg>
      </motion.div>
      )}
      </AnimatePresence>

      {/* Pop lines on dismiss */}
      <AnimatePresence>
      {showPop && (
        <motion.div
          className="absolute left-1/2 pointer-events-none"
          style={{ bottom: 'calc(2.5rem - 24px)', marginLeft: '-24px' }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0, delay: 0.12 }}
        >
          <svg width="80" height="80" viewBox="0 0 80 80" className="text-ink">
            {[
              { angle: 0, inner: 18, outer: 32 },
              { angle: 40, inner: 16, outer: 26 },
              { angle: 75, inner: 17, outer: 34 },
              { angle: 110, inner: 15, outer: 24 },
              { angle: 155, inner: 18, outer: 30 },
              { angle: 200, inner: 16, outer: 28 },
              { angle: 235, inner: 17, outer: 35 },
              { angle: 280, inner: 15, outer: 25 },
              { angle: 320, inner: 16, outer: 30 },
            ].map(({ angle, inner, outer }) => {
              const rad = angle * Math.PI / 180;
              return (
                <line
                  key={angle}
                  x1={40 + Math.cos(rad) * inner}
                  y1={40 + Math.sin(rad) * inner}
                  x2={40 + Math.cos(rad) * outer}
                  y2={40 + Math.sin(rad) * outer}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.4"
                />
              );
            })}
          </svg>
        </motion.div>
      )}
      </AnimatePresence>

      </>
      )}

      <AnimatePresence>
      {(boring || !(showPop || textState === 'resumed' || textState === 'always' || textState === 'everything' || textState === 'meta' || textState === 'anyways' || textState === 'keepgoing' || textState === 'withyou' || textState === 'whoknows' || textState === 'activated')) && (
        <motion.div
          key={textState === 'greatday' ? 'greatday-arrow' : 'default-arrow'}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer"
          initial={{ opacity: textState === 'greatday' ? 0 : 1 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          exit={{ opacity: 0, transition: { duration: 0 } }}
          transition={{ opacity: { delay: textState === 'greatday' ? 1 : 0, duration: 0.5 }, y: { repeat: Infinity, duration: 2 } }}
          onClick={() => document.getElementById('expertise')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <ArrowDown className="text-ink w-8 h-8 mr-2 mb-2" />
        </motion.div>
      )}
      </AnimatePresence>
    </section>
  );
};
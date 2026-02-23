import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const IS_DEV = import.meta.env.DEV;
const TURNSTILE_SITE_KEY = (process.env as any).TURNSTILE_SITE_KEY || (IS_DEV ? '1x00000000000000000000AA' : '');
const SESSION_VERIFIED_KEY = 'turnstile_verified';

function useTurnstile() {
  const [verified, setVerified] = useState(() => {
    return sessionStorage.getItem(SESSION_VERIFIED_KEY) === '1';
  });
  const [token, setToken] = useState<string | null>(null);
  const widgetRef = useRef<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const render = useCallback(() => {
    if (verified || widgetRef.current) return;
    const turnstile = (window as any).turnstile;
    if (!turnstile || !containerRef.current) return;

    widgetRef.current = turnstile.render(containerRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      callback: (tkn: string) => {
        setToken(tkn);
        setVerified(true);
        sessionStorage.setItem(SESSION_VERIFIED_KEY, '1');
      },
      'error-callback': () => {
        widgetRef.current = null;
      },
      size: 'invisible',
    });
  }, [verified]);

  useEffect(() => {
    if (verified) return;
    if ((window as any).turnstile) {
      render();
      return;
    }
    const onLoad = () => render();
    window.addEventListener('turnstile:ready', onLoad);
    return () => window.removeEventListener('turnstile:ready', onLoad);
  }, [verified, render]);

  const trigger = useCallback(() => {
    if (verified) return true;
    const turnstile = (window as any).turnstile;
    if (turnstile && !widgetRef.current && containerRef.current) {
      render();
    }
    if (turnstile && widgetRef.current) {
      turnstile.execute(widgetRef.current);
    }
    return false;
  }, [verified, render]);

  return { verified, token, trigger, containerRef };
}

export const AskAboutMe: React.FC = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const { verified, trigger, containerRef } = useTurnstile();

  const handleOpen = () => {
    if (verified) {
      setChatOpen(true);
    } else {
      const isVerified = trigger();
      if (isVerified) {
        setChatOpen(true);
      }
    }
  };

  if (!TURNSTILE_SITE_KEY) return null;

  return (
    <>
      {/* Turnstile invisible container */}
      <div ref={containerRef} style={{ position: 'fixed', bottom: 0, left: 0, zIndex: -1 }} />

      {/* Floating button */}
      <AnimatePresence>
        {!chatOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onClick={handleOpen}
            className="fixed bottom-5 left-5 z-[2147483646] w-11 h-11 bg-black text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 transition-colors group"
            aria-label="Ask about me"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            {/* Tooltip */}
            <span className="absolute left-full ml-3 px-3 py-1.5 bg-black text-white text-xs font-medium rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Ask about me
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat overlay */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-5 left-5 z-[2147483646] w-[calc(100vw-2.5rem)] max-w-md h-[min(70vh,32rem)] bg-white border border-gray-200 shadow-2xl rounded-2xl flex flex-col overflow-hidden sm:w-96"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-black text-white rounded-t-2xl">
              <span className="text-sm font-semibold tracking-wide">Ask about me</span>
              <button
                onClick={() => setChatOpen(false)}
                className="p-1 hover:bg-white/20 rounded transition-colors"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>

            {/* Chat content - replace with your own chat implementation */}
            <div className="flex-1 overflow-y-auto px-4 py-3 flex items-center justify-center text-gray-400 text-sm">
              Chat coming soon
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

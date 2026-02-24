import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export const AskAboutMe: React.FC = () => {
  // TODO: fix wendebot connection before re-enabling
  return null;
  const [chatOpen, setChatOpen] = useState(false);

  const openChat = () => {
    setChatOpen(true);
    window.dispatchEvent(new CustomEvent('chat-opened'));
  };

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!chatOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onClick={openChat}
            className="fixed bottom-5 right-5 z-[2147483646] w-11 h-11 bg-ink text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-600 transition-colors group"
            aria-label="Ask about me"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            {/* Tooltip */}
            <span className="absolute right-full mr-3 px-3 py-1.5 bg-ink text-white text-xs font-medium rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
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
            className="fixed bottom-5 right-5 z-[2147483646] w-[calc(100vw-2.5rem)] max-w-md h-[min(70vh,32rem)] rounded-2xl sm:w-96" style={{ overflow: 'clip' }}
          >
            {/* Close button */}
            <button
              onClick={() => setChatOpen(false)}
              className="absolute top-3 right-3 z-10 w-7 h-7 bg-ink/50 hover:bg-ink/70 text-white rounded-full flex items-center justify-center transition-colors"
              aria-label="Close chat"
            >
              <X size={14} />
            </button>

            <iframe
              src="https://wendebot.vercel.app?detached&url=wss://wendebot.fly.dev&token=d5c63d4790b61d2404a1c8cddf93f5d1115c390cf0b02b013d38d044f3a57f9b"
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="yes"
              allowTransparency={true}
              className="w-full h-full border-0 bg-transparent"
              title="Ask about me"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

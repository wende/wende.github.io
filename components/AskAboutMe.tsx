import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

export const AskAboutMe: React.FC = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [iframeMounted, setIframeMounted] = useState(false);

  const toggle = () => {
    if (!chatOpen) {
      setIframeMounted(true);
      window.dispatchEvent(new CustomEvent('chat-opened'));
    }
    setChatOpen(!chatOpen);
  };

  return (
    <>
      {/* Toggle button — always visible */}
      <button
        onClick={toggle}
        className="fixed bottom-8 right-8 z-[2147483647] w-14 h-14 bg-ink text-white rounded-full flex items-center justify-center shadow-lg hover:bg-charcoal transition-colors group"
        aria-label={chatOpen ? 'Minimize chat' : 'Ask about me'}
      >
        <svg
          width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className="transition-all duration-300 absolute"
          style={{
            transform: chatOpen ? 'rotate(90deg) scale(0)' : 'rotate(0deg) scale(1)',
            opacity: chatOpen ? 0 : 1,
          }}
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <ChevronRight
          size={22}
          className="transition-all duration-300 absolute"
          style={{
            transform: chatOpen ? 'rotate(0deg) scale(1)' : 'rotate(-90deg) scale(0)',
            opacity: chatOpen ? 1 : 0,
          }}
        />
        {/* Tooltip — only when closed */}
        {!chatOpen && (
          <span className="absolute right-full mr-3 px-3 py-1.5 bg-ink text-white text-xs font-medium rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Ask about me
          </span>
        )}
      </button>

      {/* Chat panel — to the left of the button, iframe stays mounted */}
      {iframeMounted && (
        <div
          className="fixed bottom-[28px] right-[89px] z-[2147483646] w-[calc(100vw-7.5rem)] max-w-md h-[min(70vh,32rem)] rounded-2xl sm:w-96 transition-all duration-250 ease-out"
          style={{
            overflow: 'clip',
            opacity: chatOpen ? 1 : 0,
            transform: chatOpen ? 'translateX(0) scale(1)' : 'translateX(40px) scale(0.95)',
            pointerEvents: chatOpen ? 'auto' : 'none',
          }}
        >
          <iframe
            src="https://wendebot.vercel.app?detached&url=wss://wendebot.fly.dev&token=d5c63d4790b61d2404a1c8cddf93f5d1115c390cf0b02b013d38d044f3a57f9b"
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            allowTransparency={true}
            className="w-full h-full border-0 bg-transparent"
            title="Ask about me"
          />
        </div>
      )}
    </>
  );
};

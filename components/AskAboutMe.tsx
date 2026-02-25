import React, { useState, useRef, useCallback } from 'react';
import { ChevronRight } from 'lucide-react';

const MIN_WIDTH = 300;
const MIN_HEIGHT = 280;
const DEFAULT_WIDTH = 384; // sm:w-96
const DEFAULT_HEIGHT_VH = 70;
const MAX_HEIGHT_PX = 512; // 32rem

export const AskAboutMe: React.FC = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [iframeMounted, setIframeMounted] = useState(false);
  const [panelWidth, setPanelWidth] = useState(DEFAULT_WIDTH);
  const [panelHeight, setPanelHeight] = useState(
    Math.min(window.innerHeight * DEFAULT_HEIGHT_VH / 100, MAX_HEIGHT_PX)
  );
  const [isDragging, setIsDragging] = useState(false);
  const dragging = useRef<'left' | 'top' | 'top-left' | null>(null);
  const startPos = useRef({ x: 0, y: 0, w: 0, h: 0 });

  const toggle = () => {
    if (!chatOpen) {
      setIframeMounted(true);
      window.dispatchEvent(new CustomEvent('chat-opened'));
    }
    setChatOpen(!chatOpen);
  };

  const onPointerDown = useCallback(
    (edge: 'left' | 'top' | 'top-left') => (e: React.PointerEvent) => {
      e.preventDefault();
      dragging.current = edge;
      setIsDragging(true);
      startPos.current = { x: e.clientX, y: e.clientY, w: panelWidth, h: panelHeight };
      document.body.style.userSelect = 'none';
      document.body.style.cursor =
        edge === 'left' ? 'ew-resize' : edge === 'top' ? 'ns-resize' : 'nwse-resize';

      const onMove = (ev: PointerEvent) => {
        const dx = startPos.current.x - ev.clientX;
        const dy = startPos.current.y - ev.clientY;
        const maxW = window.innerWidth - 89 - 16; // right offset + padding
        const maxH = window.innerHeight - 28 - 16;

        if (dragging.current === 'left' || dragging.current === 'top-left') {
          setPanelWidth(Math.max(MIN_WIDTH, Math.min(startPos.current.w + dx, maxW)));
        }
        if (dragging.current === 'top' || dragging.current === 'top-left') {
          setPanelHeight(Math.max(MIN_HEIGHT, Math.min(startPos.current.h + dy, maxH)));
        }
      };

      const onUp = () => {
        dragging.current = null;
        setIsDragging(false);
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', onUp);
      };

      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
    },
    [panelWidth, panelHeight]
  );

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
          className="fixed bottom-[28px] right-[89px] z-[2147483646] rounded-2xl"
          style={{
            width: panelWidth,
            height: panelHeight,
            overflow: 'clip',
            opacity: chatOpen ? 1 : 0,
            transform: chatOpen ? 'translateX(0) scale(1)' : 'translateX(40px) scale(0.95)',
            pointerEvents: chatOpen ? 'auto' : 'none',
            transition: isDragging ? 'none' : 'opacity 250ms ease-out, transform 250ms ease-out',
          }}
        >
          {/* Left resize handle */}
          <div
            onPointerDown={onPointerDown('left')}
            style={{ position: 'absolute', left: -3, top: 12, bottom: 12, width: 6, cursor: 'ew-resize', zIndex: 10 }}
          />
          {/* Top resize handle */}
          <div
            onPointerDown={onPointerDown('top')}
            style={{ position: 'absolute', top: -3, left: 12, right: 12, height: 6, cursor: 'ns-resize', zIndex: 10 }}
          />
          {/* Top-left corner resize handle */}
          <div
            onPointerDown={onPointerDown('top-left')}
            style={{ position: 'absolute', top: -3, left: -3, width: 14, height: 14, cursor: 'nwse-resize', zIndex: 11 }}
          />
          <iframe
            src="https://wendebot.vercel.app?detached&url=wss://wendebot.fly.dev&token=d5c63d4790b61d2404a1c8cddf93f5d1115c390cf0b02b013d38d044f3a57f9b"
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            allowTransparency={true}
            className="w-full h-full border-0 bg-transparent"
            style={{ pointerEvents: isDragging ? 'none' : 'auto' }}
            title="Ask about me"
          />
        </div>
      )}
    </>
  );
};

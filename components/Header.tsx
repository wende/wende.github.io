import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Github, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBoringMode } from '../boringMode';

const navLinks = [
  { name: 'Expertise', href: '#expertise' },
  { name: 'Experience', href: '#experience' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Experiments', href: '/experiments/' },
  { name: 'Contact', href: '#contact' },
];

export const Header: React.FC<{ activePage?: 'home' | 'experiments' }> = ({ activePage = 'home' }) => {
  const { boring, toggle: toggleBoring } = useBoringMode();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileMenuOpen(false);
    if (activePage !== 'home' || !href.startsWith('#') || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const element = document.querySelector(href);
    if (element) {
      event.preventDefault();
      element.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }
  };

  const linkHref = (href: string) => activePage !== 'home' && href.startsWith('#') ? `/${href}` : href;

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href={activePage === 'home' ? '#' : '/'} aria-label="Krzysztof Wende home">
            <Logo />
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-6">
          {activePage === 'home' && <button
            onClick={toggleBoring}
            className={`text-sm uppercase tracking-widest font-bold transition-colors ${
              boring ? 'text-ink' : 'text-gray-500 hover:text-ink'
            }`}
          >
            {boring ? 'Fun Mode' : 'Boring Mode'}
          </button>}
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={linkHref(link.href)}
              onClick={(event) => navigate(event, link.href)}
              aria-current={activePage === 'experiments' && link.href === '/experiments/' ? 'page' : undefined}
              className="text-sm uppercase tracking-widest font-bold text-gray-500 hover:text-ink transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href="https://github.com/wende"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            className="text-gray-500 hover:text-ink transition-colors"
          >
            <Github size={18} />
          </a>
        </div>

        {/* Mobile Nav Button */}
        <div className="lg:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2" aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={mobileMenuOpen} aria-controls="mobile-navigation">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'calc(100dvh - 96px)' }}
            exit={{ opacity: 0, height: 0 }}
            id="mobile-navigation"
            className="absolute top-full left-0 w-full bg-white flex flex-col items-center justify-center gap-5 lg:hidden shadow-xl overflow-y-auto"
          >
            {activePage === 'home' && <button
              onClick={() => { toggleBoring(); setMobileMenuOpen(false); }}
              className="text-2xl font-display font-bold uppercase"
            >
              {boring ? 'Fun Mode' : 'Boring Mode'}
            </button>}
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={linkHref(link.href)}
                onClick={(event) => navigate(event, link.href)}
                aria-current={activePage === 'experiments' && link.href === '/experiments/' ? 'page' : undefined}
                className="text-2xl font-display font-bold uppercase"
              >
                {link.name}
              </a>
            ))}
            <a
              href="https://github.com/wende"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="text-ink"
            >
              <Github size={28} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

import React from 'react';
import { CV_DATA } from '../constants';
import { motion } from 'framer-motion';
import { AnimatedHeading } from './AnimatedHeading';

const IconCode: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>
);

const IconStar: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const IconExternalLink: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
    <path d="M18 13v6H5V6h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const IconAward: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
    <circle cx="12" cy="9" r="6" /><polyline points="8.5 14.5 7 23 12 20 17 23 15.5 14.5" />
  </svg>
);

const IconMessage: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const IconTrending: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
  </svg>
);

const iconMap: Record<string, React.FC<{ className?: string }>> = {
    "Cicada": IconCode,
    "Elchemy": IconStar,
    "Autocomplete Elixir": IconExternalLink,
    "Forbes 25 under 25": IconAward,
    "MobileClaw": IconMessage,
    "Quora": IconTrending,
};

export const Portfolio: React.FC = () => {
  return (
    <section id="portfolio" className="py-24 bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="text-4xl md:text-6xl font-display font-bold tracking-tight">
                <AnimatedHeading text="SELECTED WORKS" />
            </div>
            <p className="text-muted mt-4 md:mt-0 max-w-sm text-right hidden md:block">
                A showcase of open source contributions, awards, and impactful startups.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CV_DATA.portfolio.map((item, index) => {
                const IconComponent = iconMap[item.name.split(',')[0]] || IconStar;

                return (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative bg-ink border border-muted/20 p-8 hover:bg-off-white hover:text-ink transition-colors duration-500 ease-in-out cursor-default overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
                           <IconComponent className="w-12 h-12" />
                        </div>

                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div>
                                <h3 className="text-2xl font-bold font-display mb-2 flex items-center gap-2">
                                    {item.name}
                                    {item.link && (
                                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <IconExternalLink className="w-5 h-5" />
                                        </a>
                                    )}
                                </h3>
                                <div className="w-12 h-1 bg-white group-hover:bg-ink mb-6 transition-colors duration-500" />
                                <p className="text-gray-400 group-hover:text-gray-600 mb-4 font-light">
                                    {item.description}
                                </p>
                            </div>

                            {item.stats && (
                                <div className="mt-4 pt-4 border-t border-muted/20 group-hover:border-muted">
                                    <p className="font-mono text-xs uppercase tracking-wider">{item.stats}</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                );
            })}
        </div>
      </div>
    </section>
  );
};

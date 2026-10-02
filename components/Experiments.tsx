import React, { useEffect, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowUpRight, Github } from 'lucide-react';
import { Header } from './Header';
import { EXPERIMENTS } from '../experiments';
import './Experiments.css';

const filters = ['All experiments', 'Games', 'Simulations', 'Tools'] as const;
const formatDate = (date: string) => new Intl.DateTimeFormat('en-GB', {
  day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC',
}).format(new Date(`${date}T00:00:00Z`));

export const Experiments: React.FC = () => {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All experiments');
  const visibleExperiments = EXPERIMENTS.filter(item => filter === 'All experiments' || item.category === filter);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'AI Gaming Experiments | Krzysztof Wende';
    return () => { document.title = previousTitle; };
  }, []);

  return (
    <div className="experiments-page min-h-screen bg-off-white selection:bg-black selection:text-white">
      <Header activePage="experiments" />
      <main id="main-content">
        <section className="experiments-intro max-w-7xl mx-auto px-6">
          <a href="/#portfolio" className="experiments-back"><ArrowLeft size={15} /> Back to portfolio</a>
          <p className="experiments-eyebrow">A little outside the day job</p>
          <h1><span>AI GAMING</span><br />EXPERIMENTS<span className="experiments-period">.</span></h1>
          <div className="experiments-intro-bottom">
            <p>Small games, playable worlds, and real-time graphics.<br className="hidden sm:block" /> Built with AI, curiosity, and a lot of experimentation.</p>
            <a href="#gallery" className="experiments-explore">Explore the experiments <ArrowDown size={18} /></a>
          </div>
        </section>

        <section id="gallery" className="experiments-gallery bg-charcoal text-white" aria-label="Gaming experiments gallery">
          <div className="max-w-7xl mx-auto px-6">
            <div className="experiments-toolbar">
              <div className="experiments-filters" role="group" aria-label="Filter experiments">
                {filters.map(category => {
                  const count = category === 'All experiments' ? EXPERIMENTS.length : EXPERIMENTS.filter(item => item.category === category).length;
                  return <button key={category} type="button" aria-pressed={filter === category} onClick={() => setFilter(category)}>
                    {category} <span>{String(count).padStart(2, '0')}</span>
                  </button>;
                })}
              </div>
              <p className="experiments-order">Featured experiments first</p>
            </div>
            <p className="sr-only" role="status">Showing {visibleExperiments.length} experiments</p>
            <div className="experiments-grid">
              {visibleExperiments.map(item => (
                <article key={item.repo} className="experiment-card">
                  <a href={item.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${item.name} on Vercel (opens in a new tab)`}>
                    <div className="experiment-image">
                      <img src={item.image} alt="" width="1280" height="800" loading="lazy" decoding="async" style={{ objectPosition: item.imagePosition }} />
                      <span className="experiment-number">{String(EXPERIMENTS.indexOf(item) + 1).padStart(2, '0')}</span>
                      <span className="experiment-launch" aria-hidden="true"><ArrowUpRight size={24} /></span>
                    </div>
                    <div className="experiment-content">
                      <div className="experiment-meta"><span>{item.category}</span><time dateTime={item.updated}>Updated {formatDate(item.updated)}</time></div>
                      <h2>{item.name}</h2>
                      <p className="experiment-description">{item.description}</p>
                      <div className="experiment-tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                      <div className="experiment-footer"><span>{item.repo}</span><span>Open experiment <ArrowUpRight size={16} /></span></div>
                    </div>
                  </a>
                </article>
              ))}
            </div>
            <p className="experiments-note">Works in progress, made to be played with. WebGPU experiments need a browser with WebGPU support.</p>
          </div>
        </section>
      </main>
      <footer className="experiments-footer max-w-7xl mx-auto px-6">
        <div><p className="experiments-eyebrow">Always making something</p><a href="https://github.com/wende" target="_blank" rel="noopener noreferrer" className="experiments-github">More on GitHub <Github size={22} /></a></div>
        <div className="experiments-footer-right"><a href="/" className="experiments-back"><ArrowLeft size={15} /> Back to portfolio</a><p>© {new Date().getFullYear()} Krzysztof Wende</p></div>
      </footer>
    </div>
  );
};

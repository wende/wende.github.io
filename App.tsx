import React, { useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Portfolio } from './components/Portfolio';
import { Contact } from './components/Contact';
import { BoringModeProvider } from './boringMode';
import { TreeLocatorDemo } from './components/TreeLocatorDemo';
import { AskAboutMe } from './components/AskAboutMe';
import { trackPageView } from './analytics';

function App() {
  // Handle GitHub Pages redirect for client-side routing
  const redirect = typeof sessionStorage !== 'undefined' ? sessionStorage.redirect : null;
  if (redirect) {
    delete sessionStorage.redirect;
    window.history.replaceState(null, '', redirect);
  }

  // Simple routing: show TreeLocatorJS demo at /treelocatorjs/
  const pathname = redirect || window.location.pathname;

  useEffect(() => {
    trackPageView(`${pathname}${window.location.search}${window.location.hash}`);
  }, [pathname]);

  if (pathname.startsWith('/treelocatorjs')) {
    return <TreeLocatorDemo />;
  }

  return (
    <BoringModeProvider>
      <div className="min-h-screen bg-off-white selection:bg-black selection:text-white">
        <Header />
        <main>
          <Hero />
          <Skills />
          <Experience />
          <Portfolio />
          <Contact />
        </main>
        <AskAboutMe />
      </div>
    </BoringModeProvider>
  );
}

export default App;

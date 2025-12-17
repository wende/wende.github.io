import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Portfolio } from './components/Portfolio';
import { Contact } from './components/Contact';
import { TreeLocatorDemo } from './components/TreeLocatorDemo';

function App() {
  // Handle GitHub Pages redirect for client-side routing
  const redirect = typeof sessionStorage !== 'undefined' ? sessionStorage.redirect : null;
  if (redirect) {
    delete sessionStorage.redirect;
    window.history.replaceState(null, '', redirect);
  }

  // Simple routing: show TreeLocatorJS demo at /treelocatorjs/
  const pathname = redirect || window.location.pathname;
  if (pathname.startsWith('/treelocatorjs')) {
    return <TreeLocatorDemo />;
  }

  return (
    <div className="min-h-screen bg-off-white selection:bg-black selection:text-white">
      <Header />
      <main>
        <Hero />
        <Skills />
        <Experience />
        <Portfolio />
        <Contact />
      </main>
    </div>
  );
}

export default App;

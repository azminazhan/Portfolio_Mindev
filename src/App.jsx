import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Journey from './components/Journey';
import Projects from './components/Projects';
import Contact from './components/Contact';
import StarBackground from './components/StarBackground';
import ScrollProgress from './components/ScrollProgress';
import AdminPage from './admin/AdminPage';

function App() {
  const isAdmin = window.location.pathname.replace(/\/$/, '').endsWith('/admin');

  if (isAdmin) return <AdminPage />;

  return (
    <div className="relative min-h-screen">
      <StarBackground />
      <ScrollProgress />

      <Navbar />

      <main>
        <Hero />
        <About />
        <Services />
        <Journey />
        <Projects />
        <Contact />
      </main>

      <footer className="py-8 text-center text-slate-500 text-sm border-t border-white/5 bg-[#071116]/75 backdrop-blur-sm">
        <p>© {new Date().getFullYear()} Azmin Azhan. Programmer and systems developer based in Malaysia.</p>
      </footer>
    </div>
  );
}

export default App;

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, X } from 'lucide-react';
import { projectsRawUrl, resolveProjectImage } from '../config/projects';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [enlargedImage, setEnlargedImage] = useState(null);
  const galleryRef = useRef(null);

  useEffect(() => {
    let active = true;
    const load = async () => {
      const sources = import.meta.env.DEV
        ? [`${import.meta.env.BASE_URL}projects.json`]
        : [`${projectsRawUrl}?v=${Date.now()}`, `${import.meta.env.BASE_URL}projects.json`];

      for (const source of sources) {
        try {
          const response = await fetch(source, { cache: 'no-store' });
          if (!response.ok) throw new Error('Unable to load projects');
          const data = await response.json();
          if (active) setProjects(data.filter((project) => project.visible !== false));
          return;
        } catch {
          // Try the bundled copy if GitHub is temporarily unavailable.
        }
      }
    };
    load();
    return () => { active = false; };
  }, []);

  const scrollGallery = (direction) => {
    galleryRef.current?.scrollBy({
      left: direction === 'left' ? -galleryRef.current.clientWidth : galleryRef.current.clientWidth,
      behavior: 'smooth',
    });
  };

  return (
    <section id="projects" className="section relative">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16" style={{ marginTop: '50px' }}>
          <h2 className="text-4xl font-bold mb-4 text-white">Featured <span className="text-[#34d399]">Projects</span></h2>
          <p className="text-gray-400">Selected work showing the problem, my contribution, and the delivered result.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <motion.article
              layoutId={`card-${project.id}`}
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={() => setSelectedProject(project)}
              onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') setSelectedProject(project); }}
              role="button"
              tabIndex={0}
              aria-label={`View ${project.title} case study`}
              className="glass-card group relative overflow-hidden cursor-pointer hover:border-[#34d399]/50 transition-colors"
            >
              <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${project.color} opacity-10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:opacity-20 transition-opacity`} />
              <div className="relative z-10">
                <span className="text-sm font-mono text-[#34d399] mb-2 block">{project.category}</span>
                <motion.h3 layoutId={`title-${project.id}`} className="text-2xl font-bold mb-3 group-hover:text-[#34d399] transition-colors">{project.title}</motion.h3>
                <p className="text-gray-400 mb-6 line-clamp-3 leading-relaxed">{project.details}</p>
                <div className="text-xs text-[#34d399] mb-6 font-semibold flex items-center gap-1">Click to view details <ChevronRight size={14} /></div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((item) => <span key={item} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">{item}</span>)}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProject(null)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div layoutId={`card-${selectedProject.id}`} role="dialog" aria-modal="true" aria-label={`${selectedProject.title} case study`} className="relative w-full max-w-4xl bg-[#0b1b21] border border-slate-300/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
              <button type="button" aria-label="Close case study" onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 z-20 p-2 bg-black/60 hover:bg-red-500/80 rounded-full"><X size={24} /></button>
              <div className="overflow-y-auto flex-1 custom-scrollbar">
                {selectedProject.images?.length > 0 && (
                  <div className="relative w-full h-64 md:h-96 bg-black/50 group">
                    <div ref={galleryRef} className="flex overflow-x-auto snap-x snap-mandatory h-full w-full scroll-smooth">
                      {selectedProject.images.map((image, index) => {
                        const source = resolveProjectImage(image);
                        return <button type="button" key={source} onClick={() => setEnlargedImage(source)} className="flex-shrink-0 w-full h-full snap-center overflow-hidden cursor-zoom-in"><img src={source} alt={`${selectedProject.title} screenshot ${index + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform" /></button>;
                      })}
                    </div>
                    {selectedProject.images.length > 1 && <>
                      <button type="button" aria-label="Previous image" onClick={() => scrollGallery('left')} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-[#34d399] p-3 rounded-full"><ChevronLeft /></button>
                      <button type="button" aria-label="Next image" onClick={() => scrollGallery('right')} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-[#34d399] p-3 rounded-full"><ChevronRight /></button>
                    </>}
                  </div>
                )}
                <div className="px-6 md:px-10 py-10">
                  <span className="text-[#34d399] font-mono text-sm uppercase tracking-wider">{selectedProject.category}</span>
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-5 mt-3 mb-8">
                    <motion.h3 layoutId={`title-${selectedProject.id}`} className="text-3xl md:text-5xl font-bold">{selectedProject.title}</motion.h3>
                    {selectedProject.liveDemo && <a href={selectedProject.liveDemo} target="_blank" rel="noreferrer" className="flex shrink-0 items-center gap-2 px-5 py-3 rounded-full bg-[#34d399] text-black font-bold"><ExternalLink size={18} /> Live Demo</a>}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-10">{selectedProject.tech.map((item) => <span key={item} className="px-3 py-2 rounded-lg bg-[#34d399]/10 border border-[#34d399]/20 text-[#34d399] text-sm">{item}</span>)}</div>
                  <div className="grid md:grid-cols-3 gap-4 mb-8">
                    <CaseStudyItem label="Challenge" text={selectedProject.challenge} />
                    <CaseStudyItem label="Solution" text={selectedProject.solution} />
                    <CaseStudyItem label="Outcome" text={selectedProject.outcome} accent />
                  </div>
                  <p className="text-sm text-gray-400 mb-8"><span className="text-white font-semibold">My role:</span> {selectedProject.role}</p>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
                    <h4 className="text-xl font-bold mb-5">Key Highlights</h4>
                    <ul className="space-y-4">
                      {selectedProject.description.map((item) => <li key={item} className="flex gap-3 text-gray-300 leading-relaxed"><span className="mt-2 w-2 h-2 shrink-0 rounded-full bg-[#34d399]" />{item}</li>)}
                    </ul>
                    <p className="text-gray-400 border-t border-white/10 mt-7 pt-6 leading-relaxed">{selectedProject.details}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {enlargedImage && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEnlargedImage(null)} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-6 cursor-zoom-out"><img src={enlargedImage} alt="Enlarged project screenshot" className="max-w-full max-h-full object-contain rounded-2xl" /></motion.div>}
      </AnimatePresence>
    </section>
  );
};

const CaseStudyItem = ({ label, text, accent = false }) => (
  <div className={`rounded-2xl border p-5 ${accent ? 'border-[#34d399]/30 bg-[#34d399]/5' : 'border-white/10 bg-white/5'}`}>
    <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#34d399] mb-3">{label}</p>
    <p className="text-sm text-gray-300 leading-relaxed">{text}</p>
  </div>
);

export default Projects;

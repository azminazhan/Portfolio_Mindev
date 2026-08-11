import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, ChevronRight, ChevronLeft } from 'lucide-react';

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [enlargedImage, setEnlargedImage] = useState(null);
    const galleryRef = useRef(null);

    const scrollGallery = (direction) => {
        if (galleryRef.current) {
            const scrollAmount = galleryRef.current.clientWidth;
            galleryRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    const projects = [
        {
            id: 1,
            title: 'Entomo Portal',
            category: 'Full Stack Development',
            role: 'Product design, development, and stakeholder presentation',
            challenge: 'Important employee resources were spread across email and chat, making internal knowledge difficult to find and maintain.',
            solution: 'A centralized Firebase portal with role-based access and an admin experience for managing content without developer support.',
            outcome: 'Presented to senior stakeholders and approved for potential company-wide adoption.',
            description: [
                "Designed and developed a full-stack employee portal, using AI-assisted tools to accelerate delivery.",
                "Built a centralized knowledge hub with role-based access, enabling employees and admins to manage internal content efficiently.",
                "Created an admin interface so authorized users can update content without backend intervention.",
                "Presented the solution to senior stakeholders and received approval for potential company-wide adoption.",
            ],
            details: "Centralized employee knowledge hub to host wellness session recordings, articles, town halls, internal trainings, and ISO certification progress, improving accessibility compared to email- and chat based distribution.",
            tech: ['Firebase', 'JavaScript', 'Antigravity', 'Base44'],
            color: 'from-green-400 to-teal-500',
            images: [
                `${import.meta.env.BASE_URL}signin1.png`,
                `${import.meta.env.BASE_URL}home.png`,
                `${import.meta.env.BASE_URL}articles.png`,
                `${import.meta.env.BASE_URL}iso.png`,
                `${import.meta.env.BASE_URL}admin.png`
            ],
            liveDemo: "https://entomo-7c549.web.app/",
        },
        {
            id: 2,
            title: 'Deepfake Detection System',
            category: 'Deep Learning',
            role: 'Model experimentation, application development, and evaluation',
            challenge: 'Video manipulation can be difficult to identify when spatial clues and changes between frames are evaluated separately.',
            solution: 'A Streamlit application backed by a ResNet-50 and LSTM pipeline that combines facial features with temporal analysis.',
            outcome: 'Delivered an interactive prototype and compared training factors including optimizers, learning rates, sequence lengths, dropout, and epochs.',
            description: [
                "Standalone deepfake detection system with a Streamlit frontend and hybrid CNNâ€“RNN backend for video forgery detection.",
                "Trained the model on real and manipulated datasets to identify facial inconsistencies and temporal artifacts.",
                "Utilized Convolutional Neural Networks (CNN) for spatial feature extraction and Recurrent Neural Networks (RNN) for temporal sequence analysis.",
                "Experimented with optimizers, learning rates, sequence lengths, dropout rates, and training epochs to improve performance."
            ],
            details: "Using a hybrid model ResNet-50 with LSTM, the system detects deepfake videos by detecting generated artifacts on the face.",
            tech: ['Python', 'Streamlit', 'TensorFlow', 'PyTorch', 'Machine Learning'],
            liveDemo: 'https://deepfake-detection-system-hv7yzpci4fubzj9vvktvlu.streamlit.app/',
            color: 'from-blue-500 to-cyan-500',
            images: [
                `${import.meta.env.BASE_URL}deep_home.png`,
                `${import.meta.env.BASE_URL}deep_process.png`,
                `${import.meta.env.BASE_URL}deep_result.png`,
                `${import.meta.env.BASE_URL}deep_explain.png`
            ]
        },
        {
            id: 3,
            title: 'Stock Delivery Database Management System',
            category: 'Database Management',
            role: 'Database architecture and PL/SQL development',
            challenge: 'A simulated supply-chain operation needed consistent records across inventory, suppliers, orders, and deliveries.',
            solution: 'A relational Oracle schema supported by stored procedures, triggers, functions, ER diagrams, and optimized SQL queries.',
            outcome: 'Automated stock updates and enforced business rules at the database layer.',
            description: [
                "Designed and implemented a robust database management system to streamline stock delivery operations for a simulated supply chain environment.",
                "Utilized PL/SQL to create stored procedures, triggers, and functions for enforcing business logic and automating stock updates.",
                "Developed and optimized relational schemas, ER diagrams, and SQL queries to manage inventory, suppliers, orders, and deliveries efficiently."
            ],
            details: "Robust database management system to streamline stock delivery operations for a simulated supply chain environment.",
            tech: ['Oracle Database', 'PL/SQL', 'SQL', 'ERD'],
            color: 'from-purple-500 to-pink-500',
            images: []
        },
        {
            id: 4,
            title: 'CKD Support System',
            category: 'Decision Support System',
            role: 'Data analysis and dashboard design',
            challenge: 'Clinical risk-factor data is difficult to interpret quickly when relationships are buried in raw tables.',
            solution: 'A set of Power BI dashboard views that make relationships between patient factors and CKD risk easier to explore.',
            outcome: 'Created a clearer decision-support view for discussing risk patterns; the dashboard does not replace clinical diagnosis.',
            description: [
                "Multiple dashboard profiles showing the relation of each factor to CKD risk.",
                "Visualized graph of the relation of each factor to CKD risk.",
                "Supports doctors and health professionals to assist in diagnosing and treating kidney diseases."
            ],
            details: "A decision-support dashboard that helps health professionals explore factors related to chronic kidney disease risk.",
            tech: ['Power BI', 'Data Analysis'],
            color: 'from-orange-500 to-red-500',
            images: [
                `${import.meta.env.BASE_URL}ckd1.png`,
                `${import.meta.env.BASE_URL}ckd2.png`,
                `${import.meta.env.BASE_URL}ckd3.png`
            ]
        }
    ];

    return (
        <section id="projects" className="section relative">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                    style={{ marginTop: '50px' }}
                >
                    <h2 className="text-4xl font-bold mb-4 text-white">Featured <span className="text-[#34d399]">Projects</span></h2>
                    <p className="text-gray-400">Selected work showing the problem, my contribution, and the delivered result.</p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((project) => (
                        <motion.div
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
                            {/* Decorative Gradient Background */}
                            <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${project.color} opacity-10 blur-3xl rounded-full transform translate-x-1/2 -translate-y-1/2 group-hover:opacity-20 transition-opacity duration-500`}></div>

                            <div className="relative z-10">
                                <span className="text-sm font-mono text-[#34d399] mb-2 block">{project.category}</span>
                                <motion.h3 layoutId={`title-${project.id}`} className="text-2xl font-bold mb-3 group-hover:text-[#34d399] transition-colors">{project.title}</motion.h3>

                                {/* CARD CONTENT: Showing Details (Paragraph) instead of Descriptions (Bullets) */}
                                <p className="text-gray-400 mb-6 line-clamp-3 leading-relaxed">
                                    {project.details}
                                </p>
                                <div className="text-xs text-[#34d399] mb-6 font-semibold flex items-center gap-1">
                                    Click to view details <ChevronRight size={14} />
                                </div>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tech.map((t) => (
                                        <span key={t} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Project Modal Popup */}
            <AnimatePresence>
                {selectedProject && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProject(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />

                        {/* Modal Content */}
                        <motion.div
                            layoutId={`card-${selectedProject.id}`}
                            role="dialog"
                            aria-modal="true"
                            aria-label={`${selectedProject.title} case study`}
                            className="relative w-full max-w-4xl bg-[#0b1b21] border border-slate-300/10 rounded-3xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.45)] flex flex-col max-h-[90vh]"
                        >
                            {/* Close Button */}
                            <button
                                type="button"
                                aria-label="Close case study"
                                onClick={(e) => { e.stopPropagation(); setSelectedProject(null); }}
                                className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-red-500/80 rounded-full text-white transition-colors"
                            >
                            <X size={24} aria-hidden="true" />
                            </button>

                            {/* Scrollable Content */}
                            <div className="overflow-y-auto flex-1 custom-scrollbar">
                                {/* Image Gallery Section */}
                                {selectedProject.images.length > 0 && <div className="relative w-full h-64 md:h-96 bg-black/50 group">
                                    <div ref={galleryRef} className="flex overflow-x-auto snap-x snap-mandatory h-full w-full custom-scrollbar scroll-smooth">
                                        {selectedProject.images.map((img, idx) => (
                                            <div key={idx} className="flex-shrink-0 w-full h-full snap-center relative group/image overflow-hidden cursor-zoom-in" onClick={() => setEnlargedImage(img)}>
                                                <img
                                                    src={img}
                                                    alt={`${selectedProject.title} screenshot ${idx + 1}`}
                                                    className="w-full h-full object-cover transition-all duration-300 group-hover/image:scale-105 group-hover/image:blur-sm"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 pointer-events-none">
                                                    <span className="bg-black/70 text-white font-bold !py-5 !px-5 rounded-full backdrop-blur-md border border-white/20 shadow-2xl tracking-wide">
                                                        Click to Enlarge
                                                    </span>
                                                </div>
                                                <div className="absolute bottom-4 left-4 bg-black/60 !px-3 !py-2 rounded-full text-xs font-bold text-white backdrop-blur-md border border-white/10 shadow-lg pointer-events-none">
                                                    Image {idx + 1} / {selectedProject.images.length}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Navigation Arrows */}
                                    <button
                                        type="button"
                                        aria-label="Previous project image"
                                        onClick={(e) => { e.stopPropagation(); scrollGallery('left'); }}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-[#34d399] text-white hover:text-black p-3 rounded-full backdrop-blur-md border border-white/20 transition-all opacity-0 group-hover:opacity-100 shadow-xl"
                                    >
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button
                                        type="button"
                                        aria-label="Next project image"
                                        onClick={(e) => { e.stopPropagation(); scrollGallery('right'); }}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-[#34d399] text-white hover:text-black p-3 rounded-full backdrop-blur-md border border-white/20 transition-all opacity-0 group-hover:opacity-100 shadow-xl"
                                    >
                                        <ChevronRight size={24} />
                                    </button>
                                </div>}

                                <div className="!px-5 md:!px-8 py-12">
                                    <div className="flex flex-col md:flex-row gap-8 justify-between items-start mb-10">
                                        <div>
                                            <span className="text-[#34d399] font-mono text-sm mb-4 block tracking-wider uppercase font-semibold">{selectedProject.category}</span>
                                            <motion.h3 layoutId={`title-${selectedProject.id}`} className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">{selectedProject.title}</motion.h3>
                                        </div>
                                        <div className="flex flex-col items-center sm:items-end mt-2 md:mt-0">
                                            <div className="flex gap-4">
                                                {selectedProject.liveDemo && (
                                                    <a href={selectedProject.liveDemo} target="_blank" rel="noopener noreferrer" className="flex items-center !gap-2 !px-4 !py-3 rounded-full bg-[#34d399] !text-black hover:bg-[#34d399]/80 transition-colors font-bold text-base leading-none">
                                                        <ExternalLink size={20} /> Live Demo
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-3 mb-12">
                                        {selectedProject.tech.map((t) => (
                                            <span key={t} className="px-4 py-2 rounded-lg bg-[#34d399]/10 border border-[#34d399]/20 text-[#34d399] text-sm font-semibold tracking-wide">
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="grid md:grid-cols-3 gap-4 mb-10">
                                        <CaseStudyItem label="Challenge" text={selectedProject.challenge} />
                                        <CaseStudyItem label="Solution" text={selectedProject.solution} />
                                        <CaseStudyItem label="Outcome" text={selectedProject.outcome} accent />
                                    </div>
                                    <p className="text-sm text-gray-400 mb-8"><span className="text-white font-semibold">My role:</span> {selectedProject.role}</p>

                                    {/* MODAL CONTENT: Showing Descriptions (Bullets) HERE */}
                                    <div className="space-y-8 text-gray-300 leading-relaxed">
                                        <div className="bg-white/5 !pb-3 !pt-3 rounded-3xl border border-white/10 !mt-12 lg:mx-8">
                                            <h4 className="text-xl md:text-2xl font-bold text-white mb-6 !pb-3 !pl-8 md:!pl-6">Key Highlights</h4>
                                            {/* BULLET POINTS */}
                                            <ul className="!pl-8 md:!pl-14 space-y-6 mb-6 !pb-6 text-base md:text-lg text-white/90">
                                                {Array.isArray(selectedProject.description) ?
                                                    selectedProject.description.map((pt, i) => (
                                                        <li key={i} className="flex items-start gap-4 leading-relaxed">
                                                            <div className="flex-shrink-0 flex items-center h-7 pt-1">
                                                                <div className="w-2.5 h-2.5 rounded-full bg-[#34d399] shadow-[0_0_10px_#34d399]"></div>
                                                            </div>
                                                            <span className="flex-1">{pt}</span>
                                                        </li>
                                                    ))
                                                    : (
                                                        <li className="flex items-start gap-4 leading-relaxed">
                                                            <div className="flex-shrink-0 flex items-center h-7 pt-1">
                                                                <div className="w-2.5 h-2.5 rounded-full bg-[#34d399] shadow-[0_0_10px_#34d399]"></div>
                                                            </div>
                                                            <span className="flex-1">{selectedProject.description}</span>
                                                        </li>
                                                    )
                                                }
                                            </ul>

                                            <div className="text-base text-gray-400 border-t border-white/10 pt-6 mt-6 pb-4 leading-loose !px-8 md:!px-14">
                                                <p>{selectedProject.details}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Enlarged Image Modal */}
            <AnimatePresence>
                {enlargedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setEnlargedImage(null)}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8 cursor-zoom-out"
                    >
                        <button
                            type="button"
                            aria-label="Close enlarged image"
                            onClick={(e) => { e.stopPropagation(); setEnlargedImage(null); }}
                            className="absolute top-6 right-6 z-[110] p-3 bg-white/10 hover:bg-red-500/80 rounded-full text-white transition-colors backdrop-blur-md border border-white/20 shadow-2xl"
                        >
                            <X size={28} />
                        </button>
                        <motion.img
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            src={enlargedImage}
                            alt="Enlarged view"
                            className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl border border-white/10 cursor-default"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
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



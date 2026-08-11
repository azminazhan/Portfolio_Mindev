import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const Journey = () => {
    const experiences = [
        {
            company: "Ministry of Science, Technology and Innovation (MOSTI)",
            role: "Programmer",
            date: "13 April - Present",
            description: "Developed and supported enterprise systems using PHP, Symfony, and Doctrine ORM, collaborating with department officers during UAT while troubleshooting complex issues and improving database performance.",
            tags: ["PHP", "Symfony", "Doctrine ORM", "UAT", "Debugging", "Database Optimization"],
            color: "shadow-[0_0_20px_rgba(52,211,153,0.2)] border-emerald-400/50"
        },
        {
            company: "Entomo",
            role: "QA Intern",
            date: "September 2025 - December 2025",
            description: "Collaborated cross-functionally within Agile Scrum teams, executing test cases across DEV, UAT, and LIVE environments to ensure software quality and system stability, while supporting post-release production issues and stakeholder discussions.",
            tags: ["Jira", "Firebase", "Antigravity", "Excel", "Base44"],
            color: "shadow-[0_0_20px_rgba(249,115,22,0.2)] border-orange-500/50"
        },
        {
            company: "UiTM Shah Alam",
            role: "Bachelor of Information Systems (Hons.) Intelligent Systems Engineering",
            date: "October 2022 â€“ December 2025",
            description: "Built a strong foundation in intelligent systems through AI, software development, and data-driven projects at UiTM.",
            tags: ["Machine Learning", "Data", "Programming"],
            color: "shadow-[0_0_20px_rgba(6,182,212,0.2)] border-cyan-500/50"
        }
    ];

    const containerRef = useRef(null);

    return (
        <section id="journey" className="relative py-12 md:py-24" ref={containerRef}>
            <div className="container mx-auto px-6">
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold text-center text-white"
                    style={{ marginBottom: '40px' }}
                >
                    My <span style={{ color: '#34d399' }}>Journey</span>
                </motion.h3>

                <div className="relative max-w-6xl mx-auto">
                    {/* Central Connecting Line (Straight and Visible) */}
                    <div className="absolute left-1/2 top-4 bottom-4 w-[4px] bg-white/20 -translate-x-1/2 rounded-full"></div>
                    <div className="absolute left-1/2 top-4 bottom-4 w-[2px] bg-[#34d399] -translate-x-1/2 shadow-[0_0_20px_#34d399]"></div>

                    <div className="flex flex-col gap-12 md:gap-24">
                        {experiences.map((exp, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <div key={index} className={`flex items-center justify-between w-full relative ${isEven ? 'md:flex-row-reverse' : 'flex-col md:flex-row'}`}>

                                    {/* Empty Side (Desktop) */}
                                    <div className="hidden md:block w-5/12" />

                                    {/* Central Node */}
                                    <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
                                        <div className="w-8 h-8 bg-black border-4 border-[#34d399] rounded-full relative shadow-[0_0_20px_#34d399]">
                                            <div className="absolute inset-0 bg-white rounded-full scale-50"></div>
                                        </div>
                                    </div>

                                    {/* Card Container */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.5, delay: 0.1 }}
                                        className={`w-full md:w-5/12 relative ${isEven ? 'md:pl-10' : 'md:pr-10'} z-10 hover:z-50`}
                                    >

                                        {/* Straight Connection Line */}
                                        <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-[4px] bg-[#34d399] w-10 z-0 ${isEven ? 'left-0' : 'right-0'}`}></div>

                                        {/* Card Box (High Visibility with MORE PADDING p-12) */}
                                        <div className={`relative rounded-2xl bg-white/10 backdrop-blur-md border hover:scale-[1.02] transition-transform duration-300 ${exp.color} hover:bg-white/15`} style={{ padding: '20px' }}>
                                            <h4 className="text-2xl font-bold text-white mb-2">{exp.company}</h4>

                                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                                <span className="text-sm font-bold uppercase tracking-wider text-[#34d399]">{exp.role}</span>
                                                <span className="text-xs text-white/80 bg-white/10 px-3 py-1 rounded-full">{exp.date}</span>
                                            </div>

                                            <p className="text-gray-300 text-sm leading-relaxed mb-6 font-medium">
                                                {exp.description}
                                            </p>

                                            <div className="flex flex-wrap gap-2">
                                                {exp.tags.map((tag, t) => (
                                                    <span key={t} className="text-xs font-bold text-white bg-[#34d399]/20 border border-[#34d399]/30 px-3 py-1 rounded-md">
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Journey;

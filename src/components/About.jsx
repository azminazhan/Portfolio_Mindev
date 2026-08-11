import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Wrench, Terminal, Cloud, Sparkles, FileText } from 'lucide-react';
// import profileImg from '../assets/profile-placeholder.jpg'; // Placeholder removed
import profileImg from '../assets/profile.jpg';

const About = () => {
    const skills = [
        { category: "Programming Languages", icon: Code, items: ["PHP", "JavaScript", "Python", "C++", "SQL", "PL/SQL"] },
        { category: "Frameworks & Data", icon: Database, items: ["Symfony", "Doctrine ORM", "Oracle", "Firebase"] },
        { category: "Tools & Software", icon: Wrench, items: ["Jira", "Power BI", "Figma", "Microsoft Office"] },
        { category: "Development Tools", icon: Terminal, items: ["VS Code", "AI Code Analysis", "Git"] },
        { category: "Quality & Delivery", icon: Cloud, items: ["UAT", "Feature Testing", "Debugging", "Database Optimization"] },
        { category: "Other", icon: Sparkles, items: ["Machine Learning", "Data Analytics", "Video Editing"] }
    ];

    return (
        <section id="about" className="section bg-[#071116]/55 relative">
            <div className="container">
                {/* Intro Section */}
                <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
                    {/* Profile Image (Placeholder) */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden border-2 border-white/10 shrink-0"
                    >
                        <img src={profileImg} alt="Profile" className="w-full h-full object-cover object-top" />
                    </motion.div>

                    {/* Bio Text */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-center md:text-left"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            I am <span className="text-primary">Azmin Azhan</span>, a Programmer building reliable enterprise software and intuitive digital experiences.
                        </h2>

                        <p className="text-gray-400 mb-6 leading-relaxed">
                            At the Ministry of Science, Technology and Innovation (MOSTI), I develop enterprise interfaces with PHP and Symfony, support UAT with department officers, troubleshoot complex system issues, and improve database performance with Doctrine ORM. I hold a Bachelor of Information Systems (Hons.) in Intelligent Systems Engineering and care about clear communication, dependable delivery, and software that remains useful after launch.
                        </p>

                        <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-7">
                            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300">Based in Malaysia</span>
                            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300">Remote-friendly</span>
                            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300">English & Bahasa Melayu</span>
                            <a href="mailto:mazminazhan@gmail.com?subject=Resume%20Request" className="rounded-full border border-[#34d399]/30 bg-[#34d399]/10 px-4 py-2 text-sm text-[#34d399] hover:bg-[#34d399]/20 transition-colors inline-flex items-center gap-2">
                                <FileText size={15} /> Request resume
                            </a>
                        </div>



                        {/* Social Icons */}
                        {/* Skills Grid */}
                        <div className="flex flex-wrap gap-3 justify-center md:justify-start" style={{ marginTop: '20px' }}>
                            {skills.flatMap(s => s.items).map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    className="text-sm rounded-full bg-white/10 backdrop-blur-xl border border-white/50 text-white shadow-lg hover:bg-white/20 hover:scale-105 transition-all cursor-default whitespace-nowrap flex-shrink-0 min-w-max"
                                    style={{ padding: '1px 5px' }}
                                >
                                    {item}
                                </motion.div>
                            ))}
                        </div>


                    </motion.div>
                </div>


            </div>
        </section>
    );
};

export default About;


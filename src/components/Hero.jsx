import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Code2, MapPin, ShieldCheck } from 'lucide-react';

const strengths = [
    { icon: Code2, title: 'Enterprise development', text: 'Scalable PHP and Symfony interfaces shaped around real operational needs.' },
    { icon: BarChart3, title: 'Reliable data operations', text: 'Doctrine ORM mappings and queries optimized for integrity under load.' },
    { icon: ShieldCheck, title: 'Quality built in', text: 'Hands-on UAT, debugging, and stakeholder validation from build to release.' }
];

const Hero = () => (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-32 pb-20">
        <div className="container relative z-10">
            <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-20 items-center">
                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                    <div className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#34d399] mb-7">
                        <span className="w-8 h-px bg-[#34d399]" /> Mindev · Programmer & systems developer
                    </div>
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.04em] leading-[0.98] text-white max-w-4xl">
                        Build smarter.<br /><span className="gradient-text">Launch with confidence.</span>
                    </h1>
                    <p className="mt-7 text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl">
                        I’m Azmin, a Programmer at MOSTI building dependable enterprise interfaces, improving database performance, and helping teams take software confidently from testing to release.
                    </p>

                    <div className="mt-9 flex flex-col sm:flex-row gap-4">
                        <a href="#contact" className="btn btn-primary">Discuss your project <ArrowRight size={18} /></a>
                        <a href="#projects" className="btn btn-outline">See selected work</a>
                    </div>

                    <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-400">
                        <span className="inline-flex items-center gap-2"><span className="availability-dot" /> Available for freelance work</span>
                        <span className="inline-flex items-center gap-2"><MapPin size={15} className="text-[#34d399]" /> Malaysia · Remote-friendly</span>
                    </div>
                </motion.div>

                <motion.aside
                    initial={{ opacity: 0, x: 28 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.15 }}
                    className="hero-panel"
                >
                    <div className="flex items-center justify-between mb-7">
                        <div><p className="text-xs uppercase tracking-[0.2em] text-slate-500">Working style</p><h2 className="text-2xl font-bold mt-2">Practical from day one.</h2></div>
                        <span className="text-xs rounded-full border border-[#34d399]/25 bg-[#34d399]/10 px-3 py-1.5 text-[#34d399] whitespace-nowrap">Open to projects</span> 
                    </div>
                    <div className="space-y-3">
                        {strengths.map((strength) => {
                            const StrengthIcon = strength.icon;
                            return (
                                <div key={strength.title} className="strength-row">
                                    <div className="strength-icon"><StrengthIcon size={20} /></div>
                                    <div><h3 className="font-semibold text-white">{strength.title}</h3><p className="text-sm text-slate-400 mt-1 leading-relaxed">{strength.text}</p></div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="grid grid-cols-3 gap-3 mt-6">
                        <div className="metric-card"><strong>4</strong><span>Featured projects</span></div>
                        <div className="metric-card"><strong>4</strong><span>Service areas</span></div>
                        <div className="metric-card"><strong>1–2d</strong><span>Typical reply</span></div>
                    </div>
                </motion.aside>
            </div>
        </div>
    </section>
);

export default Hero;

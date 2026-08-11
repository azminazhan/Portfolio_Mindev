import React from 'react';
import { motion } from 'framer-motion';
import { AppWindow, Database, BarChart3, ShieldCheck } from 'lucide-react';

const services = [
    { icon: AppWindow, title: 'Web Apps & Portals', description: 'Responsive interfaces and enterprise workflows built with maintainable, scalable foundations.', deliverables: ['Responsive UI', 'PHP & Symfony', 'System integration'] },
    { icon: Database, title: 'Backend & Data Systems', description: 'Reliable data-backed applications with efficient queries, sound entity mappings, and transactional integrity.', deliverables: ['Doctrine ORM', 'Query optimization', 'Database design'] },
    { icon: BarChart3, title: 'Dashboards & AI Prototypes', description: 'Clear dashboards and focused machine-learning prototypes that turn data into useful decisions.', deliverables: ['Power BI', 'Data analysis', 'ML prototypes'] },
    { icon: ShieldCheck, title: 'UAT & Product Quality', description: 'Structured feature testing, stakeholder-led acceptance sessions, and focused debugging before release.', deliverables: ['UAT support', 'Root-cause analysis', 'Release validation'] }
];

const Services = () => (
    <section id="services" className="section bg-[#0b1b21]/45">
        <div className="container">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mb-14">
                <p className="text-[#34d399] font-mono uppercase tracking-[0.25em] text-sm mb-4">How I can help</p>
                <h2 className="text-4xl md:text-5xl font-bold mb-5">Freelance services built around real outcomes.</h2>
                <p className="text-gray-400 text-lg leading-relaxed">I bring enterprise development experience to teams that need a dependable digital product, efficient data operations, or an extra quality check before launch.</p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-6">
                {services.map((service, index) => {
                    const Icon = service.icon;
                    return (
                        <motion.article key={service.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="glass-card">
                            <div className="w-12 h-12 rounded-xl bg-[#34d399]/10 border border-[#34d399]/20 flex items-center justify-center text-[#34d399] mb-6"><Icon size={24} /></div>
                            <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                            <p className="text-gray-400 leading-relaxed mb-6">{service.description}</p>
                            <div className="flex flex-wrap gap-2">{service.deliverables.map((item) => <span key={item} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">{item}</span>)}</div>
                        </motion.article>
                    );
                })}
            </div>
            <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 rounded-2xl border border-[#34d399]/20 bg-[#34d399]/5 p-6">
                <div><p className="font-bold text-white">Have something different in mind?</p><p className="text-gray-400 text-sm mt-1">Tell me the goal and I'll suggest a practical scope.</p></div>
                <a href="#contact" className="btn btn-primary whitespace-nowrap">Get a free project estimate</a>
            </div>
        </div>
    </section>
);

export default Services;


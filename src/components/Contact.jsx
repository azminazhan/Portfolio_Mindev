import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Send, MapPin, Clock3 } from 'lucide-react';

const Contact = () => {
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSending, setIsSending] = useState(false);

    const onSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        setIsSending(true);
        setStatus({ type: '', message: '' });

        try {
            const formData = new FormData(form);
            formData.append('access_key', 'fd54a48d-cf5e-4a31-acc4-772f2e84109b');
            formData.append('subject', 'New freelance enquiry from Mindev');

            const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
            const data = await response.json();

            if (!response.ok || !data.success) throw new Error(data.message || 'Unable to send your message.');

            setStatus({ type: 'success', message: 'Your project enquiry was sent. I\'ll reply as soon as I can.' });
            form.reset();
        } catch (error) {
            setStatus({ type: 'error', message: error.message || 'Something went wrong. Please email me directly.' });
        } finally {
            setIsSending(false);
        }
    };

    return (
        <section id="contact" className="section">
            <div className="container">
                <div className="grid md:grid-cols-2 gap-12 items-start">
                    <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                        <p className="text-[#34d399] font-mono uppercase tracking-[0.25em] text-sm mb-4">Start a project</p>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">Lets build something <span className="gradient-text">useful.</span></h2>
                        <p className="text-gray-400 mb-10 text-lg leading-relaxed">Share what you want to build, who it is for, and your preferred timeline. I'll reply with questions and a practical next step.</p>

                        <div className="space-y-5 mb-10">
                            <a href="mailto:mazminazhan@gmail.com" className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors">
                                <div className="contact-icon"><Mail size={22} /></div>
                                <div><p className="text-sm text-gray-500">Email</p><p className="font-bold text-white break-all">mazminazhan@gmail.com</p></div>
                            </a>
                            <div className="flex items-center gap-4 text-gray-300"><div className="contact-icon"><MapPin size={22} /></div><div><p className="text-sm text-gray-500">Location</p><p className="font-bold text-white">Putrajaya · Available remotely</p></div></div>
                            <div className="flex items-center gap-4 text-gray-300"><div className="contact-icon"><Clock3 size={22} /></div><div><p className="text-sm text-gray-500">Typical response</p><p className="font-bold text-white">Within 1-2 business days</p></div></div>
                        </div>

                        <a href="https://www.linkedin.com/in/muhammad-azmin-77a906362" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-gray-300 hover:text-[#34d399] transition-colors">
                            <div className="contact-icon"><Linkedin size={20} /></div><span className="font-semibold">Connect on LinkedIn</span>
                        </a>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card p-8">
                        <form onSubmit={onSubmit} className="flex flex-col gap-5">
                            <div className="grid sm:grid-cols-2 gap-5">
                                <FormField label="Name" name="name" placeholder="Your name" />
                                <FormField label="Email" name="email" type="email" placeholder="you@company.com" />
                            </div>
                            <div>
                                <label htmlFor="project-type" className="form-label">What do you need?</label>
                                <select id="project-type" name="project_type" required defaultValue="" className="form-control">
                                    <option value="" disabled>Select a service</option>
                                    <option>Web app or portal</option><option>Dashboard or data system</option><option>AI / ML prototype</option><option>QA and product testing</option><option>Something else</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="budget" className="form-label">Estimated budget</label>
                                <select id="budget" name="budget" required defaultValue="" className="form-control">
                                    <option value="" disabled>Select a range</option>
                                    <option>Under RM 1,000</option><option>RM 1,000â€“3,000</option><option>RM 3,000â€“7,000</option><option>RM 7,000+</option><option>Not sure yet</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="message" className="form-label">Project details</label>
                                <textarea id="message" name="message" rows="5" required className="form-control resize-none" placeholder="What are you hoping to build, and when would you like to start?" />
                            </div>
                            <button type="submit" disabled={isSending} className="flex items-center gap-2 justify-center py-3 px-6 rounded-lg font-bold text-black bg-[#34d399] hover:bg-[#34d399]/80 disabled:opacity-60 disabled:cursor-not-allowed transition-all">
                                {isSending ? 'Sendingâ€¦' : 'Request a project estimate'} <Send size={18} />
                            </button>
                            <p className="text-xs text-gray-500 text-center">Your details are used only to reply to this enquiry.</p>
                            {status.message && <p role="status" className={`text-center text-sm font-medium ${status.type === 'success' ? 'text-[#34d399]' : 'text-red-400'}`}>{status.message}</p>}
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const FormField = ({ label, name, type = 'text', placeholder }) => (
    <div><label htmlFor={name} className="form-label">{label}</label><input id={name} type={type} name={name} required className="form-control" placeholder={placeholder} /></div>
);

export default Contact;



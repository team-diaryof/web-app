"use client"

import { Phone, MapPin, MessageCircle, Mail, ArrowRight, AlertTriangle, Send, Check } from 'lucide-react';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import Input from '@/components/ui/input';
import { cn } from '@/lib/cn';
import TextArea from '@/components/ui/text-area';
import Select from '@/components/ui/select';
import AnimatePageWrapper from '@/components/animations/animate-page-wrapper';
import Button from '@/components/ui/button';
import Loading from '@/components/ui/loading';
import dynamic from 'next/dynamic';
import FaqSection from '@/components/sections/landing-page/faq-section';

const Map = dynamic(() => import("@/components/ui/map"), { 
  ssr: false,
  loading: () => <div className="w-full h-[400px] bg-zinc-100 animate-pulse rounded-[2.5rem]" />
});

// --- Components ---

interface InfoItemProps {
  icon: React.ComponentType<{ size: number; strokeWidth?: number; className?: string }>;
  title: string;
  content: string;
  action?: string;
}

const InfoItem = ({ icon: Icon, title, content, action }: InfoItemProps) => (
  <div className="flex gap-5 items-start group">
    <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-100 dark:border-zinc-800 group-hover:border-zinc-300 dark:group-hover:border-zinc-700 transition-colors duration-300">
      <Icon size={22} strokeWidth={1.5} />
    </div>
    <div className="pt-1">
      <h4 className="font-semibold text-zinc-900 dark:text-white mb-1.5 text-lg">{title}</h4>
      <p className="text-zinc-500 text-sm leading-relaxed mb-3 max-w-xs">{content}</p>
      {action && (
        <a href="#" className="text-xs font-bold uppercase tracking-widest text-zinc-900 dark:text-white hover:text-zinc-600 dark:hover:text-zinc-400 flex items-center gap-2 transition-colors group/link">
          {action} <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
        </a>
      )}
    </div>
  </div>
)

// --- Page Component ---

const ContactSection = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: 'general',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    try {
      await axios.post('/api/v1/contact', formData);
      setFormStatus('success');
      setFormData({ name: '', email: '', interest: 'general', phone: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 3000);
    } catch (error) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  return (
    <AnimatePageWrapper className="min-h-screen">
      
      {/* Simple Page Fade In */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-[1400px] mx-auto px-6 pt-32 pb-20"
      >
        
        {/* Header */}
        <div className="mb-24 text-center md:text-left">
             <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter text-zinc-900 dark:text-white leading-[1.05]">
                Get in touch.
            </h2>
            <p className="text-zinc-500 text-lg md:text-xl max-w-xl leading-relaxed">
                We&apos;d love to hear from you. Please fill out this form or shoot us an email directly.
            </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 mb-32">
          
          {/* LEFT: Contact Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                    <Input 
                        label="Name" name="name" placeholder="John Doe" required 
                        value={formData.name} onChange={handleChange}
                        className="bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
                    />
                    <Input 
                        label="Email Address" type="email" name="email" placeholder="john@example.com" required 
                        value={formData.email} onChange={handleChange}
                        className="bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <Select
                        label="Interested In" name="interest"
                        options={[
                            { label: "General Inquiry", value: "general" },
                            { label: "Support", value: "support" },
                            { label: "Feedback", value: "feedback" },
                            { label: "Partnership", value: "partnership" }
                        ]}
                        placeholder="Select a topic"
                        value={formData.interest}
                        className="bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
                    />
                    <Input 
                        label="Phone Number" type="tel" name="phone" placeholder="+1 (555) 000-0000" 
                        value={formData.phone} onChange={handleChange}
                        className="bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
                    />
                </div>

                <TextArea 
                    label="Message" name="message" placeholder="Tell us how we can help..." required 
                    className="min-h-[180px] bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 resize-none" 
                    value={formData.message} onChange={handleChange}
                />

                <Button
                    disabled={formStatus === 'submitting' || formStatus === 'success'}
                    className={cn(
                    "relative overflow-hidden h-14 w-48 font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 rounded-full",
                    formStatus === 'success' ? "bg-emerald-500 text-white hover:bg-emerald-600" : 
                    formStatus === 'error' ? "bg-red-500 text-white hover:bg-red-600" : 
                    "bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                    )}
                >
                    <AnimatePresence mode="wait">
                    {formStatus === 'idle' && (
                        <motion.div key="idle" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-2">
                            <span>Send Message</span>
                            <Send size={18} />
                        </motion.div>
                    )}
                    {formStatus === 'submitting' && (
                        <motion.div key="submitting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <Loading dark={false} size='sm' className="text-white dark:text-black" />
                        </motion.div>
                    )}
                    {formStatus === 'success' && (
                        <motion.div key="success" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2">
                            <span>Sent!</span>
                            <Check size={18} />
                        </motion.div>
                    )}
                    {formStatus === 'error' && (
                        <motion.div key="error" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2">
                            <span>Failed</span>
                            <AlertTriangle size={18} />
                        </motion.div>
                    )}
                    </AnimatePresence>
                </Button>
            </form>
          </div>

           {/* RIGHT: Contact Info */}
          <div className="lg:col-span-5 lg:pl-12 lg:border-l border-zinc-100 dark:border-zinc-900 space-y-12">
                <InfoItem icon={Phone} title="Call Us" content="Mon-Fri from 8am to 5pm." action="+1 (555) 000-0000" />
                <InfoItem icon={MapPin} title="Visit Us" content="Come say hello at our office HQ." action="View on Google Maps" />
                <InfoItem icon={MessageCircle} title="Live Chat" content="Our friendly team is here to help." action="Start Chat" />
                <InfoItem icon={Mail} title="Email Support" content="Prefer to email? No problem." action="support@thediary.com" />
          </div>
        </div>

        {/* FAQ SECTION */}
        <div className="border-t border-zinc-100 dark:border-zinc-900">
            <FaqSection />
        </div>

      </motion.div>
    </AnimatePageWrapper>
  )
}

export default ContactSection
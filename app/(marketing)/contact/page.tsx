"use client"

import { Phone, MapPin, MessageCircle, Send, Check, Plus, Minus, Mail, ArrowRight, AlertTriangle } from 'lucide-react';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import Input from '@/components/ui/input';
import { cn } from '@/lib/cn';
import TextArea from '@/components/ui/text-area';
import Select from '@/components/ui/select';
import { staggerContainer } from '@/lib/animations';
import AnimatePageWrapper from '@/components/animations/animate-page-wrapper';
import Button from '@/components/ui/button';
import Loading from '@/components/ui/loading';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import("@/components/ui/map"), { 
  ssr: false,
  loading: () => <div className="w-full h-[400px] bg-zinc-100 animate-pulse rounded-3xl" />
});

interface InfoItemProps {
  icon: React.ComponentType<{ size: number; strokeWidth?: number }>;
  title: string;
  content: string;
  action?: string;
}

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const InfoItem = ({ icon: Icon, title, content, action }: InfoItemProps) => (
  <div className="flex gap-4 items-start group">
    <div className="p-3 rounded-xl bg-zinc-50 text-zinc-900 group-hover:bg-zinc-900 group-hover:text-white transition-colors duration-300">
      <Icon size={20} strokeWidth={2} />
    </div>
    <div>
      <h4 className="font-semibold text-zinc-900 mb-1">{title}</h4>
      <p className="text-zinc-500 text-sm leading-relaxed mb-2">{content}</p>
      {action && (
        <a href="#" className="text-xs font-bold uppercase tracking-wider text-zinc-900 hover:text-zinc-600 flex items-center gap-1 transition-colors">
          {action} <ArrowRight size={12} />
        </a>
      )}
    </div>
  </div>
)

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => (
  <motion.div
    initial={false}
    className="border-b border-zinc-100 last:border-none"
  >
    <button
      onClick={onClick}
      className="flex items-center justify-between w-full py-6 text-left focus:outline-none group"
    >
      <span className={cn("text-lg font-medium transition-colors", isOpen ? "text-zinc-900" : "text-zinc-600 group-hover:text-zinc-900")}>
        {question}
      </span>
      <div className={cn("p-2 rounded-full transition-colors", isOpen ? "bg-zinc-100 text-zinc-900" : "bg-zinc-50 text-zinc-400")}>
        {isOpen ? <Minus size={16} /> : <Plus size={16} />}
      </div>
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="content"
          initial="collapsed"
          animate="open"
          exit="collapsed"
          variants={{
            open: { opacity: 1, height: "auto", marginBottom: 24 },
            collapsed: { opacity: 0, height: 0, marginBottom: 0 }
          }}
        >
          <div className="text-zinc-500 leading-relaxed pr-8 overflow-hidden">
            {answer}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
)


const ContactSection = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    interest: string;
    phone: string;
    message: string;
  }>({
    name: '',
    email: '',
    interest: 'general',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev: typeof formData) => ({ ...prev, [e.target.name]: e.target.value }));
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
      console.error(error);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  const faqs = [
    {
      q: "Can I export my data?",
      a: "Absolutely. We believe your data belongs to you. You can export your entire journal history to PDF or JSON formats at any time from your settings panel."
    },
    {
      q: "Is the app available on iOS?",
      a: "Currently, we are focusing on polishing the Android experience. An iOS version is in our roadmap for late 2024. Join our newsletter to get notified!"
    },
    {
      q: "How secure is my data?",
      a: "We use end-to-end encryption for cloud sync. Your entries are encrypted on your device before they ever touch our servers. Only you have the key."
    }
  ];

  return (
    <AnimatePageWrapper className="py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-20 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">
            Get in touch
          </h2>
          <p className="text-zinc-500 text-lg max-w-xl">
            We&apos;d love to hear from you. Please fill out this form or shoot us an email.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 mb-32">
          {/* LEFT: Contact Form */}
          <motion.div
            className="lg:col-span-7"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <Input 
                  label="Name" 
                  name="name" 
                  placeholder="John Doe" 
                  required 
                  value={formData.name}
                  onChange={handleChange}
                />
                <Input 
                  label="Email Address" 
                  type="email" 
                  name="email" 
                  placeholder="john@example.com" 
                  required 
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Note: Ensure your Select component accepts onChange and value */}
                <Select
                  label="Interested In"
                  name="interest"
                  options={[
                    { label: "General Inquiry", value: "general" },
                    { label: "Support", value: "support" },
                    { label: "Feedback", value: "feedback" },
                    { label: "Partnership", value: "partnership" }
                  ]}
                  placeholder="Select a topic"
                  value={formData.interest}
                />
                <Input 
                  label="Phone Number" 
                  type="tel" 
                  name="phone" 
                  placeholder="+1 (555) 000-0000" 
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <TextArea 
                label="Message" 
                name="message" 
                placeholder="Tell us how we can help..." 
                required 
                className="min-h-[150px]" 
                value={formData.message}
                onChange={handleChange}
              />

              <Button
                disabled={formStatus === 'submitting' || formStatus === 'success'}
                className={cn(
                  "relative overflow-hidden w-48 font-bold transition-all duration-300 flex items-center justify-center gap-2",
                  formStatus === 'success'
                    ? "bg-emerald-500 text-white hover:bg-emerald-600"
                    : formStatus === 'error'
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-zinc-900 text-white hover:bg-zinc-800"
                )}
              >
                <AnimatePresence mode="wait">
                  {formStatus === 'idle' && (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2"
                    >
                      <span>Send Message</span>
                      <Send size={18} />
                    </motion.div>
                  )}
                  {formStatus === 'submitting' && (
                    <motion.div
                      key="submitting"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Loading dark={false} size='sm' className="text-white" />
                    </motion.div>
                  )}
                  {formStatus === 'success' && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-2"
                    >
                      <span>Sent!</span>
                      <Check size={18} />
                    </motion.div>
                  )}
                  {formStatus === 'error' && (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-2"
                    >
                      <span>Failed</span>
                      <AlertTriangle size={18} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </form>
          </motion.div>

          {/* ... (Keep Right Contact Info and Map Sections exactly as they were) ... */}
           {/* RIGHT: Contact Info */}
          <div className="lg:col-span-5 space-y-10 lg:pl-10 lg:border-l border-zinc-100">
            <InfoItem
              icon={Phone}
              title="Call Us"
              content="Mon-Fri from 8am to 5pm."
              action="+1 (555) 000-0000"
            />

            <InfoItem
              icon={MapPin}
              title="Visit Us"
              content="Come say hello at our office HQ."
              action="View on Google Maps"
            />
            <InfoItem
              icon={MessageCircle}
              title="Live Chat"
              content="Our friendly team is here to help."
              action="Start Chat"
            />

            <InfoItem
              icon={Mail}
              title="Email Support"
              content="Prefer to email? No problem."
              action="support@thediary.com"
            />
          </div>
        </div>

        {/* MAP SECTION (Custom Leaflet Map) */}
        <div className="w-full h-[400px] bg-zinc-100 rounded-3xl mb-32 relative overflow-hidden shadow-sm border border-zinc-200">
           <Map 
                position={[37.7577, -122.4376]} 
                title="DiaryOf HQ" 
                description="San Francisco, CA" 
                zoom={13} 
            />
        </div>

        {/* FAQ SECTION */}
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <h3 className="text-3xl font-bold text-zinc-900 mb-4 font-serif">Frequently asked questions.</h3>
            <p className="text-zinc-500">Can&apos;t find the answer you&apos;re looking for? Chat to our friendly team.</p>
          </div>
          <div className="md:col-span-8">
            {faqs.map((faq, idx) => (
              <FAQItem
                key={idx}
                question={faq.q}
                answer={faq.a}
                isOpen={openFAQ === idx}
                onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
              />
            ))}
          </div>
        </div>

      </div>
    </AnimatePageWrapper>
  )
}

export default ContactSection
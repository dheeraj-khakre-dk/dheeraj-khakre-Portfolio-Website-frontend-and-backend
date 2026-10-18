import React, { useState } from 'react';
import { PERSONAL_INFO, CONTACT_CHANNELS } from '../data/portfolioData.ts';
import { ContactFormData } from '../types/portfolio.ts';
import { apiService } from '../services/apiService.ts';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await apiService.submitContact(formData);
      setIsSuccess(true);
      setConfirmationMessage(response.confirmation || 'Message recorded in backend database.');

      // Also prepare mailto fallback
      const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
        formData.subject || 'Opportunity Inquiry'
      )}&body=${encodeURIComponent(
        `From: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`
      )}`;
      
      // Reset form after delay
      setTimeout(() => {
        setIsSuccess(false);
        setConfirmationMessage(null);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 6000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit contact message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-14 flex flex-col gap-10" id="contact">
      <div className="flex flex-col gap-2">
        <span className="font-mono text-[11px] text-[#adc6ff] tracking-widest uppercase font-semibold">
          Direct Transmission
        </span>
        <h2 className="text-2xl sm:text-3xl text-[#d4e4fa] font-bold tracking-tight">
          Have an interesting problem to solve?
        </h2>
        <p className="text-[14px] sm:text-[15px] text-[#c2c6d6] max-w-2xl leading-relaxed">
          I am interested in backend engineering opportunities, collaborative systems projects, and practical AI application development. Whether you&apos;re hiring or want to exchange architectural ideas, let&apos;s talk.
        </p>
      </div>

      {/* Dual Pane Contact Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Pane: Direct Channels */}
        <div className="lg:col-span-5 rounded-xl bg-[#122131] border border-[#1c2b3c] p-6 lg:p-8 shadow-md flex flex-col gap-6">
          <h3 className="text-[17px] text-[#d4e4fa] font-bold">
            Direct Contact Channels
          </h3>
          <p className="text-[13.5px] text-[#c2c6d6] leading-relaxed">
            Feel free to reach out directly via email, phone, or connect with me on professional developer networks.
          </p>

          <div className="flex flex-col gap-3.5 pt-1">
            {CONTACT_CHANNELS.map((ch) => (
              <div
                key={ch.label}
                className="flex items-center justify-between p-3 rounded-lg bg-[#0d1c2d] border border-[#1c2b3c] hover:bg-[#1c2b3c] transition-colors group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-[#1c2b3c] border border-[#273647] flex items-center justify-center text-[#adc6ff] shrink-0">
                    <span className="material-symbols-outlined text-[20px]">
                      {ch.icon}
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-mono text-[11px] text-[#8c909f]">
                      {ch.label}:
                    </span>
                    <a
                      href={ch.href}
                      target={ch.href.startsWith('http') ? '_blank' : undefined}
                      rel={ch.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-[13.5px] text-[#d4e4fa] font-medium hover:text-[#adc6ff] transition-colors truncate"
                    >
                      {ch.value}
                    </a>
                  </div>
                </div>

                {ch.copyable && (
                  <button
                    onClick={() => handleCopy(ch.value, ch.label)}
                    className="p-1.5 rounded text-[#8c909f] hover:text-[#adc6ff] hover:bg-[#273647] transition-colors shrink-0"
                    title={`Copy ${ch.label}`}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {copiedKey === ch.label ? 'check' : 'content_copy'}
                    </span>
                  </button>
                )}
              </div>
            ))}

            {/* Quick Recruiter Direct Email */}
            <a
              href={`mailto:${PERSONAL_INFO.email}?subject=Hiring%20Inquiry%20-%20Dheeraj%20Khakre`}
              className="w-full flex items-center justify-center gap-2 p-3 rounded-lg bg-[#adc6ff]/10 hover:bg-[#adc6ff]/20 text-[#adc6ff] font-mono text-[12.5px] font-semibold border border-[#adc6ff]/30 transition-all text-center mt-1"
            >
              <span className="material-symbols-outlined text-[18px]">forward_to_inbox</span>
              <span>Hiring Inquiry: One-Click Email to Dheeraj</span>
            </a>
          </div>
        </div>

        {/* Right Pane: Interactive Form */}
        <div className="lg:col-span-7 rounded-xl bg-[#122131] border border-[#1c2b3c] p-6 lg:p-8 shadow-md flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-[17px] text-[#d4e4fa] font-bold">
              Send a Direct Message
            </h3>
            <span className="font-mono text-[11px] text-[#8c909f] flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-emerald-400">lock</span>
              Secure Gateway
            </span>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="form-name" className="font-mono text-[11.5px] text-[#c2c6d6]">
                  Your Name *
                </label>
                <input
                  id="form-name"
                  type="text"
                  required
                  placeholder="e.g. Alex Mercer"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#0d1c2d] border border-[#1c2b3c] text-[#d4e4fa] text-[14px] placeholder-[#8c909f] focus:outline-none focus:border-[#adc6ff] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="form-email" className="font-mono text-[11.5px] text-[#c2c6d6]">
                  Your Email *
                </label>
                <input
                  id="form-email"
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#0d1c2d] border border-[#1c2b3c] text-[#d4e4fa] text-[14px] placeholder-[#8c909f] focus:outline-none focus:border-[#adc6ff] transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="form-subject" className="font-mono text-[11.5px] text-[#c2c6d6]">
                Subject / Opportunity Type *
              </label>
              <input
                id="form-subject"
                type="text"
                required
                placeholder="e.g. Backend Engineer Role / Architecture Discussion"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-[#0d1c2d] border border-[#1c2b3c] text-[#d4e4fa] text-[14px] placeholder-[#8c909f] focus:outline-none focus:border-[#adc6ff] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="form-message" className="font-mono text-[11.5px] text-[#c2c6d6]">
                Message *
              </label>
              <textarea
                id="form-message"
                required
                rows={4}
                placeholder="Tell me about your team, system challenge, or role details..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-[#0d1c2d] border border-[#1c2b3c] text-[#d4e4fa] text-[14px] placeholder-[#8c909f] focus:outline-none focus:border-[#adc6ff] resize-none transition-colors"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
              <span className="font-mono text-[11px] text-[#8c909f]">
                * All fields required. Prompt responses guaranteed.
              </span>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#adc6ff] text-[#002e6a] text-[13.5px] font-bold hover:bg-[#4d8eff] hover:text-white transition-all shadow-md disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[18px]">
                      progress_activity
                    </span>
                    <span>Transmitting...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <span className="material-symbols-outlined text-[17px]">send</span>
                  </>
                )}
              </button>
            </div>

            {/* Feedback Alert */}
            {isSuccess && (
              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center gap-3 animate-in fade-in">
                <span className="material-symbols-outlined text-[20px] text-emerald-400 shrink-0">
                  check_circle
                </span>
                <span className="text-[13px]">
                  {confirmationMessage || 'Message successfully logged into backend database repository and forwarded to Dheeraj Khakre.'}
                </span>
              </div>
            )}

            {errorMessage && (
              <div className="p-4 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 flex items-center gap-3 animate-in fade-in">
                <span className="material-symbols-outlined text-[20px] text-rose-400 shrink-0">
                  error
                </span>
                <span className="text-[13px]">
                  {errorMessage}
                </span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

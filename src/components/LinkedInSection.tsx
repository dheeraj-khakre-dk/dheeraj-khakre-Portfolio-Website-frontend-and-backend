import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';

export const LinkedInSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.linkedinUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="py-12" id="linkedin">
      <div className="w-full rounded-2xl bg-gradient-to-br from-[#0c2340] via-[#122131] to-[#0d1c2d] border border-[#0a66c2]/40 p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#0a66c2]/15 blur-[100px]"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Column: Brand & Description */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0a66c2]/20 border border-[#0a66c2]/40 text-[#adc6ff] font-mono text-[11px] font-semibold uppercase tracking-wider w-fit">
              <svg className="w-3.5 h-3.5 fill-[#0a66c2]" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <span>Verified Professional Network</span>
            </div>

            <h2 className="text-2xl sm:text-3xl text-white font-bold tracking-tight">
              Connect with Dheeraj Khakre on LinkedIn
            </h2>

            <p className="text-[14.5px] sm:text-[15.5px] text-[#c2c6d6] leading-relaxed">
              Let&apos;s expand our network. Follow regular insights on scalable Java backend engineering, high-throughput microservices, Apache Kafka event streaming, and practical AI agent integrations. Open for technical conversations and recruitment inquiries.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* Primary Open in New Tab Button */}
              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[#0a66c2] text-white text-[14px] font-bold hover:bg-[#004182] transition-all shadow-lg hover:shadow-[#0a66c2]/30 hover:-translate-y-0.5"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span>View Full Profile on LinkedIn</span>
                <span className="material-symbols-outlined text-[18px]">open_in_new</span>
              </a>

              {/* Copy URL Button */}
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#1c2b3c] border border-[#273647] text-[#d4e4fa] hover:text-[#adc6ff] hover:bg-[#273647] text-[13.5px] font-medium transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {copied ? 'check' : 'content_copy'}
                </span>
                <span>{copied ? 'Link Copied!' : 'Copy Profile URL'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: LinkedIn Profile Badge Mockup */}
          <div className="lg:col-span-5">
            <div className="rounded-xl bg-[#091522] border border-[#1c2b3c] p-6 flex flex-col gap-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#0a66c2] flex items-center justify-center font-bold text-white text-[16px] shadow-md border-2 border-[#adc6ff]/40">
                    DK
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[16px] font-bold text-white flex items-center gap-1.5">
                      {PERSONAL_INFO.fullName}
                      <span className="material-symbols-outlined text-[16px] text-[#0a66c2]" title="Verified">
                        verified
                      </span>
                    </span>
                    <span className="text-[12px] text-[#adc6ff]">
                      Software Engineer @ ITC Infotech
                    </span>
                  </div>
                </div>

                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#1c2b3c] text-[#8c909f] border border-[#273647]">
                  500+ Connections
                </span>
              </div>

              <p className="text-[12.5px] text-[#c2c6d6] leading-relaxed line-clamp-3">
                Java Backend Developer | Java | Spring Boot | Microservices | Kafka | AWS | Docker | Kubernetes | Angular | GenAI &amp; LLM Integration.
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-[#1c2b3c] text-[12px] font-mono">
                <span className="text-[#8c909f] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-[#adc6ff]">location_on</span>
                  Bengaluru, Karnataka, India
                </span>
                <a
                  href={PERSONAL_INFO.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#adc6ff] hover:underline font-semibold flex items-center gap-1"
                >
                  <span>Connect</span>
                  <span className="material-symbols-outlined text-[14px]">north_east</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

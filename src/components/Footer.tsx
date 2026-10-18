import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';

interface FooterProps {
  onOpenResumeModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResumeModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#010f1f] border-t border-[#1c2b3c] mt-16 shadow-[0_-1px_12px_rgba(0,0,0,0.3)]">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 py-10 flex flex-col gap-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="flex flex-col gap-2 max-w-md">
            <div className="flex items-center gap-2.5">
              <span className="bg-[#1c2b3c] px-2.5 py-1 rounded font-mono text-[11px] font-bold text-[#d4e4fa] tracking-wider border border-[#273647]">
                {PERSONAL_INFO.initials}
              </span>
              <span className="text-[17px] text-[#d4e4fa] font-bold">
                {PERSONAL_INFO.fullName}
              </span>
            </div>
            <p className="text-[13px] text-[#8c909f] leading-relaxed">
              Building Scalable Backend Systems. Exploring the Future of AI &amp; Agentic Architectures.
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-5 text-[13.5px]">
            <a href="#about" className="text-[#8c909f] hover:text-[#adc6ff] transition-colors">
              About
            </a>
            <a href="#skills" className="text-[#8c909f] hover:text-[#adc6ff] transition-colors">
              Skills
            </a>
            <a href="#projects" className="text-[#8c909f] hover:text-[#adc6ff] transition-colors">
              Projects
            </a>
            <a href="#experience" className="text-[#8c909f] hover:text-[#adc6ff] transition-colors">
              Experience
            </a>
            <a href="#contact" className="text-[#8c909f] hover:text-[#adc6ff] transition-colors">
              Contact
            </a>
            <button
              onClick={onOpenResumeModal}
              className="text-[#8c909f] hover:text-[#adc6ff] transition-colors"
            >
              Resume
            </button>
          </nav>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-[#1c2b3c]/60">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11.5px] text-[#8c909f]">
              &copy; {new Date().getFullYear()} {PERSONAL_INFO.fullName}. All rights reserved.
            </span>
            <div className="flex items-center gap-1.5">
              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Source Repositories"
                className="p-1.5 text-[#8c909f] hover:text-[#adc6ff] transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">code</span>
              </a>
              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Professional Network"
                className="p-1.5 text-[#8c909f] hover:text-[#adc6ff] transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">hub</span>
              </a>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 font-mono text-[11.5px] text-[#8c909f] hover:text-[#adc6ff] transition-colors py-1 px-3 rounded-lg hover:bg-[#1c2b3c]"
          >
            <span className="uppercase tracking-wider">Back to Top</span>
            <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

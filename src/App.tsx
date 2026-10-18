/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { SkillsSection } from './components/SkillsSection.tsx';
import { ProjectsSection } from './components/ProjectsSection.tsx';
import { LinkedInSection } from './components/LinkedInSection.tsx';
import { AngularShowcaseSection } from './components/AngularShowcaseSection.tsx';
import { ExperienceSection } from './components/ExperienceSection.tsx';
import { EducationSection } from './components/EducationSection.tsx';
import { WhatsNextSection } from './components/WhatsNextSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';
import { ResumeModal } from './components/ResumeModal.tsx';
import { BackendArchitectureModal } from './components/BackendArchitectureModal.tsx';
import { generateResumePdf } from './services/resumePdfService.ts';

export default function App() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isBackendModalOpen, setIsBackendModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleDownloadResume = () => {
    try {
      generateResumePdf();
      setToastMessage('Dheeraj_Khakre_Resume.pdf generated and download initiated!');
      setTimeout(() => setToastMessage(null), 4500);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
      setIsResumeModalOpen(true);
    }
  };

  return (
    <div className="bg-[#051424] text-[#d4e4fa] min-h-screen flex flex-col justify-between selection:bg-[#adc6ff] selection:text-[#002e6a] relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-[#1c2b3c] border border-[#adc6ff]/40 text-[#d4e4fa] px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3">
            <span className="material-symbols-outlined text-[#adc6ff] text-[22px]">
              download_done
            </span>
            <div className="flex flex-col text-left">
              <span className="text-[13px] font-bold text-[#adc6ff]">
                Resume Download Triggered
              </span>
              <span className="font-mono text-[11px] text-[#c2c6d6]">
                {toastMessage}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <Navbar
        onDownloadResume={handleDownloadResume}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
        onOpenBackendModal={() => setIsBackendModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="w-full pt-16 flex-1">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
          {/* Subtle Ambient Background Orbs */}
          <div className="relative w-full">
            <div className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#4d8eff]/10 blur-[130px]"></div>
            <div className="pointer-events-none absolute top-80 -right-40 w-[30rem] h-[30rem] rounded-full bg-[#571bc1]/10 blur-[150px]"></div>

            <HeroSection
              onDownloadResume={handleDownloadResume}
              onOpenResumeModal={() => setIsResumeModalOpen(true)}
            />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <LinkedInSection />
            <AngularShowcaseSection />
            <ExperienceSection />
            <EducationSection />
            <WhatsNextSection />
            <ContactSection />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer onOpenResumeModal={() => setIsResumeModalOpen(true)} />

      {/* In-App Resume Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        onDownloadPdf={handleDownloadResume}
      />

      {/* Backend & Architecture Modal */}
      <BackendArchitectureModal
        isOpen={isBackendModalOpen}
        onClose={() => setIsBackendModalOpen(false)}
      />
    </div>
  );
}

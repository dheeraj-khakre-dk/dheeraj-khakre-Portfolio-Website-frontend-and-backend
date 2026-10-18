import React, { useState, useEffect } from 'react';
import { PROJECTS_DATA, PERSONAL_INFO } from '../data/portfolioData.ts';
import { ProjectItem } from '../types/portfolio.ts';
import { ProjectSpecsModal } from './ProjectSpecsModal.tsx';
import { apiService } from '../services/apiService.ts';

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [projects, setProjects] = useState<ProjectItem[]>(PROJECTS_DATA);

  useEffect(() => {
    apiService.getProjects().then((data) => {
      if (data && data.length > 0) {
        setProjects(data);
      }
    }).catch(() => {});
  }, []);

  return (
    <section className="py-14 flex flex-col gap-10" id="projects">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[11px] text-[#adc6ff] tracking-widest uppercase font-semibold">
            Verified Work &amp; Repositories
          </span>
          <h2 className="text-2xl sm:text-3xl text-[#d4e4fa] font-bold tracking-tight">
            Featured Systems &amp; Architectures
          </h2>
          <p className="text-[14px] sm:text-[15px] text-[#c2c6d6] max-w-2xl">
            Real production codebases and repositories from{' '}
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#adc6ff] hover:underline font-mono"
            >
              github.com/Dheeraj-Khakre
            </a>{' '}
            showcasing backend reliability, document intelligence, microservices, and security automation.
          </p>
        </div>

        <a
          href={PERSONAL_INFO.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#122131] border border-[#1c2b3c] hover:bg-[#1c2b3c] text-[#adc6ff] font-mono text-[13px] transition-colors shrink-0"
        >
          <span>View All on GitHub</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </a>
      </div>

      {/* Projects List */}
      <div className="flex flex-col gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="rounded-xl bg-[#122131] border border-[#1c2b3c] p-6 lg:p-8 flex flex-col gap-6 shadow-md hover:border-[#273647] transition-all"
          >
            {/* Top Bar of Project Card */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`px-3 py-1 rounded text-[11px] font-mono font-semibold tracking-wide ${project.categoryClass}`}
                >
                  {project.categoryTag}
                </span>
                <span className="font-mono text-[12px] text-[#8c909f]">
                  [ {project.subtitle} ]
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="px-3.5 py-1.5 rounded-lg bg-[#1c2b3c] hover:bg-[#273647] text-[#d4e4fa] font-mono text-[12px] transition-colors flex items-center gap-1.5 border border-[#273647]"
                >
                  <span className="material-symbols-outlined text-[16px]">visibility</span>
                  <span>Quick Specs</span>
                </button>
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-[#adc6ff]/15 hover:bg-[#adc6ff]/25 text-[#adc6ff] font-mono text-[12px] font-semibold transition-colors flex items-center gap-1.5 border border-[#adc6ff]/30"
                >
                  <span className="material-symbols-outlined text-[16px]">code</span>
                  <span>View on GitHub</span>
                  <span className="material-symbols-outlined text-[13px]">north_east</span>
                </a>
              </div>
            </div>

            {/* Content & Diagram Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Story, Problem & Solution */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <h3 className="text-xl sm:text-2xl text-[#d4e4fa] font-bold">
                  {project.title}
                </h3>
                <p className="text-[14px] sm:text-[15px] text-[#c2c6d6] leading-relaxed">
                  {project.description}
                </p>

                {/* Challenge & Solution Block */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="p-4 rounded-lg bg-[#0d1c2d] border border-[#1c2b3c] flex flex-col gap-1.5">
                    <span className="font-mono text-[11px] text-[#adc6ff] uppercase font-bold tracking-wider">
                      The Challenge
                    </span>
                    <p className="text-[13px] text-[#c2c6d6] leading-snug">
                      {project.challenge}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-[#0d1c2d] border border-[#1c2b3c] flex flex-col gap-1.5">
                    <span className="font-mono text-[11px] text-[#d0bcff] uppercase font-bold tracking-wider">
                      The Solution
                    </span>
                    <p className="text-[13px] text-[#c2c6d6] leading-snug">
                      {project.solution}
                    </p>
                  </div>
                </div>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-[#1c2b3c] border border-[#273647] font-mono text-[11.5px] text-[#d4e4fa]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Architectural Visualization */}
              <div className="lg:col-span-5 rounded-xl bg-[#010f1f] border border-[#1c2b3c] p-5 flex flex-col gap-3 font-mono text-[12px] text-[#c2c6d6] shadow-inner">
                {/* Visualizer header */}
                {project.diagramType === 'pipeline' && (
                  <>
                    <div className="flex items-center justify-between pb-2 bg-[#0d1c2d] px-3 py-1.5 rounded border border-[#1c2b3c]">
                      <span className="font-mono text-[11px] text-[#adc6ff] font-bold">
                        INGESTION &amp; OCR ENGINE
                      </span>
                      <span className="text-[10px] text-[#8c909f]">PDF &gt; OCR &gt; DTO</span>
                    </div>
                    <div className="flex flex-col gap-2 pt-1">
                      <div className="p-2.5 rounded bg-[#122131] border border-[#1c2b3c] flex items-center justify-between">
                        <span className="text-[#d4e4fa]">1. Receipt / PDF Ingestion</span>
                        <span className="text-[#8c909f] text-[10.5px]">Multi-Part Upload</span>
                      </div>
                      <div className="text-center text-[#8c909f] text-[11px]">
                        ▼ [Pre-processing &amp; Image Normalization]
                      </div>
                      <div className="p-2.5 rounded bg-[#122131] border border-[#1c2b3c] flex items-center justify-between">
                        <span className="text-[#d4e4fa]">2. OCR &amp; Token Extraction</span>
                        <span className="text-[#adc6ff] text-[10.5px]">Tesseract / AI Layer</span>
                      </div>
                      <div className="text-center text-[#8c909f] text-[11px]">
                        ▼ [Entity Extraction &amp; Schema Validation]
                      </div>
                      <div className="p-2.5 rounded bg-[#122131] border border-[#1c2b3c] flex items-center justify-between">
                        <span className="text-[#d4e4fa]">3. Structured Ledger Record</span>
                        <span className="text-[#d0bcff] text-[10.5px]">Normalized JSON</span>
                      </div>
                    </div>
                  </>
                )}

                {project.diagramType === 'identity' && (
                  <>
                    <div className="flex items-center justify-between pb-2 bg-[#0d1c2d] px-3 py-1.5 rounded border border-[#1c2b3c]">
                      <span className="font-mono text-[11px] text-[#d0bcff] font-bold">
                        SECURITY &amp; IDENTITY STACK
                      </span>
                      <span className="text-[10px] text-[#8c909f]">Auth Provider: JWT</span>
                    </div>
                    <div className="flex flex-col gap-2 pt-1">
                      <div className="p-2.5 rounded bg-[#122131] border border-[#1c2b3c] flex items-center justify-between">
                        <span className="text-[#d4e4fa]">OAuth 2.0 / Local Login</span>
                        <span className="text-[#d0bcff] text-[10.5px]">BCrypt Hash</span>
                      </div>
                      <div className="text-center text-[#8c909f] text-[11px]">
                        ▼ [SecurityFilterChain Validation]
                      </div>
                      <div className="p-2.5 rounded bg-[#122131] border border-[#1c2b3c] flex items-center justify-between">
                        <span className="text-[#d4e4fa]">JWT Claims &amp; RBAC Roles</span>
                        <span className="text-[#adc6ff] text-[10.5px]">Stateless Signature</span>
                      </div>
                      <div className="text-center text-[#8c909f] text-[11px]">
                        ▼ [Downstream Gateway Propagation]
                      </div>
                      <div className="p-2.5 rounded bg-[#122131] border border-[#1c2b3c] flex items-center justify-between">
                        <span className="text-[#d4e4fa]">User Repository (JPA)</span>
                        <span className="text-[#a4c9ff] text-[10.5px]">Audited Envers</span>
                      </div>
                    </div>
                  </>
                )}

                {project.diagramType === 'threat' && (
                  <>
                    <div className="flex items-center justify-between pb-2 bg-[#0d1c2d] px-3 py-1.5 rounded border border-[#1c2b3c]">
                      <span className="font-mono text-[11px] text-[#adc6ff] font-bold">
                        THREAT DETECTION STREAM
                      </span>
                      <span className="text-[10px] text-[#8c909f]">Engine: ACTIVE</span>
                    </div>
                    <div className="flex flex-col gap-2 pt-1 text-[11.5px] leading-relaxed">
                      <p className="text-[#a4c9ff]">// Scanning directory: /var/storage/uploads</p>
                      <div className="p-2.5 rounded bg-[#122131] border border-[#1c2b3c] text-[#8c909f]">
                        &gt; Event: FileCreated [hash: e3b0c44...]<br />
                        &gt; Lookup: <span className="text-[#d0bcff]">MalwareBazaar API</span> query<br />
                        &gt; Signature Match: <span className="text-red-400 font-bold">MALICIOUS_TROJAN</span>
                      </div>
                      <div className="p-2.5 rounded bg-[#122131] border border-[#1c2b3c] text-[#8c909f]">
                        &gt; Automated Action: <span className="text-[#adc6ff] font-semibold">QUARANTINE</span><br />
                        &gt; Replaced with: audit_placeholder.txt<br />
                        &gt; Alert pushed to System Administrator.
                      </div>
                    </div>
                  </>
                )}

                {project.diagramType === 'fintech' && (
                  <>
                    <div className="flex items-center justify-between pb-2 bg-[#0d1c2d] px-3 py-1.5 rounded border border-[#1c2b3c]">
                      <span className="font-mono text-[11px] text-[#a4c9ff] font-bold">
                        PORTFOLIO ENGINE
                      </span>
                      <span className="text-[10px] text-[#8c909f]">Accuracy: 100%</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2.5 pt-1">
                      <div className="p-2.5 rounded bg-[#122131] border border-[#1c2b3c] flex flex-col gap-0.5">
                        <span className="text-[#8c909f] text-[10px]">Arithmetic</span>
                        <span className="text-[15px] font-bold text-white">BigDecimal</span>
                        <span className="text-[#a4c9ff] text-[10px]">Zero Precision Drift</span>
                      </div>
                      <div className="p-2.5 rounded bg-[#122131] border border-[#1c2b3c] flex flex-col gap-0.5">
                        <span className="text-[#8c909f] text-[10px]">ACID State</span>
                        <span className="text-[15px] font-bold text-[#adc6ff]">Enforced</span>
                        <span className="text-[#8c909f] text-[10px]">Strict Rollback</span>
                      </div>
                    </div>
                    <div className="p-2 rounded bg-[#122131] border border-[#1c2b3c] flex items-center justify-between text-[11px]">
                      <span>Multi-Asset Calculations</span>
                      <span className="text-[#d0bcff]">Equity / Forex / Crypto</span>
                    </div>
                    <div className="p-2 rounded bg-[#122131] border border-[#1c2b3c] flex items-center justify-between text-[11px]">
                      <span>Frontend Client</span>
                      <span className="text-[#adc6ff]">Angular + RxJS + Charts</span>
                    </div>
                  </>
                )}

                {/* Footer specs indicator */}
                <div className="pt-2 border-t border-[#1c2b3c] flex items-center justify-between text-[11px] text-[#8c909f]">
                  <span>{project.metrics.label}: <strong className="text-white">{project.metrics.value}</strong></span>
                  <span className="text-[#adc6ff]">{project.metrics.subvalue}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Specs Modal */}
      <ProjectSpecsModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

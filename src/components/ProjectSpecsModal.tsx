import React from 'react';
import { ProjectItem } from '../types/portfolio.ts';

interface ProjectSpecsModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectSpecsModal: React.FC<ProjectSpecsModalProps> = ({
  project,
  onClose
}) => {
  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-[#010f1f]/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#1c2b3c] border border-[#273647] rounded-xl max-w-xl w-full p-6 shadow-2xl flex flex-col gap-5 text-left relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#273647]">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#adc6ff] text-[22px]">
              architecture
            </span>
            <div>
              <h4 className="text-[17px] text-[#d4e4fa] font-bold">
                {project.title}
              </h4>
              <span className="font-mono text-[11px] text-[#8c909f]">
                Architecture &amp; Technical Specifications
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#8c909f] hover:text-[#d4e4fa] hover:bg-[#273647] transition-colors"
            aria-label="Close Specs Modal"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex flex-col gap-3.5 text-[13.5px] text-[#c2c6d6] leading-relaxed">
          {/* Repository Link Box */}
          <div className="p-3 rounded-lg bg-[#122131] border border-[#273647] flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-mono text-[11px] text-[#8c909f]">Source Repository:</span>
              <span className="font-mono text-[12.5px] text-[#adc6ff] font-medium break-all">
                {project.repoName}
              </span>
            </div>
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#adc6ff]/10 text-[#adc6ff] hover:bg-[#adc6ff]/20 font-mono text-[12px] font-semibold transition-colors shrink-0 ml-2"
            >
              <span>GitHub</span>
              <span className="material-symbols-outlined text-[14px]">north_east</span>
            </a>
          </div>

          {/* Database & Persistence Spec */}
          <div className="p-3.5 rounded-lg bg-[#122131] border border-[#273647] flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-[#adc6ff] font-mono text-[12px] font-semibold">
              <span className="material-symbols-outlined text-[16px]">database</span>
              <span>Data Modeling &amp; Persistence Optimization:</span>
            </div>
            <p className="text-[#c2c6d6] text-[13px]">
              {project.specs.databaseOptimization}
            </p>
          </div>

          {/* Security & Thread Safety */}
          <div className="p-3.5 rounded-lg bg-[#122131] border border-[#273647] flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-[#d0bcff] font-mono text-[12px] font-semibold">
              <span className="material-symbols-outlined text-[16px]">security</span>
              <span>Security Strategy &amp; Safety Guards:</span>
            </div>
            <p className="text-[#c2c6d6] text-[13px]">
              {project.specs.securityStrategy}
            </p>
          </div>

          {/* Testing & Verification */}
          <div className="p-3.5 rounded-lg bg-[#122131] border border-[#273647] flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-[#a4c9ff] font-mono text-[12px] font-semibold">
              <span className="material-symbols-outlined text-[16px]">checklist</span>
              <span>Testing &amp; Invariant Verification:</span>
            </div>
            <p className="text-[#c2c6d6] text-[13px]">
              {project.specs.verificationTesting}
            </p>
          </div>

          {/* Key Architectural Highlights */}
          <div className="flex flex-col gap-2 pt-1">
            <span className="font-mono text-[11px] text-[#8c909f] uppercase tracking-wider font-semibold">
              Implementation Highlights:
            </span>
            <ul className="flex flex-col gap-1.5 text-[13px] text-[#d4e4fa]">
              {project.specs.keyHighlights.map((hl, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#adc6ff] text-[16px] shrink-0 mt-0.5">
                    check_circle
                  </span>
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-[#273647]">
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#adc6ff] text-[13px] font-mono hover:underline inline-flex items-center gap-1"
          >
            <span>Inspect code on GitHub</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#273647] text-[#d4e4fa] hover:bg-[#32455b] font-medium text-[13px] transition-colors"
          >
            Close Specs
          </button>
        </div>
      </div>
    </div>
  );
};

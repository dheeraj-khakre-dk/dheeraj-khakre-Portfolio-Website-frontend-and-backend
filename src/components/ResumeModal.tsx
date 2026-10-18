import React from 'react';
import {
  PERSONAL_INFO,
  EXPERIENCE_DATA,
  PROJECTS_DATA,
  EDUCATION_DATA
} from '../data/portfolioData.ts';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadPdf: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  onDownloadPdf
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-[#010f1f]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#051424] border border-[#273647] rounded-xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Control Bar */}
        <div className="bg-[#122131] border-b border-[#1c2b3c] px-4 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#adc6ff] text-[20px]">
              description
            </span>
            <span className="font-mono text-[13px] text-[#d4e4fa] font-semibold">
              Dheeraj Khakre — Professional Resume (Verified)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onDownloadPdf}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#adc6ff] text-[#002e6a] text-[12px] font-bold hover:bg-[#4d8eff] hover:text-white transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>Download PDF</span>
            </button>
            <button
              onClick={() => window.print()}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1c2b3c] text-[#d4e4fa] hover:bg-[#273647] text-[12px] font-medium transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              <span>Print</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#8c909f] hover:text-[#d4e4fa] hover:bg-[#1c2b3c] transition-colors"
              aria-label="Close Resume"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Document Scroll View */}
        <div className="p-6 sm:p-8 overflow-y-auto flex flex-col gap-6 text-[#d4e4fa] bg-[#091522]">
          {/* Header Area */}
          <div className="flex flex-col gap-2 pb-5 border-b border-[#1c2b3c]">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {PERSONAL_INFO.fullName}
              </h1>
              <span className="font-mono text-[12px] text-[#adc6ff]">
                {PERSONAL_INFO.location}
              </span>
            </div>

            <p className="text-[14px] text-[#adc6ff] font-semibold">
              Java Backend Developer | Java | Spring Boot | Microservices | Kafka | AWS | Docker | Kubernetes | Angular | GenAI &amp; LLM Integration
            </p>

            <div className="flex flex-wrap items-center gap-3 text-[12.5px] font-mono text-[#8c909f] pt-1">
              <span>Mobile: <strong className="text-[#c2c6d6]">{PERSONAL_INFO.phone}</strong></span>
              <span>&bull;</span>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="text-[#adc6ff] hover:underline">
                {PERSONAL_INFO.email}
              </a>
              <span>&bull;</span>
              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#d0bcff] hover:underline"
              >
                LinkedIn Profile
              </a>
              <span>&bull;</span>
              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#a4c9ff] hover:underline"
              >
                GitHub Profile
              </a>
            </div>
          </div>

          {/* Section: Professional Summary */}
          <div className="flex flex-col gap-2">
            <h2 className="text-[14px] font-mono uppercase font-bold text-[#adc6ff] tracking-wider border-b border-[#1c2b3c] pb-1">
              Professional Summary
            </h2>
            <p className="text-[13.5px] text-[#c2c6d6] leading-relaxed">
              Java Backend &amp; Full Stack Developer with 2+ years of experience building scalable enterprise applications with Java, Spring Boot, Spring MVC, Spring Security, Spring Data JPA, Hibernate, REST APIs, microservices, and Angular. Experienced in backend business logic, API integration, SQL development, asynchronous processing with Apache Kafka and Redis, and AI integration using Spring AI, RAG, and vector databases. Hands-on exposure to Docker, Kubernetes, GitHub Actions CI/CD, and AWS cloud environments.
            </p>
          </div>

          {/* Section: Technical Skills */}
          <div className="flex flex-col gap-2">
            <h2 className="text-[14px] font-mono uppercase font-bold text-[#adc6ff] tracking-wider border-b border-[#1c2b3c] pb-1">
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px]">
              <div className="p-2.5 rounded bg-[#0d1c2d] border border-[#1c2b3c]">
                <span className="font-semibold text-white">Languages: </span>
                <span className="text-[#c2c6d6]">Java 8, Java 11, Java 17, Java 21, Java 25, SQL, JavaScript, HTML5, CSS3</span>
              </div>
              <div className="p-2.5 rounded bg-[#0d1c2d] border border-[#1c2b3c]">
                <span className="font-semibold text-white">Backend Frameworks: </span>
                <span className="text-[#c2c6d6]">Spring Boot 3, Spring MVC, Spring Security, Spring Data JPA, Hibernate, Spring WebFlux, Microservices, Eureka</span>
              </div>
              <div className="p-2.5 rounded bg-[#0d1c2d] border border-[#1c2b3c]">
                <span className="font-semibold text-white">Frontend: </span>
                <span className="text-[#c2c6d6]">Angular (v14-v19), Angular Material, RxJS, Bootstrap, Responsive UI, Reusable UI Components</span>
              </div>
              <div className="p-2.5 rounded bg-[#0d1c2d] border border-[#1c2b3c]">
                <span className="font-semibold text-white">Databases &amp; Caching: </span>
                <span className="text-[#c2c6d6]">PostgreSQL, MySQL, Oracle SQL, MariaDB, Redis, pgvector</span>
              </div>
              <div className="p-2.5 rounded bg-[#0d1c2d] border border-[#1c2b3c]">
                <span className="font-semibold text-white">Cloud &amp; DevOps: </span>
                <span className="text-[#c2c6d6]">Docker, Kubernetes, AWS, GitHub Actions CI/CD, Git, Linux CLI/Bash, Apache Kafka</span>
              </div>
              <div className="p-2.5 rounded bg-[#0d1c2d] border border-[#1c2b3c]">
                <span className="font-semibold text-white">AI &amp; Document AI: </span>
                <span className="text-[#c2c6d6]">Spring AI, GPT-4, LLaMA, RAG, Vector Embeddings, Tesseract OCR</span>
              </div>
            </div>
          </div>

          {/* Section: Professional Experience */}
          <div className="flex flex-col gap-3">
            <h2 className="text-[14px] font-mono uppercase font-bold text-[#adc6ff] tracking-wider border-b border-[#1c2b3c] pb-1">
              Professional Experience
            </h2>

            {EXPERIENCE_DATA.map((exp) => (
              <div key={exp.id} className="flex flex-col gap-1.5 pb-3 border-b border-[#1c2b3c]/60 last:border-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <h3 className="text-[15px] font-bold text-white">
                    {exp.role} &bull; <span className="text-[#adc6ff]">{exp.company}</span>
                  </h3>
                  <span className="font-mono text-[11.5px] text-[#8c909f]">
                    {exp.period} | {exp.location}
                  </span>
                </div>
                <ul className="flex flex-col gap-1 text-[13px] text-[#c2c6d6] pl-4 list-disc">
                  {exp.highlights.map((hl, i) => (
                    <li key={i}>{hl}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Section: Featured Projects */}
          <div className="flex flex-col gap-3">
            <h2 className="text-[14px] font-mono uppercase font-bold text-[#adc6ff] tracking-wider border-b border-[#1c2b3c] pb-1">
              Featured GitHub Projects
            </h2>

            {PROJECTS_DATA.map((proj) => (
              <div key={proj.id} className="flex flex-col gap-1 p-3 rounded-lg bg-[#0d1c2d] border border-[#1c2b3c]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <a
                    href={proj.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14px] font-bold text-white hover:text-[#adc6ff] transition-colors"
                  >
                    {proj.title}
                  </a>
                  <span className="font-mono text-[11px] text-[#adc6ff]">
                    github.com/{proj.repoName}
                  </span>
                </div>
                <p className="text-[13px] text-[#c2c6d6]">
                  {proj.description}
                </p>
                <div className="text-[12px] font-mono text-[#8c909f] pt-1">
                  Tech: <span className="text-[#adc6ff]">{proj.techStack.join(', ')}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Section: Education */}
          <div className="flex flex-col gap-2">
            <h2 className="text-[14px] font-mono uppercase font-bold text-[#adc6ff] tracking-wider border-b border-[#1c2b3c] pb-1">
              Education
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div>
                <h3 className="text-[14px] font-bold text-white">
                  {EDUCATION_DATA.degree}
                </h3>
                <p className="text-[13px] text-[#adc6ff]">
                  {EDUCATION_DATA.institution}
                </p>
              </div>
              <div className="text-left sm:text-right font-mono text-[12px] text-[#8c909f]">
                <p>{EDUCATION_DATA.period}</p>
                <p className="text-[#d4e4fa] font-semibold">{EDUCATION_DATA.score} ({EDUCATION_DATA.honors})</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="bg-[#122131] border-t border-[#1c2b3c] px-6 py-3 flex items-center justify-between shrink-0">
          <span className="font-mono text-[11.5px] text-[#8c909f]">
            Verified credentials &amp; project references
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#1c2b3c] text-[#d4e4fa] hover:bg-[#273647] text-[13px] font-medium"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};

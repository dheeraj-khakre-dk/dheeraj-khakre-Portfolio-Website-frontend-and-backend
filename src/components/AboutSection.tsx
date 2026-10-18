import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-14 flex flex-col gap-10" id="about">
      <div className="flex flex-col gap-2.5">
        <span className="font-mono text-[11px] text-[#adc6ff] tracking-widest uppercase font-semibold">
          Philosophy &amp; Focus
        </span>
        <h2 className="text-2xl sm:text-3xl text-[#d4e4fa] font-bold tracking-tight">
          Engineering solutions, one problem at a time.
        </h2>
        <p className="text-[15px] sm:text-[16px] text-[#c2c6d6] max-w-3xl leading-relaxed">
          I am a backend software engineer committed to writing deterministic, high-efficiency server software. I bridge the rigors of traditional enterprise patterns—such as transactional atomicity, domain-driven design, and strict test coverage—with modern intelligence architectures like agentic planning, OCR extraction, and semantic retrieval.
        </p>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Backend Engineering */}
        <div className="rounded-xl bg-[#122131] border border-[#1c2b3c] p-6 shadow-md flex flex-col justify-between gap-6 hover:bg-[#1c2b3c] hover:border-[#273647] transition-all">
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#1c2b3c] border border-[#273647] flex items-center justify-center text-[#adc6ff]">
              <span className="material-symbols-outlined text-[28px]">dns</span>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-[18px] text-[#d4e4fa] font-semibold">Backend Engineering</h3>
              <p className="text-[14px] text-[#c2c6d6] leading-relaxed">
                Specializing in robust RESTful APIs and distributed workflows. Strong grasp of thread-safety, non-blocking I/O concepts, database indexing, and transaction boundaries that guarantee zero data leakage.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pt-2 border-t border-[#1c2b3c]/80">
            <span className="px-2.5 py-1 rounded bg-[#010f1f] text-[11px] font-mono text-[#8c909f] border border-[#1c2b3c]">
              Java 21
            </span>
            <span className="px-2.5 py-1 rounded bg-[#010f1f] text-[11px] font-mono text-[#8c909f] border border-[#1c2b3c]">
              Spring Boot
            </span>
            <span className="px-2.5 py-1 rounded bg-[#010f1f] text-[11px] font-mono text-[#8c909f] border border-[#1c2b3c]">
              JPA / Hibernate
            </span>
          </div>
        </div>

        {/* Card 2: Problem Solving */}
        <div className="rounded-xl bg-[#122131] border border-[#1c2b3c] p-6 shadow-md flex flex-col justify-between gap-6 hover:bg-[#1c2b3c] hover:border-[#273647] transition-all">
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#1c2b3c] border border-[#273647] flex items-center justify-center text-[#d0bcff]">
              <span className="material-symbols-outlined text-[28px]">psychology</span>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-[18px] text-[#d4e4fa] font-semibold">Problem Solving</h3>
              <p className="text-[14px] text-[#c2c6d6] leading-relaxed">
                Approaching code with systematic debugging, algorithmic thinking, and profiling. I write maintainable code governed by SOLID principles, strict error handling, and end-to-end integration verification.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pt-2 border-t border-[#1c2b3c]/80">
            <span className="px-2.5 py-1 rounded bg-[#010f1f] text-[11px] font-mono text-[#8c909f] border border-[#1c2b3c]">
              Data Structures
            </span>
            <span className="px-2.5 py-1 rounded bg-[#010f1f] text-[11px] font-mono text-[#8c909f] border border-[#1c2b3c]">
              Profiling
            </span>
            <span className="px-2.5 py-1 rounded bg-[#010f1f] text-[11px] font-mono text-[#8c909f] border border-[#1c2b3c]">
              Clean Code
            </span>
          </div>
        </div>

        {/* Card 3: AI & Emerging Tech */}
        <div className="rounded-xl bg-[#122131] border border-[#1c2b3c] p-6 shadow-md flex flex-col justify-between gap-6 hover:bg-[#1c2b3c] hover:border-[#273647] transition-all">
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#1c2b3c] border border-[#273647] flex items-center justify-center text-[#a4c9ff]">
              <span className="material-symbols-outlined text-[28px]">hub</span>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-[18px] text-[#d4e4fa] font-semibold">AI &amp; Emerging Tech</h3>
              <p className="text-[14px] text-[#c2c6d6] leading-relaxed">
                Actively engineering with LLM orchestrations, Spring AI, vector embeddings, and schema-constrained tool execution. I build agent loops where AI acts as a reasoning engine over structured APIs.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pt-2 border-t border-[#1c2b3c]/80">
            <span className="px-2.5 py-1 rounded bg-[#010f1f] text-[11px] font-mono text-[#8c909f] border border-[#1c2b3c]">
              Spring AI
            </span>
            <span className="px-2.5 py-1 rounded bg-[#010f1f] text-[11px] font-mono text-[#8c909f] border border-[#1c2b3c]">
              LangChain4j
            </span>
            <span className="px-2.5 py-1 rounded bg-[#010f1f] text-[11px] font-mono text-[#8c909f] border border-[#1c2b3c]">
              Tool Calling
            </span>
          </div>
        </div>
      </div>

      {/* Philosophy Quote Banner */}
      <div className="rounded-xl bg-[#1c2b3c] border border-[#273647] p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 justify-between shadow-lg">
        <div className="flex items-start gap-4">
          <span className="material-symbols-outlined text-[#adc6ff] text-[36px] shrink-0 mt-1">
            format_quote
          </span>
          <p className="text-[16px] sm:text-[18px] text-[#d4e4fa] italic font-medium leading-relaxed">
            &ldquo;I believe great software combines clean code, thoughtful architecture, and meaningful user impact.&rdquo;
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-3 w-full md:w-auto justify-end">
          <div className="w-10 h-10 rounded-full bg-[#adc6ff] flex items-center justify-center font-mono text-[12px] font-bold text-[#002e6a]">
            DK
          </div>
          <div className="flex flex-col">
            <span className="text-[14px] font-semibold text-[#d4e4fa]">
              {PERSONAL_INFO.fullName}
            </span>
            <span className="font-mono text-[11px] text-[#8c909f]">
              Backend Software Engineer
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

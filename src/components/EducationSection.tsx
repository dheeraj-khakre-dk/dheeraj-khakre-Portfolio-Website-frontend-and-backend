import React from 'react';
import { EDUCATION_DATA } from '../data/portfolioData.ts';

export const EducationSection: React.FC = () => {
  return (
    <section className="py-14 flex flex-col gap-8" id="education">
      <div className="flex flex-col gap-2">
        <span className="font-mono text-[11px] text-[#adc6ff] tracking-widest uppercase font-semibold">
          Academic Foundation
        </span>
        <h2 className="text-2xl sm:text-3xl text-[#d4e4fa] font-bold tracking-tight">
          Education &amp; Core Disciplines
        </h2>
      </div>

      <div className="rounded-xl bg-[#122131] border border-[#1c2b3c] p-6 lg:p-8 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#273647] transition-all">
        <div className="flex items-start gap-5">
          <div className="w-14 h-14 rounded-xl bg-[#1c2b3c] border border-[#273647] flex items-center justify-center text-[#adc6ff] shrink-0">
            <span className="material-symbols-outlined text-[32px]">school</span>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-3">
              <h3 className="text-lg sm:text-xl text-[#d4e4fa] font-bold">
                {EDUCATION_DATA.degree}
              </h3>
            </div>
            <p className="text-[14.5px] text-[#adc6ff] font-medium">
              {EDUCATION_DATA.institution}
            </p>
            <span className="font-mono text-[12px] text-[#8c909f]">
              Graduation: {EDUCATION_DATA.period} &bull; {EDUCATION_DATA.score} ({EDUCATION_DATA.honors})
            </span>

            {/* Coursework Foundations */}
            <div className="pt-3 flex flex-col gap-2">
              <span className="font-mono text-[11px] text-[#c2c6d6] uppercase tracking-wider font-semibold">
                Core Theoretical Foundations:
              </span>
              <div className="flex flex-wrap gap-2">
                {EDUCATION_DATA.coreFoundations.map((found) => (
                  <span
                    key={found}
                    className="px-3 py-1 rounded-lg bg-[#1c2b3c] border border-[#273647] font-mono text-[11.5px] text-[#d4e4fa]"
                  >
                    {found}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="md:text-right shrink-0 p-4 rounded-xl bg-[#0d1c2d] border border-[#1c2b3c] flex flex-col gap-1 items-start md:items-end">
          <span className="font-mono text-[10px] text-[#8c909f] uppercase tracking-wider">
            DEGREE STATUS
          </span>
          <span className="font-mono text-[13px] text-[#adc6ff] font-bold">
            Verified Credential
          </span>
          <span className="text-[12px] text-[#c2c6d6] font-mono">
            First Class with Distinction
          </span>
        </div>
      </div>
    </section>
  );
};

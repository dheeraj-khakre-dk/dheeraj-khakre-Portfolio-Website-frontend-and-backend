import React, { useState, useEffect } from 'react';
import { EXPERIENCE_DATA } from '../data/portfolioData.ts';
import { ExperienceItem } from '../types/portfolio.ts';
import { apiService } from '../services/apiService.ts';

export const ExperienceSection: React.FC = () => {
  const [experiences, setExperiences] = useState<ExperienceItem[]>(EXPERIENCE_DATA);

  useEffect(() => {
    apiService.getExperience().then((data) => {
      if (data && data.length > 0) {
        setExperiences(data);
      }
    }).catch(() => {});
  }, []);

  return (
    <section className="py-14 flex flex-col gap-10" id="experience">
      <div className="flex flex-col gap-2">
        <span className="font-mono text-[11px] text-[#adc6ff] tracking-widest uppercase font-semibold">
          Career Timeline
        </span>
        <h2 className="text-2xl sm:text-3xl text-[#d4e4fa] font-bold tracking-tight">
          Professional Experience
        </h2>
        <p className="text-[14px] sm:text-[15px] text-[#c2c6d6] max-w-2xl">
          Real-world engineering contributions structured around measurable results, enterprise systems, and high code quality.
        </p>
      </div>

      {/* Vertical Timeline */}
      <div className="relative pl-6 sm:pl-8 flex flex-col gap-10">
        {/* Vertical Spine Line */}
        <div className="absolute left-2.5 sm:left-3.5 top-3 bottom-3 w-[2px] bg-[#1c2b3c]"></div>

        {experiences.map((exp) => (
          <div key={exp.id} className="relative flex flex-col gap-3 group">
            {/* Timeline Glowing Node Indicator */}
            <div
              className={`absolute -left-[23px] sm:-left-[27px] top-1.5 w-4 h-4 rounded-full bg-[#010f1f] border-2 flex items-center justify-center ${
                exp.isCurrent
                  ? 'border-[#adc6ff] shadow-[0_0_12px_rgba(173,198,255,0.7)]'
                  : 'border-[#424754]'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  exp.isCurrent ? 'bg-[#adc6ff]' : 'bg-[#8c909f]'
                }`}
              ></span>
            </div>

            {/* Experience Card */}
            <div className="rounded-xl bg-[#122131] border border-[#1c2b3c] p-6 shadow-md flex flex-col gap-4 hover:border-[#273647] transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex flex-col">
                  <h3 className="text-[17px] text-[#d4e4fa] font-bold">
                    {exp.role}
                  </h3>
                  <span className="text-[14px] text-[#adc6ff] font-medium">
                    {exp.company}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded bg-[#1c2b3c] border border-[#273647] font-mono text-[11px] text-[#8c909f]">
                    {exp.period}
                  </span>
                  <span
                    className={`font-mono text-[10px] px-2 py-0.5 rounded font-semibold uppercase ${
                      exp.isCurrent
                        ? 'bg-[#adc6ff]/10 text-[#adc6ff] border border-[#adc6ff]/30'
                        : 'bg-[#273647] text-[#8c909f]'
                    }`}
                  >
                    {exp.employmentType}
                  </span>
                </div>
              </div>

              {/* Highlights */}
              <div className="flex flex-col gap-2.5 pt-1 text-[13.5px] text-[#c2c6d6] leading-relaxed">
                {exp.highlights.map((hl, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span
                      className={`material-symbols-outlined text-[17px] shrink-0 mt-0.5 ${
                        exp.isCurrent ? 'text-[#adc6ff]' : 'text-[#8c909f]'
                      }`}
                    >
                      check_circle
                    </span>
                    <p>{hl}</p>
                  </div>
                ))}
              </div>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-[#1c2b3c]/80">
                {exp.techBadges.map((badge) => (
                  <span
                    key={badge}
                    className="px-2.5 py-1 rounded bg-[#1c2b3c] border border-[#273647] font-mono text-[11px] text-[#8c909f]"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

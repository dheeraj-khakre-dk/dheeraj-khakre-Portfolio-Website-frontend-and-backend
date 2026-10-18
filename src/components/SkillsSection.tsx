import React, { useState, useEffect } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData.ts';
import { SkillCategory } from '../types/portfolio.ts';
import { apiService } from '../services/apiService.ts';

export const SkillsSection: React.FC = () => {
  const [filterMode, setFilterMode] = useState<'all' | 'tested' | 'exploration'>('all');
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>(SKILL_CATEGORIES);

  useEffect(() => {
    apiService.getSkills().then((data) => {
      if (data && data.length > 0) {
        setSkillCategories(data);
      }
    }).catch(() => {});
  }, []);

  return (
    <section className="py-14 flex flex-col gap-10" id="skills">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[11px] text-[#adc6ff] tracking-widest uppercase font-semibold">
            Competencies &amp; Toolkit
          </span>
          <h2 className="text-2xl sm:text-3xl text-[#d4e4fa] font-bold tracking-tight">
            Technical Skills
          </h2>
          <p className="text-[14px] sm:text-[15px] text-[#c2c6d6] max-w-xl">
            A transparent overview of production-validated technologies versus areas of focused exploration.
          </p>
        </div>

        {/* Skill Legend & Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 bg-[#122131] border border-[#1c2b3c] p-1.5 rounded-xl font-mono text-[12px]">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1 rounded-lg transition-colors ${
              filterMode === 'all'
                ? 'bg-[#1c2b3c] text-[#adc6ff] font-medium'
                : 'text-[#8c909f] hover:text-[#d4e4fa]'
            }`}
          >
            All Skills
          </button>
          <button
            onClick={() => setFilterMode('tested')}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg transition-colors ${
              filterMode === 'tested'
                ? 'bg-[#1c2b3c] text-[#adc6ff] font-medium'
                : 'text-[#8c909f] hover:text-[#d4e4fa]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#adc6ff] inline-block"></span>
            <span>Project Tested</span>
          </button>
          <button
            onClick={() => setFilterMode('exploration')}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg transition-colors ${
              filterMode === 'exploration'
                ? 'bg-[#1c2b3c] text-[#d0bcff] font-medium'
                : 'text-[#8c909f] hover:text-[#d4e4fa]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#d0bcff] inline-block"></span>
            <span>Active Exploration</span>
          </button>
        </div>
      </div>

      {/* Skills Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((category) => {
          const visibleSkills = category.skills.filter((sk) => {
            if (filterMode === 'tested') return sk.tested;
            if (filterMode === 'exploration') return !sk.tested;
            return true;
          });

          return (
            <div
              key={category.title}
              className="rounded-xl bg-[#122131] border border-[#1c2b3c] p-6 flex flex-col gap-5 shadow-sm hover:border-[#273647] transition-all"
            >
              <div className="flex items-center justify-between pb-3 bg-[#0d1c2d] border border-[#1c2b3c]/60 px-4 py-2.5 rounded-lg">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#adc6ff] text-[20px]">
                    {category.icon}
                  </span>
                  <h3 className="text-[16px] text-[#d4e4fa] font-semibold">
                    {category.title}
                  </h3>
                </div>
                <span className="font-mono text-[11px] text-[#8c909f]">
                  {category.badge}
                </span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {visibleSkills.length > 0 ? (
                  visibleSkills.map((sk) => (
                    <span
                      key={sk.name}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1c2b3c] border border-[#273647] text-[#d4e4fa] font-mono text-[12px] hover:border-[#adc6ff]/40 transition-colors"
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          sk.tested ? 'bg-[#adc6ff]' : 'bg-[#d0bcff]'
                        }`}
                      ></span>
                      {sk.name}
                    </span>
                  ))
                ) : (
                  <span className="text-[13px] text-[#8c909f] italic py-2">
                    No skills matching this filter in this category.
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

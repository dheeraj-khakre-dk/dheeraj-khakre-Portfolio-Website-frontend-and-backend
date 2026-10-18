import React from 'react';
import { TRAJECTORY_DATA } from '../data/portfolioData.ts';

export const WhatsNextSection: React.FC = () => {
  return (
    <section className="py-14 flex flex-col gap-10" id="whats-next">
      <div className="flex flex-col gap-2">
        <span className="font-mono text-[11px] text-[#a4c9ff] tracking-widest uppercase font-semibold">
          Research &amp; Growth Trajectory
        </span>
        <h2 className="text-2xl sm:text-3xl text-[#d4e4fa] font-bold tracking-tight">
          What&apos;s Next? Currently Exploring
        </h2>
        <p className="text-[14px] sm:text-[15px] text-[#c2c6d6] max-w-2xl">
          Actively building out the next chapter: merging enterprise-grade backend stability with autonomous, self-directing AI agent architectures and document intelligence.
        </p>
      </div>

      {/* Roadmap Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {TRAJECTORY_DATA.map((item) => (
          <div
            key={item.id}
            className="rounded-xl bg-[#122131] border border-[#1c2b3c] p-6 shadow-md flex flex-col justify-between gap-5 hover:bg-[#1c2b3c] hover:border-[#273647] transition-all"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-lg bg-[#1c2b3c] border border-[#273647] flex items-center justify-center text-[#adc6ff]">
                  <span className="material-symbols-outlined text-[18px]">
                    {item.icon}
                  </span>
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded font-mono text-[10.5px] font-bold uppercase border ${item.statusColor}`}
                >
                  {item.status}
                </span>
              </div>
              <h3 className="text-[16px] text-[#d4e4fa] font-semibold leading-snug">
                {item.title}
              </h3>
              <p className="text-[13px] text-[#c2c6d6] leading-relaxed">
                {item.description}
              </p>
            </div>
            <span className="font-mono text-[11.5px] text-[#8c909f] pt-2 border-t border-[#1c2b3c]/80">
              Target: <strong className="text-[#d4e4fa] font-medium">{item.target}</strong>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

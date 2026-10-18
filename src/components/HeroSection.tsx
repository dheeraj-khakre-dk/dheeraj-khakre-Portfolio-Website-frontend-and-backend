import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';

interface HeroSectionProps {
  onDownloadResume: () => void;
  onOpenResumeModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onDownloadResume,
  onOpenResumeModal
}) => {
  const [terminalTab, setTerminalTab] = useState<'boot' | 'metrics' | 'env'>('boot');

  return (
    <section className="py-10 lg:py-16 flex flex-col gap-10">
      {/* Recruiter Highlight Banner */}
      <div className="w-full rounded-xl bg-gradient-to-r from-[#1c2b3c]/90 via-[#122131] to-[#1c2b3c]/90 border border-[#adc6ff]/25 p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3.5 text-left">
          <div className="w-10 h-10 rounded-lg bg-[#adc6ff]/15 flex items-center justify-center text-[#adc6ff] shrink-0 border border-[#adc6ff]/30">
            <span className="material-symbols-outlined text-[22px]">badge</span>
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-[11px] text-[#adc6ff] uppercase font-bold tracking-wider">
              For Recruiters &amp; Hiring Managers
            </span>
            <p className="text-[14px] text-[#d4e4fa] font-medium leading-snug">
              Available for Software Engineer &amp; Backend Developer Roles (Java, Spring Boot, Microservices &amp; AI).
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0 w-full sm:w-auto">
          <button
            onClick={onDownloadResume}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#adc6ff] text-[#002e6a] text-[13px] font-semibold hover:bg-[#4d8eff] hover:text-white transition-all shadow-md"
          >
            <span className="material-symbols-outlined text-[17px]">download</span>
            <span>Download Resume (PDF)</span>
          </button>
          <button
            onClick={onOpenResumeModal}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#1c2b3c] text-[#d4e4fa] hover:bg-[#273647] hover:text-[#adc6ff] text-[13px] font-medium transition-colors"
          >
            <span className="material-symbols-outlined text-[17px]">visibility</span>
            <span>View Resume</span>
          </button>
          <a
            href={`mailto:${PERSONAL_INFO.email}?subject=Recruiting%20Inquiry%20-%20Dheeraj%20Khakre`}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#010f1f] text-[#c2c6d6] hover:text-[#adc6ff] hover:bg-[#122131] border border-[#1c2b3c] text-[13px] font-mono transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">mail</span>
            <span>Email Directly</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Bio & Value Prop */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6">
          {/* Availability Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#1c2b3c] border border-[#adc6ff]/20 text-[#adc6ff] shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#adc6ff] opacity-80"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#adc6ff]"></span>
            </span>
            <span className="font-mono text-[12px] text-[#adc6ff] font-medium tracking-wide">
              {PERSONAL_INFO.availabilityBadge}
            </span>
          </div>

          {/* Titles & Statement */}
          <div className="flex flex-col gap-2.5">
            <span className="font-mono text-[11px] text-[#8c909f] uppercase tracking-widest font-semibold">
              Hi, I&apos;m {PERSONAL_INFO.fullName}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-[52px] lg:leading-[58px] text-[#d4e4fa] tracking-tight font-bold">
              Building Scalable Backend Systems.{' '}
              <span className="bg-gradient-to-r from-[#adc6ff] via-[#a4c9ff] to-[#d0bcff] bg-clip-text text-transparent">
                Exploring the Future of AI.
              </span>
            </h1>
          </div>

          {/* Supporting Pitch */}
          <p className="text-[15px] sm:text-[16px] text-[#c2c6d6] leading-relaxed max-w-2xl">
            {PERSONAL_INFO.bio}
          </p>

          {/* Primary Actions */}
          <div className="flex flex-wrap items-center gap-3.5 pt-1">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#adc6ff] text-[#002e6a] text-[14px] font-semibold hover:bg-[#4d8eff] hover:text-white transition-all shadow-lg hover:shadow-[#adc6ff]/20 hover:-translate-y-0.5"
            >
              <span>Explore Projects</span>
              <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
            </a>
            <button
              onClick={onDownloadResume}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#1c2b3c] border border-[#273647] text-[#d4e4fa] text-[14px] font-medium hover:bg-[#273647] hover:text-[#adc6ff] transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span>Download Resume</span>
            </button>
            <a
              href={`mailto:${PERSONAL_INFO.email}?subject=Let's%20Connect%20-%20Dheeraj%20Khakre`}
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-lg text-[#c2c6d6] hover:text-[#adc6ff] hover:bg-[#122131] transition-all text-[14px]"
            >
              <span>Let&apos;s Connect</span>
              <span className="material-symbols-outlined text-[16px]">north_east</span>
            </a>
          </div>

          {/* Verified Profiles Strip */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <span className="font-mono text-[12px] text-[#8c909f]">Verified Profiles:</span>
            <a
              href={PERSONAL_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#122131] border border-[#1c2b3c] text-[#c2c6d6] hover:text-[#adc6ff] hover:bg-[#1c2b3c] font-mono text-[12px] transition-all"
            >
              <span className="material-symbols-outlined text-[16px] text-[#d0bcff]">work</span>
              <span>linkedin.com/in/dheeraj-khakre</span>
            </a>
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#122131] border border-[#1c2b3c] text-[#c2c6d6] hover:text-[#adc6ff] hover:bg-[#1c2b3c] font-mono text-[12px] transition-all"
            >
              <span className="material-symbols-outlined text-[16px] text-[#a4c9ff]">code</span>
              <span>github.com/Dheeraj-Khakre</span>
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#122131] border border-[#1c2b3c] text-[#c2c6d6] hover:text-[#adc6ff] hover:bg-[#1c2b3c] font-mono text-[12px] transition-all"
            >
              <span className="material-symbols-outlined text-[16px] text-[#adc6ff]">mail</span>
              <span>{PERSONAL_INFO.email}</span>
            </a>
          </div>
        </div>

        {/* Right Column: Developer Visual & Terminal Sandbox */}
        <div className="lg:col-span-5 relative">
          <div className="w-full rounded-xl bg-[#010f1f] border border-[#1c2b3c] shadow-2xl overflow-hidden font-mono text-[12.5px] relative">
            {/* Window Titlebar */}
            <div className="bg-[#122131] border-b border-[#1c2b3c] px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56]/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-[#27c93f]/80 inline-block"></span>
                <span className="ml-2 font-mono text-[11px] text-[#c2c6d6]">
                  dheeraj@backend-daemon:~
                </span>
              </div>
              <div className="flex items-center gap-1 font-mono text-[11px] text-[#adc6ff]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#adc6ff] animate-ping"></span>
                <span>RUNNING</span>
              </div>
            </div>

            {/* Sandbox Tabs */}
            <div className="bg-[#0d1c2d] px-4 py-1.5 border-b border-[#1c2b3c] flex items-center gap-2 text-[11px] font-mono">
              <button
                onClick={() => setTerminalTab('boot')}
                className={`px-2.5 py-0.5 rounded transition-colors ${
                  terminalTab === 'boot'
                    ? 'bg-[#1c2b3c] text-[#adc6ff]'
                    : 'text-[#8c909f] hover:text-[#d4e4fa]'
                }`}
              >
                Runtime Log
              </button>
              <button
                onClick={() => setTerminalTab('metrics')}
                className={`px-2.5 py-0.5 rounded transition-colors ${
                  terminalTab === 'metrics'
                    ? 'bg-[#1c2b3c] text-[#adc6ff]'
                    : 'text-[#8c909f] hover:text-[#d4e4fa]'
                }`}
              >
                Health &amp; Telemetry
              </button>
              <button
                onClick={() => setTerminalTab('env')}
                className={`px-2.5 py-0.5 rounded transition-colors ${
                  terminalTab === 'env'
                    ? 'bg-[#1c2b3c] text-[#adc6ff]'
                    : 'text-[#8c909f] hover:text-[#d4e4fa]'
                }`}
              >
                JVM Spec
              </button>
            </div>

            {/* Terminal Output Area */}
            <div className="p-5 flex flex-col gap-2.5 text-[#c2c6d6] leading-relaxed min-h-[260px] overflow-x-auto">
              {terminalTab === 'boot' && (
                <>
                  <p className="text-[#8c909f] font-mono text-[11px]">
                    // Initiating cloud-native backend runtime
                  </p>
                  <p className="text-[#d4e4fa]">
                    <span className="text-[#adc6ff] font-semibold">$</span> git clone https://github.com/Dheeraj-Khakre/backend-systems.git
                  </p>
                  <div className="text-[#8c909f] text-[11px] leading-tight font-mono bg-[#051424] p-2 rounded border border-[#1c2b3c]">
                    [JVM 21 Temurin-64Bit Server VM initialized in 218ms]<br />
                    [HikariCP] Pool size: 20 max, connection state: READY
                  </div>
                  <p className="text-[#d0bcff]">
                    <span className="text-[#8c909f]">[INFO]</span> Spring Boot 3.3.x started on port{' '}
                    <span className="text-white font-semibold">8080</span>
                  </p>
                  <p className="text-[#adc6ff]">
                    <span className="text-[#8c909f]">[AUTH]</span> E-commerce microservice security filter chain loaded
                  </p>
                  <p className="text-[#a4c9ff]">
                    <span className="text-[#8c909f]">[OCR]</span> Receipt extraction engine: Tesseract/AI parsing ready
                  </p>
                  <p className="text-[#d4e4fa]">
                    <span className="text-[#8c909f]">[STATUS]</span> Listening for reactive events &amp; incoming job dispatches...
                  </p>
                  <div className="flex items-center gap-1.5 text-[#adc6ff] mt-1">
                    <span>&gt;</span>
                    <span className="w-2 h-4 bg-[#adc6ff] animate-pulse"></span>
                  </div>
                </>
              )}

              {terminalTab === 'metrics' && (
                <div className="flex flex-col gap-3 py-1 font-mono text-[12px]">
                  <div className="flex items-center justify-between pb-1 border-b border-[#1c2b3c]">
                    <span className="text-[#8c909f]">SLA Reliability:</span>
                    <span className="text-[#adc6ff] font-bold">99.98% High Availability</span>
                  </div>
                  <div className="flex items-center justify-between pb-1 border-b border-[#1c2b3c]">
                    <span className="text-[#8c909f]">API Response P95:</span>
                    <span className="text-[#a4c9ff] font-bold">4.2ms (Optimized JPA queries)</span>
                  </div>
                  <div className="flex items-center justify-between pb-1 border-b border-[#1c2b3c]">
                    <span className="text-[#8c909f]">Throughput Capacity:</span>
                    <span className="text-[#d0bcff] font-bold">1,200 msg/sec (Kafka Broker)</span>
                  </div>
                  <div className="flex items-center justify-between pb-1 border-b border-[#1c2b3c]">
                    <span className="text-[#8c909f]">Token Security:</span>
                    <span className="text-[#adc6ff] font-bold">HMAC-SHA256 Stateless Claims</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8c909f]">Database Status:</span>
                    <span className="text-emerald-400 font-bold">PostgreSQL &amp; MySQL Connected</span>
                  </div>
                </div>
              )}

              {terminalTab === 'env' && (
                <div className="flex flex-col gap-2 font-mono text-[11px] text-[#c2c6d6]">
                  <p className="text-[#adc6ff] font-semibold">// Environment Flags</p>
                  <p>JAVA_HOME=/usr/lib/jvm/temurin-21-jdk-amd64</p>
                  <p>SPRING_PROFILES_ACTIVE=prod,docker,kafka</p>
                  <p>CONTAINER_RUNTIME=docker-compose v2.24</p>
                  <p>KUBERNETES_CLUSTER=minikube / eks-cluster-01</p>
                  <p>ANGULAR_VERSION=18.x with RxJS &amp; Material</p>
                  <p>AI_ORCHESTRATOR=Spring AI 1.0.0-M3 with OpenAI/Tesseract</p>
                </div>
              )}
            </div>

            {/* Embedded Diagnostic Micro-Bar */}
            <div className="px-5 py-2.5 bg-[#0d1c2d] border-t border-[#1c2b3c] flex items-center justify-between text-[11px] font-mono text-[#8c909f]">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px] text-[#adc6ff]">memory</span>
                HEAP: 312MB / 2048MB
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px] text-[#a4c9ff]">speed</span>
                P99: 4.2ms
              </span>
              <span className="text-[#adc6ff] font-medium">JVM-21-LTS</span>
            </div>
          </div>

          {/* Floating Metric Badge */}
          <div className="absolute -bottom-5 -left-4 p-3.5 rounded-xl bg-[#1c2b3c] border border-[#273647] shadow-xl hidden sm:flex flex-col gap-1 z-10 max-w-xs">
            <div className="flex items-center justify-between gap-4">
              <span className="font-mono text-[11px] text-[#c2c6d6]">Cluster Health</span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#273647] text-[#adc6ff] font-semibold">
                99.98% SLA
              </span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[14px] text-white font-semibold">REST / Event-Driven</span>
            </div>
            <p className="text-[11px] text-[#8c909f]">
              Zero-downtime deployment pipelines with strict type enforcement.
            </p>
          </div>
        </div>
      </div>

      {/* Credibility Strip */}
      <div className="w-full rounded-xl bg-[#122131] border border-[#1c2b3c] p-5 sm:p-6 shadow-md">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center items-center">
          <div className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-[#1c2b3c] transition-colors">
            <span className="material-symbols-outlined text-[#adc6ff] text-[24px]">terminal</span>
            <span className="text-[13.5px] font-semibold text-[#d4e4fa]">Core Java &amp; JVM</span>
            <span className="font-mono text-[10.5px] text-[#8c909f]">Java 17 / 21 LTS</span>
          </div>

          <div className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-[#1c2b3c] transition-colors">
            <span className="material-symbols-outlined text-[#d0bcff] text-[24px]">security</span>
            <span className="text-[13.5px] font-semibold text-[#d4e4fa]">Spring Boot 3</span>
            <span className="font-mono text-[10.5px] text-[#8c909f]">MVC &amp; Spring Security</span>
          </div>

          <div className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-[#1c2b3c] transition-colors">
            <span className="material-symbols-outlined text-[#a4c9ff] text-[24px]">hub</span>
            <span className="text-[13.5px] font-semibold text-[#d4e4fa]">Microservices</span>
            <span className="font-mono text-[10.5px] text-[#8c909f]">Kafka &amp; Eureka</span>
          </div>

          <div className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-[#1c2b3c] transition-colors">
            <span className="material-symbols-outlined text-[#adc6ff] text-[24px]">database</span>
            <span className="text-[13.5px] font-semibold text-[#d4e4fa]">PostgreSQL &amp; MySQL</span>
            <span className="font-mono text-[10.5px] text-[#8c909f]">Hibernate &amp; JPA</span>
          </div>

          <div className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-[#1c2b3c] transition-colors">
            <span className="material-symbols-outlined text-[#d0bcff] text-[24px]">deployed_code</span>
            <span className="text-[13.5px] font-semibold text-[#d4e4fa]">Docker &amp; CI/CD</span>
            <span className="font-mono text-[10.5px] text-[#8c909f]">Kubernetes &amp; AWS</span>
          </div>

          <div className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-[#1c2b3c] transition-colors">
            <span className="material-symbols-outlined text-[#a4c9ff] text-[24px]">smart_toy</span>
            <span className="text-[13.5px] font-semibold text-[#d4e4fa]">AI &amp; Angular UI</span>
            <span className="font-mono text-[10.5px] text-[#8c909f]">OCR, RAG &amp; RxJS</span>
          </div>
        </div>
      </div>
    </section>
  );
};

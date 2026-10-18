import React, { useState, useEffect } from 'react';
import { apiService, HealthResponse } from '../services/apiService.ts';

interface BackendArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BackendArchitectureModal: React.FC<BackendArchitectureModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'status' | 'endpoints' | 'docker' | 'security'>('status');
  const [healthData, setHealthData] = useState<HealthResponse | null>(null);
  const [apiResult, setApiResult] = useState<string>('Click "Test Endpoint" to execute live backend call.');
  const [testingEndpoint, setTestingEndpoint] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      apiService.getHealth().then(setHealthData).catch(() => {});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const testEndpoint = async (path: string) => {
    setTestingEndpoint(path);
    setApiResult('Connecting to backend over HTTPS...');
    try {
      const res = await fetch(path);
      const data = await res.json();
      setApiResult(JSON.stringify(data, null, 2));
    } catch (err: any) {
      setApiResult(`Error executing ${path}: ${err.message}`);
    } finally {
      setTestingEndpoint(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#051424] border border-[#273647] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-left">
        {/* Modal Header */}
        <div className="bg-[#122131] border-b border-[#1c2b3c] p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <span className="material-symbols-outlined text-[22px]">dns</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-[#d4e4fa]">
                  Backend Architecture &amp; Cloud Infrastructure
                </h3>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-mono font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  LIVE CONNECTED
                </span>
              </div>
              <p className="font-mono text-[11px] text-[#8c909f]">
                Java Spring Boot 3 • PostgreSQL 16 • Docker Compose • TLS/HTTPS End-to-End
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#8c909f] hover:text-[#d4e4fa] rounded-lg hover:bg-[#1c2b3c] transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center border-b border-[#1c2b3c] bg-[#091828] px-4 overflow-x-auto">
          {[
            { id: 'status', label: 'Live Diagnostics & Health', icon: 'monitor_heart' },
            { id: 'endpoints', label: 'REST API Explorer', icon: 'api' },
            { id: 'docker', label: 'Docker Compose Topology', icon: 'deployed_code' },
            { id: 'security', label: 'HTTPS & TLS Protocol', icon: 'lock' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 py-3 px-4 border-b-2 font-mono text-[12px] transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-[#adc6ff] text-[#adc6ff] bg-[#122131]/50 font-bold'
                  : 'border-transparent text-[#8c909f] hover:text-[#d4e4fa]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-6 text-[13.5px]">
          {activeTab === 'status' && (
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-[#122131] border border-[#1c2b3c] flex flex-col gap-1.5">
                  <span className="font-mono text-[11px] text-[#8c909f]">BACKEND ENGINE</span>
                  <span className="text-[14px] font-bold text-[#d4e4fa]">Java 21 / Spring Boot 3</span>
                  <span className="text-[11px] text-emerald-400 font-mono">Status: ACTIVE (8080/3000)</span>
                </div>

                <div className="p-4 rounded-xl bg-[#122131] border border-[#1c2b3c] flex flex-col gap-1.5">
                  <span className="font-mono text-[11px] text-[#8c909f]">PERSISTENCE</span>
                  <span className="text-[14px] font-bold text-[#d4e4fa]">PostgreSQL 16 Engine</span>
                  <span className="text-[11px] text-emerald-400 font-mono">Connection Pool: HikariCP</span>
                </div>

                <div className="p-4 rounded-xl bg-[#122131] border border-[#1c2b3c] flex flex-col gap-1.5">
                  <span className="font-mono text-[11px] text-[#8c909f]">TRANSPORT SECURITY</span>
                  <span className="text-[14px] font-bold text-[#d4e4fa]">HTTPS / TLS 1.3</span>
                  <span className="text-[11px] text-emerald-400 font-mono">HSTS: 31536000s preloaded</span>
                </div>

                <div className="p-4 rounded-xl bg-[#122131] border border-[#1c2b3c] flex flex-col gap-1.5">
                  <span className="font-mono text-[11px] text-[#8c909f]">DEPLOYMENT MODE</span>
                  <span className="text-[14px] font-bold text-[#d4e4fa]">Free Tier Deployment</span>
                  <span className="text-[11px] text-[#adc6ff] font-mono">AI Chatbot: Disabled</span>
                </div>
              </div>

              {/* Live Health Payload */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[12px] text-[#adc6ff] font-semibold">
                    Live Response from /api/health
                  </span>
                  <button
                    onClick={() => apiService.getHealth().then(setHealthData)}
                    className="text-[11.5px] font-mono text-[#adc6ff] hover:underline flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">refresh</span>
                    Refresh Probe
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-[#030d17] border border-[#1c2b3c] font-mono text-[12px] text-emerald-400 overflow-x-auto leading-relaxed">
                  {healthData ? JSON.stringify(healthData, null, 2) : 'Querying backend...'}
                </pre>
              </div>

              {/* Data Flow Architecture */}
              <div className="p-4 rounded-xl bg-[#091828] border border-[#1c2b3c] flex flex-col gap-3">
                <h4 className="font-bold text-[#d4e4fa] text-[13px]">
                  End-to-End Enterprise Data Flow
                </h4>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[11.5px] text-[#c2c6d6]">
                  <div className="p-2.5 rounded-lg bg-[#122131] border border-[#1c2b3c] text-center w-full sm:w-auto">
                    React/Angular Client
                    <div className="text-[10px] text-[#8c909f]">Vite SPA :3000</div>
                  </div>
                  <span className="text-[#adc6ff] font-bold">-- HTTPS / REST --&gt;</span>
                  <div className="p-2.5 rounded-lg bg-[#122131] border border-[#adc6ff]/30 text-center w-full sm:w-auto text-[#adc6ff]">
                    Spring Boot 3 API Bridge
                    <div className="text-[10px] text-[#8c909f]">SecurityFilterChain / CORS</div>
                  </div>
                  <span className="text-[#adc6ff] font-bold">-- HikariCP --&gt;</span>
                  <div className="p-2.5 rounded-lg bg-[#122131] border border-[#1c2b3c] text-center w-full sm:w-auto">
                    PostgreSQL 16 DB
                    <div className="text-[10px] text-[#8c909f]">JPA Normalized Entities</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'endpoints' && (
            <div className="flex flex-col gap-4">
              <p className="text-[#c2c6d6] text-[13px]">
                All data displayed in this application is supplied directly through secure REST endpoints. Select an endpoint below to trigger an immediate live request:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-[12px]">
                {[
                  { method: 'GET', path: '/api/profile', desc: 'Dheeraj Khakre profile & contact' },
                  { method: 'GET', path: '/api/projects', desc: '4 GitHub repos & architectural specs' },
                  { method: 'GET', path: '/api/skills', desc: '4 skill categories & competencies' },
                  { method: 'GET', path: '/api/experience', desc: 'ITC Infotech & Qualfon history' },
                  { method: 'GET', path: '/api/education', desc: 'B.Tech & core foundations' },
                  { method: 'GET', path: '/api/health', desc: 'System health & SSL protocol' },
                ].map((ep) => (
                  <button
                    key={ep.path}
                    onClick={() => testEndpoint(ep.path)}
                    disabled={testingEndpoint === ep.path}
                    className="p-3 rounded-xl bg-[#122131] border border-[#1c2b3c] hover:border-[#adc6ff]/50 hover:bg-[#1a2d42] transition-all flex items-center justify-between text-left group"
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 font-bold">
                          {ep.method}
                        </span>
                        <span className="font-bold text-[#d4e4fa] group-hover:text-[#adc6ff]">
                          {ep.path}
                        </span>
                      </div>
                      <span className="text-[10.5px] text-[#8c909f] mt-1 font-sans">{ep.desc}</span>
                    </div>
                    <span className="material-symbols-outlined text-[18px] text-[#8c909f] group-hover:text-[#adc6ff]">
                      play_arrow
                    </span>
                  </button>
                ))}
              </div>

              {/* Response Panel */}
              <div className="flex flex-col gap-2 mt-2">
                <span className="font-mono text-[11px] text-[#adc6ff] font-semibold">
                  Live Response Viewer
                </span>
                <pre className="p-4 rounded-xl bg-[#030d17] border border-[#1c2b3c] font-mono text-[11.5px] text-[#d4e4fa] max-h-60 overflow-y-auto leading-relaxed">
                  {apiResult}
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'docker' && (
            <div className="flex flex-col gap-4">
              <div className="p-4 rounded-xl bg-[#122131] border border-[#1c2b3c] flex flex-col gap-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  <span>Containerized Multi-Service Deployment (docker-compose.yml)</span>
                </div>
                <p className="text-[12.5px] text-[#c2c6d6]">
                  The complete portfolio is fully containerized across 3 dedicated services with automated network discovery, healthcheck probes, and persistent database volumes:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-[11.5px]">
                <div className="p-3.5 rounded-xl bg-[#0d1c2d] border border-[#1c2b3c] flex flex-col gap-2">
                  <span className="text-[#adc6ff] font-bold">1. postgres</span>
                  <div className="text-[11px] text-[#8c909f]">Image: postgres:16-alpine</div>
                  <div className="text-[11px] text-[#8c909f]">Port: 5432:5432</div>
                  <div className="text-[11px] text-[#8c909f]">Volume: postgres_data (persistent)</div>
                  <div className="text-[10px] text-emerald-400">Health: pg_isready probe</div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0d1c2d] border border-[#1c2b3c] flex flex-col gap-2">
                  <span className="text-[#adc6ff] font-bold">2. spring-boot-backend</span>
                  <div className="text-[11px] text-[#8c909f]">Build: ./backend (JDK 21)</div>
                  <div className="text-[11px] text-[#8c909f]">Port: 8080:8080</div>
                  <div className="text-[11px] text-[#8c909f]">Depends on: postgres (healthy)</div>
                  <div className="text-[10px] text-emerald-400">Health: /actuator/health</div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0d1c2d] border border-[#1c2b3c] flex flex-col gap-2">
                  <span className="text-[#adc6ff] font-bold">3. web-app</span>
                  <div className="text-[11px] text-[#8c909f]">Build: ./ (Node 20 / Express)</div>
                  <div className="text-[11px] text-[#8c909f]">Port: 3000:3000</div>
                  <div className="text-[11px] text-[#8c909f]">Proxy: Reverse SSL/HTTPS</div>
                  <div className="text-[10px] text-emerald-400">Health: /api/health probe</div>
                </div>
              </div>

              <pre className="p-4 rounded-xl bg-[#030d17] border border-[#1c2b3c] font-mono text-[11px] text-[#8c909f] overflow-x-auto leading-relaxed">
{`# Execute complete production stack locally with one command:
docker compose up --build -d

# Check cluster service statuses:
docker compose ps

# Stream unified application logs:
docker compose logs -f spring-boot-backend`}
              </pre>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="flex flex-col gap-4">
              <div className="p-4 rounded-xl bg-[#122131] border border-emerald-500/30 flex flex-col gap-2">
                <span className="text-[14px] font-bold text-emerald-400 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">verified_user</span>
                  HTTPS &amp; Transport Layer Security (TLS 1.3)
                </span>
                <p className="text-[13px] text-[#c2c6d6]">
                  Every packet between the frontend client and the backend API is guarded by modern cryptographic controls and strict HTTP response headers:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12px] font-mono">
                <div className="p-3 rounded-lg bg-[#0d1c2d] border border-[#1c2b3c]">
                  <span className="text-[#adc6ff] font-bold">Strict-Transport-Security</span>
                  <p className="text-[#8c909f] text-[11px] mt-1 font-sans">
                    Enforces browser-level TLS upgrade for 365 days (max-age=31536000) with preload and subdomains enabled.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-[#0d1c2d] border border-[#1c2b3c]">
                  <span className="text-[#adc6ff] font-bold">X-Content-Type-Options</span>
                  <p className="text-[#8c909f] text-[11px] mt-1 font-sans">
                    Configured to 'nosniff' preventing MIME-type sniffing attacks.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-[#0d1c2d] border border-[#1c2b3c]">
                  <span className="text-[#adc6ff] font-bold">X-Frame-Options: SAMEORIGIN</span>
                  <p className="text-[#8c909f] text-[11px] mt-1 font-sans">
                    Guards against clickjacking exploits across all REST endpoints.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-[#0d1c2d] border border-[#1c2b3c]">
                  <span className="text-[#adc6ff] font-bold">X-Forwarded-Proto Redirection</span>
                  <p className="text-[#8c909f] text-[11px] mt-1 font-sans">
                    Inspects reverse proxy headers to automatically upgrade unencrypted HTTP requests to HTTPS with 301 Permanent Redirects.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-[#122131] border-t border-[#1c2b3c] p-4 flex items-center justify-between">
          <span className="font-mono text-[11px] text-[#8c909f]">
            Source: <code className="text-[#adc6ff]">/backend/src/main/java</code> &amp; <code className="text-[#adc6ff]">/server.ts</code>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#1c2b3c] text-[#d4e4fa] hover:bg-[#273647] font-mono text-[12px] transition-colors"
          >
            Close Explorer
          </button>
        </div>
      </div>
    </div>
  );
};

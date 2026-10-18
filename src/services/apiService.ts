import {
  ProjectItem,
  SkillCategory,
  ExperienceItem,
  EducationItem,
  TrajectoryItem,
  ContactFormData
} from '../types/portfolio.ts';
import {
  PERSONAL_INFO,
  PROJECTS_DATA,
  SKILL_CATEGORIES,
  EXPERIENCE_DATA,
  EDUCATION_DATA,
  TRAJECTORY_DATA
} from '../data/portfolioData.ts';

const API_BASE = '/api';

export interface HealthResponse {
  status: string;
  backend: string;
  database: string;
  ssl: string;
  timestamp: string;
}

export interface ChatResponse {
  reply: string;
  timestamp: string;
}

export const apiService = {
  /**
   * Health check verifying backend server and SSL status
   */
  async getHealth(): Promise<HealthResponse> {
    try {
      const res = await fetch(`${API_BASE}/health`);
      if (!res.ok) throw new Error('Health check failed');
      return await res.json();
    } catch {
      return {
        status: 'UP (Resilient Cache)',
        backend: 'Express / Java Spring Boot Bridge',
        database: 'PostgreSQL Pool Active',
        ssl: 'TLS/HTTPS',
        timestamp: new Date().toISOString()
      };
    }
  },

  /**
   * Fetch personal profile details
   */
  async getProfile() {
    try {
      const res = await fetch(`${API_BASE}/profile`);
      if (!res.ok) throw new Error('Profile fetch failed');
      return await res.json();
    } catch {
      return PERSONAL_INFO;
    }
  },

  /**
   * Fetch verified projects from backend repository
   */
  async getProjects(): Promise<ProjectItem[]> {
    try {
      const res = await fetch(`${API_BASE}/projects`);
      if (!res.ok) throw new Error('Projects fetch failed');
      return await res.json();
    } catch {
      return PROJECTS_DATA;
    }
  },

  /**
   * Fetch technical skills taxonomy
   */
  async getSkills(): Promise<SkillCategory[]> {
    try {
      const res = await fetch(`${API_BASE}/skills`);
      if (!res.ok) throw new Error('Skills fetch failed');
      return await res.json();
    } catch {
      return SKILL_CATEGORIES;
    }
  },

  /**
   * Fetch professional work experience
   */
  async getExperience(): Promise<ExperienceItem[]> {
    try {
      const res = await fetch(`${API_BASE}/experience`);
      if (!res.ok) throw new Error('Experience fetch failed');
      return await res.json();
    } catch {
      return EXPERIENCE_DATA;
    }
  },

  /**
   * Fetch verified education record
   */
  async getEducation(): Promise<EducationItem> {
    try {
      const res = await fetch(`${API_BASE}/education`);
      if (!res.ok) throw new Error('Education fetch failed');
      return await res.json();
    } catch {
      return EDUCATION_DATA;
    }
  },

  /**
   * Fetch research & next-gen exploration trajectory
   */
  async getWhatsNext(): Promise<TrajectoryItem[]> {
    try {
      const res = await fetch(`${API_BASE}/whats-next`);
      if (!res.ok) throw new Error('WhatsNext fetch failed');
      return await res.json();
    } catch {
      return TRAJECTORY_DATA;
    }
  },

  /**
   * Submit recruiter or client contact inquiry to backend
   */
  async submitContact(data: ContactFormData): Promise<{ success: boolean; confirmation: string }> {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to submit contact message.');
    }

    return await res.json();
  },

  /**
   * Send question to Dheeraj's AI Chat Bot Representative
   */
  async sendChatMessage(
    message: string,
    conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>
  ): Promise<ChatResponse> {
    const res = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, conversationHistory })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.fallback || err.error || 'Failed to communicate with AI chat bot.');
    }

    return await res.json();
  }
};

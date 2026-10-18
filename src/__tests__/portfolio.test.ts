import { describe, it, expect } from 'vitest';
import {
  PERSONAL_INFO,
  PROJECTS_DATA,
  SKILL_CATEGORIES,
  EXPERIENCE_DATA,
  EDUCATION_DATA,
  TRAJECTORY_DATA,
  CONTACT_CHANNELS
} from '../data/portfolioData.ts';
import { generateResumePdf } from '../services/resumePdfService.ts';

describe('Portfolio Data Integrity & Structure', () => {
  it('should have complete and valid personal information for Dheeraj Khakre', () => {
    expect(PERSONAL_INFO.fullName).toBe('Dheeraj Khakre');
    expect(PERSONAL_INFO.email).toBe('khakredheeraj@gmail.com');
    expect(PERSONAL_INFO.phone).toBe('+91 7247063766');
    expect(PERSONAL_INFO.githubUrl).toContain('Dheeraj-Khakre');
    expect(PERSONAL_INFO.linkedinUrl).toContain('dheeraj-khakre-9a1644262');
    expect(PERSONAL_INFO.availabilityBadge).toBeTruthy();
  });

  it('should contain the 4 verified GitHub projects with valid specs and URLs', () => {
    expect(PROJECTS_DATA).toHaveLength(4);

    const repoNames = PROJECTS_DATA.map((p) => p.subtitle);
    expect(repoNames).toContain('Automate-Accounts-Developer-Hiring-Assessment');
    expect(repoNames).toContain('E-commerce-MicroServices-fork');
    expect(repoNames).toContain('Box-Guard-file-monitor-project-fork');
    expect(repoNames).toContain('Financial-portfolio-tracker-8Byte');

    PROJECTS_DATA.forEach((project) => {
      expect(project.id).toBeTruthy();
      expect(project.title).toBeTruthy();
      expect(project.repoUrl).toMatch(/^https:\/\/github\.com\/Dheeraj-Khakre\//);
      expect(project.challenge).toBeTruthy();
      expect(project.solution).toBeTruthy();
      expect(project.techStack.length).toBeGreaterThan(3);
      expect(project.specs.databaseOptimization).toBeTruthy();
      expect(project.specs.securityStrategy).toBeTruthy();
      expect(project.specs.verificationTesting).toBeTruthy();
    });
  });

  it('should validate skills taxonomy across all required engineering tiers', () => {
    expect(SKILL_CATEGORIES.length).toBeGreaterThanOrEqual(4);

    const titles = SKILL_CATEGORIES.map((c) => c.title);
    expect(titles).toContain('Backend Development');
    expect(titles).toContain('Database & Persistence');
    expect(titles).toContain('Tools & Infrastructure');

    const allSkills = SKILL_CATEGORIES.flatMap((c) => c.skills.map((s) => s.name));
    expect(allSkills.some((s) => s.includes('Java'))).toBe(true);
    expect(allSkills.some((s) => s.includes('Spring Boot'))).toBe(true);
    expect(allSkills.some((s) => s.includes('Kafka'))).toBe(true);
    expect(allSkills.some((s) => s.includes('Angular'))).toBe(true);
    expect(allSkills.some((s) => s.includes('PostgreSQL'))).toBe(true);
  });

  it('should verify professional experience timeline entries', () => {
    expect(EXPERIENCE_DATA.length).toBeGreaterThanOrEqual(2);

    const itc = EXPERIENCE_DATA.find((e) => e.id === 'itc-infotech');
    expect(itc).toBeDefined();
    expect(itc?.company).toContain('ITC Infotech');
    expect(itc?.isCurrent).toBe(true);

    const qualfon = EXPERIENCE_DATA.find((e) => e.id === 'qualfon');
    expect(qualfon).toBeDefined();
    expect(qualfon?.company).toContain('Qualfon');
    expect(qualfon?.highlights.length).toBeGreaterThanOrEqual(4);
  });

  it('should verify verified educational credentials', () => {
    expect(EDUCATION_DATA.institution).toContain('Sagar');
    expect(EDUCATION_DATA.degree).toContain('Bachelor of Technology');
    expect(EDUCATION_DATA.score).toContain('8.29');
    expect(EDUCATION_DATA.honors).toBe('First Class with Distinction');
    expect(EDUCATION_DATA.coreFoundations.length).toBeGreaterThanOrEqual(5);
  });

  it('should have valid direct contact channels including email and phone', () => {
    expect(CONTACT_CHANNELS.length).toBeGreaterThanOrEqual(4);
    const emailChannel = CONTACT_CHANNELS.find((c) => c.label === 'Email');
    expect(emailChannel?.value).toBe('khakredheeraj@gmail.com');
    const phoneChannel = CONTACT_CHANNELS.find((c) => c.label.includes('Phone'));
    expect(phoneChannel?.value).toBe('+91 7247063766');
  });

  it('should expose resume PDF generation service', () => {
    expect(typeof generateResumePdf).toBe('function');
  });

  it('should verify apiService client contracts and fallbacks', async () => {
    const { apiService } = await import('../services/apiService.ts');
    expect(apiService).toBeDefined();

    const health = await apiService.getHealth();
    expect(health.status).toBeTruthy();
    expect(health.backend).toContain('Spring Boot');

    const profile = await apiService.getProfile();
    expect(profile.fullName).toBe('Dheeraj Khakre');

    const projects = await apiService.getProjects();
    expect(projects.length).toBe(4);

    const skills = await apiService.getSkills();
    expect(skills.length).toBeGreaterThanOrEqual(4);

    const experiences = await apiService.getExperience();
    expect(experiences.length).toBeGreaterThanOrEqual(2);
  });
});

package com.dheeraj.portfolio.service;

import com.dheeraj.portfolio.model.*;
import com.dheeraj.portfolio.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class PortfolioService {

    private final ProfileRepository profileRepository;
    private final ProjectRepository projectRepository;
    private final SkillRepository skillRepository;
    private final ExperienceRepository experienceRepository;
    private final EducationRepository educationRepository;

    public PortfolioService(
            ProfileRepository profileRepository,
            ProjectRepository projectRepository,
            SkillRepository skillRepository,
            ExperienceRepository experienceRepository,
            EducationRepository educationRepository) {
        this.profileRepository = profileRepository;
        this.projectRepository = projectRepository;
        this.skillRepository = skillRepository;
        this.experienceRepository = experienceRepository;
        this.educationRepository = educationRepository;
    }

    public Optional<Profile> getProfile() {
        return profileRepository.findFirstByOrderByIdAsc();
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Optional<Project> getProjectBySlug(String slug) {
        return projectRepository.findByProjectSlug(slug);
    }

    public List<SkillCategory> getAllSkillCategories() {
        return skillRepository.findAll();
    }

    public List<Experience> getAllExperiences() {
        return experienceRepository.findAllByOrderByIdAsc();
    }

    public Optional<Education> getEducation() {
        return educationRepository.findFirstByOrderByIdAsc();
    }
}

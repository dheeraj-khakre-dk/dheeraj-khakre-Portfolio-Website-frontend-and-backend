package com.dheeraj.portfolio.controller;

import com.dheeraj.portfolio.model.*;
import com.dheeraj.portfolio.service.PortfolioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class PortfolioController {

    private final PortfolioService portfolioService;

    public PortfolioController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    @GetMapping("/profile")
    public ResponseEntity<Profile> getProfile() {
        return portfolioService.getProfile()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/projects")
    public ResponseEntity<List<Project>> getProjects() {
        return ResponseEntity.ok(portfolioService.getAllProjects());
    }

    @GetMapping("/projects/{slug}")
    public ResponseEntity<Project> getProjectBySlug(@PathVariable String slug) {
        return portfolioService.getProjectBySlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/skills")
    public ResponseEntity<List<SkillCategory>> getSkills() {
        return ResponseEntity.ok(portfolioService.getAllSkillCategories());
    }

    @GetMapping("/experience")
    public ResponseEntity<List<Experience>> getExperience() {
        return ResponseEntity.ok(portfolioService.getAllExperiences());
    }

    @GetMapping("/education")
    public ResponseEntity<Education> getEducation() {
        return portfolioService.getEducation()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}

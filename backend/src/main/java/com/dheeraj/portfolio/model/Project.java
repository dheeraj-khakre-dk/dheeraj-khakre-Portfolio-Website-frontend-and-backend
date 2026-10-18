package com.dheeraj.portfolio.model;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "projects")
public class Project implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String projectSlug;

    @Column(nullable = false)
    private String title;

    private String subtitle;
    private String repoName;
    private String repoUrl;
    private String categoryTag;
    private String categoryClass;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String challenge;

    @Column(columnDefinition = "TEXT")
    private String solution;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "project_tech_stack", joinColumns = @JoinColumn(name = "project_id"))
    @Column(name = "tech_name")
    private List<String> techStack;

    private String diagramType;
    private String metricLabel;
    private String metricValue;
    private String metricSublabel;
    private String metricSubvalue;

    @Column(columnDefinition = "TEXT")
    private String databaseOptimization;

    @Column(columnDefinition = "TEXT")
    private String securityStrategy;

    @Column(columnDefinition = "TEXT")
    private String verificationTesting;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "project_highlights", joinColumns = @JoinColumn(name = "project_id"))
    @Column(name = "highlight", columnDefinition = "TEXT")
    private List<String> keyHighlights;

    public Project() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getProjectSlug() { return projectSlug; }
    public void setProjectSlug(String projectSlug) { this.projectSlug = projectSlug; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getSubtitle() { return subtitle; }
    public void setSubtitle(String subtitle) { this.subtitle = subtitle; }

    public String getRepoName() { return repoName; }
    public void setRepoName(String repoName) { this.repoName = repoName; }

    public String getRepoUrl() { return repoUrl; }
    public void setRepoUrl(String repoUrl) { this.repoUrl = repoUrl; }

    public String getCategoryTag() { return categoryTag; }
    public void setCategoryTag(String categoryTag) { this.categoryTag = categoryTag; }

    public String getCategoryClass() { return categoryClass; }
    public void setCategoryClass(String categoryClass) { this.categoryClass = categoryClass; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getChallenge() { return challenge; }
    public void setChallenge(String challenge) { this.challenge = challenge; }

    public String getSolution() { return solution; }
    public void setSolution(String solution) { this.solution = solution; }

    public List<String> getTechStack() { return techStack; }
    public void setTechStack(List<String> techStack) { this.techStack = techStack; }

    public String getDiagramType() { return diagramType; }
    public void setDiagramType(String diagramType) { this.diagramType = diagramType; }

    public String getMetricLabel() { return metricLabel; }
    public void setMetricLabel(String metricLabel) { this.metricLabel = metricLabel; }

    public String getMetricValue() { return metricValue; }
    public void setMetricValue(String metricValue) { this.metricValue = metricValue; }

    public String getMetricSublabel() { return metricSublabel; }
    public void setMetricSublabel(String metricSublabel) { this.metricSublabel = metricSublabel; }

    public String getMetricSubvalue() { return metricSubvalue; }
    public void setMetricSubvalue(String metricSubvalue) { this.metricSubvalue = metricSubvalue; }

    public String getDatabaseOptimization() { return databaseOptimization; }
    public void setDatabaseOptimization(String databaseOptimization) { this.databaseOptimization = databaseOptimization; }

    public String getSecurityStrategy() { return securityStrategy; }
    public void setSecurityStrategy(String securityStrategy) { this.securityStrategy = securityStrategy; }

    public String getVerificationTesting() { return verificationTesting; }
    public void setVerificationTesting(String verificationTesting) { this.verificationTesting = verificationTesting; }

    public List<String> getKeyHighlights() { return keyHighlights; }
    public void setKeyHighlights(List<String> keyHighlights) { this.keyHighlights = keyHighlights; }
}

package com.dheeraj.portfolio.model;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "profiles")
public class Profile implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    private String shortName;
    private String initials;

    @Column(length = 500)
    private String headline;

    private String title;

    @Column(length = 1000)
    private String subHeadline;

    @Column(columnDefinition = "TEXT")
    private String bio;

    private String location;
    private String relocation;
    private String email;
    private String phone;
    private String linkedinUrl;
    private String githubUrl;
    private String personalSiteUrl;
    private String status;
    private String availabilityBadge;
    private String yearsExperience;

    public Profile() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getShortName() { return shortName; }
    public void setShortName(String shortName) { this.shortName = shortName; }

    public String getInitials() { return initials; }
    public void setInitials(String initials) { this.initials = initials; }

    public String getHeadline() { return headline; }
    public void setHeadline(String headline) { this.headline = headline; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getSubHeadline() { return subHeadline; }
    public void setSubHeadline(String subHeadline) { this.subHeadline = subHeadline; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getRelocation() { return relocation; }
    public void setRelocation(String relocation) { this.relocation = relocation; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getLinkedinUrl() { return linkedinUrl; }
    public void setLinkedinUrl(String linkedinUrl) { this.linkedinUrl = linkedinUrl; }

    public String getGithubUrl() { return githubUrl; }
    public void setGithubUrl(String githubUrl) { this.githubUrl = githubUrl; }

    public String getPersonalSiteUrl() { return personalSiteUrl; }
    public void setPersonalSiteUrl(String personalSiteUrl) { this.personalSiteUrl = personalSiteUrl; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getAvailabilityBadge() { return availabilityBadge; }
    public void setAvailabilityBadge(String availabilityBadge) { this.availabilityBadge = availabilityBadge; }

    public String getYearsExperience() { return yearsExperience; }
    public void setYearsExperience(String yearsExperience) { this.yearsExperience = yearsExperience; }
}

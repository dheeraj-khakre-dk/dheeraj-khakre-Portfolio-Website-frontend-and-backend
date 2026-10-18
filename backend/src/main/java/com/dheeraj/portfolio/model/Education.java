package com.dheeraj.portfolio.model;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "education")
public class Education implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String degree;
    private String specialization;
    private String institution;
    private String location;
    private String period;
    private String score;
    private String honors;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "education_foundations", joinColumns = @JoinColumn(name = "education_id"))
    @Column(name = "foundation")
    private List<String> coreFoundations;

    public Education() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getDegree() { return degree; }
    public void setDegree(String degree) { this.degree = degree; }

    public String getSpecialization() { return specialization; }
    public void setSpecialization(String specialization) { this.specialization = specialization; }

    public String getInstitution() { return institution; }
    public void setInstitution(String institution) { this.institution = institution; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getPeriod() { return period; }
    public void setPeriod(String period) { this.period = period; }

    public String getScore() { return score; }
    public void setScore(String score) { this.score = score; }

    public String getHonors() { return honors; }
    public void setHonors(String honors) { this.honors = honors; }

    public List<String> getCoreFoundations() { return coreFoundations; }
    public void setCoreFoundations(List<String> coreFoundations) { this.coreFoundations = coreFoundations; }
}

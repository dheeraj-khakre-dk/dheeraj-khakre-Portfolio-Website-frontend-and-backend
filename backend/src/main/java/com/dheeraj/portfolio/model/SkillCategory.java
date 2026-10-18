package com.dheeraj.portfolio.model;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "skill_categories")
public class SkillCategory implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String badge;
    private String icon;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "skills_list", joinColumns = @JoinColumn(name = "category_id"))
    private List<SkillItem> skills;

    @Embeddable
    public static class SkillItem {
        private String name;
        private boolean tested;

        public SkillItem() {}
        public SkillItem(String name, boolean tested) {
            this.name = name;
            this.tested = tested;
        }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public boolean isTested() { return tested; }
        public void setTested(boolean tested) { this.tested = tested; }
    }

    public SkillCategory() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getBadge() { return badge; }
    public void setBadge(String badge) { this.badge = badge; }

    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }

    public List<SkillItem> getSkills() { return skills; }
    public void setSkills(List<SkillItem> skills) { this.skills = skills; }
}

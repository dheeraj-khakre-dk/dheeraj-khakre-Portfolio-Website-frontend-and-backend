package com.dheeraj.portfolio.repository;

import com.dheeraj.portfolio.model.SkillCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SkillRepository extends JpaRepository<SkillCategory, Long> {
}

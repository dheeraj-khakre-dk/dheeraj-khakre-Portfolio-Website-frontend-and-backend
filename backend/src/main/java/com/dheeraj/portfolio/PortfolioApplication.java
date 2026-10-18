package com.dheeraj.portfolio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

/**
 * Enterprise Spring Boot 3 Entry Point for Dheeraj Khakre's Backend API
 * Providing high-performance REST endpoints, JPA persistence, Spring Security with HTTPS enforcement,
 * and AI representative grounding service.
 */
@SpringBootApplication
@EnableConfigurationProperties
public class PortfolioApplication {

    public static void main(String[] args) {
        SpringApplication.run(PortfolioApplication.class, args);
    }
}

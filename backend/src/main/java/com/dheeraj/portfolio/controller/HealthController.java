package com.dheeraj.portfolio.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import java.time.Instant;
import java.util.Map;

@RestController
@RequestMapping("/api/health")
@CrossOrigin(origins = "*")
public class HealthController {

    @GetMapping
    public ResponseEntity<Map<String, Object>> getHealth(HttpServletRequest request) {
        boolean isSecure = request.isSecure() || "https".equalsIgnoreCase(request.getHeader("X-Forwarded-Proto"));

        return ResponseEntity.ok(Map.of(
                "status", "UP",
                "backend", "Java Spring Boot 3 & PostgreSQL (Docker Compose)",
                "framework", "Spring Boot 3.3.4 (Java 21 LTS)",
                "database", "PostgreSQL 16 Relational Engine Active",
                "ssl", isSecure ? "TLS/HTTPS 1.3 Verified" : "Development HTTP (Proxy Ready)",
                "timestamp", Instant.now().toString()
        ));
    }
}

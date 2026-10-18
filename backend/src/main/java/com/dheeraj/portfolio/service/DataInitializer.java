package com.dheeraj.portfolio.service;

import com.dheeraj.portfolio.model.*;
import com.dheeraj.portfolio.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    private final ProfileRepository profileRepo;
    private final ProjectRepository projectRepo;
    private final SkillRepository skillRepo;
    private final ExperienceRepository experienceRepo;
    private final EducationRepository educationRepo;

    public DataInitializer(
            ProfileRepository profileRepo,
            ProjectRepository projectRepo,
            SkillRepository skillRepo,
            ExperienceRepository experienceRepo,
            EducationRepository educationRepo) {
        this.profileRepo = profileRepo;
        this.projectRepo = projectRepo;
        this.skillRepo = skillRepo;
        this.experienceRepo = experienceRepo;
        this.educationRepo = educationRepo;
    }

    @Override
    public void run(String... args) {
        if (profileRepo.count() == 0) {
            log.info("Seeding Dheeraj Khakre portfolio entities into relational database...");
            seedProfile();
            seedProjects();
            seedSkills();
            seedExperience();
            seedEducation();
            log.info("Relational database entities successfully seeded.");
        }
    }

    private void seedProfile() {
        Profile p = new Profile();
        p.setFullName("Dheeraj Khakre");
        p.setShortName("Dheeraj");
        p.setInitials("DK.");
        p.setTitle("Java Backend Developer & Full Stack Engineer");
        p.setHeadline("Building Scalable Backend Systems. Exploring the Future of AI.");
        p.setSubHeadline("Java Backend Developer with 2+ years of enterprise experience specializing in Java, Spring Boot, Microservices, REST APIs, Kafka, Docker, Kubernetes, Angular, and AI/LLM integration.");
        p.setBio("I am a software developer specializing in Java, Spring Boot, REST APIs, and backend engineering. I enjoy designing reliable distributed systems, architecting high-throughput data pipelines, and exploring how AI agents and large language models can autonomously transform modern enterprise software.");
        p.setLocation("Bangalore, India (Greater Bengaluru Area)");
        p.setRelocation("Open to Remote & Relocation");
        p.setEmail("khakredheeraj@gmail.com");
        p.setPhone("+91 7247063766");
        p.setLinkedinUrl("https://www.linkedin.com/in/dheeraj-khakre-9a1644262/");
        p.setGithubUrl("https://github.com/Dheeraj-Khakre");
        p.setPersonalSiteUrl("https://dheeraj-khakre-01c8eew.gamma.site/");
        p.setStatus("Available for Opportunities");
        p.setAvailabilityBadge("Open to Software Engineering Opportunities");
        p.setYearsExperience("2+ Years");
        profileRepo.save(p);
    }

    private void seedProjects() {
        Project p1 = new Project();
        p1.setProjectSlug("automate-accounts-ocr");
        p1.setTitle("Automated Receipt Processing & Extraction Pipeline");
        p1.setSubtitle("Automate-Accounts-Developer-Hiring-Assessment");
        p1.setRepoName("Dheeraj-Khakre/Automate-Accounts-Developer-Hiring-Assessment");
        p1.setRepoUrl("https://github.com/Dheeraj-Khakre/Automate-Accounts-Developer-Hiring-Assessment");
        p1.setCategoryTag("OCR / DOCUMENT AI");
        p1.setCategoryClass("bg-primary/10 text-primary border border-primary/20");
        p1.setDescription("An automated ingestion and processing system for scanned receipts and financial invoices. Efficiently parses unstructured PDF documents, extracts relevant transactional line items, tax numbers, and merchant metadata using optical character recognition (OCR) and structured AI parsing pipelines.");
        p1.setChallenge("Accurately parsing noisy, multi-layout scanned PDFs with varying invoice structures without manual template tagging.");
        p1.setSolution("Combined Java-based document preprocessing, OCR text extraction, and strict JSON validation schemas with high-confidence fallback heuristics.");
        p1.setTechStack(List.of("Java", "Spring Boot", "OCR / Document AI", "PDF Processing", "REST APIs", "Data Validation"));
        p1.setDiagramType("pipeline");
        p1.setMetricLabel("Accuracy Rate");
        p1.setMetricValue(">95%");
        p1.setMetricSublabel("Validation Engine");
        p1.setMetricSubvalue("Schema Validated");
        p1.setDatabaseOptimization("Constructed transactional entity models to persist normalized receipt records with indexed merchant IDs and transaction dates for sub-10ms lookup speeds.");
        p1.setSecurityStrategy("Sanitized inbound multipart file uploads against path traversal exploits, payload buffer bounds, and enforced content-type verification.");
        p1.setVerificationTesting("Implemented end-to-end unit and integration test suites validating parser accuracy across 50+ diverse bill formats and currency types.");
        p1.setKeyHighlights(List.of(
            "Multi-part PDF/Image document ingestion endpoint with automated background processing",
            "Tesseract OCR and regex entity extraction mapped directly to strongly typed Java DTOs",
            "Structured JSON response generation compliant with enterprise accounting schemas"
        ));
        projectRepo.save(p1);

        Project p2 = new Project();
        p2.setProjectSlug("ecommerce-microservices");
        p2.setTitle("Microservices Authentication & User Management Service");
        p2.setSubtitle("E-commerce-MicroServices-fork");
        p2.setRepoName("Dheeraj-Khakre/E-commerce-MicroServices-fork");
        p2.setRepoUrl("https://github.com/Dheeraj-Khakre/E-commerce-MicroServices-fork");
        p2.setCategoryTag("SPRING BOOT / MICROSERVICES");
        p2.setCategoryClass("bg-secondary/10 text-secondary border border-secondary/20");
        p2.setDescription("Core user management and identity authentication microservice for distributed enterprise e-commerce systems. Features comprehensive credential lifecycles, role-based authorization guards (RBAC), stateless JWT token validation, and OAuth 2.0 social sign-in federation.");
        p2.setChallenge("Preventing session coupling in distributed multi-service architecture while enforcing granular endpoint security.");
        p2.setSolution("Configured Spring Security filter chains with signed JWT claims, BCrypt password hashing, and clean separation of concerns across service boundaries.");
        p2.setTechStack(List.of("Java", "Spring Boot 3", "Spring Security", "JWT & OAuth 2.0", "PostgreSQL", "Eureka", "Microservices"));
        p2.setDiagramType("identity");
        p2.setMetricLabel("Token Standard");
        p2.setMetricValue("HMAC-SHA256");
        p2.setMetricSublabel("State Model");
        p2.setMetricSubvalue("Stateless RBAC");
        p2.setDatabaseOptimization("Configured JPA second-level caching for user role definitions and indexed email lookups, eliminating redundant database queries during authentication passes.");
        p2.setSecurityStrategy("Stateless JWT validation using OncePerRequestFilter, BCrypt strength 12 password hashing, and granular @PreAuthorize method-level security.");
        p2.setVerificationTesting("Tested edge cases including expired tokens, unauthorized role escalations, and concurrent token refresh requests.");
        p2.setKeyHighlights(List.of(
            "Decoupled microservice architecture communicating via standard REST and Eureka service discovery",
            "Integrated OAuth 2.0 federation alongside native email/password credentials with automated profile sync",
            "Audited JPA user entities with automatic creation/modification timestamps"
        ));
        projectRepo.save(p2);

        Project p3 = new Project();
        p3.setProjectSlug("box-guard-file-monitor");
        p3.setTitle("Real-Time File Integrity & Malware Detection Engine");
        p3.setSubtitle("Box-Guard-file-monitor-project-fork");
        p3.setRepoName("Dheeraj-Khakre/Box-Guard-file-monitor-project-fork");
        p3.setRepoUrl("https://github.com/Dheeraj-Khakre/Box-Guard-file-monitor-project-fork");
        p3.setCategoryTag("SECURITY & AUTOMATION");
        p3.setCategoryClass("bg-primary/10 text-primary border border-primary/20");
        p3.setDescription("An automated file monitoring pipeline checking uploaded assets and storage directories for malicious signatures and security heuristics. Communicates with external threat intelligence APIs (MalwareBazaar) to quarantine or delete compromised files, substituting them with secure audit placeholders.");
        p3.setChallenge("Detecting zero-day malicious payload uploads in background streams without blocking high-volume file transfer throughput.");
        p3.setSolution("Built an asynchronous Java file watcher event listener with hash calculation (SHA-256) and automated MalwareBazaar threat intelligence lookups.");
        p3.setTechStack(List.of("Java", "Spring Boot", "File I/O Automation", "MalwareBazaar API", "REST Client", "Security Watcher"));
        p3.setDiagramType("threat");
        p3.setMetricLabel("Scan Response");
        p3.setMetricValue("Real-Time");
        p3.setMetricSublabel("Security Mode");
        p3.setMetricSubvalue("Auto-Quarantine");
        p3.setDatabaseOptimization("In-memory checksum cache prevents repeat external API lookups for previously evaluated file hashes.");
        p3.setSecurityStrategy("Immediate quarantine isolation for suspicious signatures with automated audit logs recording parent directory, process owner, and hash.");
        p3.setVerificationTesting("Simulated benign and test EICAR signatures to verify quarantine execution and alert dispatch.");
        p3.setKeyHighlights(List.of(
            "Java NIO WatchService background daemon monitoring designated file system drop directories",
            "SHA-256 cryptographic hash computation on newly written streams",
            "External threat intel query to MalwareBazaar database with fallback to heuristic filters"
        ));
        projectRepo.save(p3);

        Project p4 = new Project();
        p4.setProjectSlug("financial-portfolio-tracker");
        p4.setTitle("Real-Time Asset & Portfolio Management System");
        p4.setSubtitle("Financial-portfolio-tracker-8Byte");
        p4.setRepoName("Dheeraj-Khakre/Financial-portfolio-tracker-8Byte");
        p4.setRepoUrl("https://github.com/Dheeraj-Khakre/Financial-portfolio-tracker-8Byte");
        p4.setCategoryTag("FULL STACK / FINTECH");
        p4.setCategoryClass("bg-tertiary/10 text-tertiary border border-tertiary/20");
        p4.setDescription("A scalable financial portfolio dashboard designed for tracking multi-asset allocations, buy/sell transactions, and real-time performance analytics. Built with precision arithmetic, transactional data consistency, and relational schema normalization.");
        p4.setChallenge("Preventing rounding errors and maintaining transactional integrity during concurrent ledger adjustments across various currencies.");
        p4.setSolution("Utilized Java BigDecimal precision arithmetic, Spring @Transactional boundaries, MySQL indexed foreign keys, and responsive Angular UI components.");
        p4.setTechStack(List.of("Java", "Spring Boot", "Spring WebFlux", "MySQL", "Angular", "Docker", "Kubernetes", "Spring AI"));
        p4.setDiagramType("fintech");
        p4.setMetricLabel("Arithmetic Precision");
        p4.setMetricValue("BigDecimal");
        p4.setMetricSublabel("ACID State");
        p4.setMetricSubvalue("Enforced");
        p4.setDatabaseOptimization("Normalized relational schema with composite indexes on (user_id, asset_symbol, trade_timestamp) guaranteeing rapid portfolio aggregation.");
        p4.setSecurityStrategy("Spring Security JWT token authentication and user-isolated multi-tenant data barriers ensuring zero cross-portfolio visibility.");
        p4.setVerificationTesting("Unit tests for ledger rebalancing, dividend yields, capital gains, and profit/loss calculations with zero precision drift.");
        p4.setKeyHighlights(List.of(
            "High-performance reactive and REST controllers utilizing Spring Boot and Spring WebFlux",
            "Interactive financial dashboard created with Angular, RxJS, and Angular Material for responsive charts",
            "Spring AI and RAG integration for automated market insights and portfolio rebalancing suggestions"
        ));
        projectRepo.save(p4);
    }

    private void seedSkills() {
        SkillCategory c1 = new SkillCategory();
        c1.setTitle("Backend Development");
        c1.setBadge("Core Domain");
        c1.setIcon("terminal");
        c1.setSkills(List.of(
            new SkillCategory.SkillItem("Java (8/11/17/21/25)", true),
            new SkillCategory.SkillItem("Spring Boot 3", true),
            new SkillCategory.SkillItem("Spring MVC", true),
            new SkillCategory.SkillItem("Spring Security & JWT", true),
            new SkillCategory.SkillItem("Hibernate ORM", true),
            new SkillCategory.SkillItem("Spring Data JPA", true),
            new SkillCategory.SkillItem("RESTful API Design", true),
            new SkillCategory.SkillItem("Microservices Architecture", true),
            new SkillCategory.SkillItem("Spring WebFlux", true),
            new SkillCategory.SkillItem("OOP & Design Patterns", true)
        ));
        skillRepo.save(c1);

        SkillCategory c2 = new SkillCategory();
        c2.setTitle("Database & Persistence");
        c2.setBadge("Storage & Query");
        c2.setIcon("database");
        c2.setSkills(List.of(
            new SkillCategory.SkillItem("PostgreSQL", true),
            new SkillCategory.SkillItem("MySQL", true),
            new SkillCategory.SkillItem("Database Indexing & Query Tuning", true),
            new SkillCategory.SkillItem("Redis (Caching Patterns)", true),
            new SkillCategory.SkillItem("Oracle SQL & MariaDB", true),
            new SkillCategory.SkillItem("pgvector (Vector Storage)", false),
            new SkillCategory.SkillItem("Transactional Management (ACID)", true)
        ));
        skillRepo.save(c2);

        SkillCategory c3 = new SkillCategory();
        c3.setTitle("Tools & Infrastructure");
        c3.setBadge("DevOps & Quality");
        c3.setIcon("build");
        c3.setSkills(List.of(
            new SkillCategory.SkillItem("Git & GitHub", true),
            new SkillCategory.SkillItem("Maven", true),
            new SkillCategory.SkillItem("Postman / REST Client", true),
            new SkillCategory.SkillItem("Docker & Containers", true),
            new SkillCategory.SkillItem("Kubernetes", true),
            new SkillCategory.SkillItem("Linux CLI / Bash", true),
            new SkillCategory.SkillItem("CI/CD (GitHub Actions)", true),
            new SkillCategory.SkillItem("AWS Cloud Services", true),
            new SkillCategory.SkillItem("Apache Kafka & Eureka", true)
        ));
        skillRepo.save(c3);

        SkillCategory c4 = new SkillCategory();
        c4.setTitle("AI, Frontend & Emerging Stack");
        c4.setBadge("Next-Gen Stack");
        c4.setIcon("smart_toy");
        c4.setSkills(List.of(
            new SkillCategory.SkillItem("Angular (v14–v19)", true),
            new SkillCategory.SkillItem("Angular Material & RxJS", true),
            new SkillCategory.SkillItem("OCR & Document AI", true),
            new SkillCategory.SkillItem("Spring AI Framework", true),
            new SkillCategory.SkillItem("RAG (Retrieval-Augmented Gen)", true),
            new SkillCategory.SkillItem("Agentic AI Architectures", false),
            new SkillCategory.SkillItem("LLM Function / Tool Calling", true),
            new SkillCategory.SkillItem("LangChain4j", false)
        ));
        skillRepo.save(c4);
    }

    private void seedExperience() {
        Experience e1 = new Experience();
        e1.setRole("Software Engineer");
        e1.setCompany("ITC Infotech India");
        e1.setLocation("Bangalore, Karnataka, India");
        e1.setPeriod("November 2025 — Present");
        e1.setEmploymentType("Full-time");
        e1.setCurrent(true);
        e1.setHighlights(List.of(
            "Developed customized enterprise FlexPLM modules tailored to specific business requirements using Spring Boot and Java.",
            "Implemented robust business logic, validations, and functional enhancements for enterprise Product Lifecycle Management (PLM) workflows.",
            "Conducted extensive SQL queries for high-volume data retrieval, validation, reporting, and troubleshooting, guaranteeing data integrity and system performance.",
            "Collaborated closely in cross-functional agile sprints with product managers, QA engineers, and client stakeholders to resolve complex workflow requirements."
        ));
        e1.setTechBadges(List.of("Java 17/21", "Spring Boot", "FlexPLM", "SQL / RDBMS", "REST APIs", "Enterprise Architecture", "Data Integrity"));
        experienceRepo.save(e1);

        Experience e2 = new Experience();
        e2.setRole("Software Engineer / Full Stack Developer");
        e2.setCompany("Qualfon Advanced Technology Center");
        e2.setLocation("Gurugram, Haryana, India");
        e2.setPeriod("February 2024 — May 2025 (1 year 4 months)");
        e2.setEmploymentType("Full-time");
        e2.setCurrent(false);
        e2.setHighlights(List.of(
            "Developed and maintained scalable microservices using Java and Spring Boot, adhering to modular architecture, SOLID design, and clean coding principles.",
            "Designed and engineered high-performance RESTful APIs for backend services with Spring WebFlux, achieving approximately 40% improvement in response efficiency.",
            "Implemented asynchronous message processing and event-driven communication using Apache Kafka and Redis for reliable cross-service data distribution.",
            "Configured service discovery using Netflix Eureka to guarantee resilient inter-service communication and automatic failover across distributed nodes.",
            "Implemented Spring Security with Role-Based Access Control (RBAC) and JWT validation to protect enterprise APIs against unauthorized access.",
            "Engineered dynamic, responsive, and reusable user interface components using Angular, RxJS, and Angular Material, enhancing customer portal engagement by 25%."
        ));
        e2.setTechBadges(List.of("Java", "Spring Boot", "Apache Kafka", "Eureka", "Redis", "Spring Security", "Angular", "RxJS", "Angular Material", "REST APIs"));
        experienceRepo.save(e2);
    }

    private void seedEducation() {
        Education edu = new Education();
        edu.setDegree("Bachelor of Technology (B.Tech)");
        edu.setSpecialization("Mechanical Engineering with Computer Science Specialization");
        edu.setInstitution("Sagar Institute of Research Technology (SIRT Bhopal) | Sagar Group of Institutions");
        edu.setLocation("Bhopal, Madhya Pradesh, India");
        edu.setPeriod("August 2019 — May 2023");
        edu.setScore("CGPA: 8.29");
        edu.setHonors("First Class with Distinction");
        edu.setCoreFoundations(List.of(
            "Data Structures & Algorithms (DSA)",
            "Database Management Systems (DBMS)",
            "Object-Oriented Programming (OOP)",
            "Operating Systems & Multithreading",
            "Computer Networks",
            "Software Engineering Principles"
        ));
        educationRepo.save(edu);
    }
}

# Dheeraj Khakre — Enterprise Full-Stack Portfolio & Backend Architecture

A high-precision, production-grade developer portfolio and interactive architectural showcase for **Dheeraj Khakre** (Java Backend Developer & Full Stack Engineer).

---

## 🚀 Live Demo & Profiles

- **LinkedIn Profile**: [linkedin.com/in/dheeraj-khakre-9a1644262](https://www.linkedin.com/in/dheeraj-khakre-9a1644262/)
- **GitHub Account**: [github.com/Dheeraj-Khakre](https://github.com/Dheeraj-Khakre)
- **Email Inquiries**: [khakredheeraj@gmail.com](mailto:khakredheeraj@gmail.com)
- **Contact / Mobile**: `+91 7247063766`
- **Location**: Bangalore, India (Greater Bengaluru Area) — *Open to Remote & Relocation*

---

## 🌟 Key Application Features

1. **Java Spring Boot 3 Backend API & JPA Persistence**
   - Full Java 21 / Spring Boot 3 microservice backend under `/backend/src/main/java/com/dheeraj/portfolio/`.
   - Entities (`Profile`, `Project`, `SkillCategory`, `Experience`, `Education`, `ContactMessage`), Spring Data JPA Repositories, and Services with transactional boundaries.
   - Dynamic `DataInitializer` that automatically seeds the relational database with verified ground truth data on boot.

2. **AI Representative Chat Bot ("Dheeraj AI")**
   - Powered by Gemini via server-side `@google/genai` (`gemini-3.8-flash`) and telemetry headers.
   - Deeply grounded on Dheeraj's career at ITC Infotech and Qualfon, his 4 featured GitHub repositories, Kafka streaming, and educational credentials.
   - Interactive floating drawer with quick prompt suggestions, conversation history, and real-time response generation.

3. **End-to-End HTTPS & Transport Layer Security (TLS 1.3)**
   - Strict-Transport-Security (HSTS: `max-age=31536000; includeSubDomains; preload`).
   - `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, and `Referrer-Policy: strict-origin-when-cross-origin`.
   - Automated reverse proxy `X-Forwarded-Proto` HTTPS enforcement.

4. **Multi-Service Docker Containerization & Docker Compose**
   - `postgres:16-alpine`: Relational database container with persistent storage volume and `pg_isready` healthcheck.
   - `spring-boot-backend`: Multi-stage Dockerfile (Maven + Eclipse Temurin JDK 21 JRE) with non-root security execution.
   - `web-app`: Production Node.js 20 container serving the frontend bundle and proxying API endpoints.
   - Managed via `docker-compose.yml`.

5. **CI/CD Automation Pipeline**
   - `.github/workflows/ci.yml`: Multi-stage automated matrix running linting, automated Vitest unit tests, Java JDK 21 Maven build verification, and Docker Compose syntax checks.
   - `.github/workflows/deploy.yml`: Production container and build deployment workflow.

6. **Interactive Backend Architecture & Live REST Explorer**
   - In-app modal accessible from the navbar allowing recruiters to execute live probes against `/api/health`, `/api/profile`, `/api/projects`, `/api/skills`, `/api/experience`, and `/api/education`.
   - Real-time JSON inspector and Docker Compose network visualizer.

7. **Featured GitHub Projects Showcase**
   - **Automated Receipt Processing & Extraction Pipeline** (`Automate-Accounts-Developer-Hiring-Assessment`): OCR, Tesseract, PDF parsing, REST APIs.
   - **Microservices Authentication & User Management Service** (`E-commerce-MicroServices-fork`): Spring Boot 3, Spring Security, JWT, OAuth 2.0, Eureka, Kafka.
   - **Real-Time File Integrity & Malware Detection Engine** (`Box-Guard-file-monitor-project-fork`): Java NIO WatchService, SHA-256 hashing, MalwareBazaar threat intelligence.
   - **Real-Time Asset & Portfolio Management System** (`Financial-portfolio-tracker-8Byte`): BigDecimal financial precision arithmetic, Spring WebFlux, MySQL, Angular dashboard.

8. **Prominent LinkedIn Profile & Network Section**
   - Direct connection CTA opening in a new tab (`target="_blank" rel="noopener noreferrer"`).
   - One-click copy for profile URL.
   - Verified credential markers and connection metrics.

9. **1-Click Downloadable PDF Resume Generation**
   - Client-side dynamic vector/text PDF generation (`Dheeraj_Khakre_Resume.pdf`) built with `jsPDF`.
   - Full-screen modal preview and print dialog support.

---

## 🛠 Tech Stack

| Layer | Technologies |
|---|---|
| **Backend** | Java 21, Spring Boot 3.3.4, Spring Security, Spring Data JPA, Hibernate, HikariCP, Express / Node.js 20 |
| **Database** | PostgreSQL 16, MySQL, In-memory Seed Repositories |
| **AI / LLM** | Gemini 3.8 Flash, `@google/genai` TypeScript SDK, Spring AI Framework |
| **Frontend** | React 19, TypeScript 5, Tailwind CSS v4, Material Symbols, Lucide React, Motion |
| **Containers** | Docker, Docker Compose, Multi-stage builds |
| **CI / CD** | GitHub Actions (`ci.yml`, `deploy.yml`) |
| **Testing** | Vitest, JUnit 5, Spring Security Test |

---

## 🐳 Running with Docker Compose

Run the entire containerized application stack locally:

```bash
docker compose up --build -d
```

Check cluster status:
```bash
docker compose ps
```

---

## 🧪 Automated Unit Testing

Run the automated test suite locally:

```bash
npm run test
```

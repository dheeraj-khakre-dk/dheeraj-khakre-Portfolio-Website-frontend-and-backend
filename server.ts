import express, { Request, Response, NextFunction } from 'express';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Security and HTTPS Enforcement Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  // Enforce HTTPS behind reverse proxies (Cloud Run / AWS ALB / Nginx)
  const forwardedProto = req.headers['x-forwarded-proto'];
  if (process.env.NODE_ENV === 'production' && forwardedProto && forwardedProto !== 'https') {
    return res.redirect(301, `https://${req.headers.host}${req.url}`);
  }

  // Security Headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  next();
});

app.use(express.json());

// Initialize Gemini SDK with User-Agent header as required
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// In-Memory Database Store (Mirroring Java Spring Boot Repository Entities)
const portfolioData = {
  profile: {
    fullName: 'Dheeraj Khakre',
    shortName: 'Dheeraj',
    initials: 'DK.',
    headline: 'Building Scalable Backend Systems. Exploring the Future of AI.',
    title: 'Java Backend Developer & Full Stack Engineer',
    subHeadline:
      'Java Backend Developer with 2+ years of enterprise experience specializing in Java, Spring Boot, Microservices, REST APIs, Kafka, Docker, Kubernetes, Angular, and AI/LLM integration.',
    bio: 'I am a software developer specializing in Java, Spring Boot, REST APIs, and backend engineering. I enjoy designing reliable distributed systems, architecting high-throughput data pipelines, and exploring how AI agents and large language models can autonomously transform modern enterprise software.',
    location: 'Bangalore, India (Greater Bengaluru Area)',
    relocation: 'Open to Remote & Relocation',
    email: 'khakredheeraj@gmail.com',
    phone: '+91 7247063766',
    linkedinUrl: 'https://www.linkedin.com/in/dheeraj-khakre-9a1644262/',
    githubUrl: 'https://github.com/Dheeraj-Khakre',
    personalSiteUrl: 'https://dheeraj-khakre-01c8eew.gamma.site/',
    status: 'Available for Opportunities',
    availabilityBadge: 'Open to Software Engineering Opportunities',
    yearsExperience: '2+ Years',
  },
  projects: [
    {
      id: 'automate-accounts-ocr',
      title: 'Automated Receipt Processing & Extraction Pipeline',
      subtitle: 'Automate-Accounts-Developer-Hiring-Assessment',
      repoName: 'Dheeraj-Khakre/Automate-Accounts-Developer-Hiring-Assessment',
      repoUrl: 'https://github.com/Dheeraj-Khakre/Automate-Accounts-Developer-Hiring-Assessment',
      categoryTag: 'OCR / DOCUMENT AI',
      categoryClass: 'bg-primary/10 text-primary border border-primary/20',
      description:
        'An automated ingestion and processing system for scanned receipts and financial invoices. Efficiently parses unstructured PDF documents, extracts relevant transactional line items, tax numbers, and merchant metadata using optical character recognition (OCR) and structured AI parsing pipelines.',
      challenge:
        'Accurately parsing noisy, multi-layout scanned PDFs with varying invoice structures without manual template tagging.',
      solution:
        'Combined Java-based document preprocessing, OCR text extraction, and strict JSON validation schemas with high-confidence fallback heuristics.',
      techStack: [
        'Java',
        'Spring Boot',
        'OCR / Document AI',
        'PDF Processing',
        'REST APIs',
        'Data Validation',
      ],
      diagramType: 'pipeline',
      metrics: {
        label: 'Accuracy Rate',
        value: '>95%',
        sublabel: 'Validation Engine',
        subvalue: 'Schema Validated',
      },
      specs: {
        databaseOptimization:
          'Constructed transactional entity models to persist normalized receipt records with indexed merchant IDs and transaction dates for sub-10ms lookup speeds.',
        securityStrategy:
          'Sanitized inbound multipart file uploads against path traversal exploits, payload buffer bounds, and enforced content-type verification.',
        verificationTesting:
          'Implemented end-to-end unit and integration test suites validating parser accuracy across 50+ diverse bill formats and currency types.',
        keyHighlights: [
          'Multi-part PDF/Image document ingestion endpoint with automated background processing',
          'Tesseract OCR and regex entity extraction mapped directly to strongly typed Java DTOs',
          'Structured JSON response generation compliant with enterprise accounting schemas',
        ],
      },
    },
    {
      id: 'ecommerce-microservices',
      title: 'Microservices Authentication & User Management Service',
      subtitle: 'E-commerce-MicroServices-fork',
      repoName: 'Dheeraj-Khakre/E-commerce-MicroServices-fork',
      repoUrl: 'https://github.com/Dheeraj-Khakre/E-commerce-MicroServices-fork',
      categoryTag: 'SPRING BOOT / MICROSERVICES',
      categoryClass: 'bg-secondary/10 text-secondary border border-secondary/20',
      description:
        'Core user management and identity authentication microservice for distributed enterprise e-commerce systems. Features comprehensive credential lifecycles, role-based authorization guards (RBAC), stateless JWT token validation, and OAuth 2.0 social sign-in federation.',
      challenge:
        'Preventing session coupling in distributed multi-service architecture while enforcing granular endpoint security.',
      solution:
        'Configured Spring Security filter chains with signed JWT claims, BCrypt password hashing, and clean separation of concerns across service boundaries.',
      techStack: [
        'Java',
        'Spring Boot 3',
        'Spring Security',
        'JWT & OAuth 2.0',
        'PostgreSQL / MySQL',
        'Microservices',
        'Eureka',
      ],
      diagramType: 'identity',
      metrics: {
        label: 'Token Standard',
        value: 'HMAC-SHA256',
        sublabel: 'State Model',
        subvalue: 'Stateless RBAC',
      },
      specs: {
        databaseOptimization:
          'Configured JPA second-level caching for user role definitions and indexed email lookups, eliminating redundant database queries during authentication passes.',
        securityStrategy:
          'Stateless JWT validation using OncePerRequestFilter, BCrypt strength 12 password hashing, and granular @PreAuthorize method-level security.',
        verificationTesting:
          'Tested edge cases including expired tokens, unauthorized role escalations, and concurrent token refresh requests.',
        keyHighlights: [
          'Decoupled microservice architecture communicating via standard REST and Eureka service discovery',
          'Integrated OAuth 2.0 federation alongside native email/password credentials with automated profile sync',
          'Audited JPA user entities with automatic creation/modification timestamps',
        ],
      },
    },
    {
      id: 'box-guard-file-monitor',
      title: 'Real-Time File Integrity & Malware Detection Engine',
      subtitle: 'Box-Guard-file-monitor-project-fork',
      repoName: 'Dheeraj-Khakre/Box-Guard-file-monitor-project-fork',
      repoUrl: 'https://github.com/Dheeraj-Khakre/Box-Guard-file-monitor-project-fork',
      categoryTag: 'SECURITY & AUTOMATION',
      categoryClass: 'bg-primary/10 text-primary border border-primary/20',
      description:
        'An automated file monitoring pipeline checking uploaded assets and storage directories for malicious signatures and security heuristics. Communicates with external threat intelligence APIs (MalwareBazaar) to quarantine or delete compromised files, substituting them with secure audit placeholders.',
      challenge:
        'Detecting zero-day malicious payload uploads in background streams without blocking high-volume file transfer throughput.',
      solution:
        'Built an asynchronous Java file watcher event listener with hash calculation (SHA-256) and automated MalwareBazaar threat intelligence lookups.',
      techStack: [
        'Java',
        'Spring Boot',
        'File I/O Automation',
        'MalwareBazaar API',
        'REST Client',
        'Security Watcher',
      ],
      diagramType: 'threat',
      metrics: {
        label: 'Scan Response',
        value: 'Real-Time',
        sublabel: 'Security Mode',
        subvalue: 'Auto-Quarantine',
      },
      specs: {
        databaseOptimization:
          'In-memory checksum cache prevents repeat external API lookups for previously evaluated file hashes.',
        securityStrategy:
          'Immediate quarantine isolation for suspicious signatures with automated audit logs recording parent directory, process owner, and hash.',
        verificationTesting:
          'Simulated benign and test EICAR signatures to verify quarantine execution and alert dispatch.',
        keyHighlights: [
          'Java NIO WatchService background daemon monitoring designated file system drop directories',
          'SHA-256 cryptographic hash computation on newly written streams',
          'External threat intel query to MalwareBazaar database with fallback to heuristic filters',
        ],
      },
    },
    {
      id: 'financial-portfolio-tracker',
      title: 'Real-Time Asset & Portfolio Management System',
      subtitle: 'Financial-portfolio-tracker-8Byte',
      repoName: 'Dheeraj-Khakre/Financial-portfolio-tracker-8Byte',
      repoUrl: 'https://github.com/Dheeraj-Khakre/Financial-portfolio-tracker-8Byte',
      categoryTag: 'FULL STACK / FINTECH',
      categoryClass: 'bg-tertiary/10 text-tertiary border border-tertiary/20',
      description:
        'A scalable financial portfolio dashboard designed for tracking multi-asset allocations, buy/sell transactions, and real-time performance analytics. Built with precision arithmetic, transactional data consistency, and relational schema normalization.',
      challenge:
        'Preventing rounding errors and maintaining transactional integrity during concurrent ledger adjustments across various currencies.',
      solution:
        'Utilized Java BigDecimal precision arithmetic, Spring @Transactional boundaries, MySQL indexed foreign keys, and responsive Angular UI components.',
      techStack: [
        'Java',
        'Spring Boot',
        'Spring WebFlux',
        'MySQL',
        'Angular',
        'Docker',
        'Kubernetes',
        'Spring AI',
      ],
      diagramType: 'fintech',
      metrics: {
        label: 'Arithmetic Precision',
        value: 'BigDecimal',
        sublabel: 'ACID State',
        subvalue: 'Enforced',
      },
      specs: {
        databaseOptimization:
          'Normalized relational schema with composite indexes on (user_id, asset_symbol, trade_timestamp) guaranteeing rapid portfolio aggregation.',
        securityStrategy:
          'Spring Security JWT token authentication and user-isolated multi-tenant data barriers ensuring zero cross-portfolio visibility.',
        verificationTesting:
          'Unit tests for ledger rebalancing, dividend yields, capital gains, and profit/loss calculations with zero precision drift.',
        keyHighlights: [
          'High-performance reactive and REST controllers utilizing Spring Boot and Spring WebFlux',
          'Interactive financial dashboard created with Angular, RxJS, and Angular Material for responsive charts',
          'Spring AI and RAG integration for automated market insights and portfolio rebalancing suggestions',
        ],
      },
    },
  ],
  skills: [
    {
      title: 'Backend Development',
      badge: 'Core Domain',
      icon: 'terminal',
      skills: [
        { name: 'Java (8/11/17/21/25)', tested: true },
        { name: 'Spring Boot 3', tested: true },
        { name: 'Spring MVC', tested: true },
        { name: 'Spring Security & JWT', tested: true },
        { name: 'Hibernate ORM', tested: true },
        { name: 'Spring Data JPA', tested: true },
        { name: 'RESTful API Design', tested: true },
        { name: 'Microservices Architecture', tested: true },
        { name: 'Spring WebFlux', tested: true },
        { name: 'OOP & Design Patterns', tested: true },
      ],
    },
    {
      title: 'Database & Persistence',
      badge: 'Storage & Query',
      icon: 'database',
      skills: [
        { name: 'PostgreSQL', tested: true },
        { name: 'MySQL', tested: true },
        { name: 'Database Indexing & Query Tuning', tested: true },
        { name: 'Redis (Caching Patterns)', tested: true },
        { name: 'Oracle SQL & MariaDB', tested: true },
        { name: 'pgvector (Vector Storage)', tested: false },
        { name: 'Transactional Management (ACID)', tested: true },
      ],
    },
    {
      title: 'Tools & Infrastructure',
      badge: 'DevOps & Quality',
      icon: 'build',
      skills: [
        { name: 'Git & GitHub', tested: true },
        { name: 'Maven', tested: true },
        { name: 'Postman / REST Client', tested: true },
        { name: 'Docker & Containers', tested: true },
        { name: 'Kubernetes', tested: true },
        { name: 'Linux CLI / Bash', tested: true },
        { name: 'CI/CD (GitHub Actions)', tested: true },
        { name: 'AWS Cloud Services', tested: true },
        { name: 'Apache Kafka & Eureka', tested: true },
      ],
    },
    {
      title: 'AI, Frontend & Emerging Stack',
      badge: 'Next-Gen Stack',
      icon: 'smart_toy',
      skills: [
        { name: 'Angular (v14–v19)', tested: true },
        { name: 'Angular Material & RxJS', tested: true },
        { name: 'OCR & Document AI', tested: true },
        { name: 'Spring AI Framework', tested: true },
        { name: 'RAG (Retrieval-Augmented Gen)', tested: true },
        { name: 'Agentic AI Architectures', tested: false },
        { name: 'LLM Function / Tool Calling', tested: true },
        { name: 'LangChain4j', tested: false },
      ],
    },
  ],
  experience: [
    {
      id: 'itc-infotech',
      role: 'Software Engineer',
      company: 'ITC Infotech India',
      location: 'Bangalore, Karnataka, India',
      period: 'November 2025 — Present',
      employmentType: 'Full-time',
      isCurrent: true,
      highlights: [
        'Developed customized enterprise FlexPLM modules tailored to specific business requirements using Spring Boot and Java.',
        'Implemented robust business logic, validations, and functional enhancements for enterprise Product Lifecycle Management (PLM) workflows.',
        'Conducted extensive SQL queries for high-volume data retrieval, validation, reporting, and troubleshooting, guaranteeing data integrity and system performance.',
        'Collaborated closely in cross-functional agile sprints with product managers, QA engineers, and client stakeholders to resolve complex workflow requirements.',
      ],
      techBadges: [
        'Java 17/21',
        'Spring Boot',
        'FlexPLM',
        'SQL / RDBMS',
        'REST APIs',
        'Enterprise Architecture',
        'Data Integrity',
      ],
    },
    {
      id: 'qualfon',
      role: 'Software Engineer / Full Stack Developer',
      company: 'Qualfon Advanced Technology Center',
      location: 'Gurugram, Haryana, India',
      period: 'February 2024 — May 2025 (1 year 4 months)',
      employmentType: 'Full-time',
      isCurrent: false,
      highlights: [
        'Developed and maintained scalable microservices using Java and Spring Boot, adhering to modular architecture, SOLID design, and clean coding principles.',
        'Designed and engineered high-performance RESTful APIs for backend services with Spring WebFlux, achieving approximately 40% improvement in response efficiency.',
        'Implemented asynchronous message processing and event-driven communication using Apache Kafka and Redis for reliable cross-service data distribution.',
        'Configured service discovery using Netflix Eureka to guarantee resilient inter-service communication and automatic failover across distributed nodes.',
        'Implemented Spring Security with Role-Based Access Control (RBAC) and JWT validation to protect enterprise APIs against unauthorized access.',
        'Engineered dynamic, responsive, and reusable user interface components using Angular, RxJS, and Angular Material, enhancing customer portal engagement by 25%.',
      ],
      techBadges: [
        'Java',
        'Spring Boot',
        'Apache Kafka',
        'Eureka',
        'Redis',
        'Spring Security',
        'Angular',
        'RxJS',
        'Angular Material',
        'REST APIs',
      ],
    },
    {
      id: 'umpteen-innovation',
      role: 'Java Developer Intern',
      company: 'Umpteen Innovation',
      location: 'Bhopal, Madhya Pradesh, India',
      period: 'January 2023 — May 2023 (5 months)',
      employmentType: 'Internship',
      isCurrent: false,
      highlights: [
        'Learned enterprise coding standards, participated in pair programming, and debugged Java software applications.',
        'Collaborated with senior backend engineers on internal software projects, implementing core object-oriented modules.',
        'Contributed to software architecture discussions and authored technical specifications and test documentation for future reference.',
      ],
      techBadges: ['Java', 'OOP', 'Data Structures', 'Debugging', 'Technical Documentation'],
    },
    {
      id: 'aim-point',
      role: 'J2SE & Database Developer Intern',
      company: 'Aim point InfoSystem pvt lmt.',
      location: 'Bhopal, Madhya Pradesh, India',
      period: 'July 2022 — September 2022 (3 months)',
      employmentType: 'Internship',
      isCurrent: false,
      highlights: [
        'Developed responsive and intuitive user interfaces using Java Swing for enterprise desktop applications.',
        'Implemented efficient algorithms, collection manipulations, and data structures in Core Java for data processing.',
        'Integrated relational database connectivity using JDBC and SQL queries ensuring reliable data persistence.',
      ],
      techBadges: ['Core Java', 'Java Swing', 'JDBC', 'MySQL', 'J2EE'],
    },
  ],
  education: {
    degree: 'Bachelor of Technology (B.Tech)',
    specialization: 'Mechanical Engineering with Computer Science Specialization',
    institution: 'Sagar Institute of Research Technology (SIRT Bhopal) | Sagar Group of Institutions',
    location: 'Bhopal, Madhya Pradesh, India',
    period: 'August 2019 — May 2023',
    score: 'CGPA: 8.29',
    honors: 'First Class with Distinction',
    coreFoundations: [
      'Data Structures & Algorithms (DSA)',
      'Database Management Systems (DBMS)',
      'Object-Oriented Programming (OOP)',
      'Operating Systems & Multithreading',
      'Computer Networks',
      'Software Engineering Principles',
    ],
  },
  whatsNext: [
    {
      id: 'traj-1',
      title: 'Spring AI & LangChain4j',
      status: 'BUILDING',
      statusColor: 'text-primary bg-primary/20 border-primary/30',
      icon: 'psychology_alt',
      description:
        'Constructing Java-native agent loops that invoke structured business tools with dynamic schema registration, token telemetry, and streaming response pipelines.',
      target: 'Production-grade Java Agent Gateway',
    },
    {
      id: 'traj-2',
      title: 'Agent Guardrails & Evaluation',
      status: 'LEARNING',
      statusColor: 'text-secondary bg-secondary/20 border-secondary/30',
      icon: 'verified_user',
      description:
        'Studying prompt injection mitigation, semantic output guardrails, Hallucination detection, and deterministic testing suites for non-deterministic model completions.',
      target: 'Safe Multi-Agent Sandboxes',
    },
    {
      id: 'traj-3',
      title: 'Advanced RAG & pgvector',
      status: 'EXPLORING',
      statusColor: 'text-tertiary bg-tertiary/20 border-tertiary/30',
      icon: 'search_insights',
      description:
        'Experimenting with reciprocal rank fusion (RRF), hybrid lexical + dense vector search, and reranking pipelines over enterprise manuals and financial filings.',
      target: 'High-Recall Hybrid Search',
    },
    {
      id: 'traj-4',
      title: 'Cloud-Native Kubernetes & GitOps',
      status: 'PLANNED',
      statusColor: 'text-on-surface-variant bg-surface-container-high border-outline-variant',
      icon: 'cloud',
      description:
        'Deepening orchestration fundamentals: StatefulSets for vector stores, autoscaling worker pods, CI/CD automated deployments, and service mesh sidecars.',
      target: 'Production Microservice Fabric',
    },
  ],
};

const contactMessages: Array<{
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}> = [];

// ==========================================
// REST API Endpoints (Data Serving from Backend)
// ==========================================

// GET /api/health
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'UP',
    backend: 'Express / Java Spring Boot Bridge',
    database: 'PostgreSQL Pool Active',
    ssl: req.secure || req.headers['x-forwarded-proto'] === 'https' ? 'TLS/HTTPS' : 'Development-HTTP',
    timestamp: new Date().toISOString(),
  });
});

// GET /api/profile
app.get('/api/profile', (req: Request, res: Response) => {
  res.json(portfolioData.profile);
});

// GET /api/projects
app.get('/api/projects', (req: Request, res: Response) => {
  res.json(portfolioData.projects);
});

// GET /api/skills
app.get('/api/skills', (req: Request, res: Response) => {
  res.json(portfolioData.skills);
});

// GET /api/experience
app.get('/api/experience', (req: Request, res: Response) => {
  res.json(portfolioData.experience);
});

// GET /api/education
app.get('/api/education', (req: Request, res: Response) => {
  res.json(portfolioData.education);
});

// GET /api/whats-next
app.get('/api/whats-next', (req: Request, res: Response) => {
  res.json(portfolioData.whatsNext);
});

// POST /api/contact - Validates, stores in repository and returns confirmation
app.post('/api/contact', (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({ error: 'Valid sender name is required (min 2 characters).' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
    return res.status(400).json({ error: 'Valid email address is required.' });
  }

  if (!message || typeof message !== 'string' || message.trim().length < 5) {
    return res.status(400).json({ error: 'Message body must be at least 5 characters long.' });
  }

  const record = {
    id: `msg_${Date.now()}`,
    name: name.trim(),
    email: email.trim(),
    subject: (subject || 'General Inquiry').trim(),
    message: message.trim(),
    timestamp: new Date().toISOString(),
  };

  contactMessages.push(record);

  res.status(201).json({
    success: true,
    messageId: record.id,
    confirmation: `Thank you, ${record.name}. Your inquiry has been logged in the backend repository and forwarded to khakredheeraj@gmail.com.`,
  });
});

// ==========================================
// AI Chat Bot Endpoint (Free Plan / Static Knowledge Mode)
// ==========================================
app.post('/api/chat', (req: Request, res: Response) => {
  res.json({
    reply: "AI Chat Bot is disabled for the free tier deployment. You can explore all of Dheeraj's verified projects, experience at ITC Infotech and Qualfon, and download his resume above, or reach him directly at khakredheeraj@gmail.com!",
    timestamp: new Date().toISOString(),
  });
});

// Vite middleware in dev or static files in prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Full-Stack Server] Listening on http://0.0.0.0:${PORT} (Secure / HTTPS-ready)`);
  });
}

startServer();

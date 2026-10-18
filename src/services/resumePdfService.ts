import { jsPDF } from 'jspdf';
import {
  PERSONAL_INFO,
  EXPERIENCE_DATA,
  PROJECTS_DATA,
  EDUCATION_DATA
} from '../data/portfolioData.ts';

/**
 * Service to generate and download a clean, structured PDF of Dheeraj Khakre's resume
 */
export function generateResumePdf(): void {
  const doc = new jsPDF({
    unit: 'pt',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 40;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const checkPageOverflow = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - margin) {
      doc.addPage();
      y = margin;
      drawHeaderFooter();
    }
  };

  const drawHeaderFooter = () => {
    // Top subtle bar
    doc.setFillColor(13, 28, 45); // dark navy
    doc.rect(0, 0, pageWidth, 4, 'F');
  };

  drawHeaderFooter();

  // Name & Title Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(5, 20, 36);
  doc.text(PERSONAL_INFO.fullName.toUpperCase(), margin, y + 10);
  y += 24;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(30, 80, 160);
  const headlineLines = doc.splitTextToSize(
    'Java Backend Developer | Java | Spring Boot | Microservices | Kafka | AWS | Docker | Kubernetes | Angular | AI/LLM Integration',
    contentWidth
  );
  doc.text(headlineLines, margin, y);
  y += headlineLines.length * 13 + 4;

  // Contact Strip
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(70, 80, 95);
  const contactText = `${PERSONAL_INFO.location}  |  ${PERSONAL_INFO.phone}  |  ${PERSONAL_INFO.email}`;
  doc.text(contactText, margin, y);
  y += 12;

  const linkText = `LinkedIn: ${PERSONAL_INFO.linkedinUrl}  |  GitHub: ${PERSONAL_INFO.githubUrl}`;
  doc.text(linkText, margin, y);
  y += 14;

  // Horizontal divider
  doc.setDrawColor(210, 220, 235);
  doc.setLineWidth(1);
  doc.line(margin, y, margin + contentWidth, y);
  y += 14;

  // Helper for Section Titles
  const addSectionHeader = (title: string) => {
    checkPageOverflow(30);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(5, 20, 36);
    doc.text(title.toUpperCase(), margin, y);
    y += 4;
    doc.setDrawColor(77, 142, 255);
    doc.setLineWidth(1.5);
    doc.line(margin, y, margin + 40, y);
    y += 12;
  };

  // 1. PROFESSIONAL SUMMARY
  addSectionHeader('Professional Summary');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(45, 55, 72);
  const summaryText =
    'Java Backend Developer with 2+ years of professional enterprise experience designing and deploying high-throughput, resilient distributed architectures. Proficient in Java (8/11/17/21/25), Spring Boot 3, Spring WebFlux, Spring Security (RBAC/JWT), Spring Data JPA/Hibernate, Microservices, and REST APIs. Skilled in event-driven asynchronous streaming with Apache Kafka and Redis, relational database schema optimization (PostgreSQL, MySQL), containerization with Docker and Kubernetes, and AI integration with Spring AI, RAG pipelines, and vector embeddings. Experienced in frontend development with Angular, Angular Material, and RxJS.';
  const splitSummary = doc.splitTextToSize(summaryText, contentWidth);
  doc.text(splitSummary, margin, y);
  y += splitSummary.length * 12 + 10;

  // 2. TECHNICAL SKILLS
  addSectionHeader('Technical Skills');
  const skillsList = [
    {
      cat: 'Languages & Core:',
      items: 'Java 8, Java 11, Java 17, Java 21, Java 25, SQL, JavaScript, HTML5, CSS3, OOP, Collections, Multithreading, JDBC, Design Patterns'
    },
    {
      cat: 'Backend & Frameworks:',
      items: 'Spring Boot 3, Spring MVC, Spring Security, Spring Data JPA, Hibernate ORM, Spring WebFlux, Spring Cloud, Eureka, RESTful APIs, Microservices, Maven'
    },
    {
      cat: 'Frontend:',
      items: 'Angular (v14-v19), Angular Material, RxJS, Bootstrap, Responsive UI, Reusable Components'
    },
    {
      cat: 'Databases & Caching:',
      items: 'PostgreSQL, MySQL, Oracle SQL, MariaDB, Database Indexing, Query Optimization, Redis, pgvector'
    },
    {
      cat: 'Messaging & DevOps:',
      items: 'Apache Kafka, Docker, Kubernetes, AWS, GitHub Actions CI/CD, Git, Linux CLI/Bash'
    },
    {
      cat: 'AI & Document Tech:',
      items: 'Spring AI, GPT-4, OCR / Document AI, Tesseract, RAG (Retrieval-Augmented Generation), Vector Databases'
    }
  ];

  skillsList.forEach((sk) => {
    checkPageOverflow(18);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(30, 41, 59);
    doc.text(sk.cat, margin, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 70, 85);
    const catOffset = doc.getTextWidth(sk.cat) + 6;
    const splitItems = doc.splitTextToSize(sk.items, contentWidth - catOffset);
    doc.text(splitItems, margin + catOffset, y);
    y += splitItems.length * 11 + 3;
  });
  y += 6;

  // 3. PROFESSIONAL EXPERIENCE
  addSectionHeader('Professional Experience');
  EXPERIENCE_DATA.forEach((exp) => {
    checkPageOverflow(50);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.text(`${exp.role}  —  ${exp.company}`, margin, y);

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(90, 100, 115);
    const rightInfo = `${exp.period} | ${exp.location}`;
    const infoWidth = doc.getTextWidth(rightInfo);
    doc.text(rightInfo, margin + contentWidth - infoWidth, y);
    y += 12;

    exp.highlights.forEach((hl) => {
      checkPageOverflow(20);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(45, 55, 72);
      const splitHL = doc.splitTextToSize(`•  ${hl}`, contentWidth - 10);
      doc.text(splitHL, margin + 8, y);
      y += splitHL.length * 11 + 2;
    });
    y += 5;
  });

  // 4. FEATURED GITHUB PROJECTS
  addSectionHeader('Featured GitHub Projects');
  PROJECTS_DATA.forEach((proj) => {
    checkPageOverflow(45);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text(proj.title, margin, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(30, 80, 160);
    const repoText = `[ ${proj.repoName} ]`;
    const repoWidth = doc.getTextWidth(repoText);
    doc.text(repoText, margin + contentWidth - repoWidth, y);
    y += 11;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(50, 60, 75);
    const descLines = doc.splitTextToSize(proj.description, contentWidth);
    doc.text(descLines, margin, y);
    y += descLines.length * 10.5 + 2;

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(80, 90, 105);
    doc.text(`Tech: ${proj.techStack.join(', ')}`, margin, y);
    y += 13;
  });

  // 5. EDUCATION
  addSectionHeader('Education');
  checkPageOverflow(35);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text(EDUCATION_DATA.degree, margin, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(70, 80, 95);
  const eduRight = `${EDUCATION_DATA.period}  |  ${EDUCATION_DATA.score} (${EDUCATION_DATA.honors})`;
  const eduRightWidth = doc.getTextWidth(eduRight);
  doc.text(eduRight, margin + contentWidth - eduRightWidth, y);
  y += 12;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(50, 60, 75);
  doc.text(EDUCATION_DATA.institution, margin, y);
  y += 11;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(90, 100, 115);
  doc.text(`Foundations: ${EDUCATION_DATA.coreFoundations.join(' • ')}`, margin, y);

  // Trigger Save
  doc.save('Dheeraj_Khakre_Resume.pdf');
}

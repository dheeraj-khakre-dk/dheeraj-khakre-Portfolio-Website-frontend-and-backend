package com.dheeraj.portfolio.service;

import com.dheeraj.portfolio.model.ChatMessageRequest;
import com.dheeraj.portfolio.model.ChatMessageResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * AI Representative Chat Service in Spring Boot.
 * Connects to Gemini API via server-side HTTPS proxy to provide immediate,
 * context-grounded answers about Dheeraj Khakre's technical background, projects, and career.
 */
@Service
public class AiChatService {

    private static final Logger log = LoggerFactory.getLogger(AiChatService.class);

    @Value("${gemini.api.key:${GEMINI_API_KEY:}}")
    private String geminiApiKey;

    private final RestTemplate restTemplate;

    public AiChatService() {
        this.restTemplate = new RestTemplate();
    }

    public ChatMessageResponse generateResponse(ChatMessageRequest request) {
        String query = request.getMessage();

        // If Gemini API Key is configured on the backend
        if (geminiApiKey != null && !geminiApiKey.isBlank() && !geminiApiKey.equals("MY_GEMINI_API_KEY")) {
            try {
                return callGeminiApi(query, request.getConversationHistory());
            } catch (Exception e) {
                log.error("Error communicating with Gemini REST API: {}", e.getMessage());
            }
        }

        // High-fidelity heuristic knowledge engine as reliable fallback
        return generateKnowledgeBasedReply(query);
    }

    private ChatMessageResponse callGeminiApi(String message, List<ChatMessageRequest.HistoryItem> history) {
        String endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + geminiApiKey;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("User-Agent", "aistudio-build");

        String systemPrompt = """
            You are Dheeraj AI, an intelligent, professional, and technically rigorous AI avatar and personal representative for Dheeraj Khakre.
            Dheeraj Khakre is a Java Backend Developer & Full Stack Engineer with 2+ years of enterprise experience.
            Current Role: Software Engineer at ITC Infotech India (Nov 2025 - Present) building Spring Boot FlexPLM enterprise modules and high-volume SQL analytics.
            Previous Role: Software Engineer at Qualfon (Feb 2024 - May 2025), building Spring Boot microservices, Kafka event streaming, Eureka discovery, Spring Security RBAC/JWT, and Angular frontends (+40% response latency improvement).
            Education: B.Tech with 8.29 CGPA from SIRT Bhopal (Sagar Group).
            Projects: Automate-Accounts OCR Pipeline, E-commerce MicroServices (OAuth2/JWT/Eureka), Box-Guard Real-Time Malware Monitor (NIO WatchService/MalwareBazaar), Financial Portfolio Tracker (BigDecimal/Spring WebFlux/Angular).
            Contact: khakredheeraj@gmail.com, +91 7247063766, Bangalore, India.
            Answer clearly, technically, and concisely in first-person as Dheeraj's personal AI avatar.
            """;

        Map<String, Object> body = new HashMap<>();
        Map<String, Object> contents = new HashMap<>();
        contents.put("role", "user");
        contents.put("parts", List.of(Map.of("text", systemPrompt + "\n\nUser Question: " + message)));
        body.put("contents", List.of(contents));

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);
        ResponseEntity<Map> response = restTemplate.postForEntity(endpoint, entity, Map.class);

        if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
            Map respMap = response.getBody();
            List candidates = (List) respMap.get("candidates");
            if (candidates != null && !candidates.isEmpty()) {
                Map candidate = (Map) candidates.get(0);
                Map content = (Map) candidate.get("content");
                List parts = (List) content.get("parts");
                if (parts != null && !parts.isEmpty()) {
                    Map part = (Map) parts.get(0);
                    String text = (String) part.get("text");
                    return new ChatMessageResponse(text);
                }
            }
        }

        return generateKnowledgeBasedReply(message);
    }

    private ChatMessageResponse generateKnowledgeBasedReply(String query) {
        String q = query.toLowerCase();

        if (q.contains("project") || q.contains("github") || q.contains("repo")) {
            return new ChatMessageResponse(
                "Dheeraj's featured GitHub repositories include:\n" +
                "1. **Automate-Accounts-Developer-Hiring-Assessment**: OCR & Document AI processing pipeline parsing receipts into structured JSON schemas.\n" +
                "2. **E-commerce-MicroServices-fork**: Distributed identity service featuring Spring Security, stateless HMAC-SHA256 JWT, OAuth 2.0 federation, and Eureka.\n" +
                "3. **Box-Guard-file-monitor-project-fork**: Java NIO WatchService real-time file monitor computing SHA-256 hashes against MalwareBazaar threat intelligence.\n" +
                "4. **Financial-portfolio-tracker-8Byte**: Fintech multi-asset ledger utilizing BigDecimal precision arithmetic, Spring WebFlux, MySQL, and Angular UI.\n\n" +
                "You can inspect all four codebases directly at github.com/Dheeraj-Khakre!"
            );
        } else if (q.contains("experience") || q.contains("work") || q.contains("company") || q.contains("itc") || q.contains("qualfon")) {
            return new ChatMessageResponse(
                "Dheeraj brings 2+ years of enterprise engineering experience:\n" +
                "• **ITC Infotech India** (Nov 2025 – Present, Bangalore): Software Engineer engineering enterprise FlexPLM modules using Spring Boot, Java, and deep SQL data analysis.\n" +
                "• **Qualfon Advanced Technology Center** (Feb 2024 – May 2025, Gurugram): Software Engineer / Full Stack Developer designing Spring Boot microservices, Kafka event streaming, Eureka failover, and Angular UI components, improving response efficiency by 40%.\n" +
                "• Earlier Internships: Java Developer Intern at Umpteen Innovation (2023) and J2SE/Database Intern at Aim point InfoSystem (2022)."
            );
        } else if (q.contains("kafka") || q.contains("microservice") || q.contains("throughput") || q.contains("latency")) {
            return new ChatMessageResponse(
                "At Qualfon, Dheeraj architected asynchronous event pipelines using Apache Kafka and Redis caching. By offloading heavy operations from request-reply cycles to partitioned Kafka topics and configuring Eureka dynamic service discovery, his team reduced endpoint latency by approximately 40% under high concurrent load."
            );
        } else if (q.contains("contact") || q.contains("hire") || q.contains("email") || q.contains("phone") || q.contains("available")) {
            return new ChatMessageResponse(
                "Dheeraj is currently in Bangalore, India, and is **Available for Software Engineering Opportunities** (open to remote roles and relocation).\n\n" +
                "Direct contact channels:\n" +
                "• **Email**: khakredheeraj@gmail.com\n" +
                "• **Phone**: +91 7247063766\n" +
                "• **LinkedIn**: linkedin.com/in/dheeraj-khakre-9a1644262/\n" +
                "• **GitHub**: github.com/Dheeraj-Khakre\n" +
                "Feel free to submit a message through the contact form or download his verified PDF resume!"
            );
        } else if (q.contains("skill") || q.contains("stack") || q.contains("tech") || q.contains("java") || q.contains("spring")) {
            return new ChatMessageResponse(
                "Dheeraj's core technical toolkit comprises:\n" +
                "• **Backend**: Java (8/11/17/21/25), Spring Boot 3, Spring MVC, Spring Data JPA, Hibernate ORM, Spring WebFlux, Spring Security, REST APIs.\n" +
                "• **Distributed Systems**: Microservices, Netflix Eureka, Apache Kafka, Redis, Docker, Kubernetes.\n" +
                "• **Databases**: PostgreSQL, MySQL, Query Tuning, Indexing, ACID Transactions.\n" +
                "• **Frontend**: Angular (v14–v19), RxJS, TypeScript, Angular Material.\n" +
                "• **AI & Automation**: Spring AI, Document AI, Tesseract OCR, RAG & pgvector."
            );
        }

        return new ChatMessageResponse(
            "I'm Dheeraj Khakre's AI Representative! I can answer anything about his 2+ years of enterprise Java and Spring Boot experience, his work at ITC Infotech and Qualfon, his 4 featured GitHub repositories (OCR, Microservices, Box-Guard, Portfolio Tracker), his technical skills, or his availability for software engineering roles. What would you like to know?"
        );
    }
}

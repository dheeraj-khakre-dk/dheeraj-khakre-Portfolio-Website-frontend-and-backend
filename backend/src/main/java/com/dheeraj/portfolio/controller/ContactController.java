package com.dheeraj.portfolio.controller;

import com.dheeraj.portfolio.model.ContactMessage;
import com.dheeraj.portfolio.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> submitContactMessage(@Valid @RequestBody ContactMessage message) {
        ContactMessage saved = contactService.saveMessage(message);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "success", true,
                "messageId", "msg_" + saved.getId(),
                "confirmation", "Thank you, " + saved.getName() + ". Your message has been safely recorded in the database and dispatched to Dheeraj Khakre."
        ));
    }
}

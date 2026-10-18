package com.dheeraj.portfolio.controller;

import com.dheeraj.portfolio.model.ChatMessageRequest;
import com.dheeraj.portfolio.model.ChatMessageResponse;
import com.dheeraj.portfolio.service.AiChatService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "*")
public class AiChatController {

    private final AiChatService aiChatService;

    public AiChatController(AiChatService aiChatService) {
        this.aiChatService = aiChatService;
    }

    @PostMapping
    public ResponseEntity<ChatMessageResponse> handleChat(@RequestBody ChatMessageRequest request) {
        if (request.getMessage() == null || request.getMessage().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(new ChatMessageResponse("Message prompt is required."));
        }
        ChatMessageResponse response = aiChatService.generateResponse(request);
        return ResponseEntity.ok(response);
    }
}

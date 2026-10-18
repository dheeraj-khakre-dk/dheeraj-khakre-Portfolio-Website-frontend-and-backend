package com.dheeraj.portfolio.model;

import java.util.List;

public class ChatMessageRequest {

    private String message;
    private List<HistoryItem> conversationHistory;

    public static class HistoryItem {
        private String role;
        private String content;

        public HistoryItem() {}
        public HistoryItem(String role, String content) {
            this.role = role;
            this.content = content;
        }

        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }

        public String getContent() { return content; }
        public void setContent(String content) { this.content = content; }
    }

    public ChatMessageRequest() {}

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public List<HistoryItem> getConversationHistory() { return conversationHistory; }
    public void setConversationHistory(List<HistoryItem> conversationHistory) { this.conversationHistory = conversationHistory; }
}

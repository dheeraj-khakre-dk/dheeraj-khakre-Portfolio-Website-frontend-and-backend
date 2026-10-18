package com.dheeraj.portfolio.model;

import java.time.Instant;

public class ChatMessageResponse {

    private String reply;
    private String timestamp;

    public ChatMessageResponse() {
        this.timestamp = Instant.now().toString();
    }

    public ChatMessageResponse(String reply) {
        this.reply = reply;
        this.timestamp = Instant.now().toString();
    }

    public String getReply() { return reply; }
    public void setReply(String reply) { this.reply = reply; }

    public String getTimestamp() { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }
}

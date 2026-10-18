package com.dheeraj.portfolio.service;

import com.dheeraj.portfolio.model.ContactMessage;
import com.dheeraj.portfolio.repository.ContactMessageRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ContactService {

    private static final Logger log = LoggerFactory.getLogger(ContactService.class);
    private final ContactMessageRepository repository;

    public ContactService(ContactMessageRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public ContactMessage saveMessage(ContactMessage message) {
        ContactMessage saved = repository.save(message);
        log.info("New verified contact message recorded: ID={}, From={} <{}>, Subject={}",
                saved.getId(), saved.getName(), saved.getEmail(), saved.getSubject());
        return saved;
    }

    @Transactional(readOnly = true)
    public List<ContactMessage> getAllMessages() {
        return repository.findAllByOrderByCreatedAtDesc();
    }
}

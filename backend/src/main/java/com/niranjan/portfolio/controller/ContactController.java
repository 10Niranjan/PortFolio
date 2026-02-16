package com.niranjan.portfolio.controller;

import com.niranjan.portfolio.model.ContactMessage;
import com.niranjan.portfolio.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> submitContact(@Valid @RequestBody ContactMessage message) {
        contactService.saveAndNotify(message);
        return ResponseEntity.ok(Map.of(
                "status", "success",
                "message", "Your message has been sent successfully!"));
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of("status", "UP", "service", "Portfolio API"));
    }
}

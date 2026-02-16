package com.niranjan.portfolio.service;

import com.niranjan.portfolio.model.ContactMessage;
import com.niranjan.portfolio.repository.ContactMessageRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class ContactService {

    private final ContactMessageRepository repository;
    private final JavaMailSender mailSender;

    @Value("${app.mail.to:pvt.niranjan10@gmail.com}")
    private String notifyEmail;

    @Value("${spring.mail.username:}")
    private String fromEmail;

    @Value("${app.mail.enabled:false}")
    private boolean mailEnabled;

    public ContactService(ContactMessageRepository repository, JavaMailSender mailSender) {
        this.repository = repository;
        this.mailSender = mailSender;
    }

    public void saveAndNotify(ContactMessage message) {
        message.setCreatedAt(LocalDateTime.now());
        message.setRead(false);
        repository.save(message);

        if (mailEnabled && !fromEmail.isEmpty()) {
            sendNotificationEmail(message);
        }
    }

    private void sendNotificationEmail(ContactMessage message) {
        try {
            SimpleMailMessage mail = new SimpleMailMessage();
            mail.setFrom(fromEmail);
            mail.setTo(notifyEmail);
            mail.setSubject("📬 New Portfolio Contact: " + message.getName());
            mail.setText(String.format(
                    "New message from your portfolio website!\n\n" +
                            "From: %s\n" +
                            "Email: %s\n" +
                            "Time: %s\n\n" +
                            "Message:\n%s",
                    message.getName(),
                    message.getEmail(),
                    message.getCreatedAt(),
                    message.getMessage()));
            mailSender.send(mail);
        } catch (Exception e) {
            // Log but don't fail — message is already saved in DB
            System.err.println("Failed to send notification email: " + e.getMessage());
        }
    }
}

package com.swiftcart.notification_service.Service;

import com.swiftcart.notification_service.Dto.NotificationRequest;
import com.swiftcart.notification_service.Dto.NotificationResponse;
import com.swiftcart.notification_service.Exception.NotificationNotFoundException;
import com.swiftcart.notification_service.Mapper.NotificationMapper;
import com.swiftcart.notification_service.Model.Notification;
import com.swiftcart.notification_service.Model.NotificationStatus;
import com.swiftcart.notification_service.Repository.NotificationRepository;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final NotificationMapper notificationMapper;

    // 1. ADDED: The Spring Boot Mail Sender
    private final JavaMailSender mailSender;

    // Optional: Grab the sender email from your yaml file
    @Value("${spring.mail.username}")
    private String senderEmail;

    public NotificationService(NotificationRepository notificationRepository, NotificationMapper notificationMapper, JavaMailSender mailSender) {
        this.notificationRepository = notificationRepository;
        this.notificationMapper = notificationMapper;
        this.mailSender = mailSender;
    }

    public NotificationResponse sendNotification(NotificationRequest request) {
        Notification notification = new Notification();
        notification.setRecipientEmail(request.getRecipientEmail());
        notification.setSubject(request.getSubject());
        notification.setMessage(request.getMessage());
        notification.setType(request.getType());

        notification.setStatus(NotificationStatus.PENDING);

        try {
            System.out.println("Attempting to send real email to: " + request.getRecipientEmail());

            // 2. Build the actual email
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom(senderEmail);
            mailMessage.setTo(request.getRecipientEmail());
            mailMessage.setSubject(request.getSubject());
            mailMessage.setText(request.getMessage());

            // 3. Fire the email!
            mailSender.send(mailMessage);

            System.out.println("Email successfully sent via Gmail!");
            notification.setStatus(NotificationStatus.SENT);

        } catch (Exception e) {
            System.out.println("EMAIL FAILED TO SEND: " + e.getMessage());
            notification.setStatus(NotificationStatus.FAILED);
        }

        Notification savedNotification = notificationRepository.save(notification);
        return notificationMapper.toResponse(savedNotification);
    }

    public NotificationResponse getNotificationById(Long id) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new NotificationNotFoundException("Notification not found with ID: " + id));

        return notificationMapper.toResponse(notification);
    }
}
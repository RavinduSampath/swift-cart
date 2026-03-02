package com.swiftcart.notification_service.Service;


import com.swiftcart.notification_service.Dto.NotificationResponse;
import com.swiftcart.notification_service.Dto.OfferNotificationRequest;
import com.swiftcart.notification_service.Dto.ProductNotificationRequest;
import com.swiftcart.notification_service.Mapper.NotificationMapper;
import com.swiftcart.notification_service.Model.Notification;
import com.swiftcart.notification_service.Model.NotificationStatus;
import com.swiftcart.notification_service.Model.NotificationType;
import com.swiftcart.notification_service.Repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private com.swiftcart.notification_service.Service.EmailService emailService;

    @Autowired
    private NotificationMapper notificationMapper;

    // ─── Product Added Notification ───────────────────────────────
    public NotificationResponse sendProductNotification(ProductNotificationRequest request) {
        String subject = " New Product Added: " + request.getBrand() + " " + request.getModelName();

        String message = "Dear Customer,\n\n" +
                "We are excited to announce a new product on SwiftCart!\n\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━\n" +
                "Brand         : " + request.getBrand() + "\n" +
                "Model         : " + request.getModelName() + "\n" +
                "Reference No  : " + request.getReferenceNumber() + "\n" +
                "Price         : $" + request.getPrice() + "\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
                "Visit SwiftCart to explore this product!\n\n" +
                "Best regards,\nSwiftCart Team";

        return buildAndSendNotification(
                request.getRecipientEmail(),
                subject,
                message,
                NotificationType.PRODUCT_ADDED
        );
    }

    // Offer Added Notification
    public NotificationResponse sendOfferNotification(OfferNotificationRequest request) {
        String subject = "🎉 Special Offer: " + request.getOfferTitle();

        String message = "Dear Customer,\n\n" +
                "A new offer is available just for you on SwiftCart!\n\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━\n" +
                "Offer Title  : " + request.getOfferTitle() + "\n" +
                "Product      : " + request.getProductName() + "\n" +
                "Discount     : " + request.getDiscountPercentage() + "% OFF\n" +
                "Description  : " + request.getOfferDescription() + "\n" +
                "Valid Until  : " + request.getOfferExpiryDate() + "\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
                "Hurry! Limited time offer. Shop now on SwiftCart!\n\n" +
                "Best regards,\nSwiftCart Team";

        return buildAndSendNotification(
                request.getRecipientEmail(),
                subject,
                message,
                NotificationType.OFFER_ADDED
        );
    }

    //  Shared Build & Send Logic
    private NotificationResponse buildAndSendNotification(
            String email, String subject, String message, NotificationType type) {

        Notification notification = new Notification();
        notification.setRecipientEmail(email);
        notification.setSubject(subject);
        notification.setMessage(message);
        notification.setType(type);

        try {
            emailService.sendEmail(email, subject, message);
            notification.setStatus(NotificationStatus.SENT);
            notification.setSentAt(LocalDateTime.now());
        } catch (Exception e) {
            notification.setStatus(NotificationStatus.FAILED);
        }

        Notification saved = notificationRepository.save(notification);
        return notificationMapper.toResponse(saved);
    }

    //  Get All Notifications
    public List<NotificationResponse> getAllNotifications() {
        return notificationRepository.findAll()
                .stream()
                .map(notificationMapper::toResponse)
                .collect(Collectors.toList());
    }

    //   Get Notifications by Email
    public List<NotificationResponse> getNotificationsByEmail(String email) {
        return notificationRepository.findByRecipientEmail(email)
                .stream()
                .map(notificationMapper::toResponse)
                .collect(Collectors.toList());
    }
}
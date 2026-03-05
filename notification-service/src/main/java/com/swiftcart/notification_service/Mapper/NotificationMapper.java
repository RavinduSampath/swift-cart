package com.swiftcart.notification_service.Mapper;

import com.swiftcart.notification_service.Dto.NotificationResponse;
import com.swiftcart.notification_service.Model.Notification;
import org.springframework.stereotype.Component;

@Component
public class NotificationMapper {

    public NotificationResponse toResponse(Notification notification) {
        NotificationResponse response = new NotificationResponse();
        response.setId(notification.getId());
        response.setRecipientEmail(notification.getRecipientEmail());
        response.setSubject(notification.getSubject());
        response.setStatus(notification.getStatus());
        response.setType(notification.getType());
        response.setSentAt(notification.getSentAt());
        return response;
    }
}
package com.swiftcart.notification_service.Repository;


import com.swiftcart.notification_service.Model.Notification;
import com.swiftcart.notification_service.Model.NotificationStatus;
import com.swiftcart.notification_service.Model.NotificationType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByRecipientEmail(String email);
    List<Notification> findByStatus(NotificationStatus status);
    List<Notification> findByType(NotificationType type);
}

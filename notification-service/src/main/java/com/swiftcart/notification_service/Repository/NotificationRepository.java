package com.swiftcart.notification_service.Repository;

import com.swiftcart.notification_service.Model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
}
package com.swiftcart.notification_service.Controller;

import com.swiftcart.notification_service.Dto.NotificationRequest;
import com.swiftcart.notification_service.Dto.NotificationResponse;
import com.swiftcart.notification_service.Response.ApiResponse;
import com.swiftcart.notification_service.Service.NotificationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @PostMapping("/send")
    public ResponseEntity<ApiResponse> sendNotification(@RequestBody NotificationRequest request) {
        NotificationResponse responseData = notificationService.sendNotification(request);
        return new ResponseEntity<>(new ApiResponse("Notification processed successfully", responseData), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getNotificationStatus(@PathVariable Long id) {
        NotificationResponse responseData = notificationService.getNotificationById(id);
        return ResponseEntity.ok(new ApiResponse("Notification retrieved successfully", responseData));
    }
}
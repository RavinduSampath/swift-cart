package com.swiftcart.warranty_service.mapper;

import com.swiftcart.warranty_service.dtos.WarrantyRequest;
import com.swiftcart.warranty_service.dtos.WarrantyResponse;
import com.swiftcart.warranty_service.model.Warranty;
import org.springframework.stereotype.Component;
import java.time.LocalDate;

@Component
public class WarrantyMapper {

    public Warranty toEntity(WarrantyRequest request) {
        Warranty warranty = new Warranty();
        warranty.setProductId(request.getProductId());
        warranty.setUserId(request.getUserId());
        warranty.setPurchaseDate(LocalDate.now());
        // Automatically calculate expiration date based on the months provided!
        warranty.setExpirationDate(LocalDate.now().plusMonths(request.getDurationInMonths()));
        warranty.setStatus("ACTIVE");
        return warranty;
    }

    public WarrantyResponse toDto(Warranty warranty) {
        WarrantyResponse response = new WarrantyResponse();
        response.setId(warranty.getId());
        response.setProductId(warranty.getProductId());
        response.setPurchaseDate(warranty.getPurchaseDate());
        response.setExpirationDate(warranty.getExpirationDate());

        // Dynamically check if the warranty is expired right now before sending to frontend
        if (LocalDate.now().isAfter(warranty.getExpirationDate())) {
            response.setStatus("EXPIRED");
        } else {
            response.setStatus(warranty.getStatus());
        }

        return response;
    }
}
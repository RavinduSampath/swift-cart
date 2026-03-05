package com.swiftcart.shipping_service.mapper;

import com.swiftcart.shipping_service.dtos.ShippingRequest;
import com.swiftcart.shipping_service.dtos.ShippingResponse;
import com.swiftcart.shipping_service.model.Shipping;
import com.swiftcart.shipping_service.model.ShippingStatus;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class ShippingMapper {

    public Shipping toEntity(ShippingRequest request) {
        Shipping shipping = new Shipping();
        shipping.setOrderId(request.orderId());
        shipping.setCarrier(request.carrier());
        shipping.setShippingAddress(request.shippingAddress());
        shipping.setStatus(ShippingStatus.PENDING);
        shipping.setEstimatedDeliveryDate(LocalDate.now().plusDays(5)); // Default 5-day shipping
        return shipping;
    }

    public ShippingResponse toResponse(Shipping shipping) {
        return new ShippingResponse(
                shipping.getId(),
                shipping.getOrderId(),
                shipping.getTrackingNumber(),
                shipping.getStatus(),
                shipping.getCarrier(),
                shipping.getShippingAddress(),
                shipping.getEstimatedDeliveryDate()
        );
    }

}

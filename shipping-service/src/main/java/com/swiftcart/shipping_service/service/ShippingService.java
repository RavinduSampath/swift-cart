package com.swiftcart.shipping_service.service;

import com.swiftcart.shipping_service.dtos.ShippingRequest;
import com.swiftcart.shipping_service.dtos.ShippingResponse;
import com.swiftcart.shipping_service.exceptions.ResourceNotFoundException;
import com.swiftcart.shipping_service.mapper.ShippingMapper;
import com.swiftcart.shipping_service.model.Shipping;
import com.swiftcart.shipping_service.model.ShippingStatus;
import com.swiftcart.shipping_service.repository.ShippingRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ShippingService {

    private final ShippingRepository repository;
    private final ShippingMapper mapper;

    public ShippingService(ShippingRepository repository, ShippingMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public ShippingResponse createShipping(ShippingRequest request) {
        Shipping shipping = mapper.toEntity(request);
        Shipping savedShipping = repository.save(shipping);
        return mapper.toResponse(savedShipping);
    }

    public ShippingResponse getShippingByTrackingNumber(String trackingNumber) {
        Shipping shipping = repository.findByTrackingNumber(trackingNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Shipping not found for tracking number: " + trackingNumber));
        return mapper.toResponse(shipping);
    }

    public ShippingResponse updateShippingStatus(String trackingNumber, ShippingStatus newStatus) {
        Shipping shipping = repository.findByTrackingNumber(trackingNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Shipping not found for tracking number: " + trackingNumber));

        shipping.setStatus(newStatus);
        Shipping updatedShipping = repository.save(shipping);
        return mapper.toResponse(updatedShipping);
    }

    public List<ShippingResponse> getAllShippings() {
        return repository.findAll().stream()
                .map(mapper::toResponse)
                .collect(Collectors.toList());
    }
}

package com.agrotech.api.controller;

import com.agrotech.api.dto.VendorTypeHistoryIInvoicesDto;
import com.agrotech.api.dto.WarehouseDto;
import com.agrotech.api.services.VendorTypeHistoryIInvoicesService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/vendortypehistoryiinvoices")
@RequiredArgsConstructor
public class VendorTypeHistoryIInvoicesController {



    private final VendorTypeHistoryIInvoicesService vendorTypeHistoryIInvoicesService ;


    @PostMapping("")
    public ResponseEntity<?> create(@RequestBody @Valid VendorTypeHistoryIInvoicesDto warehouse) {
        VendorTypeHistoryIInvoicesDto response = vendorTypeHistoryIInvoicesService.create(warehouse);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}

package com.agrotech.api.controller;

import com.agrotech.api.dto.VendorTypeDetailsDto;
import com.agrotech.api.dto.VendorTypesDto;
import com.agrotech.api.exceptions.NotFoundException;
import com.agrotech.api.model.VendorTypeDetails;
import com.agrotech.api.services.VendorTypeDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/vendorTypeDetail")
@RequiredArgsConstructor
public class VendorTypeDetailController {


    private final VendorTypeDetailsService vendorTypeDetailsService;


    @PostMapping("")
    public ResponseEntity<?> create(@RequestBody VendorTypeDetailsDto vendorTypeDetails) {
        VendorTypeDetailsDto response = vendorTypeDetailsService.create(vendorTypeDetails);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/getbyOrderLine/{OrderLine}")
    public ResponseEntity<?> findbyOrderLine(@PathVariable String OrderLine) throws NotFoundException {
        VendorTypeDetails response=vendorTypeDetailsService.findByOrderLine(OrderLine);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable String id,@RequestBody VendorTypeDetailsDto vendorTypeDetails) throws NotFoundException {
        VendorTypeDetailsDto response = vendorTypeDetailsService.update(id, vendorTypeDetails);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findAll(@PathVariable String id) throws NotFoundException {
        VendorTypeDetailsDto response = vendorTypeDetailsService.findById(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<?> findAll() {
        List<VendorTypeDetailsDto> response = vendorTypeDetailsService.findAll();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/page")
    public ResponseEntity<?> findPage(
            @RequestParam(defaultValue = "3") int pageSize,
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "") String filter
    ) {
        Page<VendorTypeDetails> response = vendorTypeDetailsService.getpages(pageSize, pageNumber, filter);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/by-code/{code}")
    public ResponseEntity<?> findByCode(@PathVariable String code) throws NotFoundException {
        VendorTypeDetailsDto response = vendorTypeDetailsService.findById(code);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }



    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) throws NotFoundException {
        vendorTypeDetailsService.delete(id);
        return new ResponseEntity<>(true, HttpStatus.OK);
    }

    @GetMapping("/archiver/{id}")
    public ResponseEntity<?> archive(@PathVariable String id) throws NotFoundException {
        vendorTypeDetailsService.archive(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/desarchiver/{id}")
    public ResponseEntity<?> setNotArchive(@PathVariable String id) throws NotFoundException {
        vendorTypeDetailsService.setNotArchive(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/archived/page")
    public ResponseEntity<?> findArchivedPage(
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "") String filter
    ) {
        Page<VendorTypeDetails> response = vendorTypeDetailsService.getpagesarchive(pageSize, pageNumber, filter);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}

package com.agrotech.api.controller;


import com.agrotech.api.dto.VendorsRemitDto;
import com.agrotech.api.exceptions.NotFoundException;
import com.agrotech.api.model.VendorsRemit;
import com.agrotech.api.services.VendorsRemitService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/vendorsRemit")
@RequiredArgsConstructor
public class VendorsRemitController {

    private final VendorsRemitService vendorsRemitService ;

    @PostMapping("")
    public ResponseEntity<?> create(@RequestBody VendorsRemitDto vendorSku) {
        VendorsRemitDto response = vendorsRemitService.create(vendorSku);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }


    @GetMapping("")
    public ResponseEntity<?> findAll() {
        List<VendorsRemitDto> response = vendorsRemitService.findAll();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }



    @GetMapping("/getbyname/{name}")
    public ResponseEntity<?> findByName(@PathVariable String findByRemitToName) throws NotFoundException{
        VendorsRemit response=vendorsRemitService.findByRemitToName(findByRemitToName);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable String id,@RequestBody VendorsRemitDto vendorsRemit) throws NotFoundException {
        VendorsRemitDto response = vendorsRemitService.update(id, vendorsRemit);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findAll(@PathVariable String id) throws NotFoundException {
        VendorsRemitDto response = vendorsRemitService.findById(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }



    @GetMapping("/page")
    public ResponseEntity<?> findPage(
            @RequestParam(defaultValue = "3") int pageSize,
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "") String filter
    ) {
        Page<VendorsRemit> response = vendorsRemitService.getpages(pageSize, pageNumber, filter);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/by-code/{code}")
    public ResponseEntity<?> findByCode(@PathVariable String code) throws NotFoundException {
        VendorsRemitDto response = vendorsRemitService.findById(code);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }



    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) throws NotFoundException {
        vendorsRemitService.delete(id);
        return new ResponseEntity<>(true, HttpStatus.OK);
    }

    @GetMapping("/archiver/{id}")
    public ResponseEntity<?> archive(@PathVariable String id) throws NotFoundException {
        vendorsRemitService.archive(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/desarchiver/{id}")
    public ResponseEntity<?> setNotArchive(@PathVariable String id) throws NotFoundException {
        vendorsRemitService.setNotArchive(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/archived/page")
    public ResponseEntity<?> findArchivedPage(
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "") String filter
    ) {
        Page<VendorsRemit> response = vendorsRemitService.getpagesarchive(pageSize, pageNumber, filter);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}

package com.example.demo.controller;

import com.example.demo.model.Purchase;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/purchases")
public class PurchaseController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PurchaseService purchaseService;


    @PostMapping("/buy")
    public ResponseEntity<Purchase> createPurchase(@RequestParam Long userId) {

        Optional<User> optionalUser = userRepository.findById(userId);


        if (!optionalUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        User user = optionalUser.get();
        Purchase purchase = purchaseService.createPurchase(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(purchase);
    }


    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Purchase>> getUserPurchases(@PathVariable Long userId) {

        Optional<User> optionalUser = userRepository.findById(userId);


        if (!optionalUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        User user = optionalUser.get();
        List<Purchase> purchases = purchaseService.getUserPurchases(user);
        return ResponseEntity.ok(purchases);
    }
}

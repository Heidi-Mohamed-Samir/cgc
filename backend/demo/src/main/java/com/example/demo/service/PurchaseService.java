package com.example.demo.service;

import com.example.demo.model.Purchase;
import com.example.demo.model.User;

import java.util.List;

public interface PurchaseService {
    Purchase createPurchase(User user);
    List<Purchase> getUserPurchases(User user);
}
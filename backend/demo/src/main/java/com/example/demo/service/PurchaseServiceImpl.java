package com.example.demo.service.impl;

import com.example.demo.model.CartItem;
import com.example.demo.model.Purchase;
import com.example.demo.model.User;
import com.example.demo.repository.PurchaseRepository;
import com.example.demo.service.CartItemService;
import com.example.demo.service.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class PurchaseServiceImpl implements PurchaseService {

    private final PurchaseRepository purchaseRepository;
    private final CartItemService cartItemService;

    @Autowired
    public PurchaseServiceImpl(PurchaseRepository purchaseRepository, CartItemService cartItemService) {
        this.purchaseRepository = purchaseRepository;
        this.cartItemService = cartItemService;
    }

    @Override
    public Purchase createPurchase(User user) {
        List<CartItem> cartItems = cartItemService.getUserCart(user);

        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        Purchase lastSaved = null;

        for (CartItem cartItem : cartItems) {
            Purchase purchase = new Purchase();
            purchase.setUser(user);
            purchase.setProduct(cartItem.getProduct());
            purchase.setQuantity(cartItem.getQuantity());
            purchase.setPurchaseDate(LocalDate.now());

            double amount = cartItem.getProduct().getPrice() * cartItem.getQuantity();
            purchase.setTotalAmount(amount);

            lastSaved = purchaseRepository.save(purchase);

            cartItemService.removeProductFromCart(cartItem.getId());
        }

        return lastSaved;
    }

    @Override
    public List<Purchase> getUserPurchases(User user) {
        return purchaseRepository.findByUser(user);
    }
}

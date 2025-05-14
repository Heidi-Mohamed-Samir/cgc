package com.example.demo.service;

import com.example.demo.model.CartItem;
import com.example.demo.model.Product;
import com.example.demo.model.User;

import java.util.List;

public interface CartItemService {
    CartItem addProductToCart(User user, Product product, int quantity);
    List<CartItem> getUserCart(User user);
    void removeProductFromCart(Long cartItemId);
    CartItem updateProductQuantity(Long cartItemId, int newQuantity);
}
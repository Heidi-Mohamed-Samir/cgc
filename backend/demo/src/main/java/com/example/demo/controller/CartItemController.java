package com.example.demo.controller;


import com.example.demo.dto.AddProductToCartRequest;
import com.example.demo.model.CartItem;
import com.example.demo.model.Product;
import com.example.demo.model.User;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/cart")
public class CartItemController {

    private final CartItemService cartItemService;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Autowired
    public CartItemController(CartItemService cartItemService, UserRepository userRepository, ProductRepository productRepository) {
        this.cartItemService = cartItemService;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    @PostMapping("/add")
    public ResponseEntity<CartItem> addProductToCart(@RequestBody AddProductToCartRequest request) {
        User user = userRepository.findById(request.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
        Product product = productRepository.findById(request.getProductId()).orElseThrow(() -> new RuntimeException("Product not found"));

        CartItem cartItem = cartItemService.addProductToCart(user, product, request.getQuantity());

        return ResponseEntity.status(HttpStatus.CREATED).body(cartItem);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<CartItem>> getUserCart(@PathVariable Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);

        if (!userOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        User user = userOptional.get();
        List<CartItem> cartItems = cartItemService.getUserCart(user);
        return ResponseEntity.ok(cartItems);
    }

    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<Void> removeProductFromCart(@PathVariable Long cartItemId) {
        cartItemService.removeProductFromCart(cartItemId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/update/{cartItemId}")
    public ResponseEntity<CartItem> updateProductQuantity(@PathVariable Long cartItemId, @RequestParam int newQuantity) {
        CartItem updatedCartItem = cartItemService.updateProductQuantity(cartItemId, newQuantity);
        return ResponseEntity.ok(updatedCartItem);
    }
}

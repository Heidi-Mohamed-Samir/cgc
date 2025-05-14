package com.example.demo.service;

import com.example.demo.model.Product;

import java.util.List;
import java.util.Optional;

public interface ProductService {
    Product createProduct(Product product);
    List<Product> getAllProducts();
    Optional<Product> updateProduct(Long id, Product updatedProduct);
    boolean deleteProduct(Long id);
}

package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddProductToCartRequest {

    private Long userId;
    private Long productId;
    private int quantity;

}

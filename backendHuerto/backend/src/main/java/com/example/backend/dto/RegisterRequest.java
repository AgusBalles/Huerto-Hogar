package com.example.backend.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String nombreCompleto;
    private String email;
    private String telefono;
    private String contrasena;
}
package com.example.backend.service;

import com.example.backend.config.JwtUtil;
import com.example.backend.dto.LoginRequest;
import com.example.backend.dto.LoginResponse;
import com.example.backend.dto.RegisterRequest;
import com.example.backend.model.Usuario;
import com.example.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Login con JWT
    public LoginResponse login(LoginRequest request) {
        Usuario usuario = usuarioRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Validar contraseña
        if (!passwordEncoder.matches(request.getContrasena(), usuario.getContrasena())) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        // Generar token JWT
        String token = jwtUtil.generateToken(usuario.getEmail());

        return new LoginResponse(
                token,
                usuario.getEmail(),
                usuario.getNombreCompleto(),
                "Login exitoso"
        );
    }

    // Registro con JWT
    public LoginResponse register(RegisterRequest request) {
        // Verificar si el email ya existe
        if (usuarioRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("El email ya está registrado");
        }

        // Crear nuevo usuario
        Usuario usuario = new Usuario();
        usuario.setNombreCompleto(request.getNombreCompleto());
        usuario.setEmail(request.getEmail());
        usuario.setTelefono(request.getTelefono());
        usuario.setContrasena(passwordEncoder.encode(request.getContrasena()));

        usuarioRepository.save(usuario);

        // Generar token JWT
        String token = jwtUtil.generateToken(usuario.getEmail());

        return new LoginResponse(
                token,
                usuario.getEmail(),
                usuario.getNombreCompleto(),
                "Registro exitoso"
        );
    }
}
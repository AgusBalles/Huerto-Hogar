package com.example.backend.service;

import com.example.backend.model.Usuario;
import com.example.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> getUsuarioById(Long id) {
        return usuarioRepository.findById(id);
    }

    public Optional<Usuario> getUsuarioByEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }

    public List<Usuario> searchUsuarios(String searchTerm) {
        return usuarioRepository.searchByNombreOrEmail(searchTerm);
    }

    public Usuario createUsuario(Usuario usuario) {
        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            throw new RuntimeException("Ya existe un usuario con ese email");
        }
        // Encripta la contraseña antes de guardar
        usuario.setContrasena(passwordEncoder.encode(usuario.getContrasena()));
        return usuarioRepository.save(usuario);
    }

    public Usuario updateUsuario(Long id, Usuario usuarioActualizado) {
        return usuarioRepository.findById(id)
                .map(usuario -> {
                    if (!usuario.getEmail().equals(usuarioActualizado.getEmail())
                            && usuarioRepository.existsByEmail(usuarioActualizado.getEmail())) {
                        throw new RuntimeException("Ya existe un usuario con ese email");
                    }
                    usuario.setNombreCompleto(usuarioActualizado.getNombreCompleto());
                    usuario.setEmail(usuarioActualizado.getEmail());
                    usuario.setTelefono(usuarioActualizado.getTelefono());

                    // Solo actualiza la contraseña si se proporciona una nueva
                    if (usuarioActualizado.getContrasena() != null && !usuarioActualizado.getContrasena().isEmpty()) {
                        usuario.setContrasena(passwordEncoder.encode(usuarioActualizado.getContrasena()));
                    }

                    return usuarioRepository.save(usuario);
                })
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id: " + id));
    }

    public void deleteUsuario(Long id) {
        if (!usuarioRepository.existsById(id)) {
            throw new RuntimeException("Usuario no encontrado con id: " + id);
        }
        usuarioRepository.deleteById(id);
    }

    public boolean existsById(Long id) {
        return usuarioRepository.existsById(id);
    }

    public boolean existsByEmail(String email) {
        return usuarioRepository.existsByEmail(email);
    }

    public long countUsuarios() {
        return usuarioRepository.count();
    }

    public Usuario login(String email, String contrasena) {
        Optional<Usuario> usuario = usuarioRepository.findByEmail(email);
        if (usuario.isPresent() && passwordEncoder.matches(contrasena, usuario.get().getContrasena())) {
            return usuario.get();
        }
        throw new RuntimeException("Credenciales incorrectas");
    }
}
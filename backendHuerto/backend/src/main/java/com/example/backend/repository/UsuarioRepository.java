package com.example.backend.repository;

import com.example.backend.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    // ⭐ Buscar por email
    Optional<Usuario> findByEmail(String email);

    // ⭐ Verificar si existe por email
    boolean existsByEmail(String email);

    // Búsqueda por nombre o email
    @Query("SELECT u FROM Usuario u WHERE " +
            "LOWER(u.nombreCompleto) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(u.email) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Usuario> searchByNombreOrEmail(@Param("searchTerm") String searchTerm);
}
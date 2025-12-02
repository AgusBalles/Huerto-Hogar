package com.example.backend.repository;

import com.example.backend.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    Optional<Category> findByNombre(String nombre);

    boolean existsByNombre(String nombre);

    List<Category> findByNombreContainingIgnoreCase(String nombre);

    @Query("SELECT c FROM Category c WHERE LOWER(c.nombre) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Category> searchByNombre(@Param("searchTerm") String searchTerm);

    @Query("SELECT c FROM Category c ORDER BY c.nombre ASC")
    List<Category> findAllOrderByNombreAsc();

    @Query("SELECT COUNT(p) FROM Product p WHERE p.category.id = :categoryId")
    long countProductsByCategory(@Param("categoryId") Long categoryId);
}
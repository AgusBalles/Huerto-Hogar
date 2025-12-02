package com.example.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "product")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(length = 1000)
    private String descripcion;

    @Column(length = 50)
    private String codigo;

    @Column(nullable = false)
    private double precio;

    @Column(nullable = false)
    private int stock;

    @Column(length = 50)
    private String unidad;

    @Column(length = 200)
    private String origen;

    @Column(length = 500)
    private String imagen;

    @Column(nullable = false)
    private boolean sostenible = false;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id")
    private Category category;

    // Método helper para mapear el nombre de categoría al formato del frontend
    @Transient
    public String getCategoryName() {
        if (category == null) return null;

        // Mapea los nombres de categoría a los IDs que usa el frontend
        String nombre = category.getNombre();
        if (nombre.contains("Frutas")) return "frutas";
        if (nombre.contains("Verduras")) return "verduras";
        if (nombre.contains("Orgánicos") || nombre.contains("Organicos")) return "organicos";
        if (nombre.contains("Lácteos") || nombre.contains("Lacteos")) return "lacteos";

        return nombre.toLowerCase();
    }
}
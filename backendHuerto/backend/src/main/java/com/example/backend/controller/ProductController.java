package com.example.backend.controller;

import com.example.backend.model.Product;
import com.example.backend.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/productos")
@Tag(name = "Productos", description = "Gestión de productos del catálogo")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    @Operation(
            summary = "Obtener todos los productos",
            description = "Retorna una lista con todos los productos registrados"
    )
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    @Operation(
            summary = "Obtener un producto por ID",
            description = "Busca y devuelve un producto según su identificador"
    )
    public Product getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    @PostMapping
    @Operation(
            summary = "Crear un nuevo producto",
            description = "Registra un nuevo producto en el sistema"
    )
    public Product createProduct(@RequestBody Product product) {
        // Ignorar cualquier id que venga del cliente para forzar la creación
        product.setId(null);
        return productService.saveProduct(product);
    }

    @PutMapping("/{id}")
    @Operation(
            summary = "Actualizar un producto",
            description = "Modifica los datos de un producto existente"
    )
        public Product updateProduct(
            @PathVariable Long id,
            @RequestBody Product product) {

        Product existing = productService.getProductById(id);
        if (existing == null) return null;

        existing.setNombre(product.getNombre());
        existing.setDescripcion(product.getDescripcion());
        existing.setCodigo(product.getCodigo());
        existing.setPrecio(product.getPrecio());
        existing.setStock(product.getStock());

        return productService.saveProduct(existing);
    }

    @DeleteMapping("/{id}")
    @Operation(
            summary = "Eliminar un producto",
            description = "Elimina un producto del sistema utilizando su ID"
    )
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
    }
}
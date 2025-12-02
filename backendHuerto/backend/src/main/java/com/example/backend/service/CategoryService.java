package com.example.backend.service;

import com.example.backend.model.Category;
import com.example.backend.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getAllCategory() {
        return categoryRepository.findAll();
    }

    public Optional<Category> getCategoryById(Long id) {
        return categoryRepository.findById(id);
    }

    public Optional<Category> getCategoryByNombre(String nombre) {
        return categoryRepository.findByNombre(nombre);
    }

    public Category createCategory(Category category) {
        if (categoryRepository.existsByNombre(category.getNombre())) {
            throw new RuntimeException("Ya existe una categoría con ese nombre");
        }
        return categoryRepository.save(category);
    }

    public Category updateCategory(Long id, Category categoryActualizada) {
        return categoryRepository.findById(id)
                .map(category -> {
                    if (!category.getNombre().equals(categoryActualizada.getNombre())
                            && categoryRepository.existsByNombre(categoryActualizada.getNombre())) {
                        throw new RuntimeException("Ya existe una categoría con ese nombre");
                    }
                    category.setNombre(categoryActualizada.getNombre());
                    return categoryRepository.save(category);
                })
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada con id: " + id));
    }

    public void deleteCategory(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new RuntimeException("Categoría no encontrada con id: " + id);
        }
        categoryRepository.deleteById(id);
    }

    public boolean existsById(Long id) {
        return categoryRepository.existsById(id);
    }

    public boolean existsByNombre(String nombre) {
        return categoryRepository.existsByNombre(nombre);
    }

    public long countCategories() {
        return categoryRepository.count();
    }
}
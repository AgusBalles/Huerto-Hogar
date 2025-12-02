-- ========================================
-- data.sql - Datos iniciales para Huerto
-- ========================================

-- ========================================
-- PASO 1: Insertar Categorías
-- ========================================

INSERT IGNORE INTO category (nombre) VALUES ('Frutas Frescas');
INSERT IGNORE INTO category (nombre) VALUES ('Verduras Orgánicas');
INSERT IGNORE INTO category (nombre) VALUES ('Productos Orgánicos');
INSERT IGNORE INTO category (nombre) VALUES ('Productos Lácteos');

-- ========================================
-- PASO 2: Insertar Productos
-- ========================================

-- Frutas (category_id = 1)
INSERT IGNORE INTO product (nombre, codigo, precio, stock, category_id, descripcion, unidad, origen, imagen, sostenible)
VALUES ('Manzanas Fuji', 'FR001', 1200, 150, 1, 'Manzanas Fuji crujientes y dulces, cultivadas en el Valle del Maule. Perfectas para meriendas saludables o como ingrediente en postres.', 'kilo', 'Valle del Maule', '/img/manzana.png', TRUE);

INSERT IGNORE INTO product (nombre, codigo, precio, stock, category_id, descripcion, unidad, origen, imagen, sostenible)
VALUES ('Naranjas Valencia', 'FR002', 1000, 200, 1, 'Jugosas y ricas en vitamina C, estas naranjas Valencia son ideales para zumos frescos y refrescantes.', 'kilo', 'Región de Coquimbo', '/img/naranjas.png', TRUE);

INSERT IGNORE INTO product (nombre, codigo, precio, stock, category_id, descripcion, unidad, origen, imagen, sostenible)
VALUES ('Plátanos Cavendish', 'FR003', 800, 250, 1, 'Plátanos maduros y dulces, perfectos para el desayuno o como snack energético. Ricos en potasio y vitaminas.', 'kilo', 'Ecuador', '/img/platano.png', FALSE);

-- Verduras (category_id = 2)
INSERT IGNORE INTO product (nombre, codigo, precio, stock, category_id, descripcion, unidad, origen, imagen, sostenible)
VALUES ('Zanahorias Orgánicas', 'VR001', 900, 100, 2, 'Zanahorias crujientes cultivadas sin pesticidas en la Región de O\'Higgins. Excelente fuente de vitamina A y fibra.', 'kilo', 'Región de O\'Higgins', '/img/zanahoria.png', TRUE);

INSERT IGNORE INTO product (nombre, codigo, precio, stock, category_id, descripcion, unidad, origen, imagen, sostenible)
VALUES ('Espinacas Frescas', 'VR002', 700, 80, 2, 'Espinacas frescas y nutritivas, perfectas para ensaladas y batidos verdes. Cultivadas bajo prácticas orgánicas.', 'bolsa de 500g', 'Región Metropolitana', '/img/espinaca.png', TRUE);

INSERT IGNORE INTO product (nombre, codigo, precio, stock, category_id, descripcion, unidad, origen, imagen, sostenible)
VALUES ('Pimientos Tricolores', 'VR003', 1500, 120, 2, 'Pimientos rojos, amarillos y verdes, ideales para salteados y platos coloridos. Ricos en antioxidantes y vitaminas.', 'kilo', 'Región de Valparaíso', '/img/pimenton.png', TRUE);

-- Productos Orgánicos (category_id = 3)
INSERT IGNORE INTO product (nombre, codigo, precio, stock, category_id, descripcion, unidad, origen, imagen, sostenible)
VALUES ('Miel Orgánica', 'PO001', 5000, 50, 3, 'Miel pura y orgánica producida por apicultores locales. Rica en antioxidantes y con un sabor inigualable.', 'frasco de 500g', 'Región del Maule', '/img/miel.png', TRUE);

INSERT IGNORE INTO product (nombre, codigo, precio, stock, category_id, descripcion, unidad, origen, imagen, sostenible)
VALUES ('Quinua Orgánica', 'PO003', 3500, 75, 3, 'Quinua orgánica de alta calidad, rica en proteínas y minerales. Perfecta para ensaladas, guisos y como alternativa saludable al arroz.', 'bolsa de 1kg', 'Altiplano Boliviano', '/img/quinua.png', TRUE);

-- Productos Lácteos (category_id = 4)
INSERT IGNORE INTO product (nombre, codigo, precio, stock, category_id, descripcion, unidad, origen, imagen, sostenible)
VALUES ('Leche Entera', 'PL001', 1200, 100, 4, 'Leche entera fresca de granjas locales que se dedican a la producción responsable y de calidad. Rica en calcio y nutrientes esenciales.', 'litro', 'Región de Los Lagos', '/img/leche.png', TRUE);
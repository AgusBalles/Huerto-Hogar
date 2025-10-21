// src/data/productsData.js
export const productsData = [
  {
    id: 'FR001',
    name: 'Manzanas Fuji',
    category: 'frutas',
    price: 1200,
    stock: 150,
    unit: 'kilo',
    description: 'Manzanas Fuji crujientes y dulces...',
    origin: 'Valle del Maule',
    image: '/img/manzana.png', // ✅ Ruta absoluta desde public/
    sustainable: true,
    reviews: [
      { user: 'María González', rating: 5, comment: 'Excelente calidad, muy frescas!' },
      { user: 'Carlos Pérez', rating: 4, comment: 'Sabor increíble, volveré a comprar.' }
    ]
  },
  {
    id: 'FR002',
    name: 'Naranjas Valencia',
    category: 'frutas',
    price: 1000,
    stock: 200,
    unit: 'kilo',
    description: 'Jugosas y ricas en vitamina C...',
    origin: 'Región de Coquimbo',
    image: '/img/naranjas.png', // ✅ Ruta absoluta
    sustainable: true,
    reviews: [
      { user: 'Ana Silva', rating: 5, comment: 'Perfectas para jugo, muy dulces!' }
    ]
  },
  {
    id: 'FR003',
    name: 'Plátanos Cavendish',
    category: 'frutas',
    price: 800,
    stock: 250,
    unit: 'kilo',
    description: 'Plátanos maduros y dulces...',
    origin: 'Ecuador',
    image: '/img/platano.png', // ✅ Ruta absoluta
    sustainable: false,
    reviews: [
      { user: 'Pedro Rodríguez', rating: 4, comment: 'Buenos plátanos, llegaron en perfecto estado.' }
    ]
  },
  {
    id: 'VR001',
    name: 'Zanahorias Orgánicas',
    category: 'verduras',
    price: 900,
    stock: 100,
    unit: 'kilo',
    description: 'Zanahorias crujientes cultivadas sin pesticidas...',
    origin: 'Región de O\'Higgins',
    image: '/img/zanahoria.png', // ✅ Ruta absoluta
    sustainable: true,
    reviews: [
      { user: 'Laura Martín', rating: 5, comment: 'Las mejores zanahorias que he probado!' }
    ]
  },
  {
    id: 'VR002',
    name: 'Espinacas Frescas',
    category: 'verduras',
    price: 700,
    stock: 80,
    unit: 'bolsa de 500g',
    description: 'Espinacas frescas y nutritivas...',
    origin: 'Región Metropolitana',
    image: '/img/espinaca.png', // ✅ Ruta absoluta
    sustainable: true,
    reviews: []
  },
  {
    id: 'VR003',
    name: 'Pimientos Tricolores',
    category: 'verduras',
    price: 1500,
    stock: 120,
    unit: 'kilo',
    description: 'Pimientos rojos, amarillos y verdes...',
    origin: 'Región de Valparaíso',
    image: '/img/pimenton.png', // ✅ Ruta absoluta
    sustainable: true,
    reviews: [
      { user: 'José López', rating: 4, comment: 'Colores muy vivos y sabor excelente.' }
    ]
  },
  {
    id: 'PO001',
    name: 'Miel Orgánica',
    category: 'organicos',
    price: 5000,
    stock: 50,
    unit: 'frasco de 500g',
    description: 'Miel pura y orgánica producida por apicultores locales...',
    origin: 'Región del Maule',
    image: '/img/miel.png', // ✅ Ruta absoluta
    sustainable: true,
    reviews: [
      { user: 'Carmen Torres', rating: 5, comment: 'Miel deliciosa, se nota la calidad artesanal.' }
    ]
  },
  {
    id: 'PO003',
    name: 'Quinua Orgánica',
    category: 'organicos',
    price: 3500,
    stock: 75,
    unit: 'bolsa de 1kg',
    description: 'Quinua orgánica de alta calidad...',
    origin: 'Altiplano Boliviano',
    image: '/img/quinua.png', // ✅ Ruta absoluta
    sustainable: true,
    reviews: [
      { user: 'Roberto Díaz', rating: 5, comment: 'Excelente calidad, muy nutritiva.' }
    ]
  },
  {
    id: 'PL001',
    name: 'Leche Entera',
    category: 'lacteos',
    price: 1200,
    stock: 100,
    unit: 'litro',
    description: 'Leche entera fresca de granjas locales...',
    origin: 'Región de Los Lagos',
    image: '/img/leche.png', // ✅ Ruta absoluta
    sustainable: true,
    reviews: [
      { user: 'Francisca Herrera', rating: 4, comment: 'Leche muy fresca, se nota la diferencia.' }
    ]
  }
];
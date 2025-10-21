// src/data/productsData.js
export const productsData = [
  {
    id: 'FR001',
    name: 'Manzanas Fuji',
    category: 'frutas',
    price: 1200,
    stock: 150,
    unit: 'kilo',
    description: 'Manzanas Fuji crujientes y dulces, cultivadas en el Valle del Maule. Perfectas para meriendas saludables o como ingrediente en postres. Estas manzanas son conocidas por su textura firme y su sabor equilibrado entre dulce y ácido.',
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
    description: 'Jugosas y ricas en vitamina C, estas naranjas Valencia son ideales para zumos frescos y refrescantes. Cultivadas en condiciones climáticas óptimas que aseguran su dulzura y jugosidad.',
    origin: 'Región de Coquimbo',
    image: '/img/naranjas.png', // ✅ Ruta absoluta desde public/
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
    description: 'Plátanos maduros y dulces, perfectos para el desayuno o como snack energético. Estos plátanos son ricos en potasio y vitaminas, ideales para mantener una dieta equilibrada.',
    origin: 'Ecuador',
    image: '/img/platano.png', // ✅ Ruta absoluta desde public/
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
    description: 'Zanahorias crujientes cultivadas sin pesticidas en la Región de O\'Higgins. Excelente fuente de vitamina A y fibra, ideales para ensaladas, jugos o como snack saludable.',
    origin: 'Región de O\'Higgins',
    image: '/img/zanahoria.png', // ✅ Ruta absoluta desde public/
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
    description: 'Espinacas frescas y nutritivas, perfectas para ensaladas y batidos verdes. Estas espinacas son cultivadas bajo prácticas orgánicas que garantizan su calidad y valor nutricional.',
    origin: 'Región Metropolitana',
    image: '/img/espinaca.png', // ✅ Ruta absoluta desde public/
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
    description: 'Pimientos rojos, amarillos y verdes, ideales para salteados y platos coloridos. Ricos en antioxidantes y vitaminas, estos pimientos añaden un toque vibrante y saludable a cualquier receta.',
    origin: 'Región de Valparaíso',
    image: '/img/pimenton.png', // ✅ Ruta absoluta desde public/
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
    description: 'Miel pura y orgánica producida por apicultores locales. Rica en antioxidantes y con un sabor inigualable, perfecta para endulzar de manera natural tus comidas y bebidas.',
    origin: 'Región del Maule',
    image: '/img/miel.png', // ✅ Ruta absoluta desde public/
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
    description: 'Quinua orgánica de alta calidad, rica en proteínas y minerales. Perfecta para ensaladas, guisos y como alternativa saludable al arroz.',
    origin: 'Altiplano Boliviano',
    image: '/img/quinua.png', // ✅ Ruta absoluta desde public/
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
    description: 'Leche entera fresca de granjas locales que se dedican a la producción responsable y de calidad. Rica en calcio y nutrientes esenciales para toda la familia.',
    origin: 'Región de Los Lagos',
    image: '/img/leche.png', // ✅ Ruta absoluta desde public/
    sustainable: true,
    reviews: [
      { user: 'Francisca Herrera', rating: 4, comment: 'Leche muy fresca, se nota la diferencia.' }
    ]
  }
];
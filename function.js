
const products = [
    {
        id: 'FR001',
        name: 'Manzanas Fuji',
        category: 'frutas',
        price: 1200,
        stock: 150,
        unit: 'kilo',
        description: 'Manzanas Fuji crujientes y dulces, cultivadas en el Valle del Maule. Perfectas para meriendas saludables o como ingrediente en postres. Estas manzanas son conocidas por su textura firme y su sabor equilibrado entre dulce y ácido.',
        origin: 'Valle del Maule',
        image: 'img/manzana.png',
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
        image: 'img/naranjas.png',
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
        image: 'img/platano.png',
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
        image: 'img/zanahoria.png',
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
        image: 'img/espinaca.png',
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
        image: 'img/pimenton.png',
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
        image: 'img/miel.png',
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
        image: 'img/quinua.png',
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
        image: 'img/leche.png',
        sustainable: true,
        reviews: [
            { user: 'Francisca Herrera', rating: 4, comment: 'Leche muy fresca, se nota la diferencia.' }
        ]
    }
];


let cart = [];
let currentUser = null;
let loyaltyPoints = 0;
let currentFilter = 'all';
let searchQuery = '';


const elementsCache = {};

// Función para obtener elementos del DOM con caché
function getElement(id) {
    if (!elementsCache[id]) {
        elementsCache[id] = document.getElementById(id);
    }
    return elementsCache[id];
}


document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    renderProducts();
    updateCartUI();
    setupEventListeners();
    loadUserData();
}

function setupEventListeners() {

    const searchInput = getElement('searchInput');
    const categoryFilter = getElement('categoryFilter');
    
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', handleCategoryFilterChange);
    }

 
    const loginForm = getElement('loginForm');
    const registerForm = getElement('registerForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    window.addEventListener('click', function(event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.classList.remove('active');
                getElement('overlay').classList.remove('active');
            }
        });
    });
}


function toggleSearch() {
    const searchDropdown = getElement('searchDropdown');
    searchDropdown.classList.toggle('active');
}

function toggleCart() {
    const cartSidebar = getElement('cartSidebar');
    const overlay = getElement('overlay');
    
    cartSidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

function toggleLogin() {
    const loginModal = getElement('loginModal');
    const overlay = getElement('overlay');
    
    loginModal.classList.toggle('active');
    overlay.classList.toggle('active');
}

function showLogin() {
    getElement('loginForm').classList.remove('hidden');
    getElement('registerForm').classList.add('hidden');
    
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

function showRegister() {
    getElement('loginForm').classList.add('hidden');
    getElement('registerForm').classList.remove('hidden');
    
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function renderProducts(productsToRender = products) {
    const productsGrid = getElement('productsGrid');
    if (!productsGrid) return;

    productsGrid.innerHTML = productsToRender.map(product => `
        <div class="product-card" data-category="${product.category}" onclick="showProductModal('${product.id}')">
            <div class="product-image">
                <img src="${product.image || 'img/default.jpg'}" alt="${product.name}" style="width:100px;height:100px;border-radius:8px;">
                ${product.emoji ? product.emoji : ''}
                ${product.sustainable ? '<div class="product-badge">Orgánico</div>' : ''}
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description.substring(0, 100)}...</p>
                <div class="product-price">
                    <span class="price">$${product.price.toLocaleString()} CLP</span>
                    <span class="stock">${product.stock} ${product.unit}${product.stock !== 1 ? 's' : ''} disponibles</span>
                </div>
                <div class="product-actions">
                    <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart('${product.id}')">
                        <i class="fas fa-cart-plus"></i> Agregar
                    </button>
                    <button class="view-product-btn" onclick="event.stopPropagation(); showProductModal('${product.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function filterProducts(category) {
    currentFilter = category;
    

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    

    let filteredProducts = products;
    
    if (category !== 'all') {
        filteredProducts = products.filter(product => product.category === category);
    }
    
    if (searchQuery) {
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
    
    renderProducts(filteredProducts);
    

    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50);
    });
}

function handleSearch() {
    searchQuery = getElement('searchInput').value;
    
    let filteredProducts = products;
    
    if (currentFilter !== 'all') {
        filteredProducts = products.filter(product => product.category === currentFilter);
    }
    
    if (searchQuery) {
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
    
    renderProducts(filteredProducts);
}

function handleCategoryFilterChange() {
    const categoryFilter = getElement('categoryFilter');
    const selectedCategory = categoryFilter.value;
    
    if (selectedCategory === '') {
        filterProducts('all');
    } else {
        filterProducts(selectedCategory);
    }
}


function showProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modalContent = getElement('productModalContent');
    modalContent.innerHTML = `
        <div class="product-modal-image">
            <img src="${product.image}" alt="${product.name}" style="width:120px;height:120px;border-radius:10px;">
        </div>
        <div class="product-modal-info">
            <h2>${product.name}</h2>
            <p class="price">$${product.price.toLocaleString()} CLP por ${product.unit}</p>
            <p class="description">${product.description}</p>
            <div class="product-details">
                <p><strong>Origen:</strong> ${product.origin}</p>
                <p><strong>Stock disponible:</strong> ${product.stock} ${product.unit}${product.stock !== 1 ? 's' : ''}</p>
                ${product.sustainable ? '<p><strong>✓ Producto orgánico/sostenible</strong></p>' : ''}
            </div>
            <div class="quantity-selector">
                <label>Cantidad:</label>
                <input type="number" class="qty-input" value="1" min="1" max="${product.stock}" id="modalQuantity">
                <span>${product.unit}${product.stock !== 1 ? 's' : ''}</span>
            </div>
            <button class="add-to-cart-btn" onclick="addToCartFromModal('${product.id}')">
                Agregar al Carrito
            </button>
            <div class="reviews-section">
                <h3>Reseñas (${product.reviews.length})</h3>
                ${product.reviews.map(review => `
                    <div class="review-item">
                        <div class="review-header">
                            <strong>${review.user}</strong>
                            <div class="review-rating">
                                ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
                            </div>
                        </div>
                        <p>${review.comment}</p>
                    </div>
                `).join('')}
                ${product.reviews.length === 0 ? '<p>Aún no hay reseñas para este producto.</p>' : ''}
            </div>
        </div>
    `;
    
    getElement('productModal').classList.add('active');
    getElement('overlay').classList.add('active');
}
function closeProductModal() {
    getElement('productModal').classList.remove('active');
    getElement('overlay').classList.remove('active');
}

function addToCartFromModal(productId) {
    const quantity = parseInt(getElement('modalQuantity').value);
    addToCart(productId, quantity);
    closeProductModal();
}


function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
        if (existingItem.quantity > product.stock) {
            existingItem.quantity = product.stock;
            showNotification('Stock máximo alcanzado', 'warning');
        }
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            quantity: quantity,
            emoji: product.emoji,
            unit: product.unit
        });
    }
    
    updateCartUI();
    showNotification(`${product.name} agregado al carrito`, 'success');
    

    loyaltyPoints += Math.floor(product.price * quantity / 100);
    updateLoyaltyUI();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    showNotification('Producto eliminado del carrito', 'info');
}

function updateQuantity(productId, newQuantity) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);
    
    if (cartItem && product) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else if (newQuantity <= product.stock) {
            cartItem.quantity = newQuantity;
            updateCartUI();
        } else {
            showNotification('Stock insuficiente', 'warning');
        }
    }
}

function updateCartUI() {
    const cartItems = getElement('cartItems');
    const cartCount = getElement('cartCount');
    const cartTotal = getElement('cartTotal');
    
    if (!cartItems || !cartCount || !cartTotal) return;
    
 
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toLocaleString();
    
  
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: var(--text-medium); padding: 2rem;">Tu carrito está vacío</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.emoji} ${item.name}</h4>
                    <p>${item.price.toLocaleString()} CLP por ${item.unit}</p>
                </div>
                <div class="cart-item-controls">
                    <button class="qty-btn" onclick="updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                    <button class="qty-btn" style="background: #e74c3c; margin-left: 0.5rem;" onclick="removeFromCart('${item.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }
}

function checkout() {
    if (cart.length === 0) {
        showNotification('Tu carrito está vacío', 'warning');
        return;
    }
    
    if (!currentUser) {
        showNotification('Por favor inicia sesión para continuar', 'warning');
        toggleLogin();
        return;
    }
    
   
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderId = 'ORD-' + Date.now();
   
    showOrderSummary(orderId, cart, total);

    cart = [];
    updateCartUI();
    toggleCart();
    
    showNotification('¡Pedido realizado con éxito!', 'success');
}

function showOrderSummary(orderId, items, total) {
    const summaryHTML = `
        <div class="order-summary">
            <h2>Resumen del Pedido</h2>
            <p><strong>Número de pedido:</strong> ${orderId}</p>
            <p><strong>Fecha:</strong> ${new Date().toLocaleDateString('es-CL')}</p>
            <div class="order-items">
                ${items.map(item => `
                    <div class="order-item">
                        <span>${item.emoji} ${item.name} x${item.quantity}</span>
                        <span>${(item.price * item.quantity).toLocaleString()} CLP</span>
                    </div>
                `).join('')}
            </div>
            <div class="order-total">
                <strong>Total: ${total.toLocaleString()} CLP</strong>
            </div>
            <p style="margin-top: 1rem; color: var(--text-medium);">
                Recibirás una confirmación por correo electrónico. 
                Tu pedido será procesado y enviado en las próximas 24-48 horas.
            </p>
        </div>
    `;
    

    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
            ${summaryHTML}
        </div>
    `;
    
    document.body.appendChild(modal);
    getElement('overlay').classList.add('active');
}


function handleLogin(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const email = formData.get('email') || event.target.querySelector('input[type="email"]').value;
    const password = formData.get('password') || event.target.querySelector('input[type="password"]').value;
    
 
    if (email && password) {
        currentUser = {
            email: email,
            name: email.split('@')[0],
            address: '',
            phone: ''
        };
        
        showNotification(`¡Bienvenido, ${currentUser.name}!`, 'success');
        toggleLogin();
        updateUserUI();
        loadUserData();
    } else {
        showNotification('Por favor completa todos los campos', 'error');
    }
}

function handleRegister(event) {
    event.preventDefault();
    
    const inputs = event.target.querySelectorAll('input');
    const name = inputs[0].value;
    const email = inputs[1].value;
    const phone = inputs[2].value;
    const password = inputs[3].value;
    const confirmPassword = inputs[4].value;
    
    if (!name || !email || !phone || !password || !confirmPassword) {
        showNotification('Por favor completa todos los campos', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showNotification('Las contraseñas no coinciden', 'error');
        return;
    }
    
  
    currentUser = {
        name: name,
        email: email,
        phone: phone,
        address: ''
    };
    
    showNotification(`¡Cuenta creada exitosamente! Bienvenido, ${currentUser.name}!`, 'success');
    toggleLogin();
    updateUserUI();
}

function updateUserUI() {
    const loginBtn = document.querySelector('.login-btn');
    if (currentUser && loginBtn) {
        loginBtn.innerHTML = `<i class="fas fa-user-check"></i>`;
        loginBtn.onclick = showUserProfile;
    }
}

function showUserProfile() {
    if (!currentUser) return;
    
    const profileHTML = `
        <div class="user-profile">
            <h2>Mi Perfil</h2>
            <div class="profile-info">
                <p><strong>Nombre:</strong> ${currentUser.name}</p>
                <p><strong>Email:</strong> ${currentUser.email}</p>
                <p><strong>Teléfono:</strong> ${currentUser.phone || 'No registrado'}</p>
                <p><strong>Puntos de fidelización:</strong> ${loyaltyPoints}</p>
            </div>
            <div class="profile-actions">
                <button onclick="editProfile()" class="edit-profile-btn">Editar Perfil</button>
                <button onclick="logout()" class="logout-btn">Cerrar Sesión</button>
            </div>
        </div>
    `;
    
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="this.parentElement.parentElement.remove(); document.getElementById('overlay').classList.remove('active')">&times;</span>
            ${profileHTML}
        </div>
    `;
    
    document.body.appendChild(modal);
    getElement('overlay').classList.add('active');
}

function logout() {
    currentUser = null;
    loyaltyPoints = 0;
    cart = [];
    
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
        loginBtn.innerHTML = `<i class="fas fa-user"></i>`;
        loginBtn.onclick = toggleLogin;
    }
    
    updateCartUI();
    updateLoyaltyUI();
    
    // Cerrar modales
    document.querySelectorAll('.modal').forEach(modal => modal.remove());
    getElement('overlay').classList.remove('active');
    
    showNotification('Sesión cerrada', 'info');
}


function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 3000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        success: '#27ae60',
        error: '#e74c3c',
        warning: '#f39c12',
        info: '#3498db'
    };
    return colors[type] || colors.info;
}

function updateLoyaltyUI() {
    console.log(`Puntos de fidelización actuales: ${loyaltyPoints}`);
}

function loadUserData() {
    try {
        const savedUser = localStorage.getItem('huertohogar_user');
        const savedCart = localStorage.getItem('huertohogar_cart');
        const savedPoints = localStorage.getItem('huertohogar_points');
        
        if (savedUser) {
            currentUser = JSON.parse(savedUser);
            updateUserUI();
        }
        
        if (savedCart) {
            cart = JSON.parse(savedCart);
            updateCartUI();
        }
        
        if (savedPoints) {
            loyaltyPoints = parseInt(savedPoints);
            updateLoyaltyUI();
        }
    } catch (error) {
        console.log('No se pudieron cargar los datos guardados');
    }
}

function saveUserData() {
    try {
        if (currentUser) {
            localStorage.setItem('huertohogar_user', JSON.stringify(currentUser));
        }
        localStorage.setItem('huertohogar_cart', JSON.stringify(cart));
        localStorage.setItem('huertohogar_points', loyaltyPoints.toString());
    } catch (error) {
        console.log('No se pudieron guardar los datos');
    }
}

window.addEventListener('beforeunload', saveUserData);

function shareProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const shareText = `¡Mira este producto en HuertoHogar! ${product.name} - ${product.price.toLocaleString()} CLP`;
    
    if (navigator.share) {
        navigator.share({
            title: product.name,
            text: shareText,
            url: window.location.href
        });
    } else {
        // Fallback para navegadores que no soportan Web Share API
        navigator.clipboard.writeText(shareText + ' - ' + window.location.href)
            .then(() => showNotification('Enlace copiado al portapapeles', 'success'))
            .catch(() => showNotification('No se pudo compartir el producto', 'error'));
    }
}

function trackOrder(orderId) {
    const statuses = [
        'Pedido recibido',
        'Preparando pedido',
        'En camino',
        'Entregado'
    ];
    
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    showNotification(`Estado del pedido ${orderId}: ${randomStatus}`, 'info');
}

function filterByPrice(minPrice, maxPrice) {
    const filteredProducts = products.filter(product => 
        product.price >= minPrice && product.price <= maxPrice
    );
    renderProducts(filteredProducts);
}

function sortProducts(criteria) {
    let sortedProducts = [...products];
    
    switch (criteria) {
        case 'price-asc':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'stock':
            sortedProducts.sort((a, b) => b.stock - a.stock);
            break;
    }
    
    renderProducts(sortedProducts);
}

function showRecommendedProducts() {
    // Lógica simple de recomendación basada en el historial del carrito
    if (cart.length === 0) return products.slice(0, 3);
    
    const cartCategories = [...new Set(cart.map(item => {
        const product = products.find(p => p.id === item.id);
        return product ? product.category : null;
    }).filter(Boolean))];
    
    const recommended = products.filter(product => 
        cartCategories.includes(product.category) && 
        !cart.some(item => item.id === product.id)
    ).slice(0, 3);
    
    return recommended.length > 0 ? recommended : products.slice(0, 3);
}

function applyLoyaltyDiscount() {
    if (loyaltyPoints < 100) {
        showNotification('Necesitas al menos 100 puntos para aplicar un descuento', 'warning');
        return;
    }
    
    const discount = Math.floor(loyaltyPoints / 100) * 50; // 50 CLP por cada 100 puntos
    loyaltyPoints -= Math.floor(loyaltyPoints / 100) * 100;
    
    showNotification(`¡Descuento de ${discount} CLP aplicado!`, 'success');
    updateLoyaltyUI();
    
    return discount;
}

function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.product-card, .blog-card, .stat').forEach(el => {
        observer.observe(el);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeScrollEffects, 500);
});

function toggleSearch() {
    const searchDropdown = getElement('searchDropdown');
    const isActive = searchDropdown.classList.contains('active');
    
    if (isActive) {
        searchDropdown.classList.remove('active');
    } else {
        searchDropdown.classList.add('active');
        setTimeout(() => {
            const searchInput = getElement('searchInput');
            if (searchInput) {
                searchInput.focus();
            }
        }, 300);
    }
}
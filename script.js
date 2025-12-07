// ============================================
// INTERFACE LOCATAIRE
// ============================================

// Initialiser avec des données d'exemple
function initializeSampleData() {
    appData.products = [
        {
            id: 1,
            name: 'Chaise roulante électrique',
            category: 'wheelchair',
            description: 'Chaise roulante électrique en parfait état, très confortable et facile à manœuvrer. Batterie neuve.',
            condition: 'excellent',
            price: 150,
            deposit: 500,
            image: '♿',
            location: 'Casablanca',
            ownerId: 1,
            ownerName: 'Fatima',
            rating: 4.5,
            reviews: 12
        },
        {
            id: 2,
            name: 'Lit médicalisé motorisé',
            category: 'bed',
            description: 'Lit médicalisé avec matelas anti-escarres inclus. Très bon état, fonctionnel.',
            condition: 'good',
            price: 200,
            deposit: 800,
            image: '🛏️',
            location: 'Rabat',
            ownerId: 2,
            ownerName: 'Mohammed',
            rating: 4,
            reviews: 8
        },
        {
            id: 3,
            name: 'Déambulateur pliable',
            category: 'walker',
            description: 'Déambulateur léger et pliable, facile à transporter. Excellent pour la mobilité.',
            condition: 'excellent',
            price: 50,
            deposit: 200,
            image: '🚶',
            location: 'Fès',
            ownerId: 1,
            ownerName: 'Fatima',
            rating: 5,
            reviews: 15
        },
        {
            id: 4,
            name: 'Concentrateur d\'oxygène',
            category: 'oxygen',
            description: 'Concentrateur d\'oxygène 5L, très fiable avec alimentation électrique.',
            condition: 'good',
            price: 300,
            deposit: 1200,
            image: '💨',
            location: 'Marrakech',
            ownerId: 3,
            ownerName: 'Nadia',
            rating: 4.8,
            reviews: 6
        },
        {
            id: 5,
            name: 'Béquilles (paire)',
            category: 'crutches',
            description: 'Paire de béquilles réglables, légères et confortables.',
            condition: 'excellent',
            price: 30,
            deposit: 100,
            image: '🦵',
            location: 'Tangier',
            ownerId: 2,
            ownerName: 'Mohammed',
            rating: 4.2,
            reviews: 9
        }
    ];

    appData.users = [
        {
            id: 1,
            name: 'Fatima',
            email: 'fatima@example.com',
            password: 'password123',
            type: 'owner',
            location: 'Casablanca',
            phone: '+212 6XX XXX XXX',
            bio: 'Propriétaire de matériel médical depuis 5 ans',
            totalEarnings: 4500
        },
        {
            id: 2,
            name: 'Mohammed',
            email: 'mohammed@example.com',
            password: 'password123',
            type: 'owner',
            location: 'Rabat',
            phone: '+212 6XX XXX XXX',
            bio: 'Loue différents équipements médicaux',
            totalEarnings: 3200
        },
        {
            id: 3,
            name: 'Nadia',
            email: 'nadia@example.com',
            password: 'password123',
            type: 'owner',
            location: 'Marrakech',
            phone: '+212 6XX XXX XXX',
            bio: 'Spécialisée en équipements de respiration',
            totalEarnings: 5800
        }
    ];

    saveAppData();
}

// ============================================
// GESTION DE L'AUTHENTIFICATION
// ============================================

function switchAuthForm(form) {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (form === 'signup') {
        loginForm.classList.remove('active');
        signupForm.classList.add('active');
    } else {
        signupForm.classList.remove('active');
        loginForm.classList.add('active');
    }
}

function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    if (!email || !password) {
        showAlert('Veuillez remplir tous les champs', 'error');
        return;
    }

    const user = appData.users.find(u => u.email === email && u.password === password);

    if (user) {
        appData.currentUser = user;
        saveAppData();
        showAlert('Connexion réussie!', 'success');
        setTimeout(() => {
            loadUserInterface();
        }, 500);
    } else {
        showAlert('Email ou mot de passe incorrect', 'error');
    }
}

function handleSignup() {
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const passwordConfirm = document.getElementById('signupPasswordConfirm').value;
    const userType = document.querySelector('input[name="userType"]:checked').value;

    if (!name || !email || !password || !passwordConfirm) {
        showAlert('Veuillez remplir tous les champs', 'error');
        return;
    }

    if (password !== passwordConfirm) {
        showAlert('Les mots de passe ne correspondent pas', 'error');
        return;
    }

    if (appData.users.find(u => u.email === email)) {
        showAlert('Cet email est déjà enregistré', 'error');
        return;
    }

    const newUser = {
        id: appData.users.length + 1,
        name: name,
        email: email,
        password: password,
        type: userType,
        location: '',
        phone: '',
        bio: '',
        totalEarnings: 0
    };

    appData.users.push(newUser);
    appData.currentUser = newUser;
    saveAppData();

    showAlert('Inscription réussie!', 'success');
    setTimeout(() => {
        loadUserInterface();
    }, 500);
}

function handleLogout() {
    appData.currentUser = null;
    saveAppData();
    document.getElementById('authPage').classList.add('active');
    document.getElementById('tenantPage').classList.remove('active');
    document.getElementById('ownerPage').classList.remove('active');
    document.getElementById('loginEmail').value = '';
    document.getElementById('loginPassword').value = '';
    showAlert('Déconnexion réussie', 'info');
}

// ============================================
// CHARGEMENT DE L'INTERFACE UTILISATEUR
// ============================================

function loadUserInterface() {
    if (!appData.currentUser) return;

    document.getElementById('authPage').classList.remove('active');

    if (appData.currentUser.type === 'tenant') {
        document.getElementById('tenantPage').classList.add('active');
        document.getElementById('ownerPage').classList.remove('active');
        loadTenantInterface();
    } else if (appData.currentUser.type === 'owner') {
        document.getElementById('ownerPage').classList.add('active');
        document.getElementById('tenantPage').classList.remove('active');
        loadOwnerInterface();
    }
}

// ============================================
// INTERFACE LOCATAIRE
// ============================================

function loadTenantInterface() {
    filterProducts();
    loadTenantOrders();
    loadTenantFavorites();
    loadTenantProfile();
}

function showTenantSection(sectionName) {
    const sections = document.querySelectorAll('#tenantPage .section');
    sections.forEach(s => s.classList.remove('active'));

    const navBtns = document.querySelectorAll('#tenantPage .nav-btn');
    navBtns.forEach(btn => btn.classList.remove('active'));

    if (sectionName === 'home') {
        document.getElementById('tenantHome').classList.add('active');
        navBtns[0].classList.add('active');
    } else if (sectionName === 'browse') {
        document.getElementById('tenantBrowse').classList.add('active');
        navBtns[1].classList.add('active');
        filterProducts();
    } else if (sectionName === 'orders') {
        document.getElementById('tenantOrders').classList.add('active');
        navBtns[2].classList.add('active');
        loadTenantOrders();
    } else if (sectionName === 'favorites') {
        document.getElementById('tenantFavorites').classList.add('active');
        navBtns[3].classList.add('active');
        loadTenantFavorites();
    } else if (sectionName === 'profile') {
        document.getElementById('tenantProfile').classList.add('active');
        navBtns[4].classList.add('active');
    }
}

function displayProducts() {
    const productsList = document.getElementById('productsList');
    productsList.innerHTML = '';

    appData.products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <div style="position: absolute; font-size: 3em;">${product.image}</div>
            </div>
            <div class="product-card-content">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-location">📍 ${product.location}</p>
                <span class="product-category">${getCategoryLabel(product.category)}</span>
                <p class="product-price">${product.price} DH<span class="product-price-per-day">/jour</span></p>
                <div class="product-actions">
                    <button class="btn-view-details btn btn-small" onclick="openProductModal(${product.id})">Voir détails</button>
                    <button class="btn-favorite btn btn-small" onclick="toggleFavoriteFromCard(${product.id})">♡</button>
                </div>
            </div>
        `;
        productsList.appendChild(productCard);
    });
}

function filterProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;

    const filtered = appData.products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                             product.description.toLowerCase().includes(searchTerm);
        const matchesCategory = category === '' || product.category === category;
        return matchesSearch && matchesCategory;
    });

    const productsList = document.getElementById('productsList');
    productsList.innerHTML = '';

    if (filtered.length === 0) {
        productsList.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                <div class="empty-state-icon">🔍</div>
                <div class="empty-state-title">Aucun résultat</div>
                <div class="empty-state-text">Aucun matériel ne correspond à votre recherche</div>
            </div>
        `;
        return;
    }

    filtered.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <div style="position: absolute; font-size: 3em;">${product.image}</div>
            </div>
            <div class="product-card-content">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-location">📍 ${product.location}</p>
                <span class="product-category">${getCategoryLabel(product.category)}</span>
                <p class="product-price">${product.price} DH<span class="product-price-per-day">/jour</span></p>
                <div class="product-actions">
                    <button class="btn-view-details btn btn-small" onclick="openProductModal(${product.id})">Voir détails</button>
                    <button class="btn-favorite btn btn-small" onclick="toggleFavoriteFromCard(${product.id})">♡</button>
                </div>
            </div>
        `;
        productsList.appendChild(productCard);
    });
}

let selectedProductId = null;

function openProductModal(productId) {
    selectedProductId = productId;
    const product = appData.products.find(p => p.id === productId);

    if (!product) return;

    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalProductCategory').textContent = getCategoryLabel(product.category);
    document.getElementById('modalProductCondition').textContent = getConditionLabel(product.condition);
    document.getElementById('modalProductLocation').textContent = `📍 ${product.location}`;
    document.getElementById('modalProductDescription').textContent = product.description;
    document.getElementById('modalProductPrice').textContent = `${product.price} DH/jour`;
    document.getElementById('modalProductDeposit').textContent = `${product.deposit} DH`;
    document.getElementById('rentalStartDate').value = '';
    document.getElementById('rentalEndDate').value = '';

    document.getElementById('rentalStartDate').addEventListener('change', calculateRentalCost);
    document.getElementById('rentalEndDate').addEventListener('change', calculateRentalCost);

    document.getElementById('productModal').classList.add('active');

    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const isFavorite = favorites.includes(productId);
    const btnFavorite = document.getElementById('btnFavorite');
    if (isFavorite) {
        btnFavorite.textContent = '❤️ Ajouter aux favoris';
        btnFavorite.classList.add('liked');
    } else {
        btnFavorite.textContent = '♡ Ajouter aux favoris';
        btnFavorite.classList.remove('liked');
    }
}

function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
}

function calculateRentalCost() {
    const startDate = new Date(document.getElementById('rentalStartDate').value);
    const endDate = new Date(document.getElementById('rentalEndDate').value);

    if (startDate && endDate && endDate > startDate) {
        const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
        const product = appData.products.find(p => p.id === selectedProductId);
        const total = days * product.price;

        document.getElementById('rentalDays').textContent = days;
        document.getElementById('rentalTotal').textContent = total;
    }
}

function rentProduct() {
    const startDate = document.getElementById('rentalStartDate').value;
    const endDate = document.getElementById('rentalEndDate').value;

    if (!startDate || !endDate) {
        showAlert('Veuillez sélectionner les dates de location', 'error');
        return;
    }

    const product = appData.products.find(p => p.id === selectedProductId);
    const days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
    const totalPrice = days * product.price;

    const newOrder = {
        id: appData.orders.length + 1,
        productId: product.id,
        productName: product.name,
        tenantId: appData.currentUser.id,
        tenantName: appData.currentUser.name,
        ownerId: product.ownerId,
        ownerName: product.ownerName,
        startDate: startDate,
        endDate: endDate,
        totalPrice: totalPrice,
        status: 'pending',
        createdAt: new Date().toISOString(),
        deliveryAddress: appData.currentUser.deliveryAddress || ''
    };

    appData.orders.push(newOrder);
    saveAppData();

    closeProductModal();
    showAlert('Demande de location envoyée au propriétaire!', 'success');
}

function toggleFavorite() {
    toggleFavoriteFromCard(selectedProductId);
}

function toggleFavoriteFromCard(productId) {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const index = favorites.indexOf(productId);

    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(productId);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayProducts();
    showAlert(index > -1 ? 'Retiré des favoris' : 'Ajouté aux favoris', 'info');
}

function loadTenantOrders() {
    const tenantOrders = appData.orders.filter(o => o.tenantId === appData.currentUser.id);
    const ordersList = document.getElementById('ordersList');
    ordersList.innerHTML = '';

    if (tenantOrders.length === 0) {
        ordersList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📦</div>
                <div class="empty-state-title">Aucune commande</div>
                <div class="empty-state-text">Vous n'avez pas encore loué de matériel. Parcourez nos annonces pour commencer.</div>
            </div>
        `;
        return;
    }

    tenantOrders.forEach(order => {
        const orderDiv = document.createElement('div');
        orderDiv.className = 'order-item';
        orderDiv.innerHTML = `
            <div class="order-info">
                <h3>${order.productName}</h3>
                <div class="order-details">
                    <div class="order-detail-item"><strong>Propriétaire:</strong> ${order.ownerName}</div>
                    <div class="order-detail-item"><strong>Début:</strong> ${new Date(order.startDate).toLocaleDateString('fr-FR')}</div>
                    <div class="order-detail-item"><strong>Fin:</strong> ${new Date(order.endDate).toLocaleDateString('fr-FR')}</div>
                    <div class="order-detail-item"><strong>Prix:</strong> ${order.totalPrice} DH</div>
                </div>
            </div>
            <div class="order-status status-${order.status}">${getOrderStatusLabel(order.status)}</div>
        `;
        ordersList.appendChild(orderDiv);
    });
}

function loadTenantFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const favoriteProducts = appData.products.filter(p => favorites.includes(p.id));
    const favoritesList = document.getElementById('favoritesList');
    favoritesList.innerHTML = '';

    if (favoriteProducts.length === 0) {
        favoritesList.innerHTML = `
            <div style="grid-column: 1/-1;">
                <div class="empty-state">
                    <div class="empty-state-icon">❤️</div>
                    <div class="empty-state-title">Aucun favori</div>
                    <div class="empty-state-text">Ajoutez des matériels à vos favoris pour les retrouver facilement.</div>
                </div>
            </div>
        `;
        return;
    }

    favoriteProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <div style="position: absolute; font-size: 3em;">${product.image}</div>
            </div>
            <div class="product-card-content">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-location">📍 ${product.location}</p>
                <span class="product-category">${getCategoryLabel(product.category)}</span>
                <p class="product-price">${product.price} DH<span class="product-price-per-day">/jour</span></p>
                <div class="product-actions">
                    <button class="btn-view-details btn btn-small" onclick="openProductModal(${product.id})">Voir détails</button>
                    <button class="btn-favorite btn btn-small liked" onclick="toggleFavoriteFromCard(${product.id})">❤️</button>
                </div>
            </div>
        `;
        favoritesList.appendChild(productCard);
    });
}

function loadTenantProfile() {
    document.getElementById('profileName').textContent = appData.currentUser.name;
    document.getElementById('profileEmail').textContent = appData.currentUser.email;
    document.getElementById('profileAddress').value = appData.currentUser.deliveryAddress || '';
    document.getElementById('profilePhone').value = appData.currentUser.phone || '';
}

function saveTenantProfile() {
    appData.currentUser.deliveryAddress = document.getElementById('profileAddress').value;
    appData.currentUser.phone = document.getElementById('profilePhone').value;
    saveAppData();
    showAlert('Profil mis à jour avec succès!', 'success');
}

// ============================================
// INTERFACE PROPRIÉTAIRE
// ============================================

function loadOwnerHome() {
    const ownerProducts = appData.products.filter(p => p.ownerId === appData.currentUser.id);
    const ownerOrders = appData.orders.filter(o => o.ownerId === appData.currentUser.id);
    const pendingOrders = ownerOrders.filter(o => o.status === 'pending');
    const completedOrders = ownerOrders.filter(o => o.status === 'completed');

    document.getElementById('homeProductCount').textContent = ownerProducts.length;
    document.getElementById('homeOrderCount').textContent = pendingOrders.length;
    document.getElementById('homeCompletedCount').textContent = completedOrders.length;
    document.getElementById('homeEarningAmount').textContent = appData.currentUser.totalEarnings + ' DH';
}

function loadOwnerInterface() {
    loadOwnerHome();
    displayOwnerProducts();
    loadOwnerOrders();
    loadEarnings();
    loadOwnerProfile();
}

function showOwnerSection(sectionName) {
    const sections = document.querySelectorAll('#ownerPage .section');
    sections.forEach(s => s.classList.remove('active'));

    const navBtns = document.querySelectorAll('#ownerPage .nav-btn');
    navBtns.forEach(btn => btn.classList.remove('active'));

    if (sectionName === 'home') {
        document.getElementById('ownerHome').classList.add('active');
        navBtns[0].classList.add('active');
        loadOwnerHome();
    } else if (sectionName === 'myProducts') {
        document.getElementById('ownerMyProducts').classList.add('active');
        navBtns[1].classList.add('active');
        displayOwnerProducts();
    } else if (sectionName === 'addProduct') {
        document.getElementById('ownerAddProduct').classList.add('active');
        navBtns[2].classList.add('active');
    } else if (sectionName === 'orders') {
        document.getElementById('ownerOrders').classList.add('active');
        navBtns[3].classList.add('active');
        loadOwnerOrders();
    } else if (sectionName === 'earnings') {
        document.getElementById('ownerEarnings').classList.add('active');
        navBtns[4].classList.add('active');
        loadEarnings();
    } else if (sectionName === 'profile') {
        document.getElementById('ownerProfile').classList.add('active');
        navBtns[5].classList.add('active');
    }
}

function displayOwnerProducts() {
    const ownerProducts = appData.products.filter(p => p.ownerId === appData.currentUser.id);
    const myProductsList = document.getElementById('myProductsList');
    myProductsList.innerHTML = '';

    if (ownerProducts.length === 0) {
        myProductsList.innerHTML = `
            <div style="grid-column: 1/-1;">
                <div class="empty-state">
                    <div class="empty-state-icon">📋</div>
                    <div class="empty-state-title">Aucune annonce</div>
                    <div class="empty-state-text">Vous n'avez pas encore publié d'annonce. Créez-en une pour commencer à gagner!</div>
                </div>
            </div>
        `;
        return;
    }

    ownerProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <div style="position: absolute; font-size: 3em;">${product.image}</div>
            </div>
            <div class="product-card-content">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-location">📍 ${product.location}</p>
                <span class="product-category">${getCategoryLabel(product.category)}</span>
                <p class="product-price">${product.price} DH<span class="product-price-per-day">/jour</span></p>
                <div class="product-actions">
                    <button class="btn-view-details btn btn-small" onclick="editProduct(${product.id})">Modifier</button>
                    <button class="btn-danger btn btn-small" onclick="deleteProduct(${product.id})">Supprimer</button>
                </div>
            </div>
        `;
        myProductsList.appendChild(productCard);
    });
}

function addProduct() {
    const name = document.getElementById('productName').value;
    const category = document.getElementById('productCategory').value;
    const description = document.getElementById('productDescription').value;
    const condition = document.getElementById('productCondition').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const deposit = parseFloat(document.getElementById('productDeposit').value);
    const image = document.getElementById('productImage').value;
    const location = document.getElementById('productLocation').value;

    if (!name || !category || !description || !price || !deposit || !location) {
        showAlert('Veuillez remplir tous les champs obligatoires', 'error');
        return;
    }

    const newProduct = {
        id: appData.products.length + 1,
        name: name,
        category: category,
        description: description,
        condition: condition,
        price: price,
        deposit: deposit,
        image: image || '📦',
        location: location,
        ownerId: appData.currentUser.id,
        ownerName: appData.currentUser.name,
        rating: 0,
        reviews: 0
    };

    appData.products.push(newProduct);
    saveAppData();

    document.querySelector('.form-product').reset();
    displayOwnerProducts();
    showTenantSection('myProducts');
    showAlert('Annonce publiée avec succès!', 'success');
}

function editProduct(productId) {
    const product = appData.products.find(p => p.id === productId);
    document.getElementById('productName').value = product.name;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productDescription').value = product.description;
    document.getElementById('productCondition').value = product.condition;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productDeposit').value = product.deposit;
    document.getElementById('productImage').value = product.image;
    document.getElementById('productLocation').value = product.location;

    showOwnerSection('addProduct');
}

function deleteProduct(productId) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette annonce?')) {
        appData.products = appData.products.filter(p => p.id !== productId);
        saveAppData();
        displayOwnerProducts();
        showAlert('Annonce supprimée', 'success');
    }
}

let currentOrderFilter = 'pending';

function filterOrdersByStatus(status) {
    currentOrderFilter = status;
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    loadOwnerOrders();
}

function loadOwnerOrders() {
    const ownerOrders = appData.orders.filter(o => o.ownerId === appData.currentUser.id && o.status === currentOrderFilter);
    const ordersList = document.getElementById('ownerOrdersList');
    ordersList.innerHTML = '';

    if (ownerOrders.length === 0) {
        ordersList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📭</div>
                <div class="empty-state-title">Aucune demande</div>
                <div class="empty-state-text">Vous n'avez pas de demande de location pour le moment.</div>
            </div>
        `;
        return;
    }

    ownerOrders.forEach(order => {
        const orderDiv = document.createElement('div');
        orderDiv.className = 'order-item';
        
        let actionButtons = '';
        if (order.status === 'pending') {
            actionButtons = `
                <div class="order-actions">
                    <button class="btn btn-small btn-primary" onclick="respondToOrder(${order.id}, 'accepted')">Accepter</button>
                    <button class="btn btn-small btn-danger" onclick="respondToOrder(${order.id}, 'cancelled')">Refuser</button>
                </div>
            `;
        } else if (order.status === 'accepted') {
            actionButtons = `
                <div class="order-actions">
                    <button class="btn btn-small btn-primary" onclick="respondToOrder(${order.id}, 'completed')">Marquer comme complétée</button>
                </div>
            `;
        }

        orderDiv.innerHTML = `
            <div class="order-info">
                <h3>${order.productName}</h3>
                <div class="order-details">
                    <div class="order-detail-item"><strong>Locataire:</strong> ${order.tenantName}</div>
                    <div class="order-detail-item"><strong>Début:</strong> ${new Date(order.startDate).toLocaleDateString('fr-FR')}</div>
                    <div class="order-detail-item"><strong>Fin:</strong> ${new Date(order.endDate).toLocaleDateString('fr-FR')}</div>
                    <div class="order-detail-item"><strong>Prix:</strong> ${order.totalPrice} DH</div>
                    ${actionButtons}
                </div>
            </div>
        `;
        ordersList.appendChild(orderDiv);
    });
}

function respondToOrder(orderId, newStatus) {
    const order = appData.orders.find(o => o.id === orderId);
    if (!order) return;

    order.status = newStatus;
    
    if (newStatus === 'completed') {
        appData.currentUser.totalEarnings += order.totalPrice;
    }

    saveAppData();
    loadOwnerOrders();
    showAlert(`Demande de location ${newStatus === 'accepted' ? 'acceptée' : newStatus === 'completed' ? 'complétée' : 'refusée'}!`, 'success');
}

function loadEarnings() {
    const owner = appData.currentUser;
    const completedOrders = appData.orders.filter(o => o.ownerId === owner.id && o.status === 'completed');
    
    const now = new Date();
    const currentMonth = completedOrders.filter(o => {
        const orderDate = new Date(o.createdAt);
        return orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear();
    });

    const monthEarning = currentMonth.reduce((sum, o) => sum + o.totalPrice, 0);

    document.getElementById('monthEarning').textContent = `${monthEarning} DH`;
    document.getElementById('totalEarning').textContent = `${owner.totalEarnings} DH`;

    const earningsHistory = document.getElementById('earningsHistory');
    earningsHistory.innerHTML = '';

    completedOrders.forEach(order => {
        const item = document.createElement('div');
        item.className = 'earnings-item';
        item.innerHTML = `
            <div>
                <strong>${order.productName}</strong>
                <div class="earnings-date">${new Date(order.createdAt).toLocaleDateString('fr-FR')}</div>
            </div>
            <div class="earnings-amount">+${order.totalPrice} DH</div>
        `;
        earningsHistory.appendChild(item);
    });

    if (completedOrders.length === 0) {
        earningsHistory.innerHTML = `
            <div style="text-align: center; padding: 40px 20px; color: var(--gray-color);">
                <p>Aucune transaction complétée pour le moment</p>
            </div>
        `;
    }
}

function loadOwnerProfile() {
    document.getElementById('ownerProfileName').textContent = appData.currentUser.name;
    document.getElementById('ownerProfileEmail').textContent = appData.currentUser.email;
    document.getElementById('ownerProfileLocation').value = appData.currentUser.location || '';
    document.getElementById('ownerProfilePhone').value = appData.currentUser.phone || '';
    document.getElementById('ownerProfileBio').value = appData.currentUser.bio || '';
}

function saveOwnerProfile() {
    appData.currentUser.location = document.getElementById('ownerProfileLocation').value;
    appData.currentUser.phone = document.getElementById('ownerProfilePhone').value;
    appData.currentUser.bio = document.getElementById('ownerProfileBio').value;
    saveAppData();
    showAlert('Profil mis à jour avec succès!', 'success');
}

// ============================================
// FONCTIONS UTILITAIRES
// ============================================

function getCategoryLabel(category) {
    const categories = {
        'wheelchair': '♿ Chaise roulante',
        'bed': '🛏️ Lit médicalisé',
        'walker': '🚶 Déambulateur',
        'crutches': '🦵 Béquilles',
        'oxygen': '💨 Oxygène',
        'other': '📦 Autre'
    };
    return categories[category] || category;
}

function getConditionLabel(condition) {
    const conditions = {
        'excellent': 'Excellent',
        'good': 'Bon',
        'fair': 'Acceptable'
    };
    return conditions[condition] || condition;
}

function getOrderStatusLabel(status) {
    const statuses = {
        'pending': 'En attente',
        'accepted': 'Acceptée',
        'completed': 'Complétée',
        'cancelled': 'Annulée'
    };
    return statuses[status] || status;
}

function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 2000;
        animation: slideUp 0.3s ease;
    `;

    if (type === 'success') {
        alertDiv.style.backgroundColor = '#2ecc71';
    } else if (type === 'error') {
        alertDiv.style.backgroundColor = '#e74c3c';
    } else if (type === 'info') {
        alertDiv.style.backgroundColor = '#3498db';
    }

    alertDiv.textContent = message;
    document.body.appendChild(alertDiv);

    setTimeout(() => {
        alertDiv.style.animation = 'slideUp 0.3s ease reverse';
        setTimeout(() => alertDiv.remove(), 300);
    }, 3000);
}

function closeConfirmModal() {
    document.getElementById('confirmModal').classList.remove('active');
}

function confirmAction() {
    closeConfirmModal();
}

// ============================================
// INITIALISATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    loadAppData();
    
    // Focus sur le formulaire de login au chargement
    document.getElementById('loginEmail').focus();
});

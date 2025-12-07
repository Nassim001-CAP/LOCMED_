// ============================================
// NAVIGATION LANDING PAGE & AUTHENTIFICATION
// ============================================

function switchToAuth(form) {
    const landingPage = document.getElementById('landingPage');
    const authPage = document.getElementById('authPage');
    
    landingPage.classList.remove('active');
    authPage.classList.add('active');
    
    // Afficher le formulaire approprié
    switchAuthForm(form);
}

function backToLanding() {
    const landingPage = document.getElementById('landingPage');
    const authPage = document.getElementById('authPage');
    
    landingPage.classList.add('active');
    authPage.classList.remove('active');
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Effet parallax pour le hero
document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.landing-hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            if (scrolled < hero.offsetHeight) {
                hero.style.backgroundPosition = `center ${scrolled * 0.5}px`;
            }
        });
    }
    
    // Effet de fond animé
    animateBackground();
});

function animateBackground() {
    const backgroundElements = document.querySelectorAll('.landing-hero::before, .landing-hero::after');
    let angle = 0;
    
    setInterval(() => {
        angle = (angle + 0.5) % 360;
    }, 50);
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
        loadTenantProfile();
    }
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
        
        // Appliquer la classe 'rented' si le produit est loué
        if (product.status === 'rented') {
            productCard.classList.add('product-card-rented');
        }
        
        const statusBadge = product.status === 'rented' 
            ? '<span class="status-badge rented">🔒 Loué</span>'
            : '';
        
        const buttonDisabled = product.status === 'rented' ? 'disabled' : '';
        const buttonClass = product.status === 'rented' ? 'btn-disabled' : '';
        
        productCard.innerHTML = `
            <div class="product-image">
                ${renderProductImage(product)}
            </div>
            <div class="product-card-content">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <h3 class="product-title">${product.name}</h3>
                    ${statusBadge}
                </div>
                <p class="product-location">📍 ${product.location}</p>
                <span class="product-category">${getCategoryLabel(product.category)}</span>
                <p class="product-price">${product.price} DH<span class="product-price-per-day">/jour</span></p>
                <div class="product-actions">
                    <button class="btn-view-details btn btn-small ${buttonClass}" onclick="${product.status === 'rented' ? 'return false' : 'openProductModal(' + product.id + ')'}" ${buttonDisabled}>
                        ${product.status === 'rented' ? 'Indisponible' : 'Voir détails'}
                    </button>
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

    // Récupérer les infos du propriétaire
    const owner = appData.users.find(u => u.id === product.ownerId);

    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalProductCategory').textContent = getCategoryLabel(product.category);
    document.getElementById('modalProductCondition').textContent = getConditionLabel(product.condition);
    document.getElementById('modalProductLocation').textContent = `📍 ${product.location}`;
    document.getElementById('modalProductDescription').textContent = product.description;
    document.getElementById('modalProductPrice').textContent = `${product.price} DH/jour`;
    document.getElementById('modalProductDeposit').textContent = `${product.deposit} DH`;
    
    // Afficher les infos du propriétaire
    if (owner) {
        document.getElementById('modalOwnerName').textContent = owner.name;
        document.getElementById('modalOwnerPhone').textContent = owner.phone || '📞 Non disponible';
        document.getElementById('modalOwnerLocation').textContent = owner.location || '📍 Non spécifiée';
    }
    
    document.getElementById('rentalStartDate').value = '';
    document.getElementById('rentalEndDate').value = '';

    // Afficher l'image du produit
    const imageContainer = document.getElementById('modalProductImage');
    imageContainer.innerHTML = renderProductImage(product);

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
    
    // Vérifier si le produit est déjà loué
    if (product.status === 'rented') {
        showAlert('Ce produit est déjà loué et non disponible', 'error');
        return;
    }

    const days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
    const totalPrice = days * product.price;

    // Sauvegarder les détails de la location en attente dans sessionStorage
    const rentalData = {
        productId: product.id,
        productName: product.name,
        startDate: startDate,
        endDate: endDate,
        days: days,
        totalPrice: totalPrice,
        deposit: product.deposit,
        ownerId: product.ownerId,
        ownerName: product.ownerName
    };

    sessionStorage.setItem('pendingRental', JSON.stringify(rentalData));

    // Fermer le modal et ouvrir la page de paiement
    closeProductModal();
    showPaymentModal(rentalData);
}

function showPaymentModal(rentalData) {
    const paymentModal = document.getElementById('paymentModal');
    
    document.getElementById('paymentProductName').textContent = rentalData.productName;
    document.getElementById('paymentDays').textContent = rentalData.days;
    document.getElementById('paymentPrice').textContent = rentalData.totalPrice;
    document.getElementById('paymentDeposit').textContent = rentalData.deposit;
    
    const totalAmount = rentalData.totalPrice + rentalData.deposit;
    document.getElementById('paymentTotal').textContent = totalAmount;
    document.getElementById('paymentAmount').textContent = totalAmount + ' DH';

    paymentModal.classList.add('active');
}

function closePaymentModal() {
    document.getElementById('paymentModal').classList.remove('active');
}

function processPayment() {
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
    const cardExpiry = document.getElementById('cardExpiry').value;
    const cardCVC = document.getElementById('cardCVC').value;

    // Validation simple
    if (!cardNumber || cardNumber.length < 13) {
        showAlert('Numéro de carte invalide', 'error');
        return;
    }

    if (!cardExpiry || !/^\d{2}\/\d{2}$/.test(cardExpiry)) {
        showAlert('Date d\'expiration invalide (MM/YY)', 'error');
        return;
    }

    if (!cardCVC || cardCVC.length < 3) {
        showAlert('CVC invalide', 'error');
        return;
    }

    // Créer la commande après le paiement
    const rentalData = JSON.parse(sessionStorage.getItem('pendingRental'));
    
    const newOrder = {
        id: appData.orders.length + 1,
        productId: rentalData.productId,
        productName: rentalData.productName,
        tenantId: appData.currentUser.id,
        tenantName: appData.currentUser.name,
        ownerId: rentalData.ownerId,
        ownerName: rentalData.ownerName,
        startDate: rentalData.startDate,
        endDate: rentalData.endDate,
        totalPrice: rentalData.totalPrice,
        deposit: rentalData.deposit,
        status: 'pending',
        createdAt: new Date().toISOString(),
        deliveryAddress: appData.currentUser.deliveryAddress || '',
        paymentStatus: 'paid'
    };

    appData.orders.push(newOrder);
    saveAppData();

    // Nettoyer
    sessionStorage.removeItem('pendingRental');
    
    // Réinitialiser le formulaire de paiement
    document.getElementById('paymentForm').reset();
    closePaymentModal();
    
    showAlert('Paiement effectué! Demande de location envoyée au propriétaire.', 'success');
    loadTenantInterface();
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
    filterProducts();
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
                ${renderProductImage(product)}
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
        currentOrderFilter = 'pending';
        updateOrderTabs();
        loadOwnerOrders();
    } else if (sectionName === 'earnings') {
        document.getElementById('ownerEarnings').classList.add('active');
        navBtns[4].classList.add('active');
        loadEarnings();
    } else if (sectionName === 'profile') {
        document.getElementById('ownerProfile').classList.add('active');
        navBtns[5].classList.add('active');
        loadOwnerProfile();
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
                ${renderProductImage(product)}
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

// ============================================
// GESTION DE L'UPLOAD D'IMAGE
// ============================================

let currentProductImage = null;

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Vérifier que c'est une image
    if (!file.type.startsWith('image/')) {
        showAlert('Veuillez sélectionner une image', 'error');
        return;
    }

    // Vérifier la taille (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
        showAlert('L\'image ne doit pas dépasser 2MB', 'error');
        return;
    }

    // Convertir en Base64
    const reader = new FileReader();
    reader.onload = function(e) {
        currentProductImage = e.target.result;
        displayImagePreview(e.target.result);
        document.getElementById('productImageUrl').value = ''; // Effacer l'URL si elle existe
    };
    reader.readAsDataURL(file);
}

function displayImagePreview(imageData) {
    const preview = document.getElementById('imagePreview');
    const previewImage = document.getElementById('previewImage');
    previewImage.src = imageData;
    preview.style.display = 'flex';
}

function clearImage() {
    currentProductImage = null;
    document.getElementById('productImageFile').value = '';
    document.getElementById('productImageUrl').value = '';
    document.getElementById('imagePreview').style.display = 'none';
}

// Fonction helper pour afficher les images
function renderProductImage(product) {
    const image = product.image;
    
    // Si c'est une URL ou Base64, afficher comme image
    if (image.startsWith('http') || image.startsWith('data:')) {
        return `<img src="${image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;">`;
    }
    
    // Sinon afficher comme emoji
    return `<div style="position: absolute; font-size: 3em; top: 50%; left: 50%; transform: translate(-50%, -50%);">${image}</div>`;
}

function addProduct() {
    const name = document.getElementById('productName').value.trim();
    const category = document.getElementById('productCategory').value;
    const description = document.getElementById('productDescription').value.trim();
    const condition = document.getElementById('productCondition').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const deposit = parseFloat(document.getElementById('productDeposit').value);
    const imageUrl = document.getElementById('productImageUrl').value.trim();
    const location = document.getElementById('productLocation').value.trim();

    if (!name || !category || !description || !price || !deposit || !location) {
        showAlert('Veuillez remplir tous les champs obligatoires', 'error');
        return;
    }

    // Déterminer l'image à utiliser (image uploadée ou URL ou emoji par défaut)
    let image = '📦';
    if (currentProductImage) {
        image = currentProductImage;
    } else if (imageUrl) {
        image = imageUrl;
    }

    const newProduct = {
        id: Math.max(...appData.products.map(p => p.id || 0), 0) + 1,
        name: name,
        category: category,
        description: description,
        condition: condition,
        price: price,
        deposit: deposit,
        image: image,
        location: location,
        ownerId: appData.currentUser.id,
        ownerName: appData.currentUser.name,
        status: 'available', // 'available' ou 'rented'
        rentedTo: null, // ID du locataire qui loue actuellement
        rentalStartDate: null,
        rentalEndDate: null,
        rating: 0,
        reviews: 0,
        createdAt: new Date().toISOString()
    };

    appData.products.push(newProduct);
    saveAppData();

    // Réinitialiser le formulaire et les images
    document.querySelector('.form-product').reset();
    clearImage();
    currentProductImage = null;
    
    displayOwnerProducts();
    showOwnerSection('myProducts');
    showAlert('✅ Annonce publiée avec succès!', 'success');
}

function editProduct(productId) {
    const product = appData.products.find(p => p.id === productId);
    document.getElementById('productName').value = product.name;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productDescription').value = product.description;
    document.getElementById('productCondition').value = product.condition;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productDeposit').value = product.deposit;
    document.getElementById('productLocation').value = product.location;
    
    // Gérer l'affichage de l'image existante
    currentProductImage = null;
    if (product.image.startsWith('http') || product.image.startsWith('data:')) {
        // C'est une URL ou base64
        displayImagePreview(product.image);
        document.getElementById('productImageUrl').value = product.image.startsWith('data:') ? '' : product.image;
    } else {
        // C'est un emoji, on n'affiche rien
        document.getElementById('imagePreview').style.display = 'none';
        document.getElementById('productImageUrl').value = '';
    }

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

function updateOrderTabs() {
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    buttons[['pending', 'accepted', 'completed', 'cancelled'].indexOf(currentOrderFilter)].classList.add('active');
}

function filterOrdersByStatus(status) {
    currentOrderFilter = status;
    updateOrderTabs();
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

    const product = appData.products.find(p => p.id === order.productId);

    if (newStatus === 'accepted') {
        // Marquer le produit comme loué
        if (product) {
            product.status = 'rented';
            product.rentedTo = order.tenantId;
            product.rentalStartDate = order.startDate;
            product.rentalEndDate = order.endDate;
        }
        order.status = 'accepted';
    } else if (newStatus === 'completed') {
        // Marquer comme complétée et faire revenir le produit disponible
        if (product) {
            product.status = 'available';
            product.rentedTo = null;
            product.rentalStartDate = null;
            product.rentalEndDate = null;
        }
        order.status = 'completed';
        // Déduire 5% de commission pour le service de l'application
        const commission = order.totalPrice * 0.05;
        const amountAfterCommission = order.totalPrice - commission;
        appData.currentUser.totalEarnings += amountAfterCommission;
        order.commission = commission;
        order.amountAfterCommission = amountAfterCommission;
    } else if (newStatus === 'cancelled') {
        // Refuser la location, le produit reste disponible
        if (product) {
            product.status = 'available';
        }
        order.status = 'cancelled';
    }

    saveAppData();
    loadOwnerOrders();
    loadOwnerHome();
    loadOwnerProducts();
    filterProducts(); // Rafraîchir la liste des produits pour les locataires
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

    const monthEarning = currentMonth.reduce((sum, o) => sum + (o.amountAfterCommission || o.totalPrice), 0);

    document.getElementById('monthEarning').textContent = `${monthEarning.toFixed(2)} DH`;
    document.getElementById('totalEarning').textContent = `${owner.totalEarnings.toFixed(2)} DH`;

    const earningsHistory = document.getElementById('earningsHistory');
    earningsHistory.innerHTML = '';

    completedOrders.forEach(order => {
        const amountAfterCommission = order.amountAfterCommission || order.totalPrice;
        const commission = order.commission || 0;
        const item = document.createElement('div');
        item.className = 'earnings-item';
        item.innerHTML = `
            <div>
                <strong>${order.productName}</strong>
                <div class="earnings-date">${new Date(order.createdAt).toLocaleDateString('fr-FR')}</div>
                <div class="earnings-details" style="font-size: 0.85em; color: var(--gray-color); margin-top: 4px;">
                    Montant: ${order.totalPrice} DH | Commission (5%): -${commission.toFixed(2)} DH
                </div>
            </div>
            <div class="earnings-amount">+${amountAfterCommission.toFixed(2)} DH</div>
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

function closeConfirmModal() {
    document.getElementById('confirmModal').classList.remove('active');
}

function confirmAction() {
    closeConfirmModal();
}

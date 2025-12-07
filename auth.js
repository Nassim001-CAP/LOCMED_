// ============================================
// GESTION DU STOCKAGE DE DONNÉES (LOCAL STORAGE)
// ============================================

let appData = {
    users: [],
    products: [],
    orders: [],
    currentUser: null
};

// Charger les données
function loadAppData() {
    const savedData = localStorage.getItem('locmedData');
    
    // Vérifier s'il y a déjà des données sauvegardées
    if (savedData) {
        const savedAppData = JSON.parse(savedData);
        appData = savedAppData;
    } else {
        // Si c'est la première fois, initialiser avec les données d'exemple
        initializeSampleData();
        saveAppData();
    }
    
    // Restaurer la session courante depuis sessionStorage (spécifique à cet onglet)
    const sessionUser = sessionStorage.getItem('locmedCurrentUser');
    if (sessionUser) {
        appData.currentUser = JSON.parse(sessionUser);
    } else {
        appData.currentUser = null;
    }
}

// Sauvegarder les données
function saveAppData() {
    localStorage.setItem('locmedData', JSON.stringify(appData));
    
    // Sauvegarder aussi la session courante dans sessionStorage
    if (appData.currentUser) {
        sessionStorage.setItem('locmedCurrentUser', JSON.stringify(appData.currentUser));
    } else {
        sessionStorage.removeItem('locmedCurrentUser');
    }
}

// Initialiser avec des données d'exemple
function initializeSampleData() {
    // Données d'exemple initiales - Propriétaires
    appData.users = [
        {
            id: 1,
            name: 'Fatima Ahmed',
            email: 'fatima@example.com',
            password: 'password123',
            type: 'owner',
            location: 'Casablanca',
            phone: '+212 612 345 678',
            bio: 'Propriétaire de matériel médical depuis 5 ans. Très satisfait de LocMed!',
            deliveryAddress: '',
            totalEarnings: 4500,
            createdAt: new Date().toISOString()
        },
        {
            id: 2,
            name: 'Mohammed Karim',
            email: 'mohammed@example.com',
            password: 'password123',
            type: 'owner',
            location: 'Rabat',
            phone: '+212 623 456 789',
            bio: 'Loue différents équipements médicaux depuis 3 ans',
            deliveryAddress: '',
            totalEarnings: 3200,
            createdAt: new Date().toISOString()
        },
        {
            id: 3,
            name: 'Nadia Bennani',
            email: 'nadia@example.com',
            password: 'password123',
            type: 'owner',
            location: 'Marrakech',
            phone: '+212 634 567 890',
            bio: 'Spécialisée en équipements de respiration et mobilité',
            deliveryAddress: '',
            totalEarnings: 5800,
            createdAt: new Date().toISOString()
        },
        {
            id: 4,
            name: 'Ahmed Samir',
            email: 'ahmed@example.com',
            password: 'password123',
            type: 'tenant',
            location: '',
            phone: '+212 645 678 901',
            bio: '',
            deliveryAddress: '123 Rue Mohamed V, Casablanca',
            totalEarnings: 0,
            createdAt: new Date().toISOString()
        }
    ];

    // Tableau des produits - initialement vide
    // Les propriétaires ajouteront leurs produits via l'interface
    appData.products = [];

    appData.orders = [];
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
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    // Validation des champs
    if (!email || !password) {
        showAlert('Veuillez remplir tous les champs', 'error');
        return;
    }

    // Rechercher l'utilisateur (case-insensitive pour l'email)
    const user = appData.users.find(u => 
        u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (user) {
        appData.currentUser = user;
        saveAppData();
        
        // Message de bienvenue personnalisé
        const userTypeLabel = user.type === 'tenant' ? 'Locataire' : 'Propriétaire';
        showAlert(`✅ Bienvenue ${user.name}! (${userTypeLabel})`, 'success');
        
        // Vider le formulaire de connexion
        document.getElementById('loginEmail').value = '';
        document.getElementById('loginPassword').value = '';
        
        setTimeout(() => {
            loadUserInterface();
        }, 800);
    } else {
        showAlert('❌ Email ou mot de passe incorrect', 'error');
    }
}

function handleSignup() {
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const phone = document.getElementById('signupPhone').value.trim();
    const password = document.getElementById('signupPassword').value;
    const passwordConfirm = document.getElementById('signupPasswordConfirm').value;
    const userType = document.querySelector('input[name="userType"]:checked').value;

    // Validation des champs vides
    if (!name || !email || !phone || !password || !passwordConfirm) {
        showAlert('Veuillez remplir tous les champs', 'error');
        return;
    }

    // Validation du format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showAlert('Veuillez entrer un email valide', 'error');
        return;
    }

    // Validation du numéro de téléphone (au moins 8 caractères)
    if (phone.length < 8) {
        showAlert('Veuillez entrer un numéro de téléphone valide', 'error');
        return;
    }

    // Validation de la longueur du mot de passe
    if (password.length < 6) {
        showAlert('Le mot de passe doit contenir au moins 6 caractères', 'error');
        return;
    }

    // Vérifier que les mots de passe correspondent
    if (password !== passwordConfirm) {
        showAlert('Les mots de passe ne correspondent pas', 'error');
        return;
    }

    // Vérifier que l'email n'existe pas déjà
    if (appData.users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
        showAlert('Cet email est déjà enregistré. Veuillez vous connecter ou utiliser un autre email.', 'error');
        return;
    }

    // Créer le nouveau compte
    const newUser = {
        id: Math.max(...appData.users.map(u => u.id || 0), 0) + 1,
        name: name,
        email: email.toLowerCase(),
        password: password, // En production, ceci doit être hashé!
        type: userType,
        location: '',
        phone: phone,
        bio: '',
        deliveryAddress: userType === 'tenant' ? '' : '',
        totalEarnings: 0,
        createdAt: new Date().toISOString()
    };

    // Sauvegarder le nouvel utilisateur
    appData.users.push(newUser);
    appData.currentUser = newUser;
    saveAppData();

    // Confirmation et redirection
    const userTypeLabel = userType === 'tenant' ? 'locataire' : 'propriétaire';
    showAlert(`✅ Inscription réussie! Bienvenue ${newUser.name}!`, 'success');
    
    // Vider les formulaires
    document.getElementById('signupName').value = '';
    document.getElementById('signupEmail').value = '';
    document.getElementById('signupPhone').value = '';
    document.getElementById('signupPassword').value = '';
    document.getElementById('signupPasswordConfirm').value = '';

    setTimeout(() => {
        loadUserInterface();
    }, 800);
}

function handleLogout() {
    appData.currentUser = null;
    saveAppData();
    document.getElementById('landingPage').classList.add('active');
    document.getElementById('authPage').classList.remove('active');
    document.getElementById('tenantPage').classList.remove('active');
    document.getElementById('ownerPage').classList.remove('active');
    
    // Réinitialiser les formulaires
    document.getElementById('loginEmail').value = '';
    document.getElementById('loginPassword').value = '';
    document.getElementById('signupName').value = '';
    document.getElementById('signupEmail').value = '';
    document.getElementById('signupPassword').value = '';
    document.getElementById('signupPasswordConfirm').value = '';
    
    // Revenir à la page de connexion
    switchAuthForm('login');
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
// UTILITAIRES
// ============================================

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

// ============================================
// INITIALISATION
// ============================================

// Fonction pour réinitialiser complètement la plateforme
function resetAllData() {
    localStorage.removeItem('locmedData');
    localStorage.removeItem('favorites');
    appData = {
        users: [],
        products: [],
        orders: [],
        currentUser: null
    };
    initializeSampleData();
    location.reload();
}

document.addEventListener('DOMContentLoaded', () => {
    loadAppData();
    
    // Vérifier si l'utilisateur est déjà connecté
    if (appData.currentUser) {
        document.getElementById('landingPage').classList.remove('active');
        loadUserInterface();
    } else {
        document.getElementById('landingPage').classList.add('active');
        document.getElementById('authPage').classList.remove('active');
        document.getElementById('loginEmail').focus();
    }
});

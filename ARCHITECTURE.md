# 📁 Structure Complète du Projet LocMed

## 🗂️ Hiérarchie des Fichiers

```
LOCMED_/
│
├── 📄 index.html           ⭐ Fichier principal - Ouvrez celui-ci
│   ├── Interface d'authentification
│   ├── Interface locataire
│   └── Interface propriétaire
│
├── 🔐 auth.js              ⭐ Gestion authentification et données
│   ├── Structure appData
│   ├── loadAppData()       → Charge depuis LocalStorage
│   ├── saveAppData()       → Sauvegarde dans LocalStorage
│   ├── handleLogin()       → Connexion
│   ├── handleSignup()      → Inscription
│   ├── handleLogout()      → Déconnexion
│   └── initializeSampleData() → Données d'exemple
│
├── 🎨 app.js               ⭐ Logique des interfaces
│   ├── INTERFACE LOCATAIRE
│   │   ├── loadTenantInterface()
│   │   ├── showTenantSection()
│   │   ├── filterProducts()
│   │   ├── openProductModal()
│   │   ├── rentProduct()
│   │   ├── loadTenantOrders()
│   │   ├── loadTenantFavorites()
│   │   └── saveTenantProfile()
│   │
│   ├── INTERFACE PROPRIÉTAIRE
│   │   ├── loadOwnerInterface()
│   │   ├── showOwnerSection()
│   │   ├── displayOwnerProducts()
│   │   ├── addProduct()
│   │   ├── loadOwnerOrders()
│   │   ├── respondToOrder()
│   │   ├── loadEarnings()
│   │   └── saveOwnerProfile()
│   │
│   └── FONCTIONS UTILITAIRES
│       ├── getCategoryLabel()
│       ├── getConditionLabel()
│       └── getOrderStatusLabel()
│
├── 🎨 styles.css           ⭐ Styles CSS complets
│   ├── Variables CSS
│   ├── Reset et globaux
│   ├── Authentification
│   ├── Formulaires
│   ├── Boutons
│   ├── Grille de produits
│   ├── Modals
│   ├── Navigation
│   ├── Responsive design
│   └── Animations
│
├── 📖 README.md            Documentation générale
├── 📖 GUIDE.md             Guide technique détaillé
├── 📖 QUICKSTART.md        Démarrage rapide
├── 📖 ARCHITECTURE.md      Ce fichier
└── 🚫 script.js            Fichier déprecié (ignorez)
```

---

## 🔄 Flux de Données

```
┌─────────────────────────────────────────────────────────────┐
│                    LOCAL STORAGE                             │
│              (Persistance des données)                       │
│                                                              │
│  appData = {                                                │
│    users: [],        ← Comptes utilisateurs                │
│    products: [],     ← Annonces de matériel                │
│    orders: [],       ← Commandes de location               │
│    currentUser: {}   ← Utilisateur connecté                │
│  }                                                          │
└─────────────────────────────────────────────────────────────┘
         ↑                                    ↓
    loadAppData()                       saveAppData()
         ↑                                    ↓
┌─────────────────────────────────────────────────────────────┐
│                    auth.js + app.js                          │
│              (Logique de l'application)                      │
│                                                              │
│  - Gestion des comptes                                      │
│  - Gestion des produits                                     │
│  - Gestion des commandes                                    │
│  - Calculs des revenus                                      │
└─────────────────────────────────────────────────────────────┘
         ↑                                    ↓
    Modification                         Affichage
         ↑                                    ↓
┌─────────────────────────────────────────────────────────────┐
│                     index.html                               │
│            (Présentation au utilisateur)                    │
│                                                              │
│  - Forms d'authentification                                 │
│  - Interface locataire                                      │
│  - Interface propriétaire                                   │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔐 Structure de appData

### Users (Utilisateurs)
```javascript
{
    id: Number,                  // Identifiant unique
    name: String,               // Nom complet
    email: String,              // Email (unique)
    password: String,           // Mot de passe
    type: "tenant" | "owner",   // Type de compte
    location: String,           // Localisation
    phone: String,              // Téléphone
    bio: String,                // Bio/Description
    deliveryAddress: String,    // Adresse de livraison
    totalEarnings: Number,      // Revenus totaux (propriétaire)
    createdAt: Date             // Date de création
}
```

### Products (Annonces)
```javascript
{
    id: Number,                    // Identifiant unique
    name: String,                 // Nom du matériel
    category: String,             // Catégorie
    description: String,          // Description
    condition: String,            // État (excellent/good/fair)
    price: Number,                // Prix par jour (DH)
    deposit: Number,              // Caution (DH)
    image: String,                // Emoji ou URL
    location: String,             // Localisation
    ownerId: Number,              // ID du propriétaire
    ownerName: String,            // Nom du propriétaire
    rating: Number,               // Note (0-5)
    reviews: Number,              // Nombre d'avis
    createdAt: Date               // Date de création
}
```

### Orders (Commandes)
```javascript
{
    id: Number,                    // Identifiant unique
    productId: Number,            // ID du produit
    productName: String,          // Nom du produit
    tenantId: Number,             // ID du locataire
    tenantName: String,           // Nom du locataire
    ownerId: Number,              // ID du propriétaire
    ownerName: String,            // Nom du propriétaire
    startDate: String,            // Date début (YYYY-MM-DD)
    endDate: String,              // Date fin (YYYY-MM-DD)
    totalPrice: Number,           // Prix total (DH)
    status: String,               // pending/accepted/completed/cancelled
    createdAt: Date,              // Date de création
    deliveryAddress: String       // Adresse de livraison
}
```

---

## 🔄 Cycle de Vie d'une Transaction

```
LOCATAIRE                          PROPRIÉTAIRE
    │                                   │
    ├─→ Parcourt les produits          │
    │                                   │
    ├─→ Sélectionne dates              │
    │                                   │
    ├─→ Crée commande                  │
    │   (status: pending)               │
    │                                   │
    │                          ←─ Reçoit notification
    │                                   │
    │                          ├─→ Accepte ou refuse
    │                                   │
    ├─ Voit le statut mis à jour       │
    │   (status: accepted)              │
    │                                   │
    │                          ├─→ Marque comme complétée
    │                                   │
    ├─ Commande terminée               │
    │   (status: completed)             │
    │                                   │
    │                          ├─→ Revenus mis à jour
    │                                   │
    └─────────────────────────────────→│
          Cycle terminé
```

---

## 🎨 Architecture CSS

### Hiérarchie de spécificité
```
variables.css (--primary-color, --border-radius, etc)
    ↓
reset et globaux (*, html, body)
    ↓
sections (pages, sections)
    ↓
composants (cards, forms, buttons)
    ↓
utilitaires (colors, sizes, animations)
    ↓
media queries (responsive)
```

### Breakpoints Responsive
```
Mobile    : < 480px
Tablet    : 480px - 768px
Desktop   : > 768px
```

---

## 🔗 Connexions Entre Fichiers

```
index.html
    ├─→ charge auth.js
    │   └─→ Gère l'authentification
    │       └─→ Charge app.js après succès
    │
    ├─→ charge app.js
    │   ├─→ Utilise appData (défini dans auth.js)
    │   ├─→ Affiche l'interface (HTML)
    │   └─→ Utilise les styles (styles.css)
    │
    └─→ charge styles.css
        └─→ Style tous les éléments HTML
```

---

## 📊 Diagramme de Décision

```
┌─── Utilisateur visite index.html ───┐
│                                      │
V                                      V
loadAppData() depuis LocalStorage    Initialiser appData vide
│                                      │
V                                      V
appData.currentUser ?                 ▼
│        │                            initializeSampleData()
│        └─→ Non                       │
│            └─→ Afficher page auth   │
│                  │                  │
│                  V                  │
│            handleLogin() ────────────┤
│            ou                        │
│            handleSignup() ───────────┤
│                  │                  │
└──────────────────┘                  │
     │                               │
     V                               V
loadUserInterface()                 Oui
     │
     V
appData.currentUser.type ?
     │
     ├─→ "tenant" ──→ loadTenantInterface()
     │
     └─→ "owner" ──→ loadOwnerInterface()
```

---

## 🚀 Points d'Entrée Clés

### 1. Authentification
**Fichier** : `auth.js`
**Fonction** : `handleLogin()` / `handleSignup()`
**Déclenche** : `loadUserInterface()`

### 2. Interface Locataire
**Fichier** : `app.js`
**Fonction** : `loadTenantInterface()`
**Sections** : home, browse, orders, favorites, profile

### 3. Interface Propriétaire
**Fichier** : `app.js`
**Fonction** : `loadOwnerInterface()`
**Sections** : home, myProducts, addProduct, orders, earnings, profile

---

## 💾 Persistence

### Quand appData est sauvegardé ?
1. **Après authentification** - `handleLogin()` / `handleSignup()`
2. **Après création d'annonce** - `addProduct()`
3. **Après création de commande** - `rentProduct()`
4. **Après réponse à commande** - `respondToOrder()`
5. **Après mise à jour de profil** - `saveTenantProfile()` / `saveOwnerProfile()`

### Quand favoris est sauvegardé ?
- **Après ajout/suppression favori** - `toggleFavoriteFromCard()`

---

## 🎯 Cas d'Usage Principaux

### Locataire loue du matériel
```
auth.js: handleLogin/handleSignup
  ↓
app.js: loadTenantInterface, filterProducts, openProductModal, rentProduct
  ↓
appData: orders.push(newOrder), saveAppData()
```

### Propriétaire publie une annonce
```
auth.js: handleLogin/handleSignup
  ↓
app.js: loadOwnerInterface, addProduct
  ↓
appData: products.push(newProduct), saveAppData()
```

### Propriétaire accepte une commande
```
app.js: respondToOrder
  ↓
appData: order.status = "accepted", currentUser.totalEarnings += totalPrice
  ↓
app.js: loadOwnerOrders, loadOwnerHome, loadEarnings (mise à jour UI)
```

---

## 📈 Scalabilité

### Limites actuelles
- LocalStorage : ~5-10MB par navigateur
- Pas de synchronisation multi-appareils
- Pas de versioning de données

### Pour passer en production
- Remplacer `localStorage` par une API REST
- Ajouter authentification JWT
- Implémenter une vraie base de données
- Ajouter validation backend
- Implémenter des logs et monitoring

---

## 🔒 Sécurité Notes

**⚠️ DEMO ONLY**
- Les mots de passe sont stockés en clair
- Pas de chiffrement
- Pas de validation backend
- À REMPLACER en production !

**Pour la production :**
- Utiliser HTTPS
- Hacher les mots de passe (bcrypt)
- JWT tokens
- CORS configuré
- Rate limiting
- Input validation
- SQL injection protection

---

✨ **Architecture complète et claire pour comprendre et maintenir LocMed !**

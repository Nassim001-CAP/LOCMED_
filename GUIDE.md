# 📖 Guide Détaillé de LocMed

## 🏗️ Structure de l'Application

```
LOCMED_/
├── index.html       # Page principale (contient les 3 interfaces)
├── auth.js          # Gestion authentification et données
├── app.js           # Logique métier des interfaces
├── styles.css       # Styles CSS
├── script.js        # Fichier déprecié (ignorez-le)
├── README.md        # Documentation générale
└── GUIDE.md         # Ce fichier
```

## 🔐 Authentification - Comment ça marche

### Au démarrage
1. **LocalStorage est chargé** : Les données précédentes sont restaurées
2. **Si connecté** : L'interface utilisateur s'affiche directement
3. **Si non connecté** : La page d'authentification s'affiche

### Inscription
```
Remplissez le formulaire → Sélectionnez votre type → Confirmez
↓
Vérification des données (email unique, mots de passe identiques)
↓
Création du compte → Connexion automatique
```

### Connexion
```
Entrez vos identifiants → Cliquez sur "Se connecter"
↓
Recherche de l'utilisateur dans la base de données
↓
Création de session → Redirection vers votre interface
```

## 💾 Système de Sauvegarde

### Où sont stockées les données ?
**LocalStorage du navigateur** : `locmedData`

### Qu'est-ce qui est sauvegardé ?
```javascript
{
    users: [],      // Liste de tous les utilisateurs
    products: [],   // Tous les matériels disponibles
    orders: [],     // Toutes les commandes/locations
    currentUser: {} // Utilisateur actuellement connecté
}
```

### Quand ?
- ✅ Après inscription
- ✅ Après connexion/déconnexion
- ✅ Après création d'annonce
- ✅ Après création de commande
- ✅ Après réponse à une demande
- ✅ Après mise à jour de profil
- ✅ Après suppression d'annonce

## 🧑‍💼 Interface Locataire

### Sections
1. **Accueil** - Présentation de LocMed
2. **Parcourir** - Affiche tous les produits
   - Recherche en temps réel
   - Filtrage par catégorie
3. **Mes commandes** - Historique des locations
   - Statut : En attente, Acceptée, Complétée, Annulée
4. **Favoris** - Produits sauvegardés
5. **Profil** - Informations personnelles

### Flux de location
```
Parcourir → Voir détails → Sélectionner dates → Confirmer
↓
Demande créée (status: "pending")
↓
Propriétaire répond → Acceptée/Refusée
↓
Mise à jour du statut
```

## 🏪 Interface Propriétaire

### Sections
1. **Accueil** - Dashboard avec statistiques
   - Nombre d'annonces
   - Demandes en attente
   - Locations complétées
   - Revenus totaux
2. **Mes annonces** - Liste des produits
3. **Ajouter annonce** - Formulaire de création
4. **Demandes de location** - Gestion des commandes
   - Tabs : En attente, Acceptées, Complétées, Annulées
5. **Revenus** - Suivi des gains
   - Revenus du mois
   - Revenus totaux
   - Historique des transactions
6. **Profil** - Informations professionnelles

### Flux de création d'annonce
```
Formulaire complété → Validation → Ajout à la base
↓
Affichage dans "Mes annonces"
↓
Visible pour les locataires
```

### Flux de gestion de commande
```
Demande reçue (status: "pending")
↓
Propriétaire accepte/refuse
↓
Si acceptée: status = "accepted"
↓
Marquer comme complétée: status = "completed"
↓
Revenu ajouté au total
```

## 🔄 Flux de Données

### Création de Compte
```
Utilisateur → Inscription → Base de données → Session actuelle
```

### Création d'Annonce
```
Propriétaire → Formulaire → Validation → Produit ajouté
↓
appData.products.push(newProduct)
↓
saveAppData() sauvegarde dans LocalStorage
```

### Création de Commande
```
Locataire → Sélectionne dates → Crée commande → Propriétaire notifié
↓
appData.orders.push(newOrder)
↓
Status = "pending" (en attente de réponse)
```

## 📊 Statistiques du Propriétaire

### En Temps Réel
- **Annonces actives** : Nombre de produits publiés
- **Demandes en attente** : Commandes non traitées
- **Locations complétées** : Commandes finies
- **Revenus totaux** : Somme de toutes les locations acceptées

### Historique des Revenus
Chaque commande complétée génère une entrée :
```
{
    productName: "Chaise roulante",
    totalPrice: 450,
    createdAt: "2025-12-05T10:30:00Z"
}
```

## 🎨 Catégories Disponibles

| Code | Emoji | Label |
|------|-------|-------|
| wheelchair | ♿ | Chaise roulante |
| bed | 🛏️ | Lit médicalisé |
| walker | 🚶 | Déambulateur |
| crutches | 🦵 | Béquilles |
| oxygen | 💨 | Concentrateur d'oxygène |
| other | 📦 | Autre |

## 🎯 États des Commandes

| État | Description |
|------|-------------|
| pending | En attente de réponse du propriétaire |
| accepted | Acceptée par le propriétaire |
| completed | Terminée et payée |
| cancelled | Refusée ou annulée |

## 🔍 Recherche et Filtrage

### Recherche
- Texte libre dans le champ de recherche
- Recherche dans le **nom** et la **description** du produit
- En temps réel (sans bouton à cliquer)

### Filtrage
- Par catégorie
- Combinable avec la recherche
- Affiche le nombre de résultats

## 🔐 Données de Compte

Chaque utilisateur a :
```javascript
{
    id,                  // Identifiant unique
    name,               // Nom complet
    email,              // Email (unique)
    password,           // Mot de passe
    type,               // "tenant" ou "owner"
    location,           // Localisation
    phone,              // Téléphone
    bio,                // Bio/Description
    deliveryAddress,    // Adresse de livraison (locataire)
    totalEarnings,      // Revenus totaux (propriétaire)
    createdAt           // Date d'inscription
}
```

## 📦 Structure d'une Annonce

```javascript
{
    id,           // Identifiant unique
    name,         // Nom du matériel
    category,     // Catégorie
    description,  // Description détaillée
    condition,    // État (excellent/good/fair)
    price,        // Prix par jour en DH
    deposit,      // Caution en DH
    image,        // Emoji ou URL
    location,     // Localisation
    ownerId,      // ID du propriétaire
    ownerName,    // Nom du propriétaire
    rating,       // Note (0-5)
    reviews,      // Nombre d'avis
    createdAt     // Date de création
}
```

## 🎁 Favoris

### Comment ça marche
- Stockés dans **localStorage** (séparé de appData)
- Clé : `favorites`
- Valeur : Array d'ID de produits

```javascript
// Exemple
const favorites = [1, 3, 5]; // IDs des produits favoris
```

## 🚀 Performance et Optimisation

- **Rendu rapide** : DOM mis à jour uniquement quand nécessaire
- **Pas de rechargement de page** : Navigation fluide avec affichage/masquage de sections
- **Pas d'API externe** : Tout client-side, très rapide

## 🐛 Débogage

### Vérifier les données
Ouvrez la console du navigateur (F12) :
```javascript
// Voir toutes les données
console.log(appData);

// Voir les données sauvegardées
console.log(JSON.parse(localStorage.getItem('locmedData')));

// Voir les favoris
console.log(JSON.parse(localStorage.getItem('favorites')));
```

### Réinitialiser les données
```javascript
// Dans la console
localStorage.removeItem('locmedData');
localStorage.removeItem('favorites');
// Puis rechargez la page
```

## 📱 Responsive Design

L'application s'adapte automatiquement à :
- **Desktop** : 1200px+
- **Tablette** : 768px - 1200px
- **Mobile** : < 768px

## ⚡ Améliorations Futures

- [ ] Backend avec base de données persistante
- [ ] Authentification sécurisée (JWT)
- [ ] Upload d'images
- [ ] Système de notation/avis
- [ ] Notifications
- [ ] Chat entre utilisateurs
- [ ] Paiement en ligne
- [ ] Historique détaillé des transactions

---

**Voilà ! Vous avez maintenant une compréhension complète de LocMed ! 🎉**

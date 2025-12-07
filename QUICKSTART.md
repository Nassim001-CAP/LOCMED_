# 🚀 Démarrage Rapide - LocMed

## ⚡ En 30 secondes

### 1️⃣ Ouvrez le fichier
Double-cliquez sur **`index.html`** dans votre navigateur

### 2️⃣ Testez avec un compte de demo
**Propriétaire :**
- Email : `fatima@example.com`
- Mot de passe : `password123`

**Locataire :**
- Email : `ahmed@example.com`
- Mot de passe : `password123`

### 3️⃣ Explorez l'application

---

## 🎯 Scénarios de Test

### Scénario 1 : Je suis locataire
```
1. Connectez-vous avec: ahmed@example.com / password123
2. Allez à "Parcourir"
3. Cliquez sur un matériel
4. Sélectionnez les dates
5. Confirmez la réservation
6. Allez à "Mes commandes" pour voir votre demande
```

### Scénario 2 : Je suis propriétaire
```
1. Connectez-vous avec: fatima@example.com / password123
2. Allez à "Mes annonces" pour voir vos produits
3. Cliquez sur "Ajouter annonce"
4. Remplissez le formulaire
5. Publiez l'annonce
6. Allez à "Demandes de location" pour voir les réservations
7. Acceptez/Refusez une demande
```

### Scénario 3 : Je crée mon propre compte
```
1. Cliquez sur "S'inscrire"
2. Remplissez vos informations
3. Choisissez votre type (Locataire ou Propriétaire)
4. Confirmez
5. Explorez votre interface
```

---

## 📊 Compte Propriétaire "Fatima Ahmed"

**Détails :**
- 📍 Localisation : Casablanca
- 💰 Revenus totaux : 4500 DH
- 📦 Annonces : 2 (Chaise roulante, Déambulateur)

**Qu'elle peut faire :**
- Ajouter des annonces
- Voir les demandes de location
- Accepter/Refuser les demandes
- Suivre ses revenus

---

## 🎁 Compte Locataire "Ahmed Samir"

**Détails :**
- 📍 Localisation : Casablanca
- 🏠 Adresse : 123 Rue Mohamed V

**Qu'il peut faire :**
- Parcourir le matériel
- Réserver pour des dates spécifiques
- Voir ses commandes
- Ajouter des favoris

---

## 💡 Fonctionnalités à Essayer

### Pour Locataires
- ✅ Rechercher par mot-clé
- ✅ Filtrer par catégorie
- ✅ Ajouter aux favoris (cœur)
- ✅ Voir le détail d'un produit
- ✅ Calculer le coût automatique
- ✅ Passer une commande
- ✅ Mettre à jour le profil

### Pour Propriétaires
- ✅ Publier une annonce
- ✅ Gérer les annonces (modifier, supprimer)
- ✅ Répondre aux demandes
- ✅ Marquer comme complétée
- ✅ Voir les revenus
- ✅ Historique des transactions
- ✅ Mettre à jour le profil

---

## 📱 Navigation

| Bouton | Fonction |
|--------|----------|
| 🏠 Accueil | Page d'accueil |
| 📋 Menu | Navigation entre sections |
| 🔍 Recherche | Trouvez du matériel |
| ❤️ Cœur | Ajouter aux favoris |
| 🔐 Profil | Vos informations |
| 🚪 Déconnexion | Quitter l'application |

---

## 🆘 En Cas de Problème

### L'app ne se charge pas
- Vérifiez que `auth.js` et `app.js` sont dans le même dossier que `index.html`
- Vérifiez que `styles.css` est présent
- Videz le cache du navigateur (Ctrl+Shift+Del)

### J'ai oublié mes identifiants
- Créez un nouveau compte
- Ou utilisez les comptes de demo fournis

### Les données ne se sauvegardent pas
- Vérifiez que le LocalStorage est activé
- Consultez la console (F12) pour les erreurs

### Je veux réinitialiser complètement
```javascript
// Ouvrez la console (F12) et exécutez:
localStorage.removeItem('locmedData');
localStorage.removeItem('favorites');
// Puis rechargez la page
```

---

## 📞 Support & Documentation

- 📄 **README.md** - Documentation générale
- 📖 **GUIDE.md** - Guide technique détaillé
- 🎯 **QUICKSTART.md** - Ce fichier (pour démarrer vite)

---

## ✨ Bon à savoir

1. **Persistance** : Vos données restent même après fermer le navigateur
2. **Sécurité** : C'est une demo - en production, utilisez une API backend
3. **Offline** : L'app fonctionne complètement hors ligne
4. **Multi-sessions** : Vous ne pouvez être connecté qu'à un seul compte à la fois

---

## 🎉 Vous êtes prêt !

Ouvrez `index.html` et commencez à explorer LocMed !

Amusez-vous bien ! 🚀

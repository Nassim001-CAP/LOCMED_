# LocMed - Plateforme de Location de Matériel Médical

## 📋 Description

LocMed est une plateforme web complète permettant :
- **Aux propriétaires** : de proposer leur matériel médical en location et générer des revenus
- **Aux locataires** : de louer du matériel médical de qualité pour une période spécifique

## 🚀 Démarrage

### Fichiers requis
- `index.html` - Page principale
- `auth.js` - Gestion de l'authentification et des données
- `app.js` - Logique des interfaces locataire et propriétaire
- `styles.css` - Styles CSS

### Comment utiliser

1. **Ouvrez `index.html`** dans votre navigateur web
2. **Vous arrivez sur la page d'authentification**
3. **Créez un compte** en cliquant sur "S'inscrire"
   - Remplissez vos informations
   - Choisissez votre type de compte : Locataire ou Propriétaire
4. **Connectez-vous** avec vos identifiants
5. **Accédez à votre interface** selon votre type de compte

## 👤 Types de Compte

### Locataire
- **Page d'accueil** : Présentation de la plateforme
- **Parcourir** : Recherchez et filtrez le matériel disponible
- **Mes commandes** : Suivez vos locations
- **Favoris** : Sauvegardez vos matériels préférés
- **Profil** : Gérez vos informations personnelles

### Propriétaire
- **Page d'accueil** : Tableau de bord avec statistiques en temps réel
- **Mes annonces** : Gérez vos produits à louer
- **Ajouter annonce** : Publiez un nouveau matériel
- **Demandes de location** : Acceptez ou refusez les demandes
- **Revenus** : Suivez vos gains mensuels et totaux
- **Profil** : Gérez vos informations professionnelles

## 💾 Sauvegarde des Données

**Tous les données sont sauvegardées automatiquement dans le LocalStorage du navigateur :**
- ✅ Profils utilisateur
- ✅ Annonces créées
- ✅ Commandes
- ✅ Favoris
- ✅ Revenus et statistiques
- ✅ Informations personnelles

**Données persistantes :** Les données restent même après fermeture du navigateur

## 🔒 Sécurité

- Les mots de passe sont stockés localement (à usage demo)
- Les sessions persisten tant que vous ne vous déconnectez pas

## 🎨 Caractéristiques

- **Design responsive** : Fonctionne sur desktop, tablette et mobile
- **Interface intuitive** : Navigation facile et claire
- **Animations fluides** : Transitions agréables
- **Validation de formulaires** : Messages d'erreur clairs
- **Gestion complète des statuts** : En attente, Acceptée, Complétée, Annulée

## 📱 Catégories de Matériel

- ♿ Chaises roulantes
- 🛏️ Lits médicalisés
- 🚶 Déambulateurs
- 🦵 Béquilles
- 💨 Concentrateurs d'oxygène
- 📦 Autres équipements

## 🧪 Données de Test (Facultatif)

Vous pouvez d'abord explorer avec des comptes de test :
- Email : `user1@test.com` / Mot de passe : `password123` (Type : Locataire)
- Email : `owner1@test.com` / Mot de passe : `password123` (Type : Propriétaire)

Ou créez vos propres comptes !

## ⚙️ Fonctionnalités Avancées

- **Recherche et filtrage en temps réel**
- **Calcul automatique du coût de location**
- **Historique des revenus**
- **Suivi des demandes de location**
- **Gestion des favoris**
- **Statistiques propriétaire**

## 📞 Support

Si vous avez des questions ou des problèmes :
1. Vérifiez que tous les fichiers sont dans le même dossier
2. Videz le cache du navigateur si nécessaire
3. Utilisez F12 pour vérifier la console du navigateur

## 📄 Notes

- Les images du matériel sont représentées par des emojis
- Le système est entièrement client-side (pas de serveur requis)
- Idéal pour une démonstration ou un prototype
- Pour une production, intégrez une API backend

---

**Version 1.0** - Tous droits réservés LocMed © 2025

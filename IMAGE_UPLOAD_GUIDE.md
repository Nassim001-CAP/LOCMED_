# 📸 Guide d'Upload d'Images - LocMed

## ✨ Nouvelle Fonctionnalité : Upload de Photos

Les propriétaires peuvent maintenant ajouter des photos professionnelles à leurs annonces de matériel médical.

---

## 🎯 Comment Ajouter une Photo ?

### **Option 1️⃣ : Télécharger une image depuis votre ordinateur**

1. Allez dans **"Ajouter annonce"** (Interface Propriétaire)
2. Remplissez les informations du produit
3. Cliquez sur le bouton **"📸 Choisir une photo"**
4. Sélectionnez une image depuis votre ordinateur
5. Un aperçu de l'image s'affichera
6. Publiez l'annonce ✅

### **Option 2️⃣ : Ajouter une URL d'image**

1. Dans la section **"Photo du matériel"**
2. Entrez directement l'URL de l'image (commence par `https://` ou `http://`)
3. Exemple : `https://example.com/ma-chaise-roulante.jpg`
4. L'image s'affichera dans l'aperçu
5. Publiez l'annonce ✅

### **Option 3️⃣ : Utiliser un emoji (par défaut)**

Si vous ne téléchargez pas d'image et ne fournissez pas d'URL, un emoji par défaut sera utilisé pour votre annonce.

---

## 📋 Spécifications Techniques

### **Formats Acceptés**
- ✅ JPG/JPEG
- ✅ PNG
- ✅ GIF
- ✅ WebP
- ✅ SVG

### **Taille Maximale**
- Maximum: **2 MB** par image
- Recommandé: **1 MB** ou moins pour plus rapide

### **Affichage**
- **Sur les cartes** : Les images s'affichent en fond avec dimension 280×200px
- **Dans la modal** : Les images s'affichent en haute résolution (300×300px)
- **Responsive** : Les images s'adaptent à tous les appareils

---

## 🖼️ Exemples d'Utilisation

### **Exemple 1: Télécharger une photo**
```
1. Cliquez sur "📸 Choisir une photo"
2. Sélectionnez "chaise_roulante.jpg" de votre ordinateur
3. L'aperçu montre votre image ✓
4. Cliquez "Publier l'annonce"
5. Votre annonce s'affiche avec la photo !
```

### **Exemple 2: Ajouter une URL**
```
1. Dans le champ "ou entrez l'URL directement"
2. Collez: https://images.example.com/oxygene.jpg
3. L'aperçu montre l'image ✓
4. Cliquez "Publier l'annonce"
5. L'image s'affiche sur votre annonce !
```

---

## ⚙️ Fonctionnalités Avancées

### **Prévisualisation**
- Avant de publier, vous verrez un aperçu de votre image
- Vous pouvez cliquer **"✕ Supprimer"** pour la retirer et en choisir une autre

### **Modification d'Annonce**
- Quand vous modifiez une annonce existante, l'image actuelle s'affiche
- Vous pouvez la remplacer par une nouvelle image ou une nouvelle URL

### **Stockage**
- Les images téléchargées sont convertis en **Base64** et sauvegardées localement
- Les images sont persistantes : elles restent même après fermeture du navigateur
- Aucun upload sur serveur externe (tout reste sur votre navigateur)

---

## 🔒 Sécurité & Confidentialité

- ✅ Les images restent sur votre navigateur
- ✅ Aucun envoi sur Internet (sauf URL externes)
- ✅ Validation du type de fichier (images uniquement)
- ✅ Limitation de taille (2 MB max)
- ✅ Pas de script dangerous accepté

---

## ❓ FAQ

### **Q: Puis-je utiliser une image depuis Google Images ?**
**R:** Oui ! Cliquez droit sur l'image → "Copier le lien de l'image" → Collez l'URL dans le champ

### **Q: Qu'est-ce qui se passe si l'image est trop grande ?**
**R:** Le système refuse les images > 2MB avec un message d'erreur clair

### **Q: Puis-je modifier la photo après publication ?**
**R:** Oui ! Cliquez sur "Modifier" sur votre annonce et changez la photo

### **Q: Où sont stockées les images ?**
**R:** Dans le localStorage de votre navigateur (sauvegarde locale)

### **Q: Si je supprime les données du navigateur, les images sont perdues ?**
**R:** Oui, car elles sont sauvegardées localement. Faites des sauvegardes régulières

### **Q: Puis-je utiliser un lien Dropbox ou Google Drive ?**
**R:** Oui, si c'est un lien direct vers l'image (pas un dossier)

---

## 🎨 Conseils de Qualité

### **Pour Meilleures Résultats**
1. **Éclairage** : Photo bien éclairée et claire
2. **Angle** : Montrez le matériel sous différents angles
3. **Fond** : Fond simple et dégagé pour que le produit ressorte
4. **Qualité** : Minimum 800×600 pixels recommandé
5. **Format** : JPG pour les photos, PNG pour les logos/icônes

### **Exemple de Bonne Photo**
- ✅ Image claire et bien cadrée
- ✅ Matériel médical visible et identifiable
- ✅ Bonne résolution
- ✅ Pas de flou ou de distorsion

### **À Éviter**
- ❌ Images floues ou mal éclairées
- ❌ Contenu non pertinent
- ❌ Texte compliqué
- ❌ Arrière-plan encombré

---

## 🚀 Performance

### **Optimisation**
- Images compressées pour chargement rapide
- Format Base64 pour éviter requêtes serveur
- Cache navigateur pour images fréquemment affichées

### **Vitesse**
- Chargement instantané des aperçus
- Pas de délai d'affichage
- Responsive et fluide

---

## 📞 Support

Si vous avez des problèmes :

1. **Vérifiez** le format de l'image (JPG, PNG, etc.)
2. **Vérifiez** la taille (< 2 MB)
3. **Rechargez** la page et réessayez
4. **Videz le cache** du navigateur si problème persiste
5. **Utilisez un emoji** temporaire si problème technique

---

## ✅ Résumé

| Fonctionnalité | Disponible |
|---|---|
| Télécharger image | ✅ |
| Ajouter URL d'image | ✅ |
| Aperçu avant publication | ✅ |
| Modifier image | ✅ |
| Supprimer image | ✅ |
| Sauvegarde automatique | ✅ |
| Persistance | ✅ |
| Responsive design | ✅ |

---

**Amusez-vous à ajouter de magnifiques photos à vos annonces ! 🎉**

*LocMed v1.1 - Image Upload Feature*

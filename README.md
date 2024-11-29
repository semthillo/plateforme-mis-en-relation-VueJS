# Plateforme de mis en relation

## Description du Projet

Ce projet est une plateforme de mis en relation entre les prestataires de services et leurs clients potetiels développée avec Vue.js, utilisant Pinia pour la gestion d'état et Bootstrap pour le style. L'application permet d'ajouter, modifier, afficher, et supprimer des utilisateurs, domaines, services et projets. L'interface utilisateur est conviviale et réactive grâce à Bootstrap.

## Fonctionnalités

- **L'authentification :** Connexion et deconnexion, recupération de mot de passe en cas d'oublie, mis à jour du profil.
- **Gestions des utilisateurs :** Les utilisateurs peuvent etre ajouter, modifier, supprimer et afficher selon leur role (admin ou prestataire).
- **Gestion des domaines:** Les utilisateurs (admin) peuvent ajouter, modifier, supprimer et afficher les domaines.
- **Gestion des services:** Les utilisateurs (admin) peuvent ajouter, modifier, supprimer et afficher les service
- **Gestions de projet :** Les utilisateurs (prestataire) peuvent ajouter, modifier, supprimer et afficher les projet

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants sur votre machine :

- [Node.js](https://nodejs.org/) 
- [npm](https://www.npmjs.com/)

## Installation

Suivez les étapes ci-dessous pour configurer et démarrer le projet localement.

### 1. Cloner le Dépôt

Clonez ce dépôt sur votre machine locale en utilisant Git :

```bash
git clone https://github.com/semthillo/plateforme-mis-en-relation-VueJS.git
```
### 2. Accéder au Répertoire du Projet

Accédez au répertoire du projet :

```bash
cd plateforme-mis-en-relation-VueJS
```

### 3. Installer les Dépendances
Installez les dépendances nécessaires avec npm :

```bash
npm install
```

### 4. Démarrage de l'Application
Une fois les dépendances installées, vous pouvez démarrer l'application en mode développement :

```bash
npm run dev
```

### 5. Instructions pour Ajouter une Recette
Cliquez sur le bouton "Ajouter une nouvelle recette" sur la page d'accueil.
Remplissez le formulaire avec le titre, les ingrédients, le type, et l'image de la recette.
Cliquez sur "Enregistrer" pour ajouter la recette à la liste.

### 6. Instructions pour Modifier ou Supprimer une Recette
Sur la carte de la recette, cliquez sur le bouton "Plus d'info".
Dans le modal qui s'ouvre, vous pouvez soit cliquer sur "Modifier" pour éditer la recette, soit sur "Supprimer" pour la retirer.



### Technologies Utilisées

Vue.js - Framework JavaScript pour créer des interfaces utilisateur
Pinia - Gestionnaire d'état pour Vue.js
Bootstrap - Framework CSS pour la création d'interfaces utilisateur réactives

### Auteur


[Seme Thillo](https://github.com/semthillo)
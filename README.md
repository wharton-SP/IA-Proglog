# PROLOG PROJECT (Projet IA)

![Static Badge](https://img.shields.io/badge/nvm-pnpm-green)
![Static Badge](https://img.shields.io/badge/server-swipl-orange)
![Static Badge](https://img.shields.io/badge/lang-prolog-red)
![Static Badge](https://img.shields.io/badge/lang-JS-yellow)
![Static Badge](https://img.shields.io/badge/framework-React%2BVite-cyan)

Ce projet est une enquête criminelle interactive utilisant Prolog (SWI-Prolog) pour la logique d'investigation. Le frontend est développé avec React et Vite, qui consomment une API exposée par le backend Prolog.

## Installation

Clone le repo :
```bash
    git clone https://github.com/wharton-SP/IA-Prolog.git
```

### Backend Prolog
1. Installer SWI-Prolog :  
```bash
    sudo apt-get install swi-prolog # basé Debian
    sudo pacman -S swi-prolog # basé Arch
```
2. Se placer dans le dossier `IA-Prolog/server` et lancer le :  
```bash
    cd IA-Prolog/server/
    swipl -q -s server.pl
```

### Frontend React
> Info : Dans une autre Terminale.
1. Installer les dépendances :  
```bash
cd IA-Prolog/
pnpm install
```
2. Démarrer le serveur de développement :  
```bash
pnpm run dev
```

## Accès
- Frontend : http://localhost:5173  
- Backend API : http://localhost:8080

> Important : 

> Le front utiliser un proxy pour contourner l'erreur ***CORS***.


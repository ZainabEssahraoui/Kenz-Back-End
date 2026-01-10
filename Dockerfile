# 1️⃣ Image Node.js officielle
FROM node:20

# 2️⃣ Répertoire de travail
WORKDIR /app

# 3️⃣ Copier package.json et package-lock.json pour le cache Docker
COPY package*.json ./

# 4️⃣ Installer uniquement les dépendances de production
RUN npm install

# 5️⃣ Copier tout le projet
COPY . .

# 6️⃣ Exposer le port interne du conteneur
EXPOSE 5000

# 7️⃣ Commande pour démarrer l'application
CMD ["node", "src/server.js"]

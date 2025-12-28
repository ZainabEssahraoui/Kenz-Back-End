# Image Node.js officielle
FROM node:20

# Répertoire de travail dans le conteneur
WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le projet
COPY . .

# Exposer le port
EXPOSE 5000

# Lancer server.js depuis le dossier src
CMD ["node", "src/server.js"]

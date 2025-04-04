# =============== Etapa de construcción ===============
FROM node:20 AS build

# Crea la carpeta de la aplicación
WORKDIR /app

# Copia archivos de dependencias e instala
COPY package*.json ./
RUN npm install

# Copia el resto del proyecto al contenedor 
COPY . .

# Compila NestJS
RUN npm run build

# =============== Etapa de producción ===============
FROM node:20 AS prod

# Crea la carpeta de la aplicación
WORKDIR /app

# Crear la carpeta donde se suben archivos
RUN mkdir -p /app/src/public/uploads

# Se copia dist y node_modules desde la etapa de build
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY package*.json ./


# Expone el puerto 3000 en el contenedor
EXPOSE 3000

# Corre NestJS en modo producción (asegúrate de tener "start:prod" en tu package.json)
CMD ["npm", "run", "start:prod"]
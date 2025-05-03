FROM node:20-alpine AS build

#en este paso se establece el directorio de trabajo
WORKDIR /app


# Copiar el package.json y el package-lock en nuestro WORKDIR
COPY package*.json ./

# Instalar dependencias
RUN npm install


# Copiar todos los archivos
COPY . .
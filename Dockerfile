FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:20-alpine AS production

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY --from=build /app/dist ./dist

CMD ["node", "dist/index.js"]
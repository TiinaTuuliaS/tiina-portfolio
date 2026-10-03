FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Vite reads public variables while building the production files.
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

FROM caddy:2-alpine

WORKDIR /app

COPY Caddyfile ./Caddyfile
RUN caddy fmt Caddyfile --overwrite
COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["caddy", "run", "--config", "Caddyfile", "--adapter", "caddyfile"]

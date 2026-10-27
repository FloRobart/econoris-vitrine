# Étape 1 : build du site statique Astro
FROM node:24-alpine AS builder
WORKDIR /app

# URL publique du site : indispensable au SEO (canonical, sitemap, Open Graph).
# Le .env n'est pas copié dans l'image (.dockerignore) : cette valeur par défaut
# est celle utilisée par la CI. Surcharge : docker build --build-arg SITE_URL=...
ARG SITE_URL=https://econoris.fr
ENV SITE_URL=${SITE_URL} \
    ASTRO_TELEMETRY_DISABLED=1

# Dépendances d'abord, pour profiter du cache Docker
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .
RUN npm run build

# Étape 2 : image finale avec NGINX
FROM nginx:alpine

# Supprimer le site par défaut de nginx
RUN rm -rf /usr/share/nginx/html/*

# Copier le site généré et la configuration nginx
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx/security-headers.conf /etc/nginx/snippets/security-headers.conf

# Ajout d'un utilisateur non-root avec UID/GID fixes
RUN addgroup -g 1800 -S econorisgroup && adduser -u 1800 -S econorisuser -G econorisgroup \
    && mkdir -p /run/nginx /var/cache/nginx /var/run /var/log/nginx \
    && chown -R econorisuser:econorisgroup /var/cache/nginx /var/run /var/log/nginx /run/nginx \
    && chmod 0755 /run/nginx
USER econorisuser

EXPOSE 80

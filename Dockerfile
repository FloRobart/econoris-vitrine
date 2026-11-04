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
# Docker Hardened Image: runs as non-root and has no shell or package manager,
# so this stage cannot contain any RUN instruction.
# Pulling it requires an authenticated session: docker login dhi.io
FROM dhi.io/nginx:1-debian13

# Copy the generated site and the nginx configuration
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx/main.conf /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx/security-headers.conf /etc/nginx/snippets/security-headers.conf

# Non-root users cannot rely on privileged ports: the hardened image uses 8080
EXPOSE 8080

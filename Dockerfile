# Pulling Docker Hardened Images requires an authenticated session: docker login dhi.io

# ---- Stage 1: build the static Astro site ----
# The "-dev" variant is the hardened image that includes a shell and npm.
# It never reaches production: only the generated files leave this stage.
FROM dhi.io/node:24-alpine3.23-dev@sha256:bef23378636b0574fc7048f6a5bf10ab89a5ddf853011c593cb33c092ad41dd3 AS builder
WORKDIR /app

# The public URL is required for SEO (canonical, sitemap, Open Graph).
# The .env file is not copied into the image, so this default is the production value.
ARG SITE_URL=https://econoris.fr
ENV SITE_URL=${SITE_URL} \
    ASTRO_TELEMETRY_DISABLED=1

# The build runs as a non-root user: a compromised dependency cannot alter the stage
RUN chown node:node /app
USER node

# Dependencies come first to benefit from the Docker cache.
# --ignore-scripts blocks the install scripts, the usual vector of npm supply chain attacks.
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts --no-audit --no-fund

# Only the build inputs are copied, so that no other file of the project can end up in the site
COPY astro.config.mjs tsconfig.json ./
COPY src ./src
COPY public ./public
RUN npm run build


# ---- Stage 2: serve the site with nginx ----
# This hardened image runs as non-root and has no shell or package manager,
# so this stage cannot contain any RUN instruction.
# Pinned by digest so that a compromised tag cannot silently change the build.
FROM dhi.io/nginx:1.30-debian13@sha256:30510655d924e2e36dd69815d852f2df43868c83007be3353ec0bb8f5e7b3ab0

# Owned by root: the user running nginx can read these files but never modify them
COPY --from=builder --chown=0:0 /app/dist /usr/share/nginx/html
COPY --chown=0:0 nginx.conf /etc/nginx/conf.d/default.conf
COPY --chown=0:0 nginx/http-overrides.conf /etc/nginx/conf.d/http-overrides.conf
COPY --chown=0:0 nginx/security-headers.conf /etc/nginx/snippets/security-headers.conf

USER 65532:65532

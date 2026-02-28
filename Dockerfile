FROM node:20-alpine AS base
RUN apk add --no-cache openssl

# --- Build stage ---
FROM base AS build

WORKDIR /app

# Install ALL dependencies (including devDependencies for build)
COPY package.json package-lock.json* ./
RUN npm ci && npm cache clean --force

# Copy source and generate Prisma client
COPY . .
RUN npx prisma generate
RUN npm run build

# Remove devDependencies after build
RUN npm prune --omit=dev

# --- Production stage ---
FROM base AS production

WORKDIR /app
ENV NODE_ENV=production
EXPOSE 3000

# Copy only what's needed from build stage
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/build ./build
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/prisma ./prisma

# Run migrations at startup, then start the server
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start"]

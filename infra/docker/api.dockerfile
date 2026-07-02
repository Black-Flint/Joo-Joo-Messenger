FROM oven/bun:1.3 AS builder

WORKDIR /app

# Copy workspace manifests for better layer caching
COPY package.json bun.lock ./

COPY apps/api/package.json ./apps/api/
COPY apps/web/package.json ./apps/web/

COPY packages/constants/package.json ./packages/constants/
COPY packages/schemas/package.json ./packages/schemas/
COPY packages/validators/package.json ./packages/validators/

# Install dependencies
RUN bun install --frozen-lockfile --filter @joo-joo-messenger/api

# Copy source code
COPY . .

# Build API
RUN bun --filter @joo-joo-messenger/api build

FROM oven/bun:1.3 AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json .

USER bun

EXPOSE 4000

CMD ["bun", "apps/api/dist/index.js"]
FROM oven/bun:1.3 AS builder

WORKDIR /app

COPY package.json bun.lock ./

COPY apps/api/package.json ./apps/api/
COPY apps/web/package.json ./apps/web/

COPY packages/constants/package.json ./packages/constants/
COPY packages/schemas/package.json ./packages/schemas/
COPY packages/validators/package.json ./packages/validators/

RUN bun install --frozen-lockfile --filter @joo-joo-messenger/web

COPY . .

RUN bun --filter @joo-joo-messenger/web build

FROM oven/bun:1.3 AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder --chown=bun:bun /app/apps/web/.next/standalone ./
COPY --from=builder --chown=bun:bun /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=bun:bun /app/apps/web/public ./apps/web/public

USER bun

EXPOSE 3000

CMD ["bun","apps/web/server.js"]
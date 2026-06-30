FROM oven/bun:1.3 AS base

WORKDIR /app

COPY package.json bun.lock ./
COPY apps ./apps
COPY packages ./packages

# RUN bun install --frozen-lockfile

RUN bun install

FROM base AS build

WORKDIR /app

COPY . .

RUN bun --filter @joo-joo-messenger/api build

FROM oven/bun:1.3 AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app .

EXPOSE 4000

CMD ["bun", "apps/api/dist/index.js"]
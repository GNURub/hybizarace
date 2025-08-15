FROM node:24-alpine AS build
WORKDIR /app
RUN npm install -g pnpm
COPY package.json ./
RUN pnpm install
COPY . .
RUN pnpm run build

FROM oven/bun:1-alpine
WORKDIR /app
COPY package.json ./
RUN bun install --production
COPY --from=build /app/dist/hybizarace/ ./
CMD ["bun", "server/server.mjs"]
EXPOSE 4000

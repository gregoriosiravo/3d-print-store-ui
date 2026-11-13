FROM node:22-bookworm-slim

RUN corepack enable

WORKDIR /app

COPY . .
RUN pnpm install --frozen-lockfile

EXPOSE 3000

CMD ["pnpm", "dev", "--host", "0.0.0.0"]

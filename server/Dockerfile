FROM oven/bun:1 AS base

WORKDIR /usr/src/app

COPY package*.json ./
RUN bun install

COPY . .

EXPOSE 5431
CMD [ "bun", "run", "dev" ]
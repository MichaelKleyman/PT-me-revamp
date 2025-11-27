FROM oven/bun:1 AS base

WORKDIR /server

# Copy package files
COPY package.json bun.lockb* ./

# Install dependencies (production only)
RUN bun install --frozen-lockfile --production

# Copy all source files
COPY . .

EXPOSE 3000

CMD [ "bun", "run", "dev" ]

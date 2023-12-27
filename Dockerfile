# Use the official Bun image as a base
FROM oven/bun:1 as base

# Set the working directory
WORKDIR /usr/src/app

# Install dependencies into a temporary directory for efficient caching
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install

# Copy dependencies and source code into the final image
FROM base AS release
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# Expose the port for the application
EXPOSE 3001/tcp

# Start the application
ENTRYPOINT [ "bun", "run", "/usr/src/app/src/index.ts" ]


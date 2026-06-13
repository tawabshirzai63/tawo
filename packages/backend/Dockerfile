FROM node:22-alpine
WORKDIR /app

# Copy root package files
COPY package.json ./

# Copy workspace package.json files
COPY packages/backend/package.json packages/backend/

# Install dependencies
RUN npm install --workspace packages/backend --include-workspace-root

# Copy backend source
COPY packages/backend/src packages/backend/src
COPY packages/backend/scripts packages/backend/scripts

# Ensure data directory exists
RUN mkdir -p /app/data

EXPOSE 8000

CMD ["node", "packages/backend/src/index.js"]
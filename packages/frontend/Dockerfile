FROM node:22-alpine AS builder
WORKDIR /app

# Copy root package files
COPY package.json ./
COPY tsconfig.base.json ./

# Copy workspace packages
COPY packages/shared/package.json packages/shared/
COPY packages/frontend/package.json packages/frontend/

# Install dependencies
RUN npm install

# Copy source files
COPY packages/shared/src packages/shared/src
COPY packages/frontend/ packages/frontend/

# Build shared first, then frontend
RUN npm run build -w packages/shared 2>/dev/null; npm run build -w packages/frontend

# Production image with nginx
FROM nginx:alpine
COPY --from=builder /app/packages/frontend/dist /usr/share/nginx/html
COPY packages/frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
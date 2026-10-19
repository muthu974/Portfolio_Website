# ==============================================================================
# Multi-stage Dockerfile for MERN Stack Portfolio Website
# ==============================================================================

# Stage 1: Build Client Assets
FROM node:20-alpine AS client-builder
WORKDIR /app/client

COPY client/package*.json ./
RUN npm ci

COPY client/ ./
RUN npm run build

# Stage 2: Production Runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000

# Install server dependencies
COPY server/package*.json ./server/
RUN cd server && npm ci --only=production

# Copy server code
COPY server/ ./server/

# Copy built frontend assets from stage 1 into client/dist
COPY --from=client-builder /app/client/dist ./client/dist

# Expose default application port
EXPOSE 5000

# Start unified production Express server
CMD ["node", "server/server.js"]

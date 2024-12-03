# Stage 1: Build the application
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies including devDependencies for building
RUN npm install

# Copy the source code
COPY . .

# Build the TypeScript application
RUN npm run build

# Stage 2: Create a lightweight image for production
FROM node:20-alpine AS release

# Set the working directory
WORKDIR /app

# Copy the required files from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Install only production dependencies
RUN npm install --omit=dev

# Accept build arguments for PORT and DATABASE_URL
ARG PORT
ARG MAIL_HOST
ARG MAIL_PORT
ARG MAIL_AUTH_USER
ARG MAIL_AUTH_PASS

# Set environment variables
ENV PORT=${PORT}
ENV MAIL_HOST=${MAIL_HOST}
ENV MAIL_PORT=${MAIL_PORT}
ENV MAIL_AUTH_USER=${MAIL_AUTH_USER}
ENV MAIL_AUTH_PASS=${MAIL_AUTH_PASS}

# Expose the application port
EXPOSE ${PORT}

# Start the application
CMD ["node", "dist/server.js"]

FROM node:latest
#FROM node:24-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy all source files
COPY . .

# Create a non-root user and group
# RUN addgroup appgroup && adduser -S appuser -G appgroup

# Switch to the non-root user
# USER appuser

# Healthcheck: checks if Vite dev server is running
# HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
#   CMD wget --spider -q http://localhost:5173 || exit 1

# Expose default Vite port
EXPOSE 5173

# Start the app
CMD ["npm", "run", "dev"]
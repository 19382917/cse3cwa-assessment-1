# Use Node LTS as the base image
FROM node:lts-alpine

# Install OpenSSL (required by Prisma on Alpine Linux)
RUN apk add --no-cache openssl libc6-compat

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code (including prisma folder)
COPY . .

# Generate the Prisma Client so the database connection works
RUN npx prisma generate

# Expose the port Next.js runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "dev"]
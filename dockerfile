# Stage 1: Build the application
FROM node:14 AS builder

WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy the rest of the application source code to the container
COPY . .

# Stage 2: Create lightweight production image
FROM node:14-alpine

WORKDIR /app

# Copy the built app from the previous stage
COPY --from=builder /app .

# Expose the port the app runs on
EXPOSE 3000

# Command to run your app
CMD ["npm", "start"]

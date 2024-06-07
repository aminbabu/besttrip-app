# Use the official image as a parent image
FROM node:20.14.0-alpine3.14

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and pnpm-lock.yaml
COPY package.json ./
COPY pnpm-lock.yaml ./

# Install app dependencies
RUN npm install -g pnpm
RUN pnpm install

# Copy app source code
COPY . .

# Expose port 8123
EXPOSE 8123

# Run the app
CMD [ "pnpm", "dev" ]
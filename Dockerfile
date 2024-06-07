# Use the official image as a parent image
FROM node:22-alpine3.19

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and pnpm-lock.yaml
COPY package.json ./
COPY pnpm-lock.yaml ./

# Install app dependencies
RUN npm install -g pnpm@9.1.4
RUN pnpm install

# Copy app source code
COPY . .

# Expose port 8123
EXPOSE 8123

# Run the app
CMD [ "pnpm", "dev" ]
# Use the official image as a parent image
FROM node:20.14.0-alpine3.20

# Install nodemon
RUN npm install -g nodemon

# Install pnpm
RUN npm install -g pnpm@9.1.4

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and pnpm-lock.yaml
COPY package.json ./
COPY pnpm-lock.yaml ./

COPY ./.env ./

# Install app dependencies
RUN pnpm install

# Copy app source code
COPY . .

# Expose port 8123
EXPOSE 8123

# Run the app
CMD [ "pnpm", "dev" ]
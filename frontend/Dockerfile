# Use an official Node runtime as a parent image
FROM node:18-alpine as BUILD_IMAGE

# Set the working directory in the container
WORKDIR /app/frontend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app
RUN npm run build
RUN npm install typescript
# Expose the port the app runs on
EXPOSE 3000


# Define the command to run your app using Vite
CMD ["npm", "run", "dev"]

# Note: You may need to adjust the command based on your specific project setup and scripts in your package.json.

FROM node:latest
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
ENV BACKEND_HOST = "localhost"
CMD ["npm", "run", "dev"]
FROM node:latest
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
CMD ["npx", "serve", "-s", "dist"]
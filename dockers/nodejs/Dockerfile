FROM node:12.16.1-slim
WORKDIR /app
COPY package.json /app
RUN npm install
COPY ../.. /app
EXPOSE 3030 3000
CMD ["npm", "start"]
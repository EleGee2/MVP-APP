FROM node:12
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . /app
EXPOSE 5000
CMD ["npm", "start"]
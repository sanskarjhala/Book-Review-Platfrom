FROM node:20-alpine

WORKDIR /app

COPY prisma ./prisma
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm install

COPY . .

EXPOSE 8081

CMD ["npm", "run", "dev:docker"]
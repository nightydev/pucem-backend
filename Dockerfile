FROM node:20-bullseye

RUN apt update && apt install

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start:dev"]

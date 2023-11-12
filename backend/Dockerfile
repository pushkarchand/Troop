FROM node

WORKDIR /app/backend

COPY package.json .

RUN npm install

COPY . .

RUN ls -l /app/backend

EXPOSE 5001

CMD ["npm", "start"]

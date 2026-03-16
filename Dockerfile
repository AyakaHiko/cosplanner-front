FROM node:18 AS builder

WORKDIR /front

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4173

RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /front/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
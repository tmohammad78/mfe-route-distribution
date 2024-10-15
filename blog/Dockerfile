FROM node:18-alpine AS builder

ENV NODE_ENV=production

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf *

COPY nginx/nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/build .
COPY --from=builder /app/build /usr/share/nginx/html/blog

EXPOSE 8082

ENTRYPOINT ["nginx", "-g", "daemon off;"]

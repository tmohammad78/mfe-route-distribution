FROM nginx:alpine

COPY ./html/index.html /usr/share/nginx/html/index.html
COPY ./conf/mime.types /etc/nginx/mime.types
COPY ./error /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

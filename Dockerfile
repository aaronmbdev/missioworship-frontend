FROM node:14.21.1 as node
WORKDIR /app
COPY . .
RUN npm install -g npm@6.14.17
RUN npm install
RUN npm run build --prod

FROM nginx:alpine
COPY --from=node /app/dist/missioworship /usr/share/nginx/html
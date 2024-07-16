FROM node:20
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build
EXPOSE 3000:3000
ENTRYPOINT [ "npm","start" ]
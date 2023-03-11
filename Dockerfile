FROM node:16-alpine
ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV
RUN if [ "x$NODE_ENV" = "development" ] ; then echo "Development" ; else echo "Production" ; fi
EXPOSE 8081
WORKDIR /usr/app
COPY ./ /usr/app
RUN npm install
RUN cd frontend && npm install && npm run build:dev
CMD ["npm", "run", "serve"]

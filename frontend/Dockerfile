FROM node:16-alpine AS development

WORKDIR /app

COPY package*.json ./

RUN npm install -g @angular/cli @angular-devkit/build-angular && npm install

COPY . .

RUN npm run build

#stage 2
# FROM nginx:alpine AS production

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

# WORKDIR /app

# COPY package*.json ./

# # RUN npm install --only=production

# COPY --from=development ./dist/frontend /usr/share/nginx/html
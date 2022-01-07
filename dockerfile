# Stage 1, build the project
FROM node:16.11-alpine as build
WORKDIR /app
RUN npm i -g pnpm
COPY package.json .
RUN pnpm install
COPY . .
RUN pnpm build

# Stage 2, serve the project through nginx
FROM nginx:1.16.0-alpine
# Copying files from build stage
COPY --from=build /app/dist /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]
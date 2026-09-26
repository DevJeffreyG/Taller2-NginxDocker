FROM node:22-alpine

WORKDIR /backend

COPY package.json .
COPY pnpm-lock.yaml
COPY tsconfig.json .
COPY src ./src

RUN npm install -g pnpm
RUN pnpm install
CMD ["node", "./src/server.ts"]



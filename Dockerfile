FROM node:22-alpine

WORKDIR /backend

COPY package.json .
COPY pnpm-lock.yaml .

RUN npm install -g pnpm
RUN pnpm install

COPY tsconfig.json .
COPY src ./src

CMD ["node", "./src/server.ts"]
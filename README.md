# chat-application

this chat application are build in using typescript and bun.js.

# here is step to start local server with docker

1: clone this repo

2: docker-compose up -d

run this command on root of this code and you can access to localhost:3001

# here is step to start local server withOut docker

1: clone this repo

2: bun install

3: bun run src/index.ts

# here is .env file

SERVER_PORT=3001
DB_HOST=127.0.0.1
DB_NAME=chat-app
DB_PORT=27017
JWT_SECRET=hhavfjasbfjadbdv
tokenTime=1800

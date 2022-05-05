# Demo Application

This is a demo web application in Node.JS with Express.JS.  

- api endpoints:
  - GET jwt:  /users/authenticate
  - GET users: /users

## Usage

When deploying across multiple edge locations the nodes need to share the auth encryption token so be sure to pass:

ENV SHARED_TOKEN = Value, ex: 0aeaef59e45df8fbfb3c07778da1573c4d4dc58eeb779f82143a180aa3fade0d2025d4db3c7ea924c27979c4638489dcc55861ecd28c7aabe203a2ac30121a6a

If the app is deployed standalone, it will generate a random token.

ThreatStack options do not work yet.
ENV TS_ORG
ENV TS_USER
ENV TS_KEY

ENV XCS_TOKEN

```bash

docker run --rm -d  -p 3000:3000/tcp mcoleman81/voltdemoapp:latest

```

latest for standard app

# Demo Application

This is a demo web application in Node.JS with Express.JS.  

- api endpoints:
  - GET jwt:  /users/authenticate
  - GET users: /users

## Usage

ENV TS_ORG
ENV TS_USER
ENV TS_KEY

ENV XCS_TOKEN

```bash

docker run --rm -d  -p 3000:3000/tcp mcoleman81/voltdemoapp:latest

```

latest for standard app

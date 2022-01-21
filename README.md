# Demo Application

This is a demo web application in Node.JS with Express.JS.  

- api endpoints:
 get jwt:  /users/authenticate
 get users: /users

## Usage

```bash

docker run --rm -d  -p 3000:3000/tcp mcoleman81/voltdemoapp:latest

```

For ThreatStack integration you will need a deployKey from [ThreatStack](https://www.threatstack.com/).

- Currently only works for CE deployments, RE hopefully soon.

```bash
docker run --rm -d -p 3000:3000/tcp mcoleman81/voltdemoapp:latest --env PSK=[DeployKey from ThreatStack Account]
```

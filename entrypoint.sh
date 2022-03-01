#!/usr/bin/env bash

#tsagent setup --deploy-key=36bd962b00757ce08e94329b5fccf00cd413950bc84664edc42202a50bd2a0b9e8d66908 --ruleset="Base Rule Set,Docker Rule Set" && \
#/opt/threatstack/sbin/tsagentd --logstdout=1 &

cd $DEMO_HOME

npm start
#DEBUG=myapp:* npm start
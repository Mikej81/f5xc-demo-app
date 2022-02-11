#!/usr/bin/env bash

tsagent setup --deploy-key=$PSK --ruleset="Base Rule Set,Docker Rule Set" && \
/opt/threatstack/sbin/tsagentd --logstdout=1 &

cd $DEMO_HOME

npm start
#DEBUG=myapp:* npm start
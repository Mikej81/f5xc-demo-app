FROM ubuntu:bionic

LABEL maintainer="Michael Coleman Michael@f5.com"

LABEL f5.xcs.demo.version="0.0.1-beta"
LABEL f5.xcs.demo.release-date="2022-3-11"
LABEL f5.xcs.demo.git="https://github.com/Mikej81/f5xc-demo-app.git"
LABEL f5.xcs.demo.git.repo="https://github.com/Mikej81/f5xc-demo-app"

ENV DEMO_GROUP=nodegroup \
    DEMO_USER=nodeuser \
    DEMO_HOME=/nodeuser \
    DEBIAN_FRONTEND=noninteractive 

WORKDIR ${DEMO_HOME}

RUN useradd -d ${DEMO_HOME} -s /bin/bash -m ${DEMO_USER} -g users && \
    chown -R ${DEMO_USER} ${DEMO_HOME} && \
    mkdir ${DEMO_HOME}/yarn_cache && \
    mkdir ${DEMO_HOME}/yarn_global

COPY . ${DEMO_HOME}/
COPY entrypoint.sh ${DEMO_HOME}/entrypoint.sh

ENV YARN_CACHE_FOLDER=${DEMO_HOME}/yarn_cache\ yarn\ --production

RUN apt-get clean && apt-get -y update && apt-get -y upgrade && \
    apt-get install --no-install-recommends -y \
    apt-utils \
    software-properties-common \
    gnupg \
    curl && \
    curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && \
    add-apt-repository ppa:deadsnakes/ppa && \
    apt-get -y update && apt-get install --no-install-recommends -y \
    rpm \
    ca-certificates \
    apt-transport-https \
    iptables \ 
    sudo \
    build-essential \
    nano \
    python3.8 \ 
    python3-pip \
    libcairo2-dev \
    libdbus-glib-1-dev \
    libgirepository1.0-dev \
    zlib1g-dev \
    pkg-config \ 
    nodejs && \
    npm install -g npm@9.6.2 && \
    npm install -g yarn && \
    yarn cache clean --force && \
    mkdir ${DEMO_HOME}/.npm-global && \
    rm -rf /var/lib/apt/lists/* && \
    cd ${DEMO_HOME} && \
    chown -R ${DEMO_USER} . && \
    yarn

RUN chown -R ${DEMO_USER} ./entrypoint.sh && \
    chmod +x ${DEMO_HOME}/entrypoint.sh

USER ${DEMO_USER}

EXPOSE 3000

CMD [ "./entrypoint.sh" ]
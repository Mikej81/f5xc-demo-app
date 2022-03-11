FROM ubuntu:bionic

LABEL maintainer="Michael Coleman Michael@f5.com"

ENV DEMO_GROUP=nodegroup \
    DEMO_USER=nodeuser \
    DEMO_HOME=/nodeuser \
    DEBIAN_FRONTEND=noninteractive

WORKDIR ${DEMO_HOME}

RUN apt-get clean && apt-get update && apt-get upgrade && \
    apt-get install -y \
    apt-utils \
    software-properties-common \
    gnupg \
    curl && \
    curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && \
    add-apt-repository ppa:deadsnakes/ppa && \
    apt-get update && apt-get install -y \
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
    pkg-config \
    nodejs && \
    rm -rf /var/lib/apt/lists/*

RUN useradd -d ${DEMO_HOME} -s /bin/bash -m ${DEMO_USER} -g users && \
    chown -R ${DEMO_USER} ${DEMO_HOME}

COPY entrypoint.sh ${DEMO_HOME}/entrypoint.sh
RUN chown -R ${DEMO_USER} ./entrypoint.sh 

COPY . ${DEMO_HOME}/

RUN pip3 install -r requirements.txt

RUN cd ${DEMO_HOME} && \
    npm install && \
    npm cache clean --force && \
    npm update

RUN chmod +x ${DEMO_HOME}/entrypoint.sh

USER ${DEMO_USER}

EXPOSE 3000

CMD [ "./entrypoint.sh" ]
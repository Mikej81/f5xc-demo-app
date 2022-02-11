FROM ubuntu:bionic

LABEL maintainer="Michael Coleman Michael@f5.com"

ENV DEMO_GROUP=nodegroup \
    DEMO_USER=nodeuser \
    DEMO_HOME=/nodeuser

WORKDIR ${DEMO_HOME}

RUN apt-get clean && apt-get update && \
    apt-get install gnupg curl -y && \
    curl -s https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add - && \
    echo deb https://deb.nodesource.com/node_12.x bionic main > /etc/apt/sources.list.d/nodesource.list

RUN apt-get update && apt-get -y install \
    gnupg \
    ca-certificates \
    apt-transport-https \
    iptables \ 
    sudo \
    build-essential \
    nano \
    wget \
    systemd \
    nodejs

RUN echo 'deb https://pkg.threatstack.com/v2/Ubuntu bionic main' >> /etc/apt/sources.list.d/support_sources.list && \
    curl https://app.threatstack.com/APT-GPG-KEY-THREATSTACK | apt-key add - && \
    apt-get update && apt-get install -y \
    threatstack-agent-support \
    rpm \
    threatstack-agent 
#&& \
#rm /etc/apt/sources.list.d/support_sources.list && \
#apt-key del 6EE04BD4 && \
#apt-get autoremove -y --purge apt-transport-https

RUN useradd -d ${DEMO_HOME} -s /bin/bash -m ${DEMO_USER} -g users
RUN chown -R ${DEMO_USER} ${DEMO_HOME}
COPY entrypoint.sh ${DEMO_HOME}/entrypoint.sh
RUN chown -R ${DEMO_USER} ./entrypoint.sh 

#COPY package*.json ${DEMO_HOME} 
#COPY entrypoint.sh ./entrypoint.sh
COPY . ${DEMO_HOME}/

RUN cd ${DEMO_HOME} && \
    npm install && \
    npm cache clean --force && \
    npm update

RUN chmod +x ${DEMO_HOME}/entrypoint.sh

USER ${DEMO_USER}

EXPOSE 3000

CMD [ "./entrypoint.sh" ]
FROM ubuntu:bionic

LABEL maintainer="Michael Coleman Michael@f5.com"

ENV DEMO_GROUP=nodegroup \
    DEMO_USER=nodeuser \
    DEMO_HOME=/nodeuser

WORKDIR ${DEMO_HOME}

RUN apt-get clean && apt-get update

RUN apt-get -y install \
    curl \
    gnupg \
    ca-certificates \
    apt-transport-https \
    iptables \ 
    sudo \
    npm \
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

USER ${DEMO_USER}

COPY package*.json ${DEMO_HOME} 
COPY entrypoint.sh ./entrypoint.sh
COPY . ${DEMO_HOME}/

RUN npm install && \
    npm cache clean --force

#RUN chmod +x ./entrypoint.sh

EXPOSE 3000

CMD [ "./entrypoint.sh" ]
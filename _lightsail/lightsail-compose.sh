#!/bin/bash

# install latest version of docker the lazy way
curl -sSL https://get.docker.com | sh

# make it so you don't need to sudo to run docker commands
usermod -aG docker ubuntu

# install docker-compose
curl -L https://github.com/docker/compose/releases/download/1.25.3/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# copy in systemd unit file and register it so our compose file runs 
# on system restart
curl -o /etc/systemd/system/docker-compose-app.service https://raw.githubusercontent.com/j3ang/TID-KEY/master/_lightsail/docker-compose-app.service
systemctl enable docker-compose-app

# setup working directory
cd /usr/src/app

# clone latest code 
git clone https://github.com/j3ang/TID-KEY.git ; cd TID-KEY
mv ../.env .
cd _docker/
docker pull twinimage/tid-key:v1.0.0
docker-compose -f docker-compose.$env.yml up
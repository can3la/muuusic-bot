#!/bin/bash

sudo yum update -y
sudo yum install docker -y
sudo service docker start
sudo systemctl enable docker
sudo systemctl start docker
sudo groupadd docker
sudo usermod -a -G docker ec2-user
newgrp docker

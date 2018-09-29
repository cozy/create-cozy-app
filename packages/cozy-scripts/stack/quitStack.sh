#!/bin/sh

# A shell script to graceful quit cozy-stack in docker

dockerID=$(docker ps | grep cozy/cozy-app-dev | awk '{print $1}')

if [ ! -z $dockerID ]; then
  processToKill=$(docker exec ${dockerID} ps -A | grep cozy-stack | awk '{print $1}')
  docker exec ${dockerID} kill -s INT ${processToKill};
else
  echo "No stack found to exit"
fi

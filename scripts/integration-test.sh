#!/bin/bash

set -euo pipefail

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
APP_DIR=${1:-"/tmp/cs-app-dir"}
REPO=${INTEGRATION_REPO:-https://github.com/cozy/cozy-banks.git}
BUILD_CMD=${INTEGRATION_BUILD_CMD:-"yarn build"}

echo "Preparing app dir (repo: $REPO)..."
if [[ "$(ls -A $APP_DIR)" ]]; then
   echo "$APP_DIR is not empty, not cloning"
else  
   git clone --depth 1 $REPO $APP_DIR
   pushd $APP_DIR
   yarn install
   popd
fi

echo "Adding local cozy-scripts..."
COZY_SCRIPTS_DIR=$DIR/../packages/cozy-scripts
pushd $APP_DIR
yarn add $COZY_SCRIPTS_DIR

echo "Building..."
$BUILD_CMD
popd

echo "Successfully built app with cozy-scripts !"

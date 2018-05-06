#!/bin/bash

UPDATED_LIST=$(lerna updated | sed -e "s/- //g")
CS_NAME="cozy-scripts"

if [[ $UPDATED_LIST =~ (^|[[:space:]])$CS_NAME($|[[:space:]]) ]]; then
    echo "Cleaning cozy-scripts template yarn lockfile..."
    (cd packages/cozy-scripts/template && rm -rf node_modules/ yarn.lock && yarn)
    echo "Cleaning cozy-scripts template-vue yarn lockfile..."
    (cd packages/cozy-scripts/template-vue && rm -rf node_modules/ yarn.lock && yarn)
fi

for package in $UPDATED_LIST
do
    echo "Cleaning $package yarn lockfile..."
    ( cd packages/$package && rm -rf node_modules/ yarn.lock )
done

lerna bootstrap

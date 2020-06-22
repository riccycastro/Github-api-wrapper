#!/bin/sh

cd /usr/src/app/cocus-backend-application

if [ ! -d "./node_modules" ]; then
  npm install && npm run start:dev
else
  npm run start:dev
fi

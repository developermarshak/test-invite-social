#!/usr/bin/env sh

npm config set registry https://registry.npmjs.org/
rm -rf node_modules
rm -rf build/*
rm -rf /tmp/install/
mkdir /tmp/install/
cp ./* /tmp/install/ -R
cd /tmp/install/
pnpm i
rm -rf build/*
npm run build
cp build/* /app/build/ -R
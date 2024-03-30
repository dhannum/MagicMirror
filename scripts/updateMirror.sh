#!/bin/bash

cd ..
git fetch upstream && git pull upstream
npm i

for dir in modules/*; do (cd "$dir" && pwd && git fetch && git pull && npm i); done



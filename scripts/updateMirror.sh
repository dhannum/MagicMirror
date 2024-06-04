#!/bin/bash

cd ..
git fetch upstream && git pull upstream master
git fetch origin && git pull origin master
npm i

for dir in modules/*; do (cd "$dir" && pwd && git fetch && git pull && npm i); done



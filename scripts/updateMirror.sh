#!/bin/bash

cd ..
echo "**** Merging from upstream"
git fetch upstream && git pull upstream master
echo "**** Merging from origin"
git fetch origin && git pull origin master
echo "**** Top level npm i"
npm i

for dir in modules/*; do (echo "**** Fetch/Pull/Install $dir" && cd "$dir" && pwd && git fetch && git pull && npm i); done



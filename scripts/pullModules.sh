#!/bin/bash

cd ../modules
git clone git@github.com:MMM-CalendarExt2/MMM-CalendarExt2.git
cd MMM-CalendarExt2
npm i
cd ..

git clone git@github.com:cbrooker/MMM-Todoist.git
cd MMM-Todoist
npm i
cd ..

git clone git@github.com:delightedCrow/WallberryTheme.git
cd WallberryTheme
npm i
cd ..




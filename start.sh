#!/bin/bash

if [[ ! -d .git ]]; then
 git init
 git remote add origin https://github.com/glorious-conversation-design/decipher-survey-sync.git
 git clean -fd
 git pull origin master
 git branch --set-upstream-to=origin/master master
else
 git pull origin master
fi

# if [[ ! -d "node_modules" ]]; then
    npm install
# fi

clear

node ./decipher-survey-sync.js

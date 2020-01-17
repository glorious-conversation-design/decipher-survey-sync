#!/bin/bash

git pull

# if [[ ! -d "node_modules" ]]; then
    npm install
# fi

clear

node ./decipher-survey-sync.js

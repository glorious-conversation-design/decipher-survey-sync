#!/bin/bash

git pull

# if [[ ! -d "node_modules" ]]; then
    npm install
# fi

cls

"C:\Program Files\nodejs\node.exe" ./decipher-survey-sync.js

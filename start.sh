#!/bin/bash 
if [[ ! -d "node_modules" ]]; then 
    npm install
fi

git pull

npm start

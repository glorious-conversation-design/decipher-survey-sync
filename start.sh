#!/bin/bash

exit 1
if [[ "$(which git)" == "" ]]; then
 echo "Please install git."
 exit 1
fi

if [[ "$(which node)" == "" ]]; then
 echo "Please install Node.js."
 exit 1
fi

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
if [[ -f api.key ]]; then
 if [[ ! -d ~/.decipher-survey-sync ]]; then 
  mkdir ~/.decipher-survey-sync
 fi
 mv api.key ~/.decipher-survey-sync/api.key
fi
clear

node ./decipher-survey-sync.js

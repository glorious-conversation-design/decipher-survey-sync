@Echo Off

git pull

Rem if [[ ! -d "node_modules" ]]; then
    Cmd /C npm install
Rem fi

Cls

node ./decipher-survey-sync.js

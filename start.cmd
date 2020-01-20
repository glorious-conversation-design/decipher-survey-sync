@Echo Off

git pull

Rem if [[ ! -d "node_modules" ]]; then
    npm install
Rem fi

Cls

"%ProgramFiles%\nodejs\node.exe" ./decipher-survey-sync.js

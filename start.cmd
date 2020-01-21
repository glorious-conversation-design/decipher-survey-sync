@Echo Off

If Not Exist .git (
 git init
 git remote add origin https://github.com/glorious-conversation-design/decipher-survey-sync.git
 git clean -fd & git pull origin master & git branch --set-upstream-to=origin/master master
) Else (
 git pull origin master
)

Rem if [[ ! -d "node_modules" ]]; then
    Cmd /C npm install
Rem fi

Cls

node ./decipher-survey-sync.js

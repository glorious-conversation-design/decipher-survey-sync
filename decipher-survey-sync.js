#!/usr/bin/env node

const axios = require('axios');
const readline = require('readline');
const colors = require('colors');
const inquirer = require('inquirer');
const dss = require('./lib/decipher-survey-sync.js');
const APITool = require('./lib/api-tool');
const fs = require('fs').promises;
// const fs = require('fs');
const { exec } = require('child_process');


let the_api_key = '';
(async () => {
    const appInfo = JSON.parse(await fs.readFile('package.json', {
        encoding: 'utf8',
    }));

    console.log('======================================');
    console.log('Welcome to ' + appInfo.title + ' ' + appInfo.version);
    console.log('======================================');
    console.log(appInfo.copyright);
    console.log();
    init();

})();
async function init()  {
    let projectdirexists = false;
    if (process.platform !== 'win32') {
        projectdirexists = await fs.stat('./project')
        .catch((err) => {
            fs.mkdir('./project');
        });
    } else {
        projectdirexists = await fs.stat('.//project')
        .catch((err) => {
            fs.mkdir('.//project');
        });
    }
    let conf = null;
    try {
        conf = JSON.parse(await fs.readFile('config.json'));
    }
    catch (e) {
        conf = {
            openEditor: '',
        };
        try {
            const written = await fs.writeFile('config.json', JSON.stringify(conf));
        }
        catch (e) {
            console.error('Couldn\'t write config');
        }
    }
    the_api_key = await dss.get_api_key();


    if (the_api_key === undefined) {
        return;
    }


    const prompt = inquirer.createPromptModule();




    const choices = [{name: 'New Project', atime: new Date()}];

    let projectlist = [];
    if (!await fs.stat('project')) {
        await fs.mkdir('project');
    }
    try {
        if (process.platform !== 'win32') projectlist = await fs.readdir('project/');
        else projectlist = await fs.readdir('project//');
    }
    catch (e) {
        console.log('Exception : ', e);
    }
    await Promise.all(projectlist.map(async (project) => {

        if (project.substr(0, 1) != '.') {
            const stats = await fs.stat('project/' + project);
            const atime = stats.atime;
            choices.push({ name: project, atime: atime});


        }
    }));
    choices.sort(function (a, b) {
        return a.atime < b.atime;
    });
    const questions =
    [{
        type: 'list',
        name: 'action',
        message: colors.green('Please choose a project...'),
        choices: choices.map((choice) => {
            return choice.name;
        }),
        validate: (input) => {

        },
    }];



    /*  Maybe change it back sometimes but for now I want to show the existing project here.
    const questions =
    [{
    type: 'list',
    name: 'action',
    message: colors.green('Please choose an action...'),
    choices: [ 'New Project', 'Sync' ],
    validate: (input) => {

}
}]
*/





const {action} = await prompt(questions);
let project_number = null;
switch (action) {
    case 'New Project':
    project_number = await dss.download_survey(the_api_key);
    break;
    default:
    project_number = await dss.download_survey(the_api_key, action);
}
if (project_number === undefined || project_number === null) {
    // console.error('Could not find the project ');
    return;
}
const testParams = {
    api_key: the_api_key,
    project_number: project_number,
};

const api_tool = new APITool(testParams);

api_tool.watch();
if (conf.openEditor != '') {
    if (process.platform !== 'win32') {
        exec(conf.openEditor + ' project/' + project_number + '/survey.xml');
    }
    else {
        exec(conf.openEditor + ' project//' + project_number + '//survey.xml');
    }
    console.log('Showing survey in ' + conf.openEditor);
}


/*
readline.emitKeypressEvents(process.stdin)
process.stdin.setRawMode(true)
process.stdin.resume()
process.stdin.on('keypress', (str, key) => {
if (key.ctrl && key.name == 'c') {
process.exit();
}
if (key.name == 'return') {
init();
}
})
*/

const switchmenu =
[{
    type: 'list',
    name: 'action',
    message: '',
    choices: ['Switch project', 'Quit'],
    validate: (input) => {

    },
}];
const switchvar = await inquirer.prompt(switchmenu);
switch (switchvar.action) {
    case 'Switch project':
    if (api_tool) await api_tool.unwatch();
    init();
    break;
    case 'Quit':
    console.log('Goodbye.');
    return process.exit();
    break;
    default:
    console.log('going to default');
    init();
}
}
async function test_api_key(api_key) {
    const testlink = 'https://glorious.focusvision.com/api/v1/surveys/selfserve/53c/tooltest/files/survey.xml';
    console.log('testing api_key: ' + api_key);
    let response = null;
    try {
        const theheaders = {'x-apikey': api_key};
        console.log(theheaders);
        response = await axios.get(testlink, {
            headers: theheaders,
        });
        console.log('Starting sync tool...');
        show_menu(api_key);
    }
    catch (myerr) {

        console.error(myerr);
        return false;
    }
}

#!/usr/bin/env node
const axios = require('axios');
const readline = require('readline');
const colors = require('colors');
const inquirer = require('inquirer');
const dss = require('./lib/decipher-survey-sync.js');
const APITool = require("./lib/api-tool");
const fss = require('fs').promises;
const fs = require('fs');
const { exec } = require('child_process');

let the_api_key = '';


const hep = init();










//let api_tool = new APITool(testParams);

//Saving you for dessert
//api_tool.watch();















    // -> get stored api key || ask for one


//    const stuff = await init();

//    console.log('but still');
    //const some_response_i_will_get_at_a_point = await dss.get_api_key();
    //console.log(some_response_i_will_get_at_a_point);



    /*

    if (API_KEY == false) {

        console.log('Invalid API Key');
    }


    console.log('trying to test');

    test_api_key(API_KEY);
    */





async function init() {
    let conf = null;
    if (!fs.existsSync('config.json')) {
        conf = {
            openEditor: '',
        }
        try {
            const written = await fss.writeFile('config.json', JSON.stringify(conf));
        }
        catch {
            console.error('Couldn\'t write config');
        }
    }
    else {
        conf = JSON.parse(await fss.readFile('config.json'));
    }

    the_api_key = await dss.get_api_key();


    if (the_api_key === undefined) {
        return;
    }


    var prompt = inquirer.createPromptModule();




    let choices = [{name: 'New Project', atime: new Date()} ];
    let projectlist = [];
    try {
        projectlist = await fss.readdir('project/');
    }
    catch(e) {
        console.log('Exception : ', e);
    }
    projectlist.map((project) => {
        if (project.substr(0,1) != '.') {
            const stats = fs.statSync('project/' + project);
            const atime = stats.atime;
            choices.push( { name: project, atime: atime});


        }
    });

choices.sort(function(a,b) {
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

        }
    }]



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
    switch(action) {
        case "New Project":
            project_number = await dss.download_survey(the_api_key);
            break;
        default:
            project_number = await dss.download_survey(the_api_key, action);
    }
    if (project_number === undefined || project_number === null) {
        //console.error('Could not find the project ');
        return;
    }
    const testParams = {
        api_key: the_api_key,
        project_number: project_number,
    }

    let api_tool = new APITool(testParams);

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

            }
        }]
        const switchvar = await inquirer.prompt(switchmenu);
        switch (switchvar.action) {
            case 'Switch project':
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


/*
function show_menu(api_key) {
    console.log("Howdy! ");
    prompt(questions)
    .then(({action}) => {
        switch(action) {
            case "Select Project":
                await dss.download_survey(api_key,show_menu);
                let api_tool = new APITool(testParams);


                api_tool.watch();

                break;
            default:
                console.log("Action " + action + " not set yet.");
        }

    });
}
*/
async function test_api_key(api_key) {
    const testlink = 'https://glorious.focusvision.com/api/v1/surveys/selfserve/53c/tooltest/files/survey.xml';
    console.log('testing api_key: ' + api_key);
    let response = null;
    try {
        const theheaders = {'x-apikey': api_key};
        console.log(theheaders)
        response = await axios.get(testlink,{
            headers: theheaders
        });
        console.log('Starting sync tool...');
        show_menu(api_key);

    }
    catch(myerr) {

        console.error(myerr)
        return false;

    }




}

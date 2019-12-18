#!/usr/bin/env node
const axios = require('axios');

const colors = require('colors');
const inquirer = require('inquirer');
const dss = require('../lib/decipher-survey-sync.js');
const APITool = require("../lib/api-tool");
const fss = require('fs').promises;
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


    the_api_key = await dss.get_api_key();


    if (the_api_key === undefined) {
        return;
    }


    var prompt = inquirer.createPromptModule();
    console.log('\n');
    console.log('\n');

    console.log('\n');

    let choices = ['New Project'];
    let projectlist = [];
    try {
        projectlist = await fss.readdir('projects/');
    }
    catch(e) {
        console.log('Exception : ', e);
    }
    projectlist.map((project) => {
        if (project.substr(0,1) != '.') {
            choices.push(project);
        }
    });



    const questions =
    [{
        type: 'list',
        name: 'action',
        message: colors.green('Please choose a project...'),
        choices: choices,
        validate: (input) => {

        }
    }]



/*  Maybe change it back sometimes but for now I want to show the existing projects here.
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
    console.log('--------------------------------')
    console.log("Welcome to Decipher Survey Sync!");
    console.log('--------------------------------')

    console.log('\n');
    console.log("\n");
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

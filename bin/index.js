#!/usr/bin/env node
const axios = require('axios');

const colors = require('colors');
const inquirer = require('inquirer');
const dss = require('../lib/decipher-survey-sync.js');
const APITool = require("../lib/api-tool");

/* when you're ready to start saving versions of survey

DSS workflow
0. Check if API_Key exists. If true -> make a test api call : If false, prompt user for API_Key, store it and go back to 0.
1. Prompt user for project number.
 or check if user is already in a project

2. Check if project exists
	if false => go to 1
3. Check if project folder with name = project number. If false => Create it and the archive folder
4. Change directory to project folder.
5. Download survey.xml into project folder.
6. Start XML Sync
7. Listen for changes in survey.xml
 Every time a change occurs, make pull request to api and add current version to archive.

*/


//==>0
//check api_key








/*



return;

var params = {};
(
    params.api_key = await dss.get_api_key();
)

console.log(params);

return;
let testParams = {
    api_key: 'yvcdf3m4b93avrg24b6j8fmqh3vh0w300mvkszyp9b6163277839kh0m0k105hcd',
    project_number: 'tooltest'
};
*/



start();









//let api_tool = new APITool(testParams);

//Saving you for dessert
//api_tool.watch();










var prompt = inquirer.createPromptModule();
const questions =
[{
    type: 'list',
    name: 'action',
    message: 'Welcome to Decipher Survey Sync. Please choose an action!',
    choices: [ 'Test', 'Select Project', 'Sync' ],
    validate: (input) => {

    }
}]

dss.get_api_key(function(api_key) {
    if (api_key === undefined) {
        console.log("Weird!");
        return;
    }

    show_menu();
});


function show_menu(api_key) {
    console.log("Howdy! ");
    prompt(questions)
    .then(({action}) => {
        switch(action) {
            case "Select Project":
                dss.download_survey(api_key,show_menu);
                break;
            default:
                console.log("Action " + action + " not set yet.");
        }

    });
}





async function start() {
    // -> get stored api key || ask for one

    let API_KEY = dss.get_api_key();

    if (API_KEY == false) {

        console.log('Invalid API Key');
    }
    // -> test api -> if false -> reset and start over with new api_key



    test_api_key(API_KEY);


}





async function test_api_key(api_key) {
    const testlink = 'https://glorious.focusvision.com/api/v1/surveys/selfserve/53c/tooltest/files/survey.xml';
    console.log('testing api_key: ' + api_key);
    let response = null;
    try {
        const theheaders = {'x-apikey': api_key};

        response = await axios.get(testlink,{
            headers: {'x-apikey': api_key}
        });
        console.log('Starting sync tool...');
        show_menu(api_key);

    }
    catch(myerr) {

        console.error(myerr)
        return false;

    }




}
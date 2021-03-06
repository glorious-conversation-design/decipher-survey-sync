#!/usr/bin/env node

const colors = require('colors');
const axios = require('axios');
const inquirer = require('inquirer');
const readline = require('readline');
const fs = require('fs').promises;
      fs.path = require('path');
const os = require('os');


const decipher_survey_sync =  {
    dssx: this,
    api_key: null,
    project_number: null,
    get_storage_path: async function (strUser_Path = os.homedir())
    {
     strUser_Path = fs.path.resolve(strUser_Path);
     let strStoragePath = '';
     if (process.platform == 'win32')
     {
      strUser_Path += '\\';
      const strWinPath = 'AppData\\Local\\decipher-survey-sync\\';
      strStoragePath = strUser_Path + strWinPath;
     }
     else
     {
      strUser_Path += '/';
      const strUNIXPath = '.config/decipher-survey-sync/';
      strStoragePath = strUser_Path + strUNIXPath;
     }
     await fs.mkdir(strStoragePath, { recursive: true });

     return strStoragePath;
    },
    get_api_key: async function () {
        const content = false;
        // console.log('Checking for a saved API Key');
        // only ask for api 3 times.
        let n = 3;
        while (n--) {
            try {
                this.api_key = await fs.readFile((await this.get_storage_path()) + 'api.key', 'utf8');
                await this.test_api_key();
                return this.api_key;
            }
            catch (exc) {
                try {
                    await this.ask_for_api_key();
                }
                catch (e) {
                    process.exit(1);
                }
            }
        }
        console.log('Please make sure you have the right access to use this tool.'.red);
    },
    ask_for_api_key: async function () {

        const iResponse = await inquirer.prompt({
            type: 'input',
            name: 'api_key',
            message: 'Please provide the API key:',
        });
        try {
            await fs.writeFile((await this.get_storage_path()) + 'api.key', iResponse.api_key);
        }
        catch (e) {
            console.log('Could not write the api.key file');
            throw e;
        }
    },

    test_api_key: async function () {
        // Try to access tooltest for now todo - change this.
        const URL = 'https://glorious.focusvision.com/api/v1/surveys/selfserve/53c/tooltest/files/survey.xml';
        const headers = {'x-apikey': this.api_key};
        try {
            const response = await axios.get(URL, {headers: headers});
        }
        catch (exc) {
            throw exc;
        }
    },
    download_survey: async function (api_key, the_project_number = null) {
        if (the_project_number == null) {
            const { project_number } = await inquirer.prompt({
                type: 'input',
                name: 'project_number',
                message: 'Please enter the project number:',
            });
            the_project_number = project_number;
        }
        this.URL = 'https://glorious.focusvision.com/api/v1/surveys/selfserve/53c/' + the_project_number + '/files/survey.xml';
        try {
            const response = await axios.get(this.URL, {
                headers: {
                    'x-apikey': api_key,
                },
            });
            let path = '';
            if (process.platform !== 'win32') {
                path = './project/' + the_project_number;
            }
            else {
                path = '.\\project\\' + the_project_number;
            }
            const direxists = await fs.stat(path)
            .catch((err) => {
                fs.mkdir(path);
            });
            const idMatcher = /<(?:html|select|number|float|text|textarea|radio|checkbox|row|col|choice|suspend|invalid|completed|samplesource|title|block|loop|var|exit|goto|res|note)[^>]*(\sid="\w+")/gsi;
            const ids = [];
            let idnow;
            try {

                do  {
                    idnow = idMatcher.exec(response.data);
                    if (idnow) ids.push(idnow[1]);

                } while (idnow);
            }
            catch (e) {
                console.log(e);
            }

            ids.map((id_string) => {
                response.data = response.data.replace(id_string, '');
            });
            if (process.platform !== 'win32') {
                await fs.writeFile(path + '/survey.xml', response.data, 'UTF-8');
            }
            else {
                await fs.writeFile(path + '\\survey.xml', response.data, 'UTF-8');
            }

            return the_project_number;
        }
        catch (nosuchproject) {
            switch (nosuchproject.response.status) {
                case 404:
                console.error(colors.red('The project does not exist'));
                break;
                case 400:
                console.error(colors.red('The project name is invalid'));
                break;
                default:
                console.log(nosuchproject);
            }
            return await this.download_survey(api_key);
        }

    },
};

module.exports = decipher_survey_sync;

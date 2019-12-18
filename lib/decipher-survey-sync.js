const colors = require('colors');
const axios = require('axios');
const inquirer = require('inquirer');
const readline = require('readline');
const fs = require('fs').promises;
const decipher_survey_sync =  {

    dssx: this,
    api_key: null,
    project_number: null,
    get_api_key: async function() {
        let content = false;
        //console.log('Checking for a saved API Key');
        //only ask for api 3 times.

        let n = 3;
        while(n--) {

            try {


                this.api_key = await fs.readFile('./api.key', 'utf8');




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
    ask_for_api_key: async function() {
        console.log('\n');
        const iResponse = await inquirer.prompt({
            type: 'input',
            name: 'api_key',
            message: 'Please provide the API key',
        });
        try {
            await fs.writeFile('./api.key', iResponse.api_key);
        }
        catch(e) {
            console.log('Could not write the api.key file');
            throw e;
        }

    },

    test_api_key: async function() {

        // Try to access tooltest for now.
        const URL = 'https://glorious.focusvision.com/api/v1/surveys/selfserve/53c/tooltest/files/survey.xml';
        const headers = {'x-apikey': this.api_key};
        try {
            const response = await axios.get(URL, {headers: headers});
        }
        catch (exc) {
            //console.log('error!!! ', exc);
            throw exc;
        }



    },
    download_survey: async function(api_key, the_project_number = null) {
        if (the_project_number == null) {
            const { project_number }= await inquirer.prompt({
                type: 'input',
                name: 'project_number',
                message: "Please enter the project number: "
            });
            the_project_number = project_number;
        }

        this.URL = 'https://glorious.focusvision.com/api/v1/surveys/selfserve/53c/' + the_project_number + '/files/survey.xml';

        try {
            const response = await axios.get(this.URL,{
                        headers: {
                            'x-apikey': api_key
                        }
            });

            const path = './projects/' + the_project_number;
            await fs.stat('./projects')
                .catch((err) => {

                if (err)
                    fs.mkdir('./projects');
            });
            const direxists = await fs.stat(path)
                .catch((err) => {
                     fs.mkdir(path);
                });
            await fs.writeFile(path + '/survey.xml', response.data, 'UTF-8');

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
                    console.log(nosuchproject.response);
            }
            return await this.download_survey(api_key);


        }







    }


};

module.exports = decipher_survey_sync;

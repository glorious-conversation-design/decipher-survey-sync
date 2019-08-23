
const axios = require('axios');
const inquirer = require('inquirer');
const readline = require('readline');
const fs = require('fs');
const decipher_survey_sync =  {

    dssx: this,
    api_key: null,
    project_number: null,
    get_api_key: function() {
        let content = false;

        try {

            content = fs.readFileSync('./api.key', 'utf8');

        }
        catch (exc) {
            console.log('error -> ');
            console.log(exc);
           content = false;
        }

        return content;
    },
    ask_for_api_key: async function() {
        d = this;
        const myresp = await inquirer.prompt({
            type: 'input',
            name: 'api_key',
            message: 'Please provide the API key'
        })
        .then(({api_key}) => {
            console.log("New API key will be: " + api_key);
            return api_key;
        });
        return myresp;
    },
    write_api_key: function(key) {
        console.log('writing api key');
        try  {
            return fs.writeFileSync('./api.key', key);
            console.log('writing key ' + key);
        }
        catch (exc) {
            console.log('errrooooooor');
            console.log(exc);
        }
        finally {
            console.log('')
        }
    },
    test_api_key: async function(api_key) {
        return true;
    },
    download_survey(api_key, callback) {
        inquirer.prompt({
            type: 'input',
            name: 'project_number',
            message: "Please enter the project number: "
        }).then(({project_number}) => {

            this.URL = 'https://glorious.focusvision.com/api/v1/surveys/selfserve/53c/' + project_number + '/files/survey.xml';

            axios.get(this.URL,{
                headers: {
                    'x-apikey': api_key
                }
            }).then(function(response) {
                //

                const dir = './' + project_number;
                if (!fs.existsSync('./' + project_number)) {
                    fs.mkdirSync('./' + project_number);
                }

                fs.writeFileSync(dir + '/survey.xml', response.data, 'UTF-8');
                console.log('finished writing?');
                callback(api_key);




            });

        });

    }


};

module.exports = decipher_survey_sync;

/*
    ask_for_api_key: function() {
        d = this;
        inquirer.prompt({
            type: 'input',
            name: 'api_key',
            message: 'Please provide the API key'
        })
        .then(({api_key}) => {
            console.log("New API key will be: " + api_key);
            d.write_api_key(api_key);
        })
    },
    write_api_key: function(api_key)  {
        fs.writeFile('./api.key', api_key, function(err) {
            if (!err) {
                console.log("API key saved! Please restart.");

            }
        });
    },
    test_connection: function() {
        const api_key = dssx.get_api_key();
    },
    download_survey(callback) {
        inquirer.prompt({
            type: 'input',
            name: 'project_number',
            message: "Please enter the project number: "
        }).then(({project_number}) => {
            console.log("Yeah... project number is: " + project_number);
            fetch_survey(project_number).then(callback());
        });

    }
}

*/

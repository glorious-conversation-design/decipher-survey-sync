const axios = require('axios');
const archiveTool = require("../lib/arhive-tool/archive-tool.js");
const fs = require('fs');
const colors = require('colors');
/*



*/



/*
  just retry once if connection brakes
*/
 class APITool {
    constructor(props) {
        this.URL = 'https://glorious.focusvision.com/api/v1/surveys/selfserve/53c/' + props.project_number + '/files/survey.xml';
        this.api_key = props.api_key;
        this.number_of_saves = 0;
        this.archiveTool = new archiveTool('survey.xml', 'archive');
    }
    async get() {
        //console.log("Going to fetch data from: " + this.URL);
        try {
            const response = await axios.get(this.URL,{
                headers: {
                    'x-apikey': this.api_key
                }
            });
            let xml_content = response.data;
            fs.writeFileSync('survey.xml', xml_content, 'UTF-8');
        }
        catch(myerr) {
            console.error(myerr.response);
        }
        finally {
            console.log('___________________');
            console.log('\n');
            console.log('\n');
        }
    }
    async put() {
        //console.log("Going to put data: " + this.URL);
        const content_to_write = fs.readFileSync('survey.xml', 'utf8');
        try {
            const response = await axios.put(this.URL,{
                filename: 'survey.xml',
                contents: content_to_write

            }, {
                headers: {
                    'x-apikey': this.api_key
                },
            });
            console.log('Upload complete'.green)
        }
        catch(myerr) {


            switch (myerr.response) {
                case undefined:
                    console.error('Please check your internet connection and re-run the program!');

                    return;
                    break;
                default:
                    console.error(myerr.response.statusText.red);
            }
        }
        finally {
            console.log('___________________');
            console.log('\n');
            console.log('\n');


        }
    }
    watch() {
        fs.watchFile('survey.xml', () => {

            console.log("\n\n\n");

            this.number_of_saves++;
            console.log('Saving version ' + this.number_of_saves);
            this.archiveTool.backup();
            console.log("Uploading..." .green);
            this.put();

        });
        console.log("XML Sync started");

    }
    unwatch() {
        fs.unwatchFile('survey.xml');
    }

}
module.exports = APITool;
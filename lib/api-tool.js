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

        this.project_number = props.project_number;
        this.file_path = 'projects/' + props.project_number + '/survey.xml';
        this.archiveTool = new archiveTool('projects/' + this.project_number + '/survey.xml', 'projects/' + this.project_number + '/archive');

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
            fs.writeFileSync(this.file_path, xml_content, 'UTF-8');
        }
        catch(myerr) {


        }
        finally {
            console.log('___________________');
            console.log('\n');
            console.log('\n');
        }
    }
    async put() {
        //console.log("Going to put data: " + this.URL);

        const content_to_write = fs.readFileSync(this.file_path, 'utf8');
        try {
            const response = await axios.put(this.URL,{
                filename: 'survey.xml',
                contents: content_to_write

            }, {
                headers: {
                    'x-apikey': this.api_key
                },
            });
            console.log('Sync complete'.green)
        }
        catch(myerr) {


            switch (myerr.response) {
                case undefined:
                    console.error('Please check your internet connection and re-run the program!');

                    return;
                    break;
                default:
                    if (myerr.response.data.extra !== null) {

                        if (myerr.response.data.extra[0].error !== undefined) {
                            console.error('\n');
                            console.error(('Error at line ' + (myerr.response.data.extra[0].line + 1)).red);
                            console.error(myerr.response.data.extra[0].error.red);
                        }
                        if (myerr.response.data.extra[0].message !== undefined) {
                            console.error('\n');
                            console.log('Error at line ' + myerr.response.data.extra[0].line)
                            console.error(myerr.response.data.extra[0].message.red);
                        }
                    }
                    else {
                        console.error('\n');
                        console.log('Error. Bad content. Check for missing label tags.'.red);

                    }
            }
        }
        finally {
            console.log('___________________');
            console.log('\n');
            console.log('\n');


        }
    }
    watch() {
        fs.watchFile(this.file_path, () => {

            console.log("\n\n\n");

            this.number_of_saves++;
            console.log('Saving version ' + this.number_of_saves);
            this.archiveTool.backup();
            console.log("Sync in progress..." .green);
            this.put();

        });

        console.log("XML Sync started".green);

    }
    unwatch() {
        fs.unwatchFile(this.file_path);
    }

}
module.exports = APITool;

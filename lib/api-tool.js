const axios = require('axios');
const notifier = require('node-notifier');
const archiveTool = require('./archive-tool.js');
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
        if (process.platform !== 'win32') {
            this.file_path = 'project/' + props.project_number + '/survey.xml';
            this.archiveTool = new archiveTool('project/' + this.project_number + '/survey.xml', 'project/' + this.project_number + '/backup');
        }
        else {
            this.file_path = 'project\\' + props.project_number + '\\survey.xml';
            this.archiveTool = new archiveTool('project\\' + this.project_number + '\\survey.xml', 'project\\' + this.project_number + '\\backup');
        }
    }

    async get() {
        // console.log("Going to fetch data from: " + this.URL);
        try {
            const response = await axios.get(this.URL, {
                headers: {
                    'x-apikey': this.api_key,
                },
            });
            const xml_content = response.data;

            // remove auto generated id attributes from xml

            const idMatcher = /<(?:html|select|number|float|text|textarea|radio|checkbox|row|col|choice)[^>]*id="(\w+)"[^>]*>/gs;
            console.log('_____________________');
            console.log(idMatcher);
            console.log('_____________________');

            fs.writeFileSync(this.file_path, xml_content, 'UTF-8');
        }
        catch (myerr) {


        }
        finally {
            console.log('___________________');


        }
    }

    async put() {
        // console.log("Going to put data: " + this.URL);

        const content_to_write = fs.readFileSync(this.file_path, 'utf8');
        try {
            const response = await axios.put(this.URL, {
                filename: 'survey.xml',
                contents: content_to_write,

            }, {
                headers: {
                    'x-apikey': this.api_key,
                },
            });
            // console.log('Sync complete'.green)
        }
        catch (myerr) {


            switch (myerr.response) {
                case undefined:
                    console.error('Please check your internet connection and re-run the program!');
                    notifier.notify(
                     {
                      title: 'Could not connect to Decipher.',
                      message: 'Please check your internet connection and re-run the program!',
                      sound: true,
                     });

                    return;
                default:
                    if (myerr.response.data.extra !== null) {
                        if (myerr.response.data.extra.error !== undefined) {
                            const strMessage = myerr.response.data.extra.error + '.';
                            console.error();
                            // console.error(('Error at line ' + (myerr.response.data.extra[0].line + 1)).red);
                            console.error(strMessage.red);

                            notifier.notify(
                             {
                              title: 'Error found.',
                              message: strMessage,
                              sound: true,
                             });
                             break;
                        }
                        if (myerr.response.data.extra[0].error !== undefined) {
                            console.log(myerr.response.data);
                            const strMessage = 'Error at line ' + (myerr.response.data.extra[0].line + 1) + ' in ' + myerr.response.data.extra[0].tag + '.\n' + myerr.response.data.extra[0].error + '.';
                            console.error();
                            // console.error(('Error at line ' + (myerr.response.data.extra[0].line + 1)).red);
                            console.error(strMessage.red);

                            notifier.notify(
                             {
                              title: 'Error found.',
                              message: strMessage,
                              sound: true,
                             });
                        }
                        if (myerr.response.data.extra[0].message !== undefined) {
                            let errorMessage = 'Error at line ' + (myerr.response.data.extra[0].line + 1);
                            errorMessage += myerr.response.data.extra[0].processed ? ' while processing ' + myerr.response.data.extra[0].processed.trim() + '.\n' : '.\n';
                            errorMessage += myerr.response.data.extra[0].message.toUpperCase();
                            console.error();
                            console.error(errorMessage.red);
                            notifier.notify(
                             {
                              title: 'Error found',
                              message: errorMessage,
                              sound: true,
                             });

                        }
                    }
                    else {
                        console.error();
                        console.error('Error. Bad content. Check for missing label tags.'.red);
                        notifier.notify(
                         {
                          title: 'Error found.',
                          message: 'Error. Bad content. Check for missing label tags.',
                          sound: true,
                         });
                    }
            }
        }
        finally {
            console.log('___________________');




        }
    }

    watch() {
        fs.watchFile(this.file_path, () => {



            this.number_of_saves++;
            console.log('\n');
            console.log('File change detected. Uploading `survey.xml` to Decipher...');
            // console.log('Saving version ' + this.number_of_saves);
            this.archiveTool.backup();
            // console.log("Sync in progress..." .green);
            this.put();

        });




        console.log('XML sync started using survey file ' + this.file_path.green + '\n' + 'Editing this file will automatically upload it to Decipher.');





    }

    async unwatch() {
        fs.unwatchFile(this.file_path);
    }

}
module.exports = APITool;

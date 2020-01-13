'use strict'
const fs = require('fs');
class ArchiveTool {

    constructor(fileToWatch, dirname) {

        console.log('Survey file: ' + fileToWatch);

        if ( !fs.existsSync(dirname) ) {
            fs.mkdirSync(dirname);
        }
        if (!fs.existsSync(dirname)) {
            fs.mkdirSync(dirname);
        }
        this.fileToWatch = fileToWatch;
        this.dirname = dirname;
        this.last_modified = null;

    }

    Test() {
        //this.backup();
    }
    backup() {
        //console.log(this.fileToWatch);
        //let archive_name = this.fileToWatch.split(".")[0] + "_" + this.create_timestamp();

        const archive_name = this.dirname + '/survey' + this.create_timestamp();

        console.log('Archived backup: `' + archive_name + '`');


        fs.createReadStream(this.fileToWatch).pipe(fs.createWriteStream(archive_name));
    }

    create_timestamp() {
        let dt = new Date();
        return dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate() + "_" + dt.getHours() + dt.getMinutes() +  dt.getSeconds() + ".xml";
    }

    readFiles() {
        let ldirname = this.dirname;
        console.log("trying to read the files");
        fs.readdir(ldirname, function(err, files) {
            if (err) {
                console.log("could not scan directory");
                return;
            }
            files.map((file) => {
                console.log("File found: ");
                console.log(file);
                console.log(ldirname + "/" + file)
                fs.stat(ldirname  +"/" + file, function(err, stats) {
                    if (err) {

                        return;
                    }
                    console.log(JSON.stringify(stats));
                    let ctime = stats['ctime'];
                });

            });

        })
    }
}
module.exports = ArchiveTool;

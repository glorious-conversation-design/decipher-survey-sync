'use strict'
const fs = require('fs');
class ArchiveTool {

    constructor(fileToWatch, dirname) {

        if (!fs.existsSync('./archive')) {
            fs.mkdirSync('./archive');
        }
        if (!fs.existsSync('./archive')) {
            fs.mkdirSync('./archive');
        }
        this.fileToWatch = fileToWatch;
        this.dirname = dirname;
        this.last_modified = null;
    }

    Test() {
        //this.backup();
    }
    backup() {
        console.log(this.fileToWatch);
        let archive_name = this.fileToWatch.split(".")[0] + "_" + this.create_timestamp();



        fs.createReadStream(this.fileToWatch).pipe(fs.createWriteStream(this.dirname + "/" + archive_name));
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
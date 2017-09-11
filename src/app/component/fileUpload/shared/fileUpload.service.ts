import { Injectable, Inject } from '@angular/core';

@Injectable()
export class FileUploadService {

    Parse: ParserServer;

    constructor( @Inject("parseManager") parse) {
        this.Parse = parse;
    }

    fileLoad(myfile: File, name: string): Promise<string> {
        var parseFile = new this.Parse.Parse.File(name, myfile);
        let promise = new Promise<string>((resolve, reject) => {
            parseFile.save().then(function (file) {
                resolve(file.url());
            }, function (error) {
                console.log(error)
                reject("");
            });
        })
        return promise;
    }

    deleteFile(fileUrl: string): Promise<any> {
        let promise = new Promise<boolean>((resolve, reject) => {
            this.Parse.Parse.Cloud.run('deleteFile', { fileUrl: fileUrl })
                .then(result => {
                    let info = JSON.parse(result);
                    resolve(info);
                })
        });
        return promise;
    }
}

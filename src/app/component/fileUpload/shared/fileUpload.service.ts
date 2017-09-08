import { Injectable, Inject } from '@angular/core';

@Injectable()
export class FileUploadService {

    Parse: ParserServer;

    constructor( @Inject("parseManager") parse) {
        this.Parse = parse;
    }

    fileLoad(myfile: File, name: string) {
        var parseFile = new this.Parse.Parse.File(name, myfile);
        parseFile.save().then(function () {
            console.log(this);
        }, function (error) {
            console.log(error)
        });
    }
}

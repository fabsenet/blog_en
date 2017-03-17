let recursive = require('recursive-readdir');
let fs = require('fs');
let path = require('path');
let url = require('url');
let http = require('http');
let https = require('https');
let matter = require('gray-matter');
let mkdirp = require('mkdirp');

recursive("./source/", (err, files) => {
    files.forEach(function (file) {

        //if(!file.endsWith("sensitive.md")) return;
        // console.log(file);

        fs.readFile(file, (err, fileContentBuffer) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log("working on " + file);
            let postObject = matter(fileContentBuffer.toString());

            //actual modify
            if (!postObject.data.author) {
                postObject.data.author = "Fabian Wetzel";
            }
            delete postObject.data.id;
            delete postObject.data.comment;

            //sync description (feed) to subtitle (index page)
            if (postObject.data.subtitle && !postObject.data.description) {
                postObject.data.description = postObject.data.subtitle;
            }

            let externalImageRegex = /(http[s]?:\/\/az275061\.vo\.msecnd\.net\/blogmedia[^\)\s]*)/gi;
            let externalImageMatch;
            while (externalImageMatch = externalImageRegex.exec(postObject.content)) {
                //this post has images which should be downloaded
                let externalUrl = externalImageMatch[1];
                let fileDetails = path.parse(file);
                let urlDetails = path.parse(externalUrl)
                let targetFile = path.join(fileDetails.dir, fileDetails.name, urlDetails.base);

                mkdirp(path.join(fileDetails.dir, fileDetails.name), function (err) {

                    // path exists unless there was an error, download can start
                    console.log("found a remote image: " + externalUrl);
                    console.log("going to download it to: " + targetFile);

                    let localImageFile = fs.createWriteStream(targetFile);
                    let protocolDownloader = externalUrl.startsWith("https:") ? https : http;
                    let request = protocolDownloader.get(externalUrl, function (response, err) {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        response.pipe(localImageFile);
                    });

                });

            }

            //write back
            let content = postObject.content;
            let newFileContent = matter.stringify(postObject.content, postObject.data);

            fs.writeFile(file, newFileContent, err => { if (err) console.error(err) });
        });

    }, this);
});
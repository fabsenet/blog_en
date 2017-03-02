var recursive = require('recursive-readdir');
var fs = require('fs');
var path = require('path');
var url = require('url');
var http = require('http');
var https = require('https');
var matter = require('gray-matter');


recursive("./source/_posts/", (err, files) => {
    files.forEach(function (file) {
        // console.log(file);

        fs.readFile(file, (err, fileContentBuffer) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log("working on " + file);
            var postObject = matter(fileContentBuffer.toString());

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

            var externalImageRegex = /[^\)]\]\((http[s]?:\/\/az275061\.vo\.msecnd\.net\/blogmedia[^\)\s]*)/g;
            var externalImageMatch;
            while (externalImageMatch = externalImageRegex.exec(postObject.content)) {
                //this post has images which should be downloaded
                var externalUrl = externalImageMatch[1];
                var fileDetails = path.parse(file);
                var urlDetails = path.parse(externalUrl)
                var targetFile = path.join(fileDetails.dir, fileDetails.name, urlDetails.base);

                console.log("making sure, target dir exists: " + path.join(fileDetails.dir, fileDetails.name));
                fs.mkdirSync(path.join(fileDetails.dir, fileDetails.name));

                console.log("found a remote image: " + externalUrl);
                console.log("going to download it to: " + targetFile);

                var localImageFile = fs.createWriteStream(targetFile);
                var protocolDownloader = externalUrl.startsWith("https:") ? https : http;
                var request = protocolDownloader.get(externalUrl, function (response, err) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    response.pipe(localImageFile);
                });
            }

            //write back
            var content = postObject.content;
            var newFileContent = matter.stringify(postObject.content, postObject.data);

            fs.writeFile(file, newFileContent, err => { if (err) console.error(err) });
        });

    }, this);
});
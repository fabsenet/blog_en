var recursive = require('recursive-readdir');
var fs = require('fs');
// var parser = require('parser-front-matter');
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

            //sync description (feed) to subtitle (index page)
            if (postObject.data.subtitle && !postObject.data.description) {
                postObject.data.description = postObject.data.subtitle;
            }

            //write back
            var content = postObject.content;
            var newFileContent = matter.stringify(postObject.content, postObject.data);

            fs.writeFile(file, newFileContent, err => { if (err) console.error(err) });
        });

    }, this);
});
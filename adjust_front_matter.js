var recursive = require('recursive-readdir');
var fs = require('fs');
// var parser = require('parser-front-matter');
var matter = require('gray-matter');
recursive("./source/_posts/2015/", (err, files) => {
    files.forEach(function (file) {
        // console.log(file);

        fs.readFile(file, (err, fileContentBuffer) => {
            if (err) {
                console.error(err);
                return;
            }

            var postObject = matter(fileContentBuffer.toString());

            //actual modify
            if(!postObject.Author){
                postObject.Author = "Fabian Wetzel";
            }

            //write back
            var content = postObject.content;
            delete postObject.content;
            var newFileContent = matter.stringify(postObject.content,postObject);
            console.log(newFileContent);

            console.log("\n\n#####################################################\n\n\n");
        });

    }, this);
})
const path = require('path');
const fs = require('fs');

function searchInDir(startPath, filter, subfolders=true) {
    if (!fs.existsSync(startPath)) {
        throw Error("No dir ", startPath);
    }
    const files = fs.readdirSync(startPath);
    var collection = []
    for (var i = 0; i < files.length; i++) {
        const filename = path.join(startPath, files[i]);
        if (subfolders && fs.lstatSync(filename).isDirectory()) {
            collection = collection.concat(searchInDir(filename, filter, subfolders))
        } else if (filename.endsWith(filter)) {
            collection.push(filename.replace(startPath + path.sep, ''));
        };
    };
    return collection;
};

module.exports = {
    searchInDir
}
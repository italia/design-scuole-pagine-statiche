const UglifyJS = require("uglify-js");
const {walk} = require('./utils');
const fs = require('fs');


walk('./src/assets/js', (path) => {
    if (path.endsWith('.js')) {
        const minified = UglifyJS.minify(fs.readFileSync(path, 'utf8'))
        if (minified.code) {
            fs.writeFileSync(path.replace("src", "dist"), minified.code)
        }
    }
});

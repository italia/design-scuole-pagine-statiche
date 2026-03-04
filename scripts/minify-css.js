const CleanCSS = require("clean-css");
const {walk} = require('./utils');
const fs = require('fs');


walk('./src/assets/css', (path) => {
    if (path.endsWith('.css')) {
        const minified = new CleanCSS().minify(fs.readFileSync(path, 'utf8'))
        if (minified.styles) {
            fs.writeFileSync(path.replace("src", "dist"), minified.styles)
        }
    }
});

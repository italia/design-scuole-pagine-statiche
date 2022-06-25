const {searchInDir} = require('./utils');
const Mustache = require('mustache');
const fs = require('fs');

const filesToIndex = searchInDir('build', '.html', false);
const renderedIndex = Mustache.render(
    fs.readFileSync('./templates/index_tpl.html', 'utf8'), 
    { 
        links: filesToIndex,
        removePrefix: function () {
            return function (text, render) {
                const page = render(text).replace('scuole-', '').replace('.html', '').replace(/\-/g, ' ')
                return page.charAt(0).toUpperCase() + page.slice(1)
            }
        }
    }
);
fs.writeFileSync('./build/index.html', renderedIndex)
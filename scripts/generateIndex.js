const {searchInDir} = require('./utils');
const Mustache = require('mustache');
const fs = require('fs');

const filesToIndex = searchInDir('build', '.html', false);
const renderedIndex = Mustache.render(fs.readFileSync('./templates/index_tpl.html', 'utf8'), { links: filesToIndex });
fs.writeFileSync('./build/index.html', renderedIndex)
#!/bin/sh


mkdir dist

npm run build

cp -a ./build/. ./dist/

curl -LkSs https://github.com/italia/design-scuole-pagine-statiche/archive/refs/tags/v1.0.0.zip -o dist/1.zip

unzip dist/1.zip -d dist

rm -rf dist/1.zip


curl -LkSs https://raw.githubusercontent.com/italia/design-scuole-pagine-statiche/b69d7db25028923ee8691528471defea6df8d789/package.json -o ./dist/design-scuole-pagine-statiche-1.0.0/package.json

cp -R ./scripts ./dist/design-scuole-pagine-statiche-1.0.0/scripts

cp -R ./templates ./dist/design-scuole-pagine-statiche-1.0.0/templates

cd ./dist/design-scuole-pagine-statiche-1.0.0/ && node scripts/generateIndex.js && cd ../../

cp -R dist/design-scuole-pagine-statiche-1.0.0/build dist/1.x

rm -rf dist/design-scuole-pagine-statiche-1.0.0
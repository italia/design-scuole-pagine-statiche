#!/usr/bin/env sh
set -eu

mkdir -p ./dist/zip
cd ./dist
zip -r ./zip/design-scuole-pagine-statiche.zip . -x zip/*

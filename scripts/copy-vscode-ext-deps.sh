#!/bin/bash

rm -rf vscode-ext/src/ts2uml-libs/web-dist/*
rm -rf vscode-ext/src/ts2uml-libs/models-dist/*
rm -rf vscode-ext/src/ts2uml-libs/core-dist/*

cp -R apps/web/dist/* vscode-ext/src/ts2uml-libs/web-dist/
cp -R packages/models/dist/* vscode-ext/src/ts2uml-libs/models-dist/
cp -R packages/core/dist/* vscode-ext/src/ts2uml-libs/core-dist/

#!/bin/bash

rm -rf vscode-ext/media/index*
rm -rf vscode-ext/src/ts2uml-libs/models-dist/*
rm -rf vscode-ext/src/ts2uml-libs/core-dist/*

cp -R apps/web/dist/assets/* vscode-ext/media/
cp -R packages/models/dist/* vscode-ext/src/ts2uml-libs/models-dist/
cp -R packages/core/dist/* vscode-ext/src/ts2uml-libs/core-dist/

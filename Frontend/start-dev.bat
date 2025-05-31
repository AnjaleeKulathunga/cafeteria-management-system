@echo off
echo Starting development server with compatibility options...
set NODE_OPTIONS=--openssl-legacy-provider
npm start 
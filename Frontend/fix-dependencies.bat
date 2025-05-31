@echo off
echo Cleaning up old dependencies...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json

echo Installing core Node modules first...
call npm install --no-save --no-package-lock shebang-regex

echo Installing dependencies with legacy peer deps...
call npm install --legacy-peer-deps

echo Installing specific missing dependencies...
call npm install --legacy-peer-deps --no-save shebang-regex cross-env

echo Fixing potential issues with npx...
call npm install -g npm@latest

echo Clearing npm cache...
call npm cache clean --force

echo Reinstalling React Scripts...
call npm install react-scripts@5.0.1 --legacy-peer-deps

echo Done!
echo.
echo If you still have issues, try running:
echo npm start -- --openssl-legacy-provider
echo.
pause 
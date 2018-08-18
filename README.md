# visitor-registering
A small electron app you can use to have visitors register themselves
Every entry is saved in a sdlite database

A small validation is done against entries.

There is an admin part where you can query all visits between two dates.

## admin auth
The admin password should be stored in password.txt as a hash256 [see here](https://www.npmjs.com/package/crypto-hashing)
This is not secure and i encourage you to change
The actual password id `password` *Must change*

## Dependencies
This project uses [sql.js](https://github.com/kripken/sql.js/) as a db backend (no binaries needed)
[crypto-hashing](https://www.npmjs.com/package/crypto-hashing) is used for hashing
[electron-reload](https://www.npmjs.com/package/electron-reload) is used in dev for live-reload
[electron-packager](https://github.com/electron-userland/electron-packager) is used to package the project

# Quickstart
Clone the repo & run this command
```
npm install && npm start
```
The app should launch in fullscreen mode

# Deploying

First change productName in package.json

Deploying for windows is straightforward: run
```
npm run package-win
```
Output will be in release-builds/[productName]-win32-ia32
To launch execute [productName].exe

To deploy on other platforms, you will have to create another command with required args
Example:
```javascript
"scripts": {
    "start": "electron .",
    "package-win": "electron-packager . --overwrite --asar=true --platform=win32 --arch=ia32 --prune=true --out=release-builds",
    ...,
    "package-mac": "electron-packager . --overwrite --platform=darwin --arch=x64 --icon=assets/icons/mac/icon.icns --prune=true --out=release-builds"
  },
```

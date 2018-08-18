// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')

const {load} = require("./db/loadDb");
const {save} = require("./db/saveDb");
const {insert} = require("./db/insert");
const {query} = require("./db/query");
const {read} = require("./auth/retrieve");
const {compare} = require("./auth/compare");

const {visits} = require("./template/visits");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

let db = load();

var electron = require('electron')

/*require('electron-reload')(__dirname);

// Enable live reload for Electron too
require('electron-reload')(__dirname, {
    // Note that the path to electron may vary according to the main file
    electron: require(`${__dirname}/node_modules/electron`)
});
*/

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  mainWindow.setMenu(null);
  mainWindow.setFullScreen(true);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
    //save db
    save(db);
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


//handling validation, cleaning and saving
const {ipcMain} = require('electron')

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

function replaceAll(target, search, replacement) {
    return target.split(search).join(replacement);
}

function clean(str){
  return replaceAll(replaceAll(escapeRegExp(str), " ", ""), "-", "").toUpperCase();
}

function validate(str, validators){
  var errs = [];
  for(var i = 0 ; i < validators.length ; ++i){
    var act = validators[i](str);
    if(act != ""){
      errs.push(act);
    }
  }
  return errs;
}

function minLength(length){
  return function(str){
    if(str.length < length){
      return "This field should be at least "+length+" characters";
    }
    return "";
  }
}

function required(){
  return function(str){
    if(str.length == 0){
      return "This field is required";
    }
    return "";
  }
}

function nonNumeric(){
  return function(str){
    for (var i = 0 ; i <= 9; i++) {
      if(str.search(""+i) != -1){
        return "Numeric characters are not allowed in this field";
      }
    }
    return "";
  }
}

var VALIDATORS = {
  fName: [
    required(),
    minLength(3),
    nonNumeric(),
  ],
  nname: [
    required(),
    minLength(3),
    nonNumeric(),
  ],
  plate: [
    required(),
    minLength(3),
  ],
  type: [
  ]
}

ipcMain.on('synchronous-message', function(event, arg){
    if(arg.type == "insert"){  
      //cleaning
      var cleaned = {};
      for(var fieldName in arg){
        cleaned[fieldName] = clean(arg[fieldName]);
      }
      //validation
      var ok = true;
      var errors = {};
      for(var fieldName in arg){
        errors[fieldName] = validate(arg[fieldName], VALIDATORS[fieldName]);
        if(errors[fieldName].length !== 0){
          ok = false;
        }
      }

      if(ok){
        insert(cleaned, db);
      }

      //answering
      event.returnValue = {
        ok: ok,
        errors: errors
      };
    }else if (arg.type == "checkPassword"){
      var ok = false;
      //hashing the password
      var stored = read("./password.txt");
      ok = compare(arg.value, stored);
      event.returnValue = {
        ok: ok,
      }
    }else if (arg.type == "query"){
      var ret = query(arg.start, arg.end, db);
      var final = "";
      if(ret.length > 0 && ret[0].values){
        final = visits(ret[0].values);
      }else{
        final = visits([]);
      }
      event.returnValue = final;
    }
})

const { app, BrowserWindow, Menu, ipcMain } = require("electron");
// const keytar = require("keytar");
// const Store = require("electron-store");
const { storeSettings, restoreSettings } = require("./settings-storage.js");
const { YealinkPhone } = require("./yealink-api.js");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

Menu.setApplicationMenu(null);

let mainWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 420,
    height: 675,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // Get the screen's size
  const screen = require("electron").screen;
  const display = screen.getPrimaryDisplay();
  const { width, height } = display.workAreaSize;

  // Position the window in the bottom right corner of the screen
  mainWindow.setPosition(width - 420, height - 675);

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

app.on("ready", () => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// ------------------------------------------------------------------------

ipcMain.on("store-settings", (event, settings) => {
  storeSettings(settings)
    .then((settings) => {
      event.sender.send("store-settings-success", settings);
    })
    .catch((error) => {
      console.log("store-settings-error", error);
      event.sender.send("store-settings-error", error);
    });
});

ipcMain.on("restore-settings", (event, settings) => {
  restoreSettings(settings)
    .then((settings) => {
      event.sender.send("restore-settings-success", settings);
    })
    .catch((error) => {
      console.log("restore-settings-error", error);
      event.sender.send("restore-settings-error", error);
    });
});

ipcMain.on("request-about", (event) => {
  let data = {
    version: app.getVersion(),
  };

  event.sender.send("request-about-success", data);
});

ipcMain.on("phone-dial", (event, phoneNumber) => {
  const settings = {
    data: {
      phoneIpAddress: "",
      userAccount: "",
      phonePassword: "",
    },
    sensitive_keys: ["phonePassword"],
  };

  restoreSettings(settings)
    .then((settings) => {
      event.sender.send("phone-dial-success", settings);
      const phone = new YealinkPhone(
        settings.data.phoneIpAddress,
        settings.data.userAccount,
        settings.data.phonePassword
      );
      phone.call(phoneNumber);
    })
    .catch((error) => {
      console.log("phone-dial-error", error);
      event.sender.send("phone-dial-error", error);
    });
});

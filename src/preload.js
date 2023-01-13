const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("app", {
  restoreSettings: function (settings) {
    return new Promise((resolve, reject) => {
      ipcRenderer.send("restore-settings", settings);
      ipcRenderer.on("restore-settings-success", (event, settings) => {
        resolve(settings);
      });
      ipcRenderer.on("restore-settings-failed", (event) => {
        reject(event);
      });
    });
  },

  storeSettings: function (settings) {
    return new Promise((resolve, reject) => {
      ipcRenderer.send("store-settings", settings);
      ipcRenderer.on("store-settings-success", (event) => {
        resolve();
      });
      ipcRenderer.on("store-settings-failed", (event) => {
        reject(event);
      });
    });
  },

  phoneControl: {
    dial: (phoneNumber) => ipcRenderer.send("phone-dial", phoneNumber),
  },

  about: function () {
    return new Promise((resolve, reject) => {
      ipcRenderer.send("request-about");
      ipcRenderer.on("request-about-success", (event, data) => {
        resolve(data);
      });
      ipcRenderer.on("request-about-failed", (event) => {
        reject(event);
      });
    });
  },
});

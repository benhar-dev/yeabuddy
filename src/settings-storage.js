const keytar = require("keytar");
const Store = require("electron-store");

async function storeSettings(settings) {
  const store = new Store();

  for (const key in settings.data) {
    if (settings.sensitive_keys.includes(key)) {
      await keytar.setPassword("app", key, settings.data[key]);
    } else {
      store.set(key, settings.data[key]);
    }
  }
}

async function restoreSettings(settings) {
  const store = new Store();
  for (const key in settings.data) {
    if (settings.sensitive_keys.includes(key)) {
      settings.data[key] = await keytar.getPassword("app", key);
    } else {
      settings.data[key] = store.get(key);
    }
  }
  return settings;
}

module.exports = {
  storeSettings,
  restoreSettings,
};

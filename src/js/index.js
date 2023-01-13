$(function () {
  var count = 0;

  // main page
  const backdrop = $("#backdrop");

  // phone pad
  const phoneNumber = $("#phone-number");
  const digits = $(".digit");
  const call = $("#call");
  const backspace = $("#backspace");

  // settings
  const settingsModal = $("#settings-modal");
  const openSettingsBtn = $("#settings-btn");
  const closeSettingsBtn = $("#settings-close-btn");
  const saveSettingsBtn = $("#settings-save-btn");
  const settingPhoneIpAddress = $("#setting-phone-ip-address");
  const settingUserAccount = $("#setting-user-account");
  const settingPhonePassword = $("#setting-phone-password");
  const versionLabel = $("#version");

  app.about().then(function (data) {
    versionLabel.html(`yeabuddy ${data.version}`);
  });

  phoneNumber.keydown(function (event) {
    if (event.which == 13) {
      app.phoneControl.dial(phoneNumber.val());
    }
  });

  digits.on("click", function () {
    var num = $(this).clone().children().remove().end().text();
    if (count < 11) {
      phoneNumber.val(phoneNumber.val() + num.trim());
      count++;
    }
  });

  call.on("click", function () {
    app.phoneControl.dial(phoneNumber.val());
  });

  backspace.on("click", function () {
    phoneNumber.val(phoneNumber.val().slice(0, -1));
    count--;
  });

  function showSettingsPanel() {
    backdrop.css("display", "block");
    settingsModal.css("display", "block");
    settingsModal.addClass("show");
  }
  function hideSettingsPanel() {
    backdrop.css("display", "none");
    settingsModal.css("display", "none");
    settingsModal.removeClass("show");
  }

  window.onclick = function (event) {
    if (event.target == document.getElementById("settings-modal")) {
      hideSettingsPanel();
    }
  };

  openSettingsBtn.on("click", function () {
    const restoreSettings = {
      data: {
        phoneIpAddress: "",
        userAccount: "",
        phonePassword: "",
      },
      sensitive_keys: ["phonePassword"],
    };

    app.restoreSettings(restoreSettings).then(function (restoredSettings) {
      settingPhoneIpAddress.val(restoredSettings.data.phoneIpAddress);
      settingUserAccount.val(restoredSettings.data.userAccount);
      settingPhonePassword.val(restoredSettings.data.phonePassword);
      showSettingsPanel();
    });
  });

  closeSettingsBtn.on("click", function () {
    hideSettingsPanel();
  });

  saveSettingsBtn.on("click", function () {
    const storeSettings = {
      data: {
        phoneIpAddress: settingPhoneIpAddress.val(),
        userAccount: settingUserAccount.val(),
        phonePassword: settingPhonePassword.val(),
      },
      sensitive_keys: ["phonePassword"],
    };

    app.storeSettings(storeSettings).then(function () {
      hideSettingsPanel();
    });
  });
});

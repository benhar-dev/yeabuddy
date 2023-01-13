const { net } = require("electron");
const { formatPhoneNumber } = require("./phone-number-format.js");

class YealinkPhone {
  constructor(ipAddress, userAccount, password) {
    this.ipAddress = ipAddress;
    this.userAccount = userAccount;
    this.password = password;

    this.call = function (phoneNumber) {
      const username = "admin";
      const auth =
        "Basic " +
        new Buffer.from(`${username}:${this.password}`).toString("base64");

      let finalNumber = formatPhoneNumber(phoneNumber);

      const request = net.request({
        method: "GET",
        url: `http://${this.ipAddress}/servlet?key=number=${finalNumber}&outgoing_uri=${this.userAccount}`,
        headers: {
          Authorization: auth,
        },
      });

      request.end();
    };
  }
}

module.exports = {
  YealinkPhone,
};

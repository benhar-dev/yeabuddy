const { parsePhoneNumber } = require("awesome-phonenumber");

function formatPhoneNumber(phoneNumber) {
  // Parse the phone number
  const parsedNumber = parsePhoneNumber(phoneNumber);

  // Check if the number is valid
  if (!parsedNumber.valid) {
    return parsedNumber.number.input.replace(/[\s\(\)\-]/g, "");
  }

  if (
    parsedNumber.regionCode === "AU" &&
    parsedNumber.canBeInternationallyDialled
  ) {
    return parsedNumber.number.national.replace(/[\s\(\)\-]/g, "");
  }

  if (parsedNumber.canBeInternationallyDialled) {
    return parsedNumber.number.international.replace(/[\s\(\)]/g, "");
  }
}

module.exports = {
  formatPhoneNumber,
};

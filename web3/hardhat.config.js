require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: API_URL, // Paste the HTTPS url here
      accounts : [`${PRIVATE_KEY}`] // This is the account Private Key, Details Described Below
    },
  },
};
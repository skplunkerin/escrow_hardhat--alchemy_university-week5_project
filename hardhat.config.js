require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.17",
  paths: {
    artifacts: "./app/src/artifacts",
  },
  networks: {
    goerli: {
      url: process.env.TESTNET_ALCHEMY_RPC_URL,
      accounts: [process.env.TESTNET_WALLET_PRIVATE_KEY],
    },
  },
};

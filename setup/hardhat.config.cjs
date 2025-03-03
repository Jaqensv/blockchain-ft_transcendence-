require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");

module.exports = {
  solidity: "0.8.20",
  networks: {
    fuji: {
      url: "https://ava-testnet.public.blastapi.io/ext/bc/C/rpc",
      accounts: [
        "0x35da811fc499d4a125ee41edfc4359475d7e7b4ddb811ac8bb157a6deec7cbba"
      ]
    }
  },
  etherscan: {
    apiKey: {
      avalancheFujiTestnet: "6JWDJGUQRZNJS2TSKZ96PZ7WDSN7Q22UYG"
    }
  },
  sourcify: {
    enabled: true
  }
};

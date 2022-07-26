const Web3 = require("web3");
require("dotenv").config();

const HDWalletProvider = require("@truffle/hdwallet-provider");
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.ETH_NETWORK));

require("dotenv").config();
const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const abi = require("../contracts/ERC20/ERC20abi");
const bin = require("../contracts/ERC20/ERC20bin");
const contractAddress = require("../contracts/ERC20/ERC20address");
const provider = new HDWalletProvider(
  process.env.SERVER_PRIVATEKEY,
  process.env.ETH_NETWORK
);
const web3 = new Web3(provider);
const ERC20Contract = new web3.eth.Contract(abi, contractAddress);

const ETHToLCN = async (req, res) => {
  const total = await ERC20Contract.methods.totalSupply().call();
  console.log(total);
};

const LCNToETH = async (req, res) => {};

const toOffChain = async (req, res) => {};

const toOnChain = async (req, res) => {};

module.exports = {
  ETHToLCN,
  LCNToETH,
  toOffChain,
  toOnChain,
};

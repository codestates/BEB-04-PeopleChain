const express = require("express");
const wallet = express.Router();
// const Web3 = require("web3");
// require("dotenv").config();
// const fs = require("fs");
// const web3 = new Web3(new Web3.providers.HttpProvider(process.env.ETH_NETWORK));

wallet.route("/ETHToLCN").post(async (req, res) => {});

wallet.route("/LCNToETH").post();

wallet.route("/toOffChain").post();

wallet.route("/toOnChain").post();

// router.get("/getBalance", async (req, res) => {
//   try {
//     const { addr } = req.body;
//     console.log(addr);
//     const balance = await web3.eth.getBalance(addr);
//     console.log(balance);
//     res.status(200).send(balance);
//   } catch (e) {
//     console.log(e);
//     res.status(404).send(e);
//   }
// });

module.exports = wallet;

// {
//     address: '0x96fF79FDF17f10c42D36f6c271031540D4bBcB61',
//     privateKey: '0xdc84bac7f06ccbc00c233dad3599ebf86d5daa3144073c6bb4aac9401e9ddc85',
//     signTransaction: [Function: signTransaction],
//     sign: [Function: sign],
//     encrypt: [Function: encrypt]
//   }

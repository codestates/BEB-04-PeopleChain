const express = require("express");
const auth = express.Router();
const Web3 = require("web3");
require("dotenv").config();
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.ETH_NETWORK));
const { getFirestore } = require("firebase-admin/firestore");
// const db = getFirestore();
const app = require("../app");
// 회원가입 시 user의 db에 address, privateKey를 추가해주는 함수
auth.route("/register").post(async (req, res) => {
	try {
		// const { id } = req.body.id;
		console.log("db is");
		console.log(app);
		console.log(app.db);
		const account = await web3.eth.accounts.create();
		console.log(account);
		console.log(req.body.id);
		await db.collection("User").doc(req.body.id).set({
			// await db.collection("User").doc(id).set({
			address: account.address,
			privateKey: account.privateKey,
		});
		console.log("debug");
		// test();
		// async function test() {
		// 	db.collection("cities").doc("LA2").set({
		// 		name: "Los Angeles 2",
		// 		state: "CA 2",
		// 		country: "USA 2",
		// 	});
		// }
		res.status(200).send(account);
	} catch (error) {
		res.status(404).send(error);
	}
});

module.exports = auth;

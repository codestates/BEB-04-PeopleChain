const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const walletRouter = require("./routes/wallet");
const transactionRouter = require("./routes/transaction");
const app = express();
const fs = require("fs");
const port = 5000;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
	res.send("hello Web3");
});

app.use("/wallet", walletRouter);
app.use("/transaction", transactionRouter);
// catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new Error("Not Found");
	err["status"] = 404;
	next(err);
});

// error handler
app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.json({
		errors: {
			message: err.message,
		},
	});
});

app.listen(port, () => {
	console.log(`Memint Server listening att http://localhost:${port}`);
});

module.exports = app;
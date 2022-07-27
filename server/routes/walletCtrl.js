require("dotenv").config();
const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const abi = require("../contracts/ERC20/ERC20abi");
const contractAddress = require("../contracts/ERC20/ERC20address");
const { SERVER_PRIVATEKEY, SERVER_ADDRESS, ETH_NETWORK } = process.env;
const provider = new HDWalletProvider(SERVER_PRIVATEKEY, ETH_NETWORK);
const web3 = new Web3(provider);
const ERC20Contract = new web3.eth.Contract(abi, contractAddress);
const { toWei, fromWei } = web3.utils;
const myContract = new web3.eth.Contract(abi, contractAddress);

// 원래는 userUID를 통해 계정의 address와 pk를 받아서 tx를 해야하지만, 현재는 firestore가 연결되어있지 않기 때문에 post요청에서 address와 pk를 받아서 진행한다.
// 토큰 가격은 0.001eth === 1LCN으로 고정한 상태로 진행한다.
const ETHToLCN = async (req, res) => {
  const { address, privateKey, ETHAmount } = req.body;
  try {
    // 먼저 거래 전 사용자의 eth 잔액을 확인한다.
    const beforeBalance = await web3.eth.getBalance(address);

    // user의 지갑에서 server지갑으로 ETH Amount만큼 transfer하는 함수
    const getETHFromUser = async () => {
      const signedTx = await web3.eth.accounts.signTransaction(
        {
          to: SERVER_ADDRESS,
          gas: 2000000,
          gasPrice: await web3.eth.getGasPrice(),
          value: toWei(ETHAmount.toString()),
        },
        privateKey
      );

      return await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        async (err, result) => {
          if (err) return res.status(400).send({ error: err });
          return { status: "success", result };
        }
      );
    };

    // server의 account에서 user의 account로, 알맞은 양의 LCN을 지급하는 함수
    const sendLCNToUser = async () => {
      return await myContract.methods
        .transfer(address, toWei((ETHAmount * 1000).toString()))
        .send({
          from: SERVER_ADDRESS,
          gas: 2000000,
          gasPrice: await web3.eth.getGasPrice(),
        });
    };

    // 이더 받는 함수 실행 후, 이어서 LCN을 보내는 함수 실행
    getETHFromUser()
      .then(() => {
        return sendLCNToUser();
      })
      .then(async () => {
        const ETHBalance = await web3.eth.getBalance(address);
        const LCNBalance = await myContract.methods.balanceOf(address).call();
        res.send({
          // 아래 나와있는 balance들은 최종 업데이트 된 결과값이다.
          // 아래 값을 firestore에 저장하고, front에 success 라는 res를 보내면 front에서 정보를 업데이트하여 렌더링하면 될 것 같다.
          ETHBalance: fromWei(ETHBalance.toString()),
          LCNBalance: fromWei(LCNBalance.toString()),
        });
      });
  } catch (error) {
    console.error(error);
  }
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

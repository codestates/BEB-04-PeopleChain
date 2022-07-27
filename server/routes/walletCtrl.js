require("dotenv").config();
const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const abi = require("../contracts/ERC20/ERC20abi");
const contractAddress = require("../contracts/ERC20/ERC20address");
const { SERVER_PRIVATEKEY, SERVER_ADDRESS, ETH_NETWORK } = process.env;
const provider = new HDWalletProvider(SERVER_PRIVATEKEY, ETH_NETWORK);
const web3 = new Web3(provider);
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

const LCNToETH = async (req, res) => {
  const { address, privateKey, tokenAmount } = req.body;

  try {
    // address에 tokenAmount만큼의 LCN이 있는지 확인한다.
    // 정확히 비교하려면 아래 beforeBalance에 toWei를 덮어준 후 비교해야 한다. 그렇지만 지금은 일단 생략.
    const beforeBalance = await myContract.methods.balanceOf(address).call();

    // user의 지갑에서 server지갑으로 tokenAmount만큼 LCN을 transfer하는 함수
    const getLCNFromUser = async () => {
      const gasPrice = await web3.eth.getGasPrice();
      const data = myContract.methods
        .transfer(SERVER_ADDRESS, toWei(tokenAmount.toString()))
        .encodeABI();

      const rawTx = {
        to: contractAddress,
        gas: 2000000,
        gasPrice,
        data,
      };

      const signedTx = await web3.eth.accounts.signTransaction(
        rawTx,
        privateKey
      );

      return await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        async (err, result) => {
          if (err) return res.status(400).send({ error: err });
          return result;
        }
      );
    };

    // server의 account에서 user의 account로, 알맞은 양의 ETH를 지급하는 함수
    const sendETHToUser = async () => {
      const gasPrice = await web3.eth.getGasPrice();
      return await web3.eth.sendTransaction({
        from: SERVER_ADDRESS,
        to: address,
        gas: 2000000,
        gasPrice,
        value: toWei((tokenAmount / 1000).toString()),
      });
    };

    // LCN 받는 함수 실행 후, 이어서 ETH를 보내는 함수 실행
    getLCNFromUser()
      .then(() => {
        return sendETHToUser();
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

const toOffChain = async (req, res) => {
  const { address, privateKey, tokenAmount } = req.body;
  try {
    // address에 tokenAmount만큼의 LCN이 있는지 확인한다.
    const beforeBalance = await myContract.methods.balanceOf(address).call();

    // tokenAmount만큼 user의 계정에서 server의 계정으로 LCN을 transfer해주는 함수
    const getLCNFromUser = async () => {
      const gasPrice = await web3.eth.getGasPrice();
      const data = myContract.methods
        .transfer(SERVER_ADDRESS, toWei(tokenAmount.toString()))
        .encodeABI();

      const rawTx = {
        to: contractAddress,
        gas: 2000000,
        gasPrice,
        data,
      };

      const signedTx = await web3.eth.accounts.signTransaction(
        rawTx,
        privateKey
      );

      return await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        async (err, result) => {
          if (err) return res.status(400).send({ error: err });
          return result;
        }
      );
    };

    getLCNFromUser().then(async () => {
      // 아래 나와있는 balance를 firestore db에 업데이트해준다.
      const LCNBalance = await myContract.methods.balanceOf(address).call();
      res.status(200).send({
        LCNBalance: fromWei(LCNBalance.toString()),
      });
    });
  } catch (error) {
    console.error(error);
  }
};

const toOnChain = async (req, res) => {
  const { address, privateKey, tokenAmount } = req.body;
  // firestore에서 user db에 저장되어있는 토큰의 개수가 tokenAmount이상인지 확인한다.
  // ex) const userInfo = await db.collection('User').doc(id).get()
  // if(userInfo.data().tokenAmount >= tokenAmount) { ... }

  // server의 account에서 user의 account로, 알맞은 양의 LCN을 지급하는 함수
  const sendLCNToUser = async () => {
    return await myContract.methods
      .transfer(address, toWei(tokenAmount.toString()))
      .send({
        from: SERVER_ADDRESS,
        gas: 2000000,
        gasPrice: await web3.eth.getGasPrice(),
      });
  };

  sendLCNToUser().then(async () => {
    const LCNBalance = await myContract.methods.balanceOf(address).call();
    // const afterTokenAmount = 원래 user document의 tokenAmount - 파라미터로 받은 tokenAmount
    // firebase에서 onChainTokenAmount에 LCNBalance 값을, tokenAmount에 afterTokenAmount 값을 업데이트해준 후 front에 res를 보내준다.
  });
};

transferETH = async (req, res) => {
  const { address, privateKey, toAddress, ETHAmount } = req.body;
  // ETHAmount보다 beforeBalance의 값이 크거나 같은지 먼저 체크한다.
  try {
    const beforeBalance = await web3.eth.getBalance(address);

    // user의 address에서 toAddress로 eth를 보내주는 함수
    const sendETHTo = async () => {
      const signedTx = await web3.eth.accounts.signTransaction(
        {
          to: toAddress,
          gas: 2000000,
          gasPrice: await web3.eth.getGasPrice(),
          value: toWei(ETHAmount.toString()),
        },
        privateKey
      );

      await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        async (err, result) => {
          if (err) return res.status(400).send({ error: err });
          return result;
        }
      );
    };

    sendETHTo().then(async () => {
      // 아래 afterBalance 값을 user document의 onChainTokenAmount 값에 업데이트해준다.
      const afterBalance = await web3.eth.getBalance(address);
      res.status(200).send({ balance: fromWei(afterBalance.toString()) });
    });
  } catch (error) {
    res.status(400).send({ error });
  }
};

transferLCN = async (req, res) => {
  const { address, privateKey, toAddress, tokenAmount } = req.body;
  try {
    // tokenAmount보다 beforeBalance의 값이 크거나 같은지 먼저 체크한다.
    const beforeBalance = await myContract.methods.balanceOf(address).call();

    // user의 address에서 toAddress로 LCN을 보내주는 함수
    const sendLCNTo = async () => {
      const data = await myContract.methods
        .transfer(toAddress, toWei(tokenAmount.toString()))
        .encodeABI();

      const rawTx = {
        to: contractAddress,
        gas: 2000000,
        gasPrice: await web3.eth.getGasPrice(),
        data,
      };

      const signedTx = await web3.eth.accounts.signTransaction(
        rawTx,
        privateKey
      );

      return await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        async (err, result) => {
          if (err) return res.status(400).send({ error: err });
          return result;
        }
      );
    };

    sendLCNTo().then(async () => {
      // 아래 afterBalance 값을 firestore에 업데이트해준다.
      const afterBalance = await myContract.methods.balanceOf(address).call();
      res.status(200).send({ balance: fromWei(afterBalance.toString()) });
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  ETHToLCN,
  LCNToETH,
  toOffChain,
  toOnChain,
  transferETH,
  transferLCN,
};

import axios from '.';

export const createWallet = async body => {
  axios.post('/auth/register', body);
};

export const ETHToLCN = async body => {
  axios.post('/wallet/ETHToLCN', body);
};

export const LCNToETH = async body => {
  axios.post('wallet/LCNToETH', body);
};

export const toOffChain = async body => {
  axios.post('wallet/toOffChain', body);
};
export const toOnChain = async body => {
  axios.post('wallet/toOnChain', body);
};

export const transferETH = async body => {
  axios.post('wallet/transferETH', body);
};

export const transferLCN = async body => {
  axios.post('wallet/transferLCN', body);
};

export const getBalance = async body => {
  return axios.post('wallet/getBalance', body).then(result => {
    return result.data;
  });
};

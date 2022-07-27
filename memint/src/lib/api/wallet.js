import axios from '.';

export const createWallet = async body => {
  axios.post('/auth/register', body);
};

export const ETHToLCN = async body => {
  axios.post('/wallet/ETHToLCN', body);
};

import React, { useEffect, useState } from 'react';
import { providers, utils } from 'ethers';
import useNetwork from '../hooks/useNetwork';
import Error from '../components/Error';
import Title from '../components/Title';
import NetworkInfo from '../components/NetworkInfo';

const Home = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [network, setNetwork] = useState<providers.Network>();
  const [account, setAccount] = useState<string>('');
  const [userBalance, setUserBalance] = useState<string>('');

  const [{ web3 }, handleNetwork] = useNetwork();

  useEffect(() => {
    if (typeof web3 === 'undefined') {
      resetFields();
    } else {
      setNetworkAccount(web3);
    }
  }, [web3]);

  const setNetworkAccount = async (web3: providers.Web3Provider) => {
    web3.detectNetwork().then(setNetwork).catch(setErrorMessage);
    const accounts = await web3.listAccounts();
    setAccount(accounts[0]);

    const { _hex } = await web3.getBalance(accounts[0]);
    setUserBalance(utils.formatEther(_hex));
  };

  const resetFields = () => {
    setNetwork(undefined);
    setAccount('');
    setUserBalance('');
    setErrorMessage('');
  };

  const handleConnect = () => {
    handleNetwork().catch(setErrorMessage);
  };

  const propsNetworkInfo = {
    account,
    handleConnect,
    network,
    userBalance,
    web3,
  };

  return (
    <div className="text-center">
      <Title />
      <NetworkInfo {...propsNetworkInfo} />
      <Error errorMessage={errorMessage} />
    </div>
  );
};

export default Home;

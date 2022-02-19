import React, { useEffect, useState } from 'react';
import { providers, utils } from 'ethers';
import useNetwork from '../hooks/useNetwork';
import useToken from '../hooks/useToken';
import Error from '../components/Error';
import Title from '../components/Title';
import NetworkSection from '../components/NetworkSection';
import TokenSection from '../components/TokenSection';

const Home = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoadingToken, setIsLoadingToken] = useState<boolean>(false);
  const [network, setNetwork] = useState<providers.Network>();
  const [account, setAccount] = useState<string>('');
  const [tokenBalance, setTokenBalance] = useState<string>('');
  const [userBalance, setUserBalance] = useState<string>('');

  const [{ web3 }, handleNetwork] = useNetwork();
  const [contractAddress, getBalance] = useToken({ web3 });

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

  const handleGetBalance = async () => {
    setErrorMessage('');
    setIsLoadingToken(true);

    try {
      const fetchedTokenBalance = await getBalance(account);
      setTokenBalance(utils.formatEther(fetchedTokenBalance));
      setIsLoadingToken(false);
    } catch (reason) {
      console.error(reason);
      setErrorMessage('Error when fetching contract');
      setIsLoadingToken(false);
    }
  };

  const propsNetworkSection = {
    account,
    handleConnect,
    network,
    userBalance,
    web3,
  };
  const propsTokenSection = {
    account,
    balance: tokenBalance,
    contractAddress,
    handleGetBalance,
    isLoadingToken,
  };

  return (
    <div className="text-center">
      <Title />
      <NetworkSection {...propsNetworkSection} />
      <TokenSection {...propsTokenSection} />
      <Error errorMessage={errorMessage} />
    </div>
  );
};

export default Home;

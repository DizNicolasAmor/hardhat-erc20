import { ethers, providers } from 'ethers';
import { useEffect, useState } from 'react';
import MyToken from '../artifacts/contracts/MyToken.sol/MyToken.json';
import { CONTRACT_ADDRESSES } from '../utils/constants';

type Web3Props = {
  web3: providers.Web3Provider | undefined;
};

const useToken = ({ web3 }: Web3Props) => {
  const [contractAddress, setContractAddress] = useState<string>(
    CONTRACT_ADDRESSES.LOCAL
  );

  useEffect(() => {
    web3?.detectNetwork().then((network) => {
      const differentAddress: string = CONTRACT_ADDRESSES[network.name];
      if (differentAddress) {
        setContractAddress(differentAddress);
      } else {
        console.warn(`Contract address not found in network: ${network.name}`);
      }
    });
  }, [web3]);

  const getBalance = async (account: string) => {
    if (!web3) return;

    try {
      const contract = new ethers.Contract(contractAddress, MyToken.abi, web3);
      const balance = await contract.balanceOf(account);

      return balance;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return [contractAddress, getBalance] as const;
};

export default useToken;

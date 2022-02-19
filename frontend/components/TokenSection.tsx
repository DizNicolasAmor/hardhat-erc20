import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import CommonSpinner from './CommonSpinner';

interface ITokenSection {
  account: string;
  balance: string;
  contractAddress: string;
  handleGetBalance: () => void;
  isLoadingToken: boolean;
}

const TokenSection: React.FC<ITokenSection> = ({
  account,
  balance,
  contractAddress,
  handleGetBalance,
  isLoadingToken,
}) => {
  const [receiverAddress, setReceiverAddressValue] = useState<string>('');
  const [amountToSend, setAmountToSend] = useState<number>(0);

  const handleReceiverAddress = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event?.target?.value) {
      setReceiverAddressValue(event?.target?.value);
    }
  };
  const handleAmountToSend = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event?.target?.value) {
      setAmountToSend(Number(event?.target?.value));
    }
  };
  const handleSendToken = (): void => {
    // sendToken(receiverAddress, amountToSend);
  };

  return (
    <section aria-labelledby="token-section">
      <h2 id="token-section">Token section</h2>

      <div className="m-3">
        <div>
          <strong>Contract address: </strong>
          {contractAddress}
        </div>
        <div>
          <strong>Your account: </strong>
          {account}
        </div>
        <Button className="m-3" variant="secondary" onClick={handleGetBalance}>
          Get token balance
        </Button>
        {isLoadingToken ? (
          <CommonSpinner />
        ) : (
          <div>
            <strong>Token balance: </strong>
            {balance}
          </div>
        )}
      </div>
      <div className="m-3">
        <label htmlFor="receiver-address"></label>
        <input
          id="receiver-address"
          onChange={handleReceiverAddress}
          placeholder="Receiver address"
          type="text"
        />
        <label htmlFor="amount-to-send"></label>
        <input
          id="amount-to-send"
          onChange={handleAmountToSend}
          placeholder="Amount to send"
          type="number"
        />
        <Button
          className="m-3"
          variant="primary"
          type="button"
          onClick={handleSendToken}
        >
          Send token
        </Button>
      </div>
    </section>
  );
};

export default TokenSection;

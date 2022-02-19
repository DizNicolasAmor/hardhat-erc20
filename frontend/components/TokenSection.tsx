import React from 'react';
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
}) => (
  <section aria-labelledby="token-section">
    <h2 id="token-section">Token section</h2>

    <div className="m-3">
      <div>
        <strong>Contract address: </strong>
        {contractAddress}
      </div>
      <div>
        <strong>Account: </strong>
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
      <input
        type="text"
        // onChange={(e) => setUserAddressValue(e.target.value)}
        placeholder="User address"
      />
      <input
        type="number"
        // onChange={(e) => setAmountValue(Number(e.target.value))}
        placeholder="Amount"
      />
      <Button
        className="m-3"
        variant="primary"
        type="button"
        // onClick={sendToken}
      >
        Send token
      </Button>
    </div>
  </section>
);

export default TokenSection;

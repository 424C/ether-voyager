import React from "react";

const TransactionReceipt = ({ receipt }) => {
  return (
    <div>
      <h2>Transaction Receipt</h2>
      <p>
        <strong>Transaction Hash:</strong> {receipt.transactionHash}
      </p>
      <p>
        <strong>Block Hash:</strong> {receipt.blockHash}
      </p>
      <p>
        <strong>Block Number:</strong> {receipt.blockNumber.toString()}
      </p>
      <p>
        <strong>From:</strong> {receipt.from}
      </p>
      <p>
        <strong>To:</strong> {receipt.to}
      </p>
      <p>
        <strong>Gas Used:</strong> {receipt.gasUsed.toString()}
      </p>
      <p>
        <strong>Status:</strong> {receipt.status ? "Success" : "Failed"}
      </p>
    </div>
  );
};

export default TransactionReceipt;

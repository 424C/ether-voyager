import React from "react";

const TransactionReceipt = ({ receipt }) => {
  // Helper function to safely convert values to string
  const toStringSafe = (value) => {
    if (value?._isBigNumber) {
      // Convert BigNumber to string (decimal format)
      return value.toString(10);
    }
    // Fallback for other types
    return value.toString();
  };

  return (
    <div>
      <h2>Transaction Receipt</h2>
      <p>
        <strong>Transaction Hash:</strong>{" "}
        {toStringSafe(receipt.transactionHash)}
      </p>
      <p>
        <strong>Block Hash:</strong> {toStringSafe(receipt.blockHash)}
      </p>
      <p>
        <strong>Block Number:</strong> {toStringSafe(receipt.blockNumber)}
      </p>
      <p>
        <strong>From:</strong> {toStringSafe(receipt.from)}
      </p>
      <p>
        <strong>To:</strong> {toStringSafe(receipt.to)}
      </p>
      <p>
        <strong>Gas Used:</strong> {toStringSafe(receipt.gasUsed)}
      </p>
      <p>
        <strong>Status:</strong> {receipt.status ? "Success" : "Failed"}
      </p>
    </div>
  );
};

export default TransactionReceipt;

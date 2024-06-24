import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { Utils } from "alchemy-sdk";

const ResultPage = () => {
  const location = useLocation();
  const { result, queryType } = location.state; // Assuming queryType is passed along with the result

  const renderTransactionDetails = (result) => (
    <>
      <h2>Transaction Details</h2>
      <p>
        <strong>From:</strong> {result.from}
      </p>
      <p>
        <strong>To:</strong> {result.to}
      </p>
      <p>
        <strong>Transaction Hash:</strong> {result.transactionHash}
      </p>
      <p>
        <strong>Block Number:</strong> {result.blockNumber}
      </p>
      <p>
        <strong>Amount Transferred:</strong> {result.value} ETH
      </p>
    </>
  );
  const renderBlockDetails = (result) => (
    <>
      <h2>Block Details</h2>
      <p>
        <strong>Block Number:</strong> {result.number}
      </p>
      <p>
        <strong>Timestamp:</strong>{" "}
        {new Date(result.timestamp * 1000).toLocaleString()}
      </p>
      <p>
        <strong>Miner:</strong> {result.miner}
      </p>
      <p>
        <strong>Transactions:</strong> {result.transactions.length}
      </p>
    </>
  );

  const renderAddressDetails = (result) => (
    <>
      <h2>Address Details</h2>
      <p>
        <strong>Address:</strong> {result.address}
      </p>
      <p>
        <strong>Balance:</strong> {Utils.formatEther(result.balance)} ETH
      </p>
    </>
  );

  const renderResult = () => {
    switch (queryType) {
      case "transaction":
        return renderTransactionDetails(result);
      case "block":
        return renderBlockDetails(result);
      case "address":
        return renderAddressDetails(result);
      default:
        return <p>Invalid query type</p>;
    }
  };

  return (
    <div>
      <h1>Result</h1>
      {renderResult()}
    </div>
  );
};

export default ResultPage;

import React, { useEffect, useState } from "react";
import "./footer.css";

const Footer = ({ alchemy }) => {
  const [blockNumber, setBlockNumber] = useState(null);
  const [gasPrices, setGasPrices] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blockNumber = await alchemy.core.getBlockNumber();
        setBlockNumber(blockNumber);

        const gasPriceWei = await alchemy.core.getGasPrice();
        // Convert from wei to gwei
        const gasPriceGwei = gasPriceWei / 1e9;
        setGasPrices(gasPriceGwei);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [alchemy]);

  return (
    <footer className="footer">
      <p>Current Block Number: {blockNumber}</p>
      <p>
        Current Gas Price:{" "}
        {gasPrices ? `${gasPrices.toString()} gwei` : "Loading..."}
      </p>
    </footer>
  );
};

export default Footer;

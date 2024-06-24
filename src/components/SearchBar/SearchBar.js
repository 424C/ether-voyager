import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Utils } from "alchemy-sdk";
import "./search-bar.css";

const SearchBar = ({ alchemy }) => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const determineQueryType = (query) => {
    if (query.startsWith("0x") && query.length === 66) {
      return "transaction";
    } else if (!isNaN(query) && query.length < 10) {
      return "block";
    } else if (query.startsWith("0x") && query.length === 42) {
      return "address";
    } else {
      return "invalid";
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let result;
      // Check if the query is a transaction hash
      if (query.startsWith("0x") && query.length === 66) {
        const receipt = await alchemy.core.getTransactionReceipt(query);
        const transaction = await alchemy.core.getTransaction(query);
        const valueInEth = Utils.formatEther(transaction.value); // Convert the value to ETH
        result = { ...receipt, value: valueInEth }; // Include the value in ETH in the result
      }
      // Check if the query is a block number (numeric and not too large)
      else if (!isNaN(query) && query.length < 10) {
        result = await alchemy.core.getBlock(Number(query));
      }
      // Check if the query is an address
      else if (query.startsWith("0x") && query.length === 42) {
        const balance = await alchemy.core.getBalance(query);
        result = { address: query, balance }; // Include the address in the result
      } else {
        console.error("Invalid query");
        setIsLoading(false);
        // Navigate to ResultPage with an error message
        history.push("/result", {
          error: "Invalid query",
          queryType: "invalid",
        });
        return;
      }

      // Navigate to ResultPage with the result
      history.push("/result", { result, queryType: determineQueryType(query) });
    } catch (error) {
      console.error("Search failed", error);
      setIsLoading(false);
      // Navigate to ResultPage with an error message
      history.push("/result", {
        error: "Search failed",
        queryType: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSearch} className="search-form">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter transaction hash, block number, or address"
        className="search-input"
      />
      <button type="submit" disabled={isLoading} className="search-button">
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  );
};

export default SearchBar;

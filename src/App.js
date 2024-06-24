import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Alchemy, Network } from "alchemy-sdk";

import SearchBar from "./components/SearchBar/SearchBar";
import ResultPage from "./components/ResultPage/ResultPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HeroSection from "./components/HeroSection/HeroSection";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const App = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleExploreNowClick = () => {
    setShowSearchBar(true);
  };

  return (
    <Router>
      <div className="App">
        <Header />
        {!showSearchBar && (
          <HeroSection onExploreNowClick={handleExploreNowClick} />
        )}
        <Route path="/" exact>
          {showSearchBar && (
            <SearchBar
              onSearch={(result) => console.log(result)}
              alchemy={alchemy}
            />
          )}
        </Route>
        <Route path="/result" component={ResultPage} />
        <Footer alchemy={alchemy} />
      </div>
    </Router>
  );
};

export default App;

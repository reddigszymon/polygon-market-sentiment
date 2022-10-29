import React, { useEffect, useState } from "react";
import "./App.css";
import logo from "./images/polygon.png";
import Coin from "./components/Coin";
import { ethers } from "ethers";
import abi from "./abi.json";

const App = () => {
  const [wallet, setWallet] = useState("");
  const [provider, setProvider] = useState();

  const requestAccount = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWallet(accounts[0]);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Metamask not detected!");
    }
  };

  const connectWallet = async () => {
    await requestAccount();

    const prov = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(prov);
  };

  return (
    <div className="app">
      <div className="header">
        <div className="logo">
          <img src={logo} alt="logo" className="logo-image" />
            Sentiment
        </div>
        {wallet == "" && (
          <button className="connect-button" onClick={() => connectWallet()}>
            Connect Wallet{" "}
          </button>
        )}
        {wallet != "" && (
          <button className="connect-button" onClick={() => connectWallet()}>
            {wallet.slice(0, 8) + "..."}
          </button>
        )}
      </div>
      <div className="instructions">
        Where do you think these tokens are going? Up or Down?
      </div>
      <div className="list">
        <Coin token={"BTC"} provider={provider} />
        <Coin token={"ETH"} provider={provider} />
        <Coin token={"LINK"} provider={provider} />
      </div>
    </div>
  );
};

export default App;

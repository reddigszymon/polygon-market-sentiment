import React, { useEffect, useState } from "react";
import "./Coin.css";
import { Button } from "web3uikit";
import abi from "../abi.json";
import { ethers } from "ethers";

function Coin({ perc, setPerc, token }) {
  const [color, setColor] = useState();

  useEffect(() => {
    if (perc < 50) {
      setColor("#c43d08");
    } else {
      setColor("green");
    }
  });

  const grabTokenData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(
      "0x9265676EEd8f5E5a265CC3c446d02f08421E227f",
      abi,
      signer
    );
    // const btcVotes = await contract.getVotes("BTC");
    const owner = await contract.getVotes("BTC");
    console.log(owner);
  };

  return (
    <>
      <div>
        <div className="token">{token}</div>
        <div
          className="circle"
          style={{
            boxShadow: `0 0 20px ${color}`,
          }}
        >
          <div
            className="wave"
            style={{
              marginTop: `${100 - perc}%`,
              boxShadow: `0 0 20px ${color}`,
              backgroundColor: color,
            }}
          ></div>
          <div className="percentage">{perc}%</div>
        </div>
        <div className="votes">
          <Button
            onClick={() => {
              grabTokenData();
            }}
            text="Up"
            theme="primary"
            type="button"
          />
          <Button
            onClick={() => {
              setPerc(perc - 1);
            }}
            color="red"
            text="Down"
            theme="colored"
            type="button"
          />
        </div>
      </div>
    </>
  );
}

export default Coin;

import React, { useEffect, useState } from "react";
import "./Coin.css";
import abi from "../abi.json";
import { ethers } from "ethers";
import { bigInt } from "big-integer";

function Coin({ token }) {
  const [color, setColor] = useState();
  const [perc, setPerc] = useState();

  useEffect(() => {
    if (perc < 50) {
      setColor("#c43d08");
    } else {
      setColor("green");
    }
  }, [perc]);

  const grabTokenData = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://rpc-mumbai.maticvigil.com/"
    );
    const contract = new ethers.Contract(
      "0x9265676EEd8f5E5a265CC3c446d02f08421E227f",
      abi,
      provider
    );
    const owner = await contract.getVotes(token);
    let numUp = parseInt(owner.up._hex);
    let numDown = parseInt(owner.down._hex);
    let percentage = (numUp * 100) / (numUp + numDown);
    setPerc(percentage);
  };

  const voteUp = async () => {};

  useEffect(() => {
    grabTokenData();
  }, []);

  return (
    <>
      {perc != undefined && (
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
            <div className="percentage">{parseInt(perc)}%</div>
          </div>
          <div className="votes">
            <button className="button-up" onClick={() => voteUp()}>
              BULLISH
            </button>
            <button className="button-down">BEARISH</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Coin;

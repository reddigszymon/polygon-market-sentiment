// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

error MarketSentiment__NotOwner();
error MarketSentiment__TickerDoesNotExist();
error MarketSentiment__YouHaveAlreadyVoted();

contract MarketSentiment {
    address private immutable i_owner;
    string[] private tickersArray;

    constructor() {
        i_owner = msg.sender;
    }

    struct ticker {
        bool exists;
        uint256 up;
        uint256 down;
        mapping(address => bool) Voters;
    }

    mapping(string => ticker) Tickers;

    event tickerUpdated(uint256 up, uint256 down, address voter, string ticker);

    function addTicker(string memory _ticker) public {
        if (msg.sender != i_owner) {
            revert MarketSentiment__NotOwner();
        }
        ticker storage newTicker = Tickers[_ticker];
        newTicker.exists = true;
        tickersArray.push(_ticker);
    }

    function vote(string memory _ticker, bool _vote) public {
        ticker storage t = Tickers[_ticker];
        if (!t.exists) {
            revert MarketSentiment__TickerDoesNotExist();
        }
        if (t.Voters[msg.sender]) {
            revert MarketSentiment__YouHaveAlreadyVoted();
        }
        t.Voters[msg.sender] = true;
        if (_vote) {
            t.up++;
        } else {
            t.down++;
        }
        emit tickerUpdated(t.up, t.down, msg.sender, _ticker);
    }

    function getVotes(string memory _ticker)
        public
        view
        returns (uint256 up, uint256 down)
    {
        if (!Tickers[_ticker].exists) {
            revert MarketSentiment__TickerDoesNotExist();
        }
        ticker storage t = Tickers[_ticker];
        return (t.up, t.down);
    }

    function getOwner() public view returns (address) {
        return (i_owner);
    }

    function getTicker(uint256 _index) public view returns (string memory) {
        return (tickersArray[_index]);
    }
}

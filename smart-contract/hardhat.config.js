require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")

const MUMBAI_RPC_URl = process.env.MUMBAI_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.17",
    networks: {
        mumbai: {
            url: MUMBAI_RPC_URl,
            accounts: [PRIVATE_KEY],
        },
    },
    etherscan: {
        apiKey: POLYGONSCAN_API_KEY,
    },
}

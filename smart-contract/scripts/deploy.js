const { ethers, network, run } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

async function main() {
    const marketSentimentFactory = await ethers.getContractFactory(
        "MarketSentiment"
    )
    const marketSentiment = await marketSentimentFactory.deploy()
    await marketSentiment.deployed()
    console.log(`Contract has been deployed at ${marketSentiment.address}`)
    await marketSentiment.deployTransaction.wait(6)

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        try {
            await verify(marketSentiment.address, [])
        } catch (error) {
            console.log(error)
        }
    }
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})

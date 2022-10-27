const { expect, assert } = require("chai")
const { developmentChains } = require("../../helper-hardhat-config")
const { network, ethers } = require("hardhat")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("MarketSentiment", () => {
          let marketSentiment, deployer, user
          beforeEach(async () => {
              const marketSentimentFactory = await ethers.getContractFactory(
                  "MarketSentiment"
              )
              marketSentiment = await marketSentimentFactory.deploy()
              await marketSentiment.deployed()
              let accounts = await ethers.getSigners()
              deployer = accounts[0]
              user = accounts[1]
          })

          describe("constructor", () => {
              it("Should set up the deployer correctly", async () => {
                  let owner = await marketSentiment.getOwner()
                  assert.equal(deployer.address, owner)
              })
          })
          describe("add ticker", () => {
              it("Allows the owner to add new tickers", async () => {
                  await marketSentiment.addTicker("BTC")
                  const newTicker = await marketSentiment.getTicker(0)
                  assert.equal(newTicker, "BTC")
              })
              it("Does not allow other people to add new tickers", async () => {
                  const marketSentimentUser = await marketSentiment.connect(
                      user
                  )
                  await expect(marketSentimentUser.addTicker("BTC")).to.be
                      .reverted
              })
          })
          describe("vote", () => {
              it("Should not allow to vote on tickers that do not exist", async () => {
                  await expect(marketSentiment.vote("BTC", true)).to.be.reverted
              })
              it("Should not allow people to vote multiple times on one ticker", async () => {
                  await marketSentiment.addTicker("BTC")
                  await marketSentiment.vote("BTC", true)
                  await expect(marketSentiment.vote("BTC", true)).to.be.reverted
              })
              it("Correctly updates ticker after voting", async () => {
                  await marketSentiment.addTicker("BTC")
                  await marketSentiment.vote("BTC", true)
                  const numVotes = await marketSentiment.getVotes("BTC")
                  assert.equal(numVotes[0].toString(), "1")
              })
              it("Emits event after voting", async () => {
                  await marketSentiment.addTicker("BTC")
                  await expect(marketSentiment.vote("BTC", true)).to.emit
              })
              it("Allows multiple people to vote", async () => {
                  await marketSentiment.addTicker("BTC")
                  await marketSentiment.vote("BTC", true)
                  const marketSentimentUser = await marketSentiment.connect(
                      user
                  )
                  await marketSentimentUser.vote("BTC", true)
                  const numVotes = await marketSentiment.getVotes("BTC")
                  assert.equal(numVotes[0].toString(), "2")
              })
          })
      })

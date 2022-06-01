const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Simple counter contract", function () {
    
    // global test variables
    let contractFactory;
    let deployed;
    let owner;

    beforeEach(async function() {
        contractFactory = await ethers.getContractFactory("SimpleCounter");
        [owner] = await ethers.getSigners();
        deployed = await contractFactory.deploy();
    });

    it("Should increment", async function () {
        const currentNumber = await deployed.number();
        const expected = parseInt(currentNumber.toString()) + 10;
        await deployed.increment(10);
        expect(await deployed.number()).to.equal(expected);
    });

    it("Should reset", async function () {
        // increment first
        await deployed.increment(100);
        expect(await deployed.number()).to.equal(101);

        await deployed.reset();
        expect(await deployed.number()).to.equal(0);
    });

});
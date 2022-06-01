const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Fish NFT contract", function () {
    
    // global test variables
    let contractFactory;
    let deployed;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function() {
        contractFactory = await ethers.getContractFactory("FishNFT");
        [owner, addr1, addr2] = await ethers.getSigners();
        deployed = await contractFactory.deploy();
    });

    it("Should mint fish", async function () {
        const tx = await deployed.connect(addr1).mintFish("Guppy", {
            value: ethers.utils.parseEther("0.001")
        });

        await expect(tx).to.emit(deployed, 'MintFish').withArgs(addr1.address, "Guppy", 1);
        
        let [_species, _tokenId, _level] = (await deployed.getFishesOwned(addr1.address))[0];
        expect(_species).to.equal("Guppy");
        expect(_tokenId).to.equal(1);
        expect(_level).to.equal(1);
    });

    it("Should revert when minting fish without sufficient payment", async function () {
        await expect(deployed.connect(addr1).mintFish("Guppy")).to.be.reverted;
    });

    it("Should level up fish", async function () {
        await deployed.connect(addr1).mintFish("Guppy", {
            value: ethers.utils.parseEther("0.001")
        });

        const tx = await deployed.connect(addr1).levelUp(1, {
            value: ethers.utils.parseEther("0.002")
        });

        // token id: 1, level: 2
        await expect(tx).to.emit(deployed, 'LevelUp').withArgs(addr1.address, 1, 2);

        let [_species, _tokenId, _level] = (await deployed.getFishesOwned(addr1.address))[0];
        expect(_species).to.equal("Guppy");
        expect(_tokenId).to.equal(1);
        expect(_level).to.equal(2);
    });

    it("Should revert when levelling up fish without sufficient amount", async function () {
        await deployed.connect(addr1).mintFish("Guppy", {
            value: ethers.utils.parseEther("0.001")
        });

        await expect(deployed.connect(addr1).levelUp(1)).to.be.reverted;
    });

    it("Should revert if level up fish not token owner", async function () {
        await deployed.connect(addr1).mintFish("Guppy", {
            value: ethers.utils.parseEther("0.001")
        });

        await expect(deployed.connect(addr2).levelUp(1)).to.be.reverted;
    });
});
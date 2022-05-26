// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
    const FishNFTContract = await hre.ethers.getContractFactory("FishNFT");
    const contract = await FishNFTContract.deploy();

    await contract.deployed();

    console.log("FishNFT deployed to: ", contract.address);
    console.log(JSON.stringify(contract, "", 4));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});

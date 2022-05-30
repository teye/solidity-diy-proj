# solidity-diy-proj
A DIY project to learn Solidity

## Interacting with Smart Contracts via Hardhat

Referenced from [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting)

```
npx hardhat console --network localhost

const Fish = await ethers.getContractFactory('FishNFT');

// attach object to deployed contract
const fish = await Fish.attach('0x5FbDB2315678afecb367f032d93F642f64180aa3');

// get fishes[0] information
await fish.fishes(0);
```
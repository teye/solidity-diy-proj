# solidity-diy-proj
A DIY project to learn Solidity.

There are 2 examples: (1) Simple Counter and (2) NFT Example.

The project uses Metamask and Hardhat. Please install Metamask on your browser.

## Simple Counter

A short contract that increments a number and resets the number.

The goal of this example is to understand how to invoke ethereum contract calls and fetch the updated information and displayed it on frontend.

### Simple Counter - How to Setup

Run a local hardhat node. It should run on **`localhost:8485`**

```
cd contracts
npx hardhat node
```

Open another terminal in the same folder and deploy the contract:

```
npx hardhat run --network localhost scripts/deploy-simple.js
```

Note down the contract address.

Now, we need to update the frontend to read the newly deployed contract.

```
cd dapp
```

Create a `.env` file with these parameters:

```
REACT_APP_SIMPLE_COUNTER_CONTRACT=""
REACT_APP_FISH_NFT_CONTRACT=""
```

Some parameters would be used by other examples.

Replace `REACT_APP_SIMPLE_COUNTER_CONTRACT` with the deployed contract addressm leave `REACT_APP_FISH_NFT_CONTRACT` as it is.

e.g.
```
REACT_APP_SIMPLE_COUNTER_CONTRACT=0x5fbdb2315678afecb367f032d93f642f64180aa3
REACT_APP_FISH_NFT_CONTRACT=""
```

Now run the frontend app. Remember to keep the hardhat node running!

```
cd dapp
npm run start
```

Browse to http://localhost:3000 and click on "Counter Example".

Configure your Metamask to connect to the hardhat node at localhost:8485. Change the `chainID` to **`31337`**.

Read the instructions on the page to meddle with the contract.

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
# Solidity Self-Study Project
A DIY project to learn Solidity.

There are 2 examples: (1) Simple Counter and (2) NFT Example.

The project uses Metamask and Hardhat. 

Please install Metamask on your browser.

## Simple Counter

A short contract that increments a number and resets the number.

The goal of this example is to understand how to invoke ethereum contract calls and fetch the updated information and display it on frontend.

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

Replace `REACT_APP_SIMPLE_COUNTER_CONTRACT` with the deployed contract address. 

Leave `REACT_APP_FISH_NFT_CONTRACT` unchanged.

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

Configure your Metamask to connect to the hardhat node at **`localhost:8485`**. Change the `chainID` to **`31337`**.

Read the instructions on the page to meddle with the contract.

**Note**: Reset your account nonce if Metamask complains about nonce issues.

## NFT Example

A contract based on ERC-721 and ERC-721 extensions specifications.

The goal of this example is to learn how ethereum defines a NFT, how to deploy, mint and interact with the contract.

On the frontend, users can:
- mint a NFT
- level up a NFT
- view the list of NFTs that the wallet owns

### NFT Example - How to Setup

Run a local hardhat node. It should run on **`localhost:8485`**

```
cd contracts
npx hardhat node
```

Open another terminal in the same folder and deploy the contract:

```
npx hardhat run --network localhost scripts/deploy-fish.js
```

Note down the contract address.

Now, we need to update the frontend to read the newly deployed contract.

```
cd dapp
```

Create a `.env` file with these parameters *(or reuse the `.env` file if you have previously deployed the Simple Counter Contract)*:

```
REACT_APP_SIMPLE_COUNTER_CONTRACT=""
REACT_APP_FISH_NFT_CONTRACT=""
```

Some parameters would be used by other examples.

Replace `REACT_APP_FISH_NFT_CONTRACT` with the deployed contract address. 

Leave `REACT_APP_SIMPLE_COUNTER_CONTRACT` unchanged.

e.g.
```
REACT_APP_SIMPLE_COUNTER_CONTRACT=<leave_it>
REACT_APP_FISH_NFT_CONTRACT=0x5fbdb2315678afecb367f032d93f642f64180aa3
```

Now run the frontend app. Remember to keep the hardhat node running!

```
cd dapp
npm run start
```

Browse to http://localhost:3000 and click on "NFT Example".

Configure your Metamask to connect to the hardhat node at **`localhost:8485`**. Change the `chainID` to **`31337`**.

Read the instructions on the page to meddle with the contract.

**Note**: Reset your account nonce if Metamask complains about nonce issues.


## Testing Smart Contracts

Unit tests cases are written for the contracts used in this project.

Run the tests by executing the following:
```
cd contracts
npx hardhat test
npx hardhat test --network hardhat ./test/simple-counter-test.js
npx hardhat test --network hardhat ./test/fish-nft-test.js
```

## Interacting with Smart Contracts via Hardhat

Referenced from [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting)

```
npx hardhat console --network localhost

const Fish = await ethers.getContractFactory('FishNFT');

>> undefined

// attach object to deployed contract
const fish = await Fish.attach('0x5FbDB2315678afecb367f032d93F642f64180aa3');

>> undefined

// mint fish
await fish.mintFish("GUPPY", {value: ethers.utils.parseEther('0.01')});

// get fishes[0] information
await fish.fishes(0);
```

## Resources

The following are links to some resources that help me to come up with these examples.

- [https://dev.to/yakult/a-tutorial-build-dapp-with-hardhat-react-and-ethersjs-1gmi](https://dev.to/yakult/a-tutorial-build-dapp-with-hardhat-react-and-ethersjs-1gmi)
- [https://cryptozombies.io/en/course](https://cryptozombies.io/en/course)
- [https://docs.moonbeam.network/builders/build/eth-api/verify-contracts/block-explorers/](https://docs.moonbeam.network/builders/build/eth-api/verify-contracts/block-explorers/)

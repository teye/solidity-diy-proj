import { useState } from 'react';
import { ethers } from 'ethers';
import { Contracts } from "../utils/utils";
import { FISHNFTABI } from "../abi/fishNFTABI";


let provider;

/**
 * ERC-721 example
 * Users can mint a Fish NFT and see the list of fishes that he/she owns
 * 
 */
function NFTExample() {
    const [currentAccount, setCurrentAccount] = useState("");
    const speciesList = ["GUPPY", "GOLDFISH", "SHARK"];

    const onConnectWallet = async () => {
        if (!window.ethereum) {
          console.log("Please install Metamask");
          return;
        }
    
        provider = new ethers.providers.Web3Provider(window.ethereum);
        
        // MetaMask requires requesting permission to connect users accounts
        try {
            const accounts = await provider.send("eth_requestAccounts", []);
            setCurrentAccount(accounts[0]);
        } catch(e) {
            console.error(e);
        }
    }

    /**
     * retrieve a random species name for onMint
     * if array is empty, return the default species
     * for proper randomness should use proper secure randomness or do it via oracle in contract level
     * @returns species name
     */
    const getRandomSpecies = () => {
        if (speciesList.length === 0) {
            // default species
            return "GUPPY";
        }
        const min = 0;
        const max = speciesList.length - 1;
        const randomIndex = Math.floor(Math.random() * (max - min + 1) + min); // inclusive of min and max
        return speciesList[randomIndex];
    }

    /**
     * call mintFish()
     * each minting costs 0.001 eth
     */
    const onMint = async () => {
        await onConnectWallet();
        const signer = provider.getSigner();
        const deployed = new ethers.Contract(Contracts.FISH_NFT_CONTRACT, FISHNFTABI, signer);
        console.log("deployed: ", deployed);

        try {
            const randomSpecies = getRandomSpecies();

            const tx = await deployed.mintFish(randomSpecies, {
                value: ethers.utils.parseEther("0.001")
            });
            console.log("tx: ", tx.hash);
        } catch (e) {
            console.error(e);
        }
    }

    /**
     * call levelUp()
     * each levelling costs 0.002 eth
     * require tokenId
     */
    const onLevelUp = async () => {
        await onConnectWallet();
        const signer = provider.getSigner();
        const deployed = new ethers.Contract(Contracts.FISH_NFT_CONTRACT, FISHNFTABI, signer);
        console.log("deployed: ", deployed);

        try {
            const tx = await deployed.levelUp(1, {
                value: ethers.utils.parseEther("0.002")
            });
    
            console.log("tx: ", tx.hash);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="container mx-auto">
            <h1 className="font-semibold text-3xl my-4">"What The Fish": ERC-721 Example</h1>
            <button 
                className="bg-blue-500 font-semibold text-white text-sm py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                onClick={onConnectWallet}>
                Connect to Metamask
            </button>
            {
                currentAccount &&
                <div>Wallet: {currentAccount}</div>
            }
            {/* contract buttons */}
            <div className="mt-4">
                <button 
                    className="bg-transparent hover:bg-blue-500 text-blue-700 text-sm font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-4"
                    onClick={() => onMint()}>
                    Mint a Fish
                </button>
                <button 
                    className="bg-transparent hover:bg-blue-500 text-blue-700 text-sm font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-4"
                    onClick={() => onLevelUp()}>
                    Level up a Fish
                </button>
            </div>
        </div>
    );
}

export default NFTExample;
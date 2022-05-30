import { useEffect, useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { Contracts } from "../utils/utils";
import { FISHNFTABI } from "../abi/fishNFTABI";
import toast from 'react-hot-toast';
import Card from './card';


let provider;

/**
 * ERC-721 example
 * Users can mint a Fish NFT and see the list of fishes that he/she owns
 * 
 */
function NFTExample() {
    const [currentAccount, setCurrentAccount] = useState("");

    /**
     * list of Fish struct that user owns
     * [
     *   {
     *     species:
     *     tokenId:
     *     level:
     *   }
     * ]
     */
    const [ownedFishList, setOwnedFishList] = useState([]);
    const speciesList = ["GUPPY", "GOLDFISH", "SHARK"];

    const [loading, setLoading] = useState(false);

    /**
     * delay time on purpose, e.g. to simulate loading
     */
    const delay = ms => new Promise(res => setTimeout(res, ms));

    const onConnectWallet = async () => {
        if (!window.ethereum) {
          console.log("Please install Metamask");
          toast.error("Please install Metamask");
          return;
        }
    
        provider = new ethers.providers.Web3Provider(window.ethereum);
        
        // MetaMask requires requesting permission to connect users accounts
        try {
            const accounts = await provider.send("eth_requestAccounts", []);
            if (accounts.length > 0 && currentAccount !== accounts[0]) {
                setCurrentAccount(accounts[0]);
            }
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

    // diplay notifications
    const notify = (event, txHash) => {
        toast(
            <div className='h-full text-[0.8em] text-white'>
                <div className="font-semibold tracking-wide">{event} Submitted!</div>
                <div className='break-all pt-1'><span className='font-semibold'>Tx:</span> {txHash}</div>
            </div>,
            {
                style: {
                    color: '#ffffaa',
                    backgroundColor: '#171717'
                },
                duration: 8000,
            }
        );
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
            notify("Mint", tx.hash)
        } catch (e) {
            console.error(e);
        }
    }

    /**
     * call levelUp()
     * each levelling costs 0.002 eth
     * require tokenId
     * @param string tokenId
     */
    const onLevelUp = async (tokenId) => {
        await onConnectWallet();
        const signer = provider.getSigner();
        const deployed = new ethers.Contract(Contracts.FISH_NFT_CONTRACT, FISHNFTABI, signer);
        console.log("deployed: ", deployed);

        try {
            const tx = await deployed.levelUp(
                tokenId.toString(), {
                value: ethers.utils.parseEther("0.002")
            });
    
            console.log("tx: ", tx.hash);
            notify("Level Up", tx.hash)
        } catch (e) {
            console.error(e);
        }
    }

    const onFetchOwnedNFT = useCallback(async () => {
        await onConnectWallet();

        if (!currentAccount) {
            return;
        }

        // simluate loading
        setLoading(true);
        await delay(2000);

        const deployed = new ethers.Contract(Contracts.FISH_NFT_CONTRACT, FISHNFTABI, provider);

        console.log(deployed);

        let result = [];

        try {
            const fishList = await deployed.getFishesOwned(currentAccount);

            for (const fish of fishList) {
                console.log("fish: ", fish);
                result.push({
                    species: fish.species,
                    tokenId: fish.tokenId.toString(),
                    level: fish.level,
                })
            }

            setOwnedFishList([...result]);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }

        // eslint-disable-next-line
    }, [currentAccount]);

    useEffect(() => {
        // update owned fish
        onFetchOwnedNFT();
    }, [onFetchOwnedNFT]);

    useEffect(() => {
        // listen for contract events
        if (!window.ethereum) return;

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        
        const fishContract = new ethers.Contract(Contracts.FISH_NFT_CONTRACT, FISHNFTABI, provider);

        // contract event must be listened after the current block
        // https://github.com/ethers-io/ethers.js/issues/2310

        fishContract.on("LevelUp", (from, tokenId, level) => {
            console.log(`levelup event detected - sender: ${from}, token id: ${tokenId}, new level: ${level}`);
            onFetchOwnedNFT();
        });

        fishContract.on("MintFish", (from, species, tokenId) => {
            console.log(`mint event detected - sender: ${from}, species: ${species}, token id: ${tokenId}`);
            onFetchOwnedNFT();
        });

        return () => {
            fishContract.removeListener("LevelUp");
            fishContract.removeListener("MintFish");
        }

    }, [onFetchOwnedNFT]);

    return (
        <div className="container mx-auto">
            <h1 className="font-semibold text-3xl my-4">"What The Fish": ERC-721 Example</h1>
            <h2 className="font-semibold text-lg text-blue-800 mb-2">Instructions</h2>
            <p>This is a ERC-721 contract about fishes! There are three types of fishes to mint; "Guppy", "Goldfish" and "Shark". You can train each of the fish to increase their levels!</p>
            <ol className="list-decimal mt-4 ml-4">
                <li>Click on "Connect to Metamask" and view your fishes.</li>
                <li>Click on "Mint a Fish" to mint a fish to your wallet.</li>
                <li>Click on "Train" to level up your fish!</li>
                <li>Mint more and train more!</li>
            </ol>
            <p className="mt-4 mb-8">Note: <em>If you change account on Metamask, click on "Connect to Metamask" to reload.</em></p>
            <button 
                className="bg-blue-500 font-semibold text-white text-sm py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                onClick={onConnectWallet}>
                Connect to Metamask
            </button>
            {
                currentAccount &&
                <div>
                    <div className='my-4'><strong>Wallet</strong>: {currentAccount}</div>
                    <div className='mb-4'>
                        <strong>No. of fishes you owned</strong>: {ownedFishList.length}
                    </div>
                </div>
            }
            {/* contract buttons */}
            <div className="mt-4 mb-8">
                {
                    !currentAccount ?
                    <p>Please connect your Metamask to mint a fish.</p>
                    :
                    <button 
                        className="bg-transparent hover:bg-blue-500 text-blue-700 text-sm font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-4"
                        onClick={() => onMint()}>
                        Mint a Fish
                    </button>
                }
            </div>
            <div className="font-semibold text-lg text-blue-800 mb-2">My Aquarium</div>
            {
                loading ?
                
                <div>Fetching fishes...</div>
                
                :

                ownedFishList.length === 0 ?
                <div>No fishes found for current wallet.</div>
                
                :
                <div className='grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8 mb-8'>
                    {
                        ownedFishList.map((item, index) => {
                            return (
                                <Card 
                                    key={index}
                                    species={item.species}
                                    tokenId={item.tokenId}
                                    level={item.level}
                                    onLevelUp={onLevelUp}
                                />
                            )
                        })
                    }
                </div>

            }
        </div>
    );
}

export default NFTExample;
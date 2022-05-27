import Navbar from "./navbar";
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { SimpleCounterABI as myABI } from '../abi/simpleCounterABI';
import { Contracts } from "../utils/utils"; 


let provider;

function SimpleCounterExample() {
    const [balance, setBalance] = useState("0");
    const [number, setNumber] = useState("0");
    const [currentAccount, setCurrentAccount] = useState("");
    const [chainId, setChainId] = useState(0);
    const [chainName, setChainName] = useState("");

    const onConnectWallet = () => {
        if (!window.ethereum) {
          console.log("Please install Metamask");
          return;
        }
    
        provider = new ethers.providers.Web3Provider(window.ethereum);
        
        // MetaMask requires requesting permission to connect users accounts
        // await provider.send("eth_requestAccounts", []);
        provider.send("eth_requestAccounts", [])
          .then((accounts) => {
            if (accounts.length > 0) {
              setCurrentAccount(accounts[0]);
            }
          })
          .catch((e) => console.error(e));
    }

    const onIncrement = async () => {
        const signer = provider.getSigner();
        
        console.log("signer: ", signer.getAddress());
    
        const deployed = new ethers.Contract(Contracts.COUNTER_CONTRACT, myABI, signer);
        console.log("deployed: ", deployed);
    
        await deployed.increment(1);
    }
    
    const onGetNumber = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const deployed = new ethers.Contract(Contracts.COUNTER_CONTRACT, myABI, provider);

        deployed.number()
            .then((result) => {
            setNumber(result.toString());
            })
            .catch((e) => console.error(e));
    }
    
    const onResetNumber = async () => {
        const signer = provider.getSigner();
        
        console.log("signer: ", signer.getAddress());
    
        const deployed = new ethers.Contract(Contracts.COUNTER_CONTRACT, myABI, signer);
        console.log("deployed: ", deployed);
    
        await deployed.reset();
    }

    useEffect(() => {
        // update balance and network
        if (!currentAccount || !ethers.utils.isAddress(currentAccount)) {
          return;
        }
    
        if (!window.ethereum || !provider) {
          return;
        }
    
        provider.getBalance(currentAccount)
          .then((result) => {
            setBalance(ethers.utils.formatEther(result));
          });
        
        provider.getNetwork()
          .then((result)=> {
            console.log(result);
            setChainId(result.chainId);
            setChainName(result.name);
          });
    }, [currentAccount]);

    return (
        <div className="max-w-full">
            <Navbar/>
            <div className="container mx-auto">
                <h1 className="font-semibold text-3xl my-4">Counter Example</h1>
                <h2 className="font-semibold text-lg text-blue-800 mb-2">Instructions</h2>
                <p>This is a simple contract that does incrementing and reseting of numbers.</p>
                <p>Users connect with ther Metamask to retrieve their account information and interact with the contract.</p>
                <ol className="list-decimal mt-4 ml-4">
                  <li>Click on "Connect to Metamask" and view your account information.</li>
                  <li>Click on "Get Number" to fetch the current number from the contract.</li>
                  <li>Click on "Increment" to add "1" to the current number.</li>
                  <li>Click on "Reset" to reset the number to 1.</li>
                  <li>If you change account on Metamask, click on "Connect to Metamask" to reload.</li>
                </ol>

                <div className="mt-8 mb-8">
                    <h3 className="font-bold text-[1rem] text-blue-800 uppercase mb-2">Account Info</h3>
                    <div className="mb-4">
                      <button 
                          className="bg-blue-500 font-semibold text-white text-sm py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                          onClick={onConnectWallet}>
                          Connect to Metamask
                      </button>
                    </div>
                    {
                      currentAccount ?
                      <div>
                        <p><strong>Account</strong>: {currentAccount}</p>
                        <p><strong>Balance</strong>: {balance} ETH</p>
                        <p><strong>Chain ID</strong>: {chainId}</p>
                        <p><strong>Chain</strong>: {chainName}</p>
                      </div>
                      :
                      <span className="text-gray-600">No account found. Click on "Connect to Metamask."</span>
                    }
                </div>

                <div>
                  <h3 className="font-bold text-[1rem] text-blue-800 uppercase mb-2">Simple Counter Contract</h3>
                  <p>Click on "Connect to Metamask" to connect your wallet before clicking on any of these buttons.</p>
                  <p className="mt-4"><strong>Contract Address</strong>: {Contracts.COUNTER_CONTRACT}</p>
                  <p><strong>Number</strong>: {number}</p>
                  <div className="mt-4">
                    {/* contract buttons */}
                    <button 
                        className="bg-transparent hover:bg-blue-500 text-blue-700 text-sm font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-4"
                        onClick={() => onIncrement()}>
                        Increment
                    </button>
                    <button 
                        className="bg-transparent hover:bg-blue-500 text-blue-700 text-sm font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-4"
                        onClick={() => onGetNumber()}>
                        Get Number
                    </button>
                    <button 
                        className="bg-red-500 text-white text-sm font-semibold py-2 px-4 border border-red-500 rounded"
                        onClick={() => onResetNumber()}>
                        Reset
                    </button>
                  </div>
                </div>
            </div>
        </div>
    );
}

export default SimpleCounterExample;
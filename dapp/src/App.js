import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './App.css';
import Navbar from './components/navbar';
import { SimpleCounterABI as myABI } from './abi/simpleCounterABI';
import { Contracts } from "./utils/utils"; 

let provider;

function App() {
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
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    
    console.log("signer: ", signer.getAddress());

    const deployed = new ethers.Contract(Contracts.COUNTER_CONTRACT, myABI, signer);
    console.log("deployed: ", deployed);

    await deployed.increment(1);
  }

  const onGetNumber = async () => {
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    const deployed = new ethers.Contract(Contracts.COUNTER_CONTRACT, myABI, provider);

    deployed.number()
      .then((result) => {
        setNumber(result.toString());
      })
      .catch((e) => console.error(e));
  }

  const onResetNumber = async () => {
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // await provider.send("eth_requestAccounts", []);
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

    // const provider = new ethers.providers.Web3Provider(window.ethereum);

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
      <Navbar />
      <div>
        <div className="container mx-auto">
          <div className="flex flex-col mt-8 items-center">
            <div className="bg-white rounded-xl shadow-lg h-24 lg:min-w-[60rem] md:min-w-[40rem] p-4 my-4 border border-slate-300">
              <h2 className="font-semibold text-base text-slate-900">Project 1</h2>
              <p className="text-sm text-gray-700 mt-2">Simple counter example to learn how to call ethereum contracts and display them on frontend.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg h-24 lg:min-w-[60rem] md:min-w-[40rem] p-4 my-4 border border-slate-300">
              <h2 className="font-semibold text-base text-slate-900">Project 2</h2>
              <p className="text-sm text-gray-700 mt-2">ERC-721 example to learn about ethereum NFT</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg h-24 lg:min-w-[60rem] md:min-w-[40rem] p-4 my-4 border border-slate-300">
              <h2 className="font-semibold text-base text-slate-900">Project 3</h2>
              <p className="text-sm text-gray-700 mt-2">NFT marketplace example to learn about contract to contract interactions.</p>
            </div>
          </div>
          <button 
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            onClick={onConnectWallet}>
            Connect to Metamask
          </button>
          {
            currentAccount &&
            <div>
              <p>Account: {currentAccount}</p>
              <p>Balance: {balance} ETH</p>
              <p>Chain ID: {chainId}</p>
              <p>Chain: {chainName}</p>
            </div>
          }
          <p><strong>Simple Counter Contract</strong>: {Contracts.COUNTER_CONTRACT}</p>
          <p><strong>Number: {number}</strong></p>
          <button 
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            onClick={() => onIncrement()}>
            Increment
          </button>
          <button 
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            onClick={() => onGetNumber()}>
            Get Number
          </button>
          <button 
            className="bg-red-500 text-white font-semibold py-2 px-4 border border-red-500 rounded"
            onClick={() => onResetNumber()}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

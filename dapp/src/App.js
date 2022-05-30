import { Link } from 'react-router-dom';
import './App.css';


function App() {
  return (
    <div>
      <div className="container mx-auto">
        <div className="flex flex-col mt-8 justify-center mx-auto w-fit">
          <Link to={"/project1"} className="main-div-hover">
            <div className="bg-white rounded-xl shadow-lg p-10 my-4 border border-slate-300 w-full">
              <h2 className="font-medium text-base text-slate-900">Project 1: Simple Counter</h2>
              <p className="text-sm text-gray-700 mt-2">Simple counter example to learn how to call ethereum contracts and display them on frontend.</p>
            </div>
          </Link>
          <Link to={"/project2"} className="main-div-hover">
            <div className="grow bg-white rounded-xl shadow-lg p-10 my-4 border border-slate-300 w-full">
              <h2 className="font-medium text-base text-slate-900">Project 2: NFT</h2>
              <p className="text-sm text-gray-700 mt-2">ERC-721 example to learn about ethereum NFT.</p>
            </div>
          </Link>
          <Link to={"/project3"} className="main-div-hover">
            <div className="bg-white rounded-xl shadow-lg p-10 my-4 border border-slate-300 w-full">
              <h2 className="font-medium text-base text-slate-900">Project 3: Marketplace</h2>
              <p className="text-sm text-gray-700 mt-2">NFT marketplace example to learn about contract to contract interactions.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default App;

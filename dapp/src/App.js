import { Link } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar';


function App() {
  return (
    <div className="max-w-full">
      <Navbar />
      <div>
        <div className="container mx-auto">
          <div className="flex flex-col mt-8 items-center">
            <Link to={"/project1"}>
              <div className="bg-white rounded-xl shadow-lg h-24 lg:min-w-[60rem] md:min-w-[40rem] p-4 my-4 border border-slate-300">
                <h2 className="font-semibold text-base text-slate-900">Project 1</h2>
                <p className="text-sm text-gray-700 mt-2">Simple counter example to learn how to call ethereum contracts and display them on frontend.</p>
              </div>
            </Link>
            <div className="bg-white rounded-xl shadow-lg h-24 lg:min-w-[60rem] md:min-w-[40rem] p-4 my-4 border border-slate-300">
              <h2 className="font-semibold text-base text-slate-900">Project 2</h2>
              <p className="text-sm text-gray-700 mt-2">ERC-721 example to learn about ethereum NFT</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg h-24 lg:min-w-[60rem] md:min-w-[40rem] p-4 my-4 border border-slate-300">
              <h2 className="font-semibold text-base text-slate-900">Project 3</h2>
              <p className="text-sm text-gray-700 mt-2">NFT marketplace example to learn about contract to contract interactions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

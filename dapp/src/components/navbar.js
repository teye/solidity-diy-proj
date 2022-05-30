import { Link } from 'react-router-dom';


function Navbar() {
    return (
        <nav className="bg-white z-100 max-w-full">
            <div className="mx-auto p-4 h-16">
                <div className="flex justify-between items-center font-play">
                    <div className="flex space-x-7">
                        {/* website logo & name */}
                        <div>
                            <Link to={"/"}>
                                <div className='mt-[0.2em] bg-slate-900 px-3 py-1 rounded-md'>
                                    <h1 className="text-sm text-white font-bold uppercase">Solidity DIY</h1>
                                </div>
                            </Link>
                        </div>
                        {/* nav links */}
                        <div>
                            <ul className="inline-flex mt-[0.6em] text-[0.85em] text-gray-500 font-medium uppercase">
                                <li className="tracking-wider mr-6">
                                    <Link to={"/project1"} className="hover:text-blue-600 transition">
                                        Counter Example
                                    </Link>
                                </li>
                                <li className="tracking-wider mr-6">
                                    <Link to={"/project2"} className="hover:text-blue-600 transition">
                                        NFT Example
                                    </Link>
                                </li>
                                <li className="tracking-wider">
                                    <Link to={"/project3"} className="hover:text-blue-600 transition">
                                        Marketplace Example
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
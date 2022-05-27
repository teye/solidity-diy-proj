
function Navbar() {
    return (
        <nav className="bg-white z-100 shadow-lg max-w-full">
            <div className="mx-auto p-4 h-16">
                <div className="flex justify-between items-center">
                    <div className="flex space-x-7">
                        {/* website logo & name */}
                        <div>
                            <h1 className="text-2xl font-bold">Solidity DIY</h1>
                        </div>
                        {/* nav links */}
                        <div>
                            <a href="/" className="py-2 px-2 text-green-500 font-medium">Home</a>
                        </div>
                    </div>
                    <div className="space-x-3">
                        {/* <a href="/" className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300">Connect Metamask</a> */}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
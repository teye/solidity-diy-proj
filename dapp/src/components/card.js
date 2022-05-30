import IconFish from "../icons/IconFish";

/**
 * card component for displaying NFT
 */
function Card(props) {

    const {
        species,
        tokenId,
        level,
        onLevelUp
    } = props;

    const speciesColor = () => {
        if (species === 'GOLDFISH') {
            return `bg-amber-200 text-amber-800`;
        }
        if (species === 'SHARK') {
            return `text-white bg-gray-800`;
        }
        // GUPPY and default
        return `bg-blue-200 text-blue-800`;
    }

    const fishColor = () => {
        if (species === 'GOLDFISH') {
            return `#f59e0b`;
        }
        if (species === 'SHARK') {
            return `#000000`;
        }
        // GUPPY and default
        return `#2563eb`;
    }

    return (
        <div className="rounded-xl border border-gray-300 w-[16em] p-4 shadow-md text-sm">
            <div className="mb-4">
                <IconFish 
                    className={'h-[10em] mx-auto'}
                    fillColor={fishColor()}
                    strokeColor={fishColor()}
                />
            </div>
            <div className="flex justify-between items-center">
                <div className="font-bold"># {tokenId}</div>
                <div className={`text-[0.8em] font-semibold w-fit px-3 py-1 rounded-full ${speciesColor()}`}>
                    {species}
                </div>
            </div>
            <div className="font-bold">Level {level}</div>
            <div className="text-center mt-4 mb-2">
                <button 
                    className="uppercase bg-transparent hover:bg-blue-500 text-blue-700 text-[0.9em] font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded mr-4"
                    onClick={() => onLevelUp(tokenId)}>
                    Train
                </button>
            </div>
        </div>
    );
}

export default Card;
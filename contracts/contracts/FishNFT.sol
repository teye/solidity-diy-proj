//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


/*
 * Custom errors
 */
error PriceNotMet();

/*
 * Self-learning ERC721 contract
 * Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
 * It defines a fish NFT, users can mint and level up their fishes
 */
contract FishNFT is ERC721, ERC721Enumerable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // events
    event MintFish(address indexed _from, string _species, uint256 _tokenId);
    event LevelUp(address indexed _from, uint256 _tokenId, uint256 _level);

    // fish details
    // species should be in some metadata.json but for simplicity and learning, we'll put in struct
    struct Fish {
        string species;
        uint tokenId;
        uint32 level;
    }

    Fish[] public fishes;

    constructor() ERC721("WhatTheFishNFT", "WTF") {}

    // The following functions are overrides required by Solidity.
    // See https://wizard.openzeppelin.com/#erc721

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    modifier onlyTokenOwner(uint256 tokenId) {
        address currentTokenOwner = ownerOf(tokenId);
        require(msg.sender == currentTokenOwner);
        _;
    }

    /*
    * @notice mints a Fish to the sender; anyone can mint, each fish cost 0.001 eth
    * @param  string _species from UI - "GUPPY", "GOLDFISH", "SHARK"
    * @return minted token ID
    */ 
    function mintFish(string memory _species) external payable returns (uint256) {
        if (msg.value < 1000000000000000 wei) {
            revert PriceNotMet();
        }

        _tokenIds.increment();

        uint256 newFishId = _tokenIds.current();
        _safeMint(msg.sender, newFishId);
        fishes.push(Fish(_species, newFishId, 1));

        emit MintFish(msg.sender, _species, newFishId);

        return newFishId;
    }

    /*
    * @notice level up a Fish; only token owner can level up their own fish; cost 0.002 eth per level
    * @param  uint256 tokenId   NFT token id to level up
    * @dev    SafeMath not required for Solidity 0.8; See https://docs.openzeppelin.com/contracts/4.x/api/utils#SafeMath
    */
    function levelUp(uint256 tokenId) external payable onlyTokenOwner(tokenId) {
        if (msg.value < 2000000000000000 wei) {
            revert PriceNotMet();
        }

        // subtract 1 because array is 0-based but token index is 1
        uint256 arrayIdx = tokenId - 1;
        require(fishes[arrayIdx].tokenId == tokenId);
        fishes[arrayIdx].level++;
        emit LevelUp(msg.sender, tokenId, fishes[arrayIdx].level);
    }
}
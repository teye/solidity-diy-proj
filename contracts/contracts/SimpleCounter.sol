//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract SimpleCounter {
    uint256 public number;

    constructor() {
        number = 1;
    }

    function increment(uint256 _value) public {
        number = number + _value;
    }

    function reset() public {
        number = 0;
    }
}
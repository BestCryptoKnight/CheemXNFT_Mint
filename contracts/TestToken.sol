/**
 *Submitted for verification at testnet.snowtrace.io on 2022-06-02
*/
// contracts/NFT.sol
// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract CheemsXYZ is ERC20, ERC20Burnable, Ownable {
    constructor() ERC20("CheemsXYZ", "CXYZ") {
        _mint(msg.sender, 100000000 * 10**18 );
    }

    receive() external payable { }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract Token is ERC20 {
    address public administrateur;
       constructor() ERC20("Token", "TKN",10000) {
        administrateur = msg.sender;
     }
     function frapper(address destinataire, uint256 montant) external {
         require(msg.sender == administrateur, "Seul l'administrateur peut frapper des unites");
         _mint(destinataire, montant);
     }
}

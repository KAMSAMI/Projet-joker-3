// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Monnaie is ERC20 {
    address public administrateur;

    constructor() ERC20("Monnaie", "MNA") {
        _mint(msg.sender, 1000000 * 10 ** decimals());  // Frappe une quantité initiale
        administrateur = msg.sender;
    }

    function frapper(address destinataire, uint256 montant) external {
        require(msg.sender == administrateur, "Seul l'administrateur peut frapper des unites");
        _mint(destinataire, montant);
    }
}
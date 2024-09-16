// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Importation du contrat ERC-20 depuis OpenZeppelin
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Contrat Monnaie, un token ERC-20
contract Monnaie is ERC20 {
    // Adresse de l'administrateur capable de frapper des tokens
    address public administrateur;

    // Le constructeur initialise le token avec un nom et un symbole
    constructor() ERC20("Monnaie", "MNA") {
        // L'administrateur reçoit un nombre initial de tokens
        _mint(msg.sender, 1000000 * 10 ** decimals());
        administrateur = msg.sender; // L'expéditeur devient l'administrateur
    }

    // Fonction permettant à l'administrateur de frapper de nouveaux tokens
    function frapper(address destinataire, uint256 montant) external {
        require(msg.sender == administrateur, "Seul ladministrateur peut frapper des tokens.");
        _mint(destinataire, montant);
    }
}
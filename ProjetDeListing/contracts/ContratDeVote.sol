// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Importer l'interface IERC20 depuis OpenZeppelin
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ContratDeVote {
    address public administrateur;
    uint256 public totalVotes;
    uint256 public votesRequis;
    address public adresseMonnaie;

    mapping(address => uint256) public votes;
    bool public projetReussi;

    // Le constructeur initialise les paramètres du vote
    constructor(uint256 _votesRequis, address _adresseMonnaie) {
        administrateur = msg.sender;
        votesRequis = _votesRequis;
        adresseMonnaie = _adresseMonnaie;
        projetReussi = false;
    }

    // Fonction pour permettre aux utilisateurs de voter en envoyant des tokens
    function voter(uint256 montant) external {
        require(montant > 0, "Vous devez voter avec un montant positif de monnaies");

        IERC20(adresseMonnaie).transferFrom(msg.sender, address(this), montant);

        votes[msg.sender] += montant;
        totalVotes += montant;

        // Vérifie si le nombre de votes requis est atteint
        if (totalVotes >= votesRequis) {
            projetReussi = true;
        }
    }

    // Fonction de remboursement si le projet échoue
    function remboursement() external {
        require(!projetReussi, "Le projet est reussi, aucun remboursement possible");
        require(votes[msg.sender] > 0, "Aucun vote a rembourser");

        uint256 montantVotant = votes[msg.sender];
        votes[msg.sender] = 0;

        IERC20(adresseMonnaie).transfer(msg.sender, montantVotant);
    }
}
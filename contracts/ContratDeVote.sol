// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function transfer(address recipient, uint256 amount) external returns (bool);
}

// Contrat pour le vote avec un token ERC-20
contract ContratDeVote {
    address public administrateur;
    uint256 public totalVotes;
    uint256 public votesRequis;
    address public adresseMonnaie;
    bool public projetReussi;

    mapping(address => uint256) public votes;

    constructor(uint256 _votesRequis, address _adresseMonnaie) {
        administrateur = msg.sender;
        votesRequis = _votesRequis;
        adresseMonnaie = _adresseMonnaie;
        projetReussi = false; // Le projet n'a pas encore atteint les votes requis
    }

    // Modificateur pour vérifier si le projet est déjà réussi
    modifier projetNonReussi() {
        require(!projetReussi, "Le projet a deja reussi.");
        _;
    }

    // Fonction permettant aux utilisateurs de voter
    function voter(uint256 montant) external projetNonReussi {
        require(montant > 0, "Vous devez voter avec un montant positif.");
        IERC20(adresseMonnaie).transferFrom(msg.sender, address(this), montant);

        votes[msg.sender] += montant;
        totalVotes += montant;

        // Vérification si le projet atteint le seuil de votes
        if (totalVotes >= votesRequis) {
            projetReussi = true;
        }
    }

    // Fonction de remboursement en cas d'échec du projet
    function remboursement() external {
        require(!projetReussi, "Le projet a reussi, pas de remboursement.");
        uint256 montant = votes[msg.sender];
        require(montant > 0, "Aucun vote a rembourser.");

        votes[msg.sender] = 0;
        IERC20(adresseMonnaie).transfer(msg.sender, montant);
    }
}
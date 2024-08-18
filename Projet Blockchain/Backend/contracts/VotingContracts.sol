// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function transfer(address recipient, uint256 amount) external returns (bool);
}

contract ContratDeVote {
    address public administrateur;
    uint256 public totalVotes;
    uint256 public votesRequis;
    address public adresseMonnaie;

    mapping(address => uint256) public votes;
    bool public projetReussi;

    constructor(uint256 _votesRequis, address _adresseMonnaie) {
        administrateur = msg.sender;
        votesRequis = _votesRequis;
        adresseMonnaie = _adresseMonnaie;
        projetReussi = false;
    }

    function voter(uint256 montant) external {
        require(montant > 0, "Vous devez voter avec un montant positif de monnaies");

        IERC20(adresseMonnaie).transferFrom(msg.sender, address(this), montant);

        votes[msg.sender] += montant;
        totalVotes += montant;

        if (totalVotes >= votesRequis) {
            projetReussi = true;
        }
    }

    function remboursement() external {
        require(!projetReussi, "Le projet est reussi, aucun remboursement possible");
        require(votes[msg.sender] > 0, "Aucun vote a rembourser");

        uint256 montantVotant = votes[msg.sender];
        votes[msg.sender] = 0;

        IERC20(adresseMonnaie).transfer(msg.sender, montantVotant);
    }
}

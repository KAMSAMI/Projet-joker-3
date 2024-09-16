const Monnaie = artifacts.require("Monnaie");
const ContratDeVote = artifacts.require("ContratDeVote");

module.exports = function (deployer) {
  // Déploiement du contrat Monnaie
  deployer.deploy(Monnaie).then(function() {
    // Déploiement de ContratDeVote après Monnaie
    return deployer.deploy(ContratDeVote, 1000, Monnaie.address);
  });
};
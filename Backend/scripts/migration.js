const Token = artifacts.require("Token");
const ContratDeVote = artifacts.require("ContratDeVote");

module.exports = function (deployer) {
  deployer.deploy(Token).then(function() {
    return deployer.deploy(ContratDeVote, 1000, Token.address);
  });
};
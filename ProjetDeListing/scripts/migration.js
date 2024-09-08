/*const Token = artifacts.require("Token");
const ContratDeVote = artifacts.require("ContratDeVote");

module.exports = function (deployer) {
  deployer.deploy(Token).then(function() {
    return deployer.deploy(ContratDeVote, 1000, Token.address);
  });
};*/
const Token = artifacts.require("Token");
const ContratDeVote = artifacts.require("ContratDeVote");

module.exports = async function (deployer) {
  await deployer.deploy(Token);
  const tokenInstance = await Token.deployed();
  console.log("Token contract deployed at address:", tokenInstance.address);

  await deployer.deploy(ContratDeVote, 1000, tokenInstance.address);
  const voteInstance = await ContratDeVote.deployed();
  console.log("ContratDeVote contract deployed at address:", voteInstance.address);
};
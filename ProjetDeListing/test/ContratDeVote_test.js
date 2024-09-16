const Monnaie = artifacts.require("Monnaie");
const ContratDeVote = artifacts.require("ContratDeVote");

contract("ContratDeVote", accounts => {
  it("should allow a user to vote", async () => {
    let monnaie = await Monnaie.deployed();
    let vote = await ContratDeVote.deployed();

    // Le compte 0 approuve le transfert de 100 tokens au contrat de vote
    await monnaie.approve(vote.address, 100, { from: accounts[0] });
    await vote.voter(100, { from: accounts[0] });

    // Vérification du nombre total de votes
    let totalVotes = await vote.totalVotes();
    assert.equal(totalVotes.toNumber(), 100, "Le vote n'a pas été enregistré correctement.");
  });
});
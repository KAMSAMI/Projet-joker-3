const Token = artifacts.require("Token");
const ContratDeVote = artifacts.require("ContratDeVote");

contract("ContratDeVote", accounts => {
  it("should allow a user to vote", async () => {
    let token = await Token.deployed();
    let vote = await ContratDeVote.deployed();

    await token.approve(vote.address, 100, { from: accounts[0] });
    await vote.voter(100, { from: accounts[0] });

    let totalVotes = await vote.totalVotes();
    assert.equal(totalVotes.toNumber(), 100, "Vote not recorded correctly");
  });
});
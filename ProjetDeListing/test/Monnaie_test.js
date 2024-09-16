const Monnaie = artifacts.require("Monnaie");

contract("Monnaie", accounts => {
  it("should mint initial tokens", async () => {
    let instance = await Monnaie.deployed();
    let balance = await instance.balanceOf(accounts[0]); // Vérifie le solde de l'administrateur
    assert.equal(balance.toNumber(), 1000000 * 10 ** 18, "L'offre initiale est incorrecte.");
  });
});
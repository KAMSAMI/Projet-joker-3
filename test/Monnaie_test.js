const Monnaie = artifacts.require("Monnaie");

contract("Monnaie", accounts => {
  it("should mint initial tokens", async () => {
    let instance = await Monnaie.deployed();
    let balance = await instance.balanceOf(accounts[0]); // Vérifie le solde de l'administrateur
    assert.equal(balance.toNumber(), 1000000 * 10 ** 18, "L'offre initiale est incorrecte.");
  });

  it("should allow only the admin to mint tokens", async () => {
    let instance = await Monnaie.deployed();

    // Frapper des tokens en tant qu'admin (accounts[0])
    await instance.frapper(accounts[1], 1000, { from: accounts[0] });
    let balance = await instance.balanceOf(accounts[1]);
    assert.equal(balance.toNumber(), 1000, "L'administrateur a échoué à frapper des tokens.");

    // Tenter de frapper en tant qu'un autre compte (devrait échouer)
    try {
      await instance.frapper(accounts[2], 1000, { from: accounts[1] });
      assert.fail("Seul l'administrateur devrait pouvoir frapper.");
    } catch (error) {
      assert(error.message.includes("Seul l'administrateur peut frapper des tokens."), "Erreur inattendue lors de la frappe.");
    }
  });
});
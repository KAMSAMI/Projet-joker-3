// SPDX-License-Identifier: GPL-3.0

const Token = artifacts.require("Token");

contract("Token", accounts => {
  it("should mint initial tokens", async () => {
    let instance = await Token.deployed();
    let balance = await instance.balanceOf(accounts[0]);
    assert.equal(balance.toNumber(), 1000000 * 10 ** 18, "Initial supply is not correct");
  });
});
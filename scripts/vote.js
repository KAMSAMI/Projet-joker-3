async function main() {
  const [deployer, votant] = await ethers.getSigners();
  
  const monnaie = await ethers.getContractAt("Monnaie", "0xc6610A783001Efcb44c2F99250609211d87F6831");
  const contratDeVote = await ethers.getContractAt("ContratDeVote", "0x2939D4cc518352194dDAD24Ae4348c0fB3896Ba6");

  // Le votant approuve le transfert de 100 tokens au contrat de vote
  await monnaie.connect(votant).approve(contratDeVote.address, 100);

  // Le votant effectue son vote
  await contratDeVote.connect(votant).voter(100);

  console.log("Vote effectué !");
}

main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});
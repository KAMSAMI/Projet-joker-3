async function main() {
  const [deployer, votant] = await ethers.getSigners();
  
  const monnaie = await ethers.getContractAt("Monnaie", "ADRESSE_MONNAIE");
  const contratDeVote = await ethers.getContractAt("ContratDeVote", "ADRESSE_CONTRATDEVOTE");

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
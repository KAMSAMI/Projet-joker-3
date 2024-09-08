async function main() {
  const [deployer, votant] = await ethers.getSigners();
  
  const token = await ethers.getContractAt("Token", "ADRESSE_TOKEN");
  const contratDeVote = await ethers.getContractAt("ContratDeVote", "ADRESSE_CONTRATDEVOTE");

  await token.connect(votant).approve(contratDeVote.address, 100);

  await contratDeVote.connect(votant).voter(100);

  console.log("Vote effectué !");
}

main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});
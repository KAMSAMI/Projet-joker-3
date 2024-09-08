// Initialiser Web3 et connecter Metamask
async function initWeb3() {
    if (window.ethereum) {
        // Demande à Metamask d'autoriser l'accès
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        window.web3 = new Web3(window.ethereum);
    } else {
        alert("Veuillez installer Metamask pour utiliser cette application.");
    }
}

// Appel pour voter
async function vote() {
    const accounts = await web3.eth.getAccounts(); // Obtenir le compte connecté
    const contratDeVote = new web3.eth.Contract(ABI_CONTRATDEVOTE, ADRESSE_CONTRATDEVOTE);
    
    try {
        // Interaction avec le contrat pour voter
        await contratDeVote.methods.voter(100).send({ from: accounts[0] });
        alert("Vote effectué avec succès !");
    } catch (error) {
        console.error("Erreur lors du vote:", error);
        alert("Une erreur est survenue lors du vote.");
    }
}

// Initialiser Web3 dès que la page est chargée
window.addEventListener('load', async () => {
    await initWeb3();
});
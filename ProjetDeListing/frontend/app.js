// Connexion à Metamask
async function connectMetamask() {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log("Connexion à Metamask réussie !");
        } catch (error) {
            console.error("Erreur de connexion : ", error);
        }
    } else {
        alert("Veuillez installer Metamask !");
    }
}

// Fonction pour voter
async function voter() {
    const montant = document.getElementById("montant").value;
    if (montant > 0) {
        console.log(Vous avez vote avec ${montant} tokens.);
        // Interaction avec le smart contract ici
    } else {
        alert("Veuillez entrer un montant valide !");
    }
}

// Connexion à Metamask lors du chargement de la page
connectMetamask();
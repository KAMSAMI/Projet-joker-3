module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",    // Adresse de votre Ganache
      port: 8545,           // Port de votre Ganache
      network_id: "1337",   // Identifiant du réseau de Ganache
    }
  },
  compilers: {
    solc: {
      version: "0.8.20",  // Spécifiez ici la version 0.8.20
      settings: {         // Optimisations et autres réglages (facultatif)
        optimizer: {
          enabled: false,
          runs: 200
        },
        evmVersion: "istanbul" // Peut être ajusté selon votre besoin
      }
    }
  }
};
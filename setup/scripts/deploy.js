import { ethers } from "ethers"; // Utilisation de ESM
import "dotenv/config"; // Charger les variables d'environnement
import fs from "fs"; // Charger le module File System
import hre from "hardhat"; // Charger Hardhat

async function main() {
    // Connexion au réseau Avalanche
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL); // Avalanche Fuji Testnet

    // Charger le wallet avec le provider
    const deployer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    console.log("Deploying contracts with the account:", deployer.address);

    // Charger le contrat avec Hardhat
    const Pong = await hre.ethers.getContractFactory("PONGcontract", deployer);

    // Déployer le contrat
    const contract = await Pong.deploy();
    
    // Attendre la fin du déploiement
    await contract.waitForDeployment();

    console.log("✅ PONGcontract deployed at:", contract.target);
    console.log(contract.deploymentTransaction()?.hash);
}

// Exécuter le script en gérant les erreurs
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

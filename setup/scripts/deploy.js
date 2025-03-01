const { ethers } = require("ethers"); // Utilisation de CommonJS
require("dotenv").config();
const fs = require("fs"); // Charger le module File System
const hre = require("hardhat"); // Charger Hardhat

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

    //console.log("✅ PONGcontract deployed at:", contract.address);
    console.log(contract.target);
    console.log(contract.deploymentTransaction()?.hash);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

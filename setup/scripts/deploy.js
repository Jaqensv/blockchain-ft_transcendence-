const { ethers } = require("ethers"); // Utilisation de CommonJS
const fs = require("fs"); // Charger le module File System
const hre = require("hardhat"); // Charger Hardhat

async function main() {
    // Connexion au réseau Avalanche
    // const provider = new ethers.providers.JsonRpcProvider("https://api.avax.network/ext/bc/C/rpc"); // Avalanche Mainnet
    const provider = new ethers.JsonRpcProvider("https://api.avax-test.network/ext/bc/C/rpc"); // Avalanche Fuji Testnet

    // Charger le wallet avec le provider
    const deployer = new ethers.Wallet("0x35da811fc499d4a125ee41edfc4359475d7e7b4ddb811ac8bb157a6deec7cbba", provider);

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

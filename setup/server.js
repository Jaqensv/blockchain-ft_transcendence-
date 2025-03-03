// Import Fastify et ethers.js
import Fastify from 'fastify';
import { ethers } from 'ethers';
import dotenv from 'dotenv';

console.log("Clé privée utilisée :", process.env.PRIVATE_KEY);

// Charger les variables d'environnement
dotenv.config();

const fastify = Fastify({ logger: true });

// Configurer le provider et le wallet
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Charger le contrat
const contractAddress = process.env.CONTRACT_ADDRESS; // Adresse de ton contrat
const abi = [
    "function balanceOf(address owner) view returns (uint256)",
    "function transfer(address to, uint256 amount) public returns (bool)"
]; // Ajoute ici l'ABI de ton contrat
const contract = new ethers.Contract(contractAddress, abi, wallet);

// Route pour récupérer le solde d'un joueur
fastify.get('/balance/:address', async function (request, reply) {
    try {
        const { address } = request.params;
        const balance = await contract.balanceOf(address);
        return { address, balance: balance.toString() };
    } catch (error) {
        reply.code(500).send({ error: error.message });
    }
});

// Route pour envoyer des tokens à un joueur
fastify.post('/send', async function (request, reply) {
    try {
        const { to, amount } = request.body;
        const tx = await contract.transfer(to, ethers.parseUnits(amount, 18)); // 18 décimales
        await tx.wait(); // Attendre la confirmation
        return { message: "Tokens envoyés avec succès", txHash: tx.hash };
    } catch (error) {
        reply.code(500).send({ error: error.message });
    }
});

// Fonction pour démarrer le serveur
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log(`🚀 Server running at http://127.0.0.1:3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

// 🔥 Lancer le serveur
start();

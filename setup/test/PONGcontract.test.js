const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PONGcontract", function () {
  let pongContract;
  let owner;
  let addr1;

  beforeEach(async function () {
    // Récupère les comptes disponibles
    [owner, addr1, ...addrs] = await ethers.getSigners();

    // Récupère la factory pour le contrat
    const PONGFactory = await ethers.getContractFactory("PONGcontract");

    // Déploie le contrat et récupère son instance
    pongContract = await PONGFactory.deploy();
    await pongContract.waitForDeployment();
  });

  it("devrait ajouter un joueur et encoder son ID", async function () {
    // Appelle la fonction _addPlayer pour ajouter "Alice"
    await pongContract._addPlayer("Alice");

    // Vérifie que le score initial est à 0
    const score = await pongContract._getScore("Alice");
    expect(score).to.equal(0);
  });

  it("devrait modifier le score d'un joueur", async function () {
    // Ajoute un joueur
    await pongContract._addPlayer("Bob");

    // Modifie le score du joueur "Bob"
    await pongContract._setScore("Bob", 42);

    // Vérifie que le score a bien été mis à jour
    const score = await pongContract._getScore("Bob");
    expect(score).to.equal(42);
  });
});

import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";

async function main() {
  const [deployer] = await ethers.getSigners();  // Use deployer account from Hardhat node

  console.log("Deploying contracts with the account:", deployer.address);

  // Get the contract factory
  const InventoryManager = await ethers.getContractFactory("InventoryManager");

  // Deploy the contract with the deployer's address as the admin
  const contract = await InventoryManager.deploy(deployer.address);

  console.log("Contract deployed to address:", contract.address);

  // Save the contract address to a file
  const filePath = path.join(__dirname, '../contract-address.json');
  fs.writeFileSync(filePath, JSON.stringify({ InventoryManager: contract.address }, null, 2));
  console.log("Contract address saved to:", filePath);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

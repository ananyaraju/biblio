const { ethers } = require("hardhat");
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();
  
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Library = await hre.ethers.getContractFactory("Library");
  const library = await Library.deploy();
  await library.deployed();

  const data = {
    address: library.address,
    abi: JSON.parse(library.interface.format('json'))
  }

  //This writes the ABI and address to library.json
  fs.writeFileSync('./frontend/src/Library.json', JSON.stringify(data))

  console.log("Deployed successfully");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
import { ethers } from "hardhat";

async function main() {
  const election = await ethers.deployContract("PrivateElection", []);

  await election.waitForDeployment();

  console.log("Deployed private election contract");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

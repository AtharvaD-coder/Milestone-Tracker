const hre = require("hardhat");

async function sleep(ms:any) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {

  const goalTrackerContract = await hre.ethers.deployContract("GoalTracker");
  await goalTrackerContract.waitForDeployment();
  console.log("goalTracker deployed to:", goalTrackerContract.target);

const goalTrackerAddress = await goalTrackerContract.getAddress();
console.log("The goalTrackerAddress is: ",goalTrackerAddress);

const signers = await hre.ethers.getSigners();
const ownerSigner = signers[0];
// const ownerSigner = await hre.ethers.getSigner();
console.log("The owner Signer is: ",ownerSigner);
const ownerAddress = await ownerSigner.getAddress();
console.log("The owner address is: ",ownerAddress);


  // Sleep for 30 seconds to let Etherscan catch up with the deployments
  await sleep(30 * 1000);


  await hre.run("verify:verify", {
    address: goalTrackerContract.target,
    constructorArguments: [],
  });

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

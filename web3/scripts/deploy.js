const hre = require('hardhat');
const main = async () => {

  const Transactions = await hre.ethers.getContractFactory("NFTMarketplace");
  const transactions = await Transactions.deploy("CodeLek Technology","CLT",10);

  await transactions.deployed();

  console.log(`Smart Contracts Deployed to: ${transactions.address}`
  );
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

runMain();
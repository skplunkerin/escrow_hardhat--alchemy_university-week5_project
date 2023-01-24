require("dotenv").config();
const { ethers } = require("ethers");
const { utils } = ethers;

async function main() {
  const artifacts = await hre.artifacts.readArtifacts("Escrow");
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.TESTNET_ALCHEMY_RPC_URL
  );
  const wallet = new ethers.Wallet(
    process.env.TESTNET_WALLET_PRIVATE_KEY,
    provider
  );
  // create an Escrow factory instance
  const factory = new ethers.ContractFactory(
    artifacts.abi,
    artifacts.bytecode,
    wallet
  );
  const escrow = await factory.deploy(
    process.env.TESTNET_WALLET_ADDRESS_ARBITER,
    process.env.TESTNET_WALLET_ADDRESS_BENEFICIARY,
    {
      value: utils.parseUnits("0.5", "ether"),
    }
  );
  console.log("Escrow address:", escrow.address);
  await escrow.deployed();
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

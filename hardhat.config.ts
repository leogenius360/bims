import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
// import "@nomiclabs/hardhat-etherscan";
import "dotenv/config";

// Ensure you have a `.env` file with your private key and Etherscan API key
const { PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545", // Hardhat local node URL
      accounts: [`0x${PRIVATE_KEY}`], // Replace with your private key
    },
  },
//   etherscan: {
//     apiKey: ETHERSCAN_API_KEY || "", // Etherscan API key if you are using etherscan for verification
//   },
};

export default config;

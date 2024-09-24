// // utils/contract.ts

// import { ethers } from 'ethers';

// const CONTRACT_ADDRESS = 'YOUR_CONTRACT_ADDRESS';
// const ABI: ethers.ContractInterface = [
//     // Your contract's ABI here
// ];

// let provider: ethers.providers.Web3Provider;
// let contract;

// export function initializeContract() {
//     if (typeof window !== 'undefined' && window.ethereum) {
//         provider = new ethers.providers.Web3Provider(window.ethereum);
//         const signer = provider.getSigner();
//         contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
//     } else {
//         throw new Error('No Ethereum provider found');
//     }
// }

// export { provider, contract };

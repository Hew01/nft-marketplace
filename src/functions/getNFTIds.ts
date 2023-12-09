// Setup: npm install alchemy-sdk
import { Alchemy, Network } from "alchemy-sdk";

export const ALCHEMY_API_KEY = import.meta.env.VITE_ALCHEMY_API_KEY;

const config = {
  apiKey: ALCHEMY_API_KEY,
  network: Network.ETH_SEPOLIA,
};
const alchemy = new Alchemy(config);

export async function getNFTIds(account: string) {
  // Wallet address
  const address = account;

  // Get all NFTs
  const nfts = await alchemy.nft.getNftsForOwner(address);

  // Parse output
  const numNfts = nfts["totalCount"];
  const nftList = nfts["ownedNfts"];

  return {
    numNfts,
    nftList,
  }
};

//for usage:
    // async function showNFTs() {
    //     const { numNfts, nftList } = await getNFTIds(account);
    //     console.log('Number of NFTs:', numNfts);
    //     console.log('List of NFTs:', nftList);
    // }
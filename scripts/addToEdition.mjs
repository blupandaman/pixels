import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import "dotenv/config";
import fs from "fs";

(async () => {
  const editionAddress = "0x5FB444a0c49729c5dC19F9613567aDaE57Ca69a8";

  // Initialize sdk for goerli
  const sdk = ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY, "goerli");

  // Grab edition using sdk
  const edition = await sdk.getContract(editionAddress, "edition");

  // Custom metadata and supplies of your NFTs
  const metadataWithSupply = [
    {
      supply: 100, // The number of this NFT you want to mint
      metadata: {
        name: "1 x 2",
        description: "1 x 2 ",
        image: fs.readFileSync("./scripts/assets/1x2.png"),
      },
    },
    {
      supply: 100, // The number of this NFT you want to mint
      metadata: {
        name: "2 x 2",
        description: "2 x 2 ",
        image: fs.readFileSync("./scripts/assets/2x2.png"),
      },
    },
    {
      supply: 100, // The number of this NFT you want to mint
      metadata: {
        name: "3 x 2",
        description: "3 x 2 ",
        image: fs.readFileSync("./scripts/assets/2x3.png"),
      },
    },
  ];

  const tx = await edition.mintBatch(metadataWithSupply);
  //   const txReceipt = tx[0].receipt; // same transaction receipt for all minted NFTs
  const firstTokenId = tx[0].id; // token id of the first minted NFT
  const firstNFT = await tx[0].data(); // (optional) fetch details of the first minted NFT

  console.log(firstNFT, firstTokenId);
})();

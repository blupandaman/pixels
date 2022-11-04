import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import "dotenv/config";
import fs from "fs";

(async () => {
  const packAddress = "0x553CCFe2Fb4b53A34e8a69f7B327650f36078c2A";
  const editionAddress = "0x5FB444a0c49729c5dC19F9613567aDaE57Ca69a8";

  // Initialize sdk for goerli
  const sdk = ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY, "goerli");

  // Grab pack using sdk
  const pack = await sdk.getContract(packAddress, "pack");

  // Set approval for the edition to the pack
  const edition = await sdk.getContract(editionAddress, "edition");
  await edition.setApprovalForAll(packAddress, true);
  console.log("Set approval for edition");

  // Read is file for pack nft pic
  const packAssetFile = fs.readFileSync("./scripts/assets/pack1.png");

  // Upload the pic to IPFS
  const ipfsHash = await sdk.storage.upload(packAssetFile);
  const uri = ipfsHash;
  console.log("Uploaded pack asset to IPFS");

  console.log("Creating packs now...");
  const packNft = await pack.create({
    packMetadata: {
      name: "Pixel Pack",
      description: "A pack of pixels",
      image: uri,
    },
    erc1155Rewards: [
      {
        // 1 x 1
        contractAddress: editionAddress,
        tokenId: 0,
        quantityPerReward: 1,
        totalRewards: 100,
      },
      {
        // 2 x 1
        contractAddress: editionAddress,
        tokenId: 1,
        quantityPerReward: 1,
        totalRewards: 100,
      },
      {
        // 3 x 1
        contractAddress: editionAddress,
        tokenId: 2,
        quantityPerReward: 1,
        totalRewards: 100,
      },
    ],
    rewardsPerPack: 10,
  });

  console.log("Packs created.");
})();

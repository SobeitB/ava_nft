import { ethers } from "hardhat";
import path from 'path';
import * as fs from "fs";
const hre = require('hardhat');
require('dotenv').config()

const getEnvVar = (key: string) => {
  console.log(process.env[key])
  if (process.env[key] === undefined) {
    throw new Error(`Env variable ${key} is required`);
  }
  return process.env[key] || "";
};

async function main() {
  const [owner] = await ethers.getSigners();

  const ogSignature = new ethers.Wallet(getEnvVar("PRIVATE_KEY_OG"))
  const wlSignature = new ethers.Wallet(getEnvVar("PRIVATE_KEY_WL"))

  const Ava = await ethers.getContractFactory("AvaJarvis");
  const AvaJarvis = await Ava.deploy('localhost://3000/', ogSignature.address, wlSignature.address);

  await AvaJarvis.deployed();

  console.log(`address - ${AvaJarvis.address}`);

  saveFrontendFiles({
    AvaJarvis:AvaJarvis
  })

  const usersOg = [
    '0x611e46CBA0CF7Cf103a7898F3621101DA8d8f5F0',
    '0x1Bc9C9414E54c1E61caF73e130bb1dbE48451865'
  ]

  const signersOg:Record<string, string> = {}

  for await (const contents of
     usersOg.map(async (account:string) => {
       const dataHash = ethers.utils.keccak256(account.toLowerCase())
       const messageBytes = ethers.utils.arrayify(dataHash)

       signersOg[account.toLowerCase()] = await ogSignature.signMessage(messageBytes)
     })
  );

  const usersWL = [
    '0x854F28941dcE2Ec86FC0Ffe84c724cF626EC54Ba',
  ]

  const signersWL:Record<string, string> = {}

  for await (const contents of
     usersWL.map(async (account:string) => {
       const dataHash = ethers.utils.keccak256(account.toLowerCase())
       const messageBytes = ethers.utils.arrayify(dataHash)

       signersWL[account.toLowerCase()] = await wlSignature.signMessage(messageBytes)
     })
  );

  fs.writeFile('../src/shared/lib/contracts/signatureOG.json', JSON.stringify(signersOg), 'utf8', () => {});
  fs.writeFile('../src/shared/lib/contracts/signatureWL.json', JSON.stringify(signersWL), 'utf8', () => {});
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

function saveFrontendFiles(contracts:any) {
  const contractsDir = path.join(__dirname, '/../..', 'src/shared/lib/contracts')

  Object.entries(contracts).forEach((contract_item:any) => {
    const [name, contract] = contract_item;

    if(contract) {
      fs.writeFileSync(
         path.join(contractsDir, '/', name + '-contract-address.json'),
         JSON.stringify({[name]: contract.address}, undefined, 2)
      )
    }

    const ContractArtifact = hre.artifacts.readArtifactSync(name)

    fs.writeFileSync(
       path.join(contractsDir, '/', name + ".json"),
       JSON.stringify(ContractArtifact, null, 2)
    )
  })
}
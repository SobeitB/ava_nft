import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { AvaJarvis, AvaJarvis__factory } from "../typechain-types";

const statusOG = 'OG';
const statusWL = 'WL';
const statusPUBLIC = 'PUBLIC';

const getPrices = (count:number, status:string) => {
   const priceOneNft = status === 'WL' ? .007 : .02;

   return ethers.utils.parseEther((priceOneNft * count).toString());
}

describe("AvaNft", function () {
  async function deployOneYearLockFixture() {
    const [
       owner,
       ogSignature,
       wlSignature,
       userOg,
       userWl,
       userPb,
    ] = await ethers.getSigners();

     const dataHashOg = ethers.utils.keccak256(userOg.address.toLowerCase())
     const messageBytesOg = ethers.utils.arrayify(dataHashOg)
     const signatureOg = await ogSignature.signMessage(messageBytesOg)

     const dataHashWL = ethers.utils.keccak256(userWl.address.toLowerCase())
     const messageBytesWL = ethers.utils.arrayify(dataHashWL)
     const signatureWL = await wlSignature.signMessage(messageBytesWL)

    const AvaNft:AvaJarvis__factory = await ethers.getContractFactory("AvaJarvis");
    const avaNft:AvaJarvis = await AvaNft.deploy('localhost://3000', ogSignature.address, wlSignature.address);

    return {
       avaNft,
       owner,
       userOg,
       userWl,
       userPb,
       signatureOg,
       signatureWL,
    };
  }

  describe("Mint", function () {
    it("OG MINT", async function () {
      const {
         avaNft,
         owner,
         userOg,
         userWl,
         signatureOg,
      } = await loadFixture(deployOneYearLockFixture)

      await avaNft.connect(owner).changeStatusOwner(1);

       // mint
       await avaNft.connect(userOg).mintJarvis(1, signatureOg)
       const balance = await avaNft.balanceOf(userOg.address);

       expect(balance).to.equal(1)

       expect(
          avaNft.connect(userOg).mintJarvis(1, signatureOg)
       ).to.be.revertedWith('a lot of nft')

       expect(
          avaNft.connect(userWl).mintJarvis(1, signatureOg)
       ).to.be.revertedWith('invalid signature')
    });

    it("WL MINT", async function () {
        const {
           avaNft,
           owner,
           userOg,
           userWl,
           userPb,
           signatureOg,
           signatureWL,
        } = await loadFixture(deployOneYearLockFixture);

        // OG MINT
        await avaNft.connect(owner).changeStatusOwner(1);

        await avaNft.connect(userOg).mintJarvis(1, signatureOg)
        const balanceOg = await avaNft.balanceOf(userOg.address);

        expect(balanceOg).to.equal(1)

        // WL MINT
        await avaNft.connect(owner).changeStatusOwner(2);

        await avaNft.connect(userOg).mintJarvis(2, signatureOg, {value:getPrices(2, statusWL)})
        const balance = await avaNft.balanceOf(userOg.address);

        expect(balance).to.equal(3);

        // WL USER
        await avaNft.connect(userWl).mintJarvis(2, signatureWL, {value:getPrices(2, statusWL)})
        const balanceWL = await avaNft.balanceOf(userWl.address);

        expect(
           avaNft.connect(userWl).mintJarvis(1, signatureWL)
        ).to.be.revertedWith('a lot of nft')

        expect(
           avaNft.connect(userPb).mintJarvis(1, signatureOg)
        ).to.be.revertedWith('invalid signature')
    })

     it("PUBLIC MINT", async function () {
        const {
           avaNft,
           owner,
           userOg,
           userWl,
           userPb,
           signatureOg,
           signatureWL,
        } = await loadFixture(deployOneYearLockFixture);

        // OG MINT
        await avaNft.connect(owner).changeStatusOwner(1);

        await avaNft.connect(userOg).mintJarvis(1, signatureOg)
        const balanceOg = await avaNft.balanceOf(userOg.address);

        expect(balanceOg).to.equal(1)

        // WL MINT
        await avaNft.connect(owner).changeStatusOwner(2);

        await avaNft.connect(userOg).mintJarvis(2, signatureOg, {value:getPrices(2, statusWL)})
        const balance = await avaNft.balanceOf(userOg.address);

        expect(balance).to.equal(3);

        // USER WL
        await avaNft.connect(userWl).mintJarvis(2, signatureWL, {value:getPrices(2, statusWL)})
        const balanceWL = await avaNft.balanceOf(userWl.address);

        expect(balanceWL).to.equal(2);

        expect(
           avaNft.connect(userWl).mintJarvis(2, signatureWL, {value:getPrices(2, statusWL)})
        ).to.be.revertedWith('a lot of nft');

        // PUBLIC MINT
        await avaNft.connect(owner).changeStatusOwner(3);

        await avaNft.connect(userOg).mintJarvis(2, '0x', {value:getPrices(2, statusPUBLIC)})
        const balancePUBLIC = await avaNft.balanceOf(userOg.address);

        expect(balancePUBLIC).to.equal(5);

        expect(
           avaNft.connect(userOg).mintJarvis(2, '0x', {value:getPrices(2, statusPUBLIC)})
        ).to.be.revertedWith('a lot of nft');


        // PUBLIC MINT USER_WL
        await avaNft.connect(userWl).mintJarvis(2, '0x', {value:getPrices(2, statusPUBLIC)})
        const balanceWL_PUBLIC_MINT = await avaNft.balanceOf(userWl.address);

        expect(balanceWL_PUBLIC_MINT).to.equal(4);

        expect(
           avaNft.connect(userWl).mintJarvis(2, '0x', {value:getPrices(2, statusPUBLIC)})
        ).to.be.revertedWith('a lot of nft');
     })
  });
});

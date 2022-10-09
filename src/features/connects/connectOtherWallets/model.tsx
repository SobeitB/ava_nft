import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import {INFURA_ID} from "shared/config";
import {ethers} from "ethers";

const providerOptions = {
   walletconnect: {
      package: WalletConnectProvider,
      options: {
         infuraId: INFURA_ID
      }
   }
};

const web3Modal = new Web3Modal({
   network: "goerli",
   cacheProvider: false,
   providerOptions
});

export const connectOtherWallet = async () => {
   // web3Modal.clearCachedProvider()
   const instance = await web3Modal.connect();
   const provider = new ethers.providers.Web3Provider(instance);

   return provider
}
import {useAppDispatch} from "app/model/hooks";
import {useCallback} from "react";
import {ethers} from "ethers";
import AvaAddress from "../contracts/AvaJarvis-contract-address.json"
import Ava from "../contracts/AvaJarvis.json";
import {blockChainState} from "shared/config/type";
import {setFullSettings} from "app/model/slice/blockChain";
import {CHAIN_ID_NUMBER} from "shared/config";

export const useSetWeb3Data = () => {
   const {ethereum} = window;
   const dispatch = useAppDispatch();

   const setData = useCallback(async (isConnect:boolean = false, initContract:any | null = null,) => {
      const accounts = await ethereum.request({ method: isConnect ? 'eth_requestAccounts' : 'eth_accounts' })
      const chaiId = await ethereum.networkVersion;

      if(accounts.length > 0 && chaiId === CHAIN_ID_NUMBER) {
         const provider = new ethers.providers.Web3Provider(ethereum);
         const signer = provider.getSigner();
         const Contract = new ethers.Contract(AvaAddress.AvaJarvis, Ava.abi, signer);
         const balance = +(ethers.utils.formatEther(await provider.getBalance(accounts[0])))

         const info:blockChainState = {
            address:accounts[0],
            balance,
            provider,
            signer,
            contract:initContract === null ? Contract : initContract,
            txBeingSent:false,
            error:false,
            status:await Contract.status(),
            totalSupply:Number(await Contract.getTotalSupply())
         }

         dispatch(setFullSettings(info))
      }
   }, [dispatch, ethereum])

   return {
      ethereum,
      setData
   }
}
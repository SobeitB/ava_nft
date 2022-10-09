import {useAppDispatch, useAppSelector} from "app/model/hooks";
import signaturesOG from 'shared/lib/contracts/signatureOG.json'
import signaturesWL from 'shared/lib/contracts/signatureWL.json'
import {transformationPrices} from "shared/model/transformationPrices";
import {utils} from 'ethers';
import {errors} from 'shared/config/error'
import {setError} from "app/model/slice/blockChain";

export const useMint = () => {
   const {contract, status, address} = useAppSelector(state => state.blockChainSlice);
   const {counter} = useAppSelector(state => state.counterSlice);
   const dispatch = useAppDispatch()

   const onClick = async () => {
      const signatureOG:Record<string, string> = signaturesOG;
      const signatureWL:Record<string, string> = signaturesWL;

      let signatureMoment = '0x';

      if(status === 1) {
         signatureMoment = signatureOG[address] ? signatureOG[address] : signatureMoment;

      } else if(status === 2) {
         signatureMoment = signatureWL[address] ? signatureWL[address] : signatureMoment;
      }

      try {

         await contract.mintJarvis(
            counter,
            signatureMoment,
            {value: utils.parseEther(
               transformationPrices(status, counter)
               .toString()
            )}
         )
      } catch (error) {
         const errorString = String(error)
         errors.forEach((errorConst:string) => {
            if(errorString.includes(errorConst)) {
               dispatch(setError(errorConst))
            }
         })
      }
   }

   return onClick
}
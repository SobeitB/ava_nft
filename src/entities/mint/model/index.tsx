import {useAppSelector} from "app/model/hooks";
import signaturesOG from 'shared/lib/contracts/signatureOG.json'
import signaturesWL from 'shared/lib/contracts/signatureWL.json'

export const useMint = () => {
   const {contract, status, address} = useAppSelector(state => state.blockChainSlice)

   const onClick = async () => {
      const signatureOG:Record<string, string> = signaturesOG;
      const signatureWL:Record<string, string> = signaturesWL;

      let signatureMoment = '0x';

      if(status === 1) {
         signatureMoment = signatureOG[address] ? signatureOG[address] : signatureMoment;

      } else if(status === 2) {
         signatureMoment = signatureWL[address] ? signatureWL[address] : signatureMoment;
      };

      console.log(signatureMoment)
   }

   return onClick
}
import {ConnectsWallets} from "features/connects";
import {MainWidget} from "./index.styled";
import {MintHeader} from "features/mint/mintHeader";
import {MintFooter} from "features/mint/mintFooter";
import {useAppSelector} from "app/model/hooks";
import {MintButton} from "entities/mint";
import {Counter} from "features/mint/counter";

export const Main = () => {
   const {address} = useAppSelector(state => state.blockChainSlice);

   return (
      <MainWidget>
         {address === '0x' ?
            <ConnectsWallets />
            :
            <>
               <MintHeader />
               <MintButton />
               <Counter />
               <MintFooter />
            </>
         }
      </MainWidget>
   )
}
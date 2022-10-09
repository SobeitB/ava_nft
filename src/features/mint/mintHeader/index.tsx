import {Text} from "shared/ui";
import {useAppSelector} from "app/model/hooks";
import {transformationPrices} from "shared/model/transformationPrices";
import {Container} from "../ui.styled";

export const MintHeader = () => {
   const {balance, status} = useAppSelector(state => state.blockChainSlice);
   return (
      <Container>
         <Text>
            balance:{+(balance).toFixed(3)}
         </Text>

         <Text>
            price:{transformationPrices(2, 1)}
         </Text>
      </Container>
   )
}
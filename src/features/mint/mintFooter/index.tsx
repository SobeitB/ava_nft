import {Text} from "shared/ui";
import {useAppSelector} from "app/model/hooks";
import {Container} from "../ui.styled";
import {transformationStatus} from "shared/model/transformationStatus";

export const MintFooter = () => {
   const {status, totalSupply} = useAppSelector(state => state.blockChainSlice);

   return (
      <Container>
         <Text>
            supply:{totalSupply}
         </Text>

         <Text>
            status:{transformationStatus(status)}
         </Text>
      </Container>
   )
}
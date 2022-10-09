import {Container, ButtonCounter} from "./counter.styled";
import {Text} from 'shared/ui'

export const Counter = () => {
   return(
      <Container>
         <ButtonCounter>-</ButtonCounter>
         <Text>0</Text>
         <ButtonCounter>+</ButtonCounter>
      </Container>
   )
}
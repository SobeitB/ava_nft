import {Container, ButtonCounter} from "./counter.styled";
import {Text} from 'shared/ui'
import {useAppDispatch, useAppSelector} from "app/model/hooks";
import {increment,decrement} from "./model";

export const Counter = () => {
   const dispatch = useAppDispatch()
   const {counter} = useAppSelector(state => state.counterSlice)

   return(
      <Container>
         <ButtonCounter onClick={() => dispatch(decrement())}>-</ButtonCounter>
         <Text>{counter}</Text>
         <ButtonCounter onClick={() => dispatch(increment())}>+</ButtonCounter>
      </Container>
   )
}
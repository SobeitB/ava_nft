import {ErrorBackground, Modal, ModalText, ModalTitle, Next} from "./error.styled";
import {useAppDispatch, useAppSelector} from "app/model/hooks";
import {setError} from "app/model/slice/blockChain";

export const ErrorModal = () => {
   const {error} = useAppSelector(state => state.blockChainSlice);
   const dispatch = useAppDispatch()

   if(error) {
      return(
         <ErrorBackground>
            <Modal>
               <ModalTitle>Error</ModalTitle>
               <ModalText>{error}</ModalText>
               <Next onClick={() => dispatch(setError(false))}>Next</Next>
            </Modal>
         </ErrorBackground>
      )
   }

   return <></>
}
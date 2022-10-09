import {Button} from 'shared/ui'
import {useMint} from "./model";

export const MintButton = () => {
   const onClick = useMint();

   return <Button onClick={onClick}>Mint Jarvis</Button>
}
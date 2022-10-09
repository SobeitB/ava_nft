import {ConnectMetamask} from "./connectMetamask";
import {ConnectOtherWallets} from "./connectOtherWallets";

export const ConnectsWallets = () => {

      return(
         <div>
            <ConnectMetamask />
            <ConnectOtherWallets />
         </div>
      )
}
import { withProviders } from "./providers";
import {InitBlockChainData} from "processes/initWeb3State";
import {GlobalStyle} from "./styled";
import {Main} from "widgets/Main";

function App() {
   return (
      <InitBlockChainData>
         <GlobalStyle />
         <Main />
      </InitBlockChainData>
   );
}

export default withProviders(App);

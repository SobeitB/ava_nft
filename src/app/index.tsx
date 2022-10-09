import { withProviders } from "./providers";
import {InitBlockChainData} from "processes/initWeb3State";
import {GlobalStyle} from "./styled";
import {Main} from "widgets/Main";
import {ErrorModal} from "widgets/Error";
import {Header} from "widgets/Header";

function App() {
   return (
      <InitBlockChainData>
         <GlobalStyle />
         <ErrorModal />
         <Header />
         <Main />
      </InitBlockChainData>
   );
}

export default withProviders(App);

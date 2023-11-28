import { ContractsContextProvider } from "../Context/ContractsContext";
import PageContent from "./PageContent";
function Contracts() {
  return (
    <ContractsContextProvider>
      <PageContent />
    </ContractsContextProvider>
  );
}
export default Contracts;

import { useContext } from "react";
import { ContractDetailsContext } from "../../..";
import MainPand from "./components/MainPand";

export default function ContractItemsDetails() {
  const { contract } = useContext(ContractDetailsContext);
  return (
    <>
      {contract?.contract_items?.map((contract) => (
        <MainPand key={contract.contract_id} contractData={contract} />
      ))}
    </>
  );
}

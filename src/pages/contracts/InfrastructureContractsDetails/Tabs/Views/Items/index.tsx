import { useContext } from "react";
import { ContractDetailsContext } from "../../..";
import MainPand from "./components/MainPand";

export default function ContractItemsDetails() {
  const contractData = useContext(ContractDetailsContext);
  console.log("MainPand::", contractData?.contractMainItems);
  return (
    <>
      {contractData?.contractMainItems?.map((contract) => (
        <MainPand key={contract.contract_id} contractData={contract} />
      ))}
    </>
  );
}

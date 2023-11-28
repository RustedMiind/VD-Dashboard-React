import { createContext, useEffect, useState } from "react";
import { Children, Contract } from "../../../../types";
import axios from "axios";
import { Api } from "../../../../constants";
import { useParams } from "react-router-dom";

export const ContractDetailsContext = createContext<null | Contract>(null);

function ContractDetailsContextProvider({ children }: PropsType) {
  const { id } = useParams();
  const [contractDetails, setContractDetails] = useState<null | Contract>(null);

  useEffect(() => {
    if (id)
      axios
        .get<{ data: Contract }>(Api(`employee/contract/${id}`))
        .then((res) => {
          console.log("Contract Details", res);
          setContractDetails(res.data.data);
        })
        .catch((err) => {
          console.log("Contract Details Error", err);
          setContractDetails(null);
        });
  }, []);

  return (
    <ContractDetailsContext.Provider value={contractDetails}>
      {children}
    </ContractDetailsContext.Provider>
  );
}

type PropsType = {
  children: Children;
};

export default ContractDetailsContextProvider;

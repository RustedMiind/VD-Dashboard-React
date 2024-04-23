import { createContext, useEffect, useState } from "react";
import { ContractItem } from "../../../../../../../../types/Contracts/ContractItems";
import { getContractItem } from "../../../../../../../../methods/api/contracts";
import { useSnackbar } from "notistack";

export type ContractItemContextType = {
  item?: ContractItem;
  fetchItemDetails?: (options?: {
    soft?: boolean;
    optimized?: boolean;
  }) => void;
  isLoading?: boolean;
};

export const ContractItemContext = createContext<ContractItemContextType>({});

function ContractItemContextProvider({ contractItemId, children }: PropsType) {
  const { enqueueSnackbar } = useSnackbar();
  const [item, setItem] = useState<ContractItem | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchItem(options?: { soft?: boolean; optimized?: boolean }) {
    if (options?.optimized && item?.id === contractItemId) return;
    if (!options?.soft) setIsLoading(true);
    try {
      const {
        data: { contract_item },
      } = await getContractItem(contractItemId);
      setItem(contract_item);
    } catch (error) {
      enqueueSnackbar("تعذر في تحميل بيانات البند", { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ContractItemContext.Provider
      value={{ item, isLoading, fetchItemDetails: fetchItem }}
    >
      {children}
    </ContractItemContext.Provider>
  );
}
type PropsType = {
  contractItemId: number;
  children: React.ReactNode;
};

export default ContractItemContextProvider;

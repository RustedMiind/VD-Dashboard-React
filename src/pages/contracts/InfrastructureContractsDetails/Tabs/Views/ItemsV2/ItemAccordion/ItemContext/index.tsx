import { createContext, useContext, useEffect, useState } from "react";
import { ContractItem } from "../../../../../../../../types/Contracts/ContractItems";
import { getContractItem } from "../../../../../../../../methods/api/contracts";
import { useSnackbar } from "notistack";
import { OpenCreateProcessingContext } from "../../CreateNewProcessingDialog/CreateProcessingContextProvider";

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
  const { createDialogOpened, processing } = useContext(
    OpenCreateProcessingContext
  );
  async function fetchItem(options?: { soft?: boolean; optimized?: boolean }) {
    console.log("fetch trigered");
    if (options?.optimized && item?.id === contractItemId) return;
    if (!options?.soft) {
      setIsLoading(true);
    }
    try {
      const {
        data: { contract_item },
      } = await getContractItem(contractItemId);
      if (!contract_item) throw new Error("no item fetched");
      setItem(contract_item);
      console.log("fetch ok", contract_item, "prevState: ", item);
    } catch (error) {
      enqueueSnackbar("تعذر في تحميل بيانات البند", { variant: "error" });

      console.log("fetch error", error);
    } finally {
      setIsLoading(false);
    }
  }

  console.log("didUpdate context", item);

  useEffect(() => {
    if (createDialogOpened === false && item) {
      console.log("100% refresh");
      fetchItem({ optimized: false, soft: true });
    }
  }, [createDialogOpened]);

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

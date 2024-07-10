import { TabEnum } from "../TabEnum";
import { useContext } from "react";
import { TabContext } from "..";
import DetailsView from "./Details";
import ContractItemsDetails from "./Items";
import ItemsV2 from "./ItemsV2";
import AttachmentTables from "./AttachmentTables";
import StandardContractDetailsContracts from "./StandardContract/Contractors";
import StandardContractTerms from "./StandardContract/terms";
function TabViews(): JSX.Element {
  const { tab } = useContext(TabContext);

  switch (tab) {
    case TabEnum.DETAILS:
      return <DetailsView />;
    case TabEnum.ITEMS:
      return <ContractItemsDetails />;
    case TabEnum.ITEMS_2:
      return <ItemsV2 />;
    case TabEnum.ATTACHMENTS:
      return <AttachmentTables />;
    case TabEnum.CONTRACTORS:
      return <StandardContractDetailsContracts />;
    case TabEnum.CONTRACTORS_TERMS:
      return <StandardContractTerms />;

    default:
      return <></>;
  }
}

export default TabViews;

import { TabEnum } from "../TabEnum";
import { useContext } from "react";
import { TabContext } from "..";
import DetailsView from "./Details";
import ContractItemsDetails from "./Items";
function TabViews(): JSX.Element {
  const { tab } = useContext(TabContext);

  switch (tab) {
    case TabEnum.DETAILS:
      return <DetailsView />;
    case TabEnum.ITEMS:
      return <ContractItemsDetails />;

    default:
      return <></>;
  }
}

export default TabViews;

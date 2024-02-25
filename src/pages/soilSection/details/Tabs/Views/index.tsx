import { TabEnum } from "../TabEnum";
import { useContext } from "react";
import { TabContext } from "..";
import DetailsView from "./DetailsView";
import ItemsView from "./ItemsView";
import AttachmentTables from "./AttachmentTables";

function TabViews(): JSX.Element {
  const { tab } = useContext(TabContext);

  switch (tab) {
    case TabEnum.DETAILS:
      return <DetailsView />;
    case TabEnum.DATES:
      return <>Hello Dates</>;
    case TabEnum.PROGRESS_LOG:
      return <>Hello ProgressLog</>;
    case TabEnum.ITEMS:
      return <ItemsView />;
    case TabEnum.ATTACHMENTS:
      return <AttachmentTables />;
    case TabEnum.WORK_SPACE:
      return <ItemsView strictOnlyAccess />;
    default:
      return <></>;
  }
}

export default TabViews;

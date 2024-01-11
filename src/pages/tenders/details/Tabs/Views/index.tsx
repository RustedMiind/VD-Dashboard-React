import { TabEnum } from "../TabEnum";
import { useContext } from "react";
import { TabContext } from "..";

function TabViews(): JSX.Element {
  const { tab } = useContext(TabContext);

  switch (tab) {
    case TabEnum.DETAILS:
      return <>Hello Details</>;
    case TabEnum.DATES:
      return <>Hello Dates</>;
    case TabEnum.PROGRESS_LOG:
      return <>Hello ProgressLog</>;
    case TabEnum.ITEMS:
      return <>Hello Items</>;
    case TabEnum.ATTACHMENTS:
      return <>Hello Attachments</>;
    case TabEnum.FINANCIAL:
      return <>Hello Financial</>;
    case TabEnum.REPORTS:
      return <>Hello Reports</>;
    case TabEnum.REQUESTS:
      return <>Hello Requests</>;
    case TabEnum.WORK_SPACE:
      return <>Hello WORK SPACE</>;
    default:
      return <></>;
  }
}

export default TabViews;

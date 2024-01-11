import { useContext } from "react";
import { TenderDataContext } from "../../..";

function DetailsView() {
  const { tender } = useContext(TenderDataContext);

  return <>{JSON.stringify(tender)}</>;
}

export default DetailsView;

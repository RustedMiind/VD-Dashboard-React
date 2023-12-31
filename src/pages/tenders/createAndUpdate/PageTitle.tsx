import { Skeleton, Typography } from "@mui/material";
import { useContext } from "react";
import { TenderContext } from "./TenderCondext";

function PageTitle() {
  const tenderContext = useContext(TenderContext);

  let title: React.ReactNode;

  switch (tenderContext.tender) {
    case "loading":
      title = <Skeleton width={250} />;
      break;
    case "error":
      title = "المنافسة غير موجودة";
      break;
    case "none":
      title = "انشاء منافسة";
      break;
    default:
      if (typeof tenderContext.tender === "object") {
        tenderContext.formStatus === "update" &&
          (title = "تعديل بيانات المنافسة");
        tenderContext.formStatus === "complete" &&
          (title = "اكمال بيانات المنافسة");
      }
      break;
  }

  return (
    <Typography variant="h5" fontWeight={600} mb={3}>
      {title}
    </Typography>
  );
}

export default PageTitle;

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { DialogTitle, Stack, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { SetProccessingContext } from "../../../context/SetProccessingContext";
import AddLabelToEl from "../../../../../../../../../../../../../../components/AddLabelToEl";
import SelectWithFilter from "../../../../../../../../../../../../../../components/SelectWithFilter";

export default function ReplyProccessingStep1(props: Tab1Props) {
  //TODO::define our component state variables
  const SetProccessingContextData = useContext(SetProccessingContext);
  const [transactionId, setTransactionId] = useState("");
  const [error, setError] = useState(false);

  //TODO::define helper functions
  const handleNextStep = () => {
    if (transactionId.trim().length == 0) {
      setError(true);
      return;
    } else setError(false);
    //!There is an operation here we will handle it.
    SetProccessingContextData.setTransactionId(parseInt(transactionId));
    props.setOperationProgress("Step2");
  };

  // * return ui
  return (
    <>
      <DialogTitle sx={{ textAlign: "center" }} fontWeight={800}>
        الرد على معاملة
      </DialogTitle>
      <DialogContent>
        <Stack padding={2} alignItems={"center"} justifyContent={"center"}>
          <AddLabelToEl label={"ادخل رقم المعاملة"} required>
            <SelectWithFilter
              options={SetProccessingContextData.subItem?.processing?.map(
                (ele) => ({
                  label: ele?.id ? ele?.id.toString() : "",
                  value: ele?.id ? ele?.id.toString() : "",
                })
              )}
              placeholder="ادخل رقم المعاملة"
              size="small"
              select
              onChange={(e) => setTransactionId(e.target.value)}
            />
            {error && (
              <Typography variant="body2" color="error">
                لا بد من ادخال رقم المعاملة
              </Typography>
            )}
          </AddLabelToEl>
          {/* Actions */}
          <Button
            sx={{
              width: "50%",
              marginTop: "3rem",
              borderRadius: "4px",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
            onClick={() => handleNextStep()}
            variant="contained"
          >
            التالي
          </Button>
          <Button
            sx={{
              width: "50%",
              marginTop: "8px",
              borderRadius: "4px",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
            onClick={props.handleClose}
            variant="outlined"
          >
            رجوع
          </Button>
        </Stack>
      </DialogContent>
    </>
  );
}

type Tab1Props = {
  handleClose: () => void;
  setOperationProgress: React.Dispatch<
    React.SetStateAction<"Step1" | "Step2" | "Step3">
  >;
};

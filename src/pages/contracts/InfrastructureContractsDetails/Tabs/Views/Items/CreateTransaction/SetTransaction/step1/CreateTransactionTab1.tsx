import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import {
  CircularProgress,
  DialogTitle,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import AddLabelToEl from "../../../../../../../../../components/AddLabelToEl";
import axios from "axios";
import { Api } from "../../../../../../../../../constants";
import { useSnackbar } from "notistack";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateTransactionContext } from "../../../context/CreateTransactionContext";
import { useContext, useState } from "react";

// TODO::define and declare our types
export type CreateTransactionFormHeaderType =
  | "requestNum"
  | "letterNum"
  | "transactionSubject"
  | "sendTo";
export const CreateTransactionFormSchema = z.object({
  requestNum: z.string(),
  letterNum: z.string(),
  transactionSubject: z.string(),
  sendTo: z.string(),
  // contract_sub_item_id: z.number(),
  // contract_attachment_types: z.array(z.number())
});
type CreateTransactionFormType = z.infer<typeof CreateTransactionFormSchema>;
export type CreateTransactionFormHeadersElementType = {
  id: string;
  label: string;
  name: CreateTransactionFormHeaderType;
  cols: number;
};
export const CreateTransactionFormHeaders: CreateTransactionFormHeadersElementType[] =
  [
    {
      id: `fh_${Math.random()}`,
      label: "رقم الطلب",
      name: "requestNum",
      cols: 6,
    },
    {
      id: `fh_${Math.random()}`,
      label: "رقم الخطاب",
      name: "letterNum",
      cols: 6,
    },
    {
      id: `fh_${Math.random()}`,
      label: "موضوع المعاملة",
      name: "transactionSubject",
      cols: 6,
    },
    {
      id: `fh_${Math.random()}`,
      label: "الجهة المرسلة لها المعاملة",
      name: "sendTo",
      cols: 6,
    },
  ];

export default function CreateTransactionTab1(
  props: CreateTransactionTab1Props
) {
  // TODO::declare component variables and state
  const [loading, setLoading] = useState(false);
  const transactionCxtData = useContext(CreateTransactionContext);
  const { enqueueSnackbar } = useSnackbar();
  const { register, handleSubmit } = useForm<CreateTransactionFormType>({
    resolver: zodResolver(CreateTransactionFormSchema),
  });

  //TODO::submit form function
  const handleCreateTransaction = handleSubmit(async (data) => {
    let bodyData = {
      order_num: data.requestNum,
      letter_num: data.letterNum,
      subject: data.transactionSubject,
      receiver: data.sendTo,
      contract_sub_item_id: transactionCxtData.contractSubItem?.id,
      contract_attachment_types: [],
    };
    try {
      console.log("bodyData ", bodyData);
      setLoading(true);
      let response = await axios.post(
        Api("employee/contract/items/processing/store"),
        bodyData
      );
      transactionCxtData.setTransactionId(response.data.processing.id);
      setLoading(false);
      enqueueSnackbar("تم الحفظ بنجاح");
      props.setOperationProgress("Step2");
      let prevVal = -1;
      props.setActiveSubItemId((prev) => {
        prevVal = prev;
        return -1;
      });
      props.setActiveSubItemId(prevVal);
    } catch (err) {
      setLoading(false);
      enqueueSnackbar("تعذر في حفظ", { variant: "error" });
    }
  });
  //TODO::Declare helpers methods
  const FieldGrid = ({
    text,
    name,
    cols,
  }: {
    text: string;
    name: CreateTransactionFormHeaderType;
    cols: number;
  }) => {
    return (
      <Grid item xs={cols} paddingX={1.5}>
        <AddLabelToEl label={text}>
          <TextField
            required
            size="small"
            {...register(name)}
            disabled={loading}
            placeholder={text}
          />
        </AddLabelToEl>
      </Grid>
    );
  };

  // *return component ui
  return (
    <>
      <DialogTitle
        sx={{ textAlign: "center" }}
        bgcolor={"background.default"}
        fontWeight={800}
      >
        انشاء معاملة جديدة
      </DialogTitle>
      <DialogContent sx={{ bgcolor: "background.default" }}>
        <Stack
          bgcolor={"background.default"}
          padding={2}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {/* Add form Header */}
          <Grid container>
            {CreateTransactionFormHeaders.map((header) => {
              return (
                <FieldGrid
                  key={header.id}
                  text={header.label}
                  name={header.name}
                  cols={header.cols}
                />
              );
            })}
            {/* save btn */}
            <Grid item textAlign={"center"} xs={12}>
              <Button
                sx={{
                  marginTop: "1.8rem",
                  borderRadius: "12px",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  width: "50%",
                }}
                onClick={() => {
                  handleCreateTransaction();
                }}
                variant="contained"
                fullWidth
                disabled={loading}
              >
                حفظ{" "}
                {loading && <CircularProgress size={"small"} color="primary" />}
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </DialogContent>
    </>
  );
}

type CreateTransactionTab1Props = {
  setOperationProgress: React.Dispatch<React.SetStateAction<"Step1" | "Step2">>;
  setActiveSubItemId: React.Dispatch<React.SetStateAction<number>>;
};

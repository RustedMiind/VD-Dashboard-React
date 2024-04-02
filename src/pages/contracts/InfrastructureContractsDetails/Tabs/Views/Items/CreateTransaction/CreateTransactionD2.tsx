import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { DialogTitle, Grid, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import AddLabelToEl from "../../../../../../../components/AddLabelToEl";
import ChooseAttachmentTypesDialog from "./ChooseAttachmentTypesDialog";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import TableShowAttachments from "./TableShowAttachments";
import axios from "axios";
import { Api } from "../../../../../../../constants";
import { serialize } from "object-to-formdata";
import { useSnackbar } from "notistack";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

export default function CreateTransactionsD2({
  open,
  activePandId,
  setOpen,
}: CreateTransactionsD2Props) {
  // TODO::declare our state variables
  const { register, reset, setValue, handleSubmit } =
    useForm<CreateTransactionFormType>({
      resolver: zodResolver(CreateTransactionFormSchema),
    });
  const [openAttachmentTypesDialog, setOpenAttachmentTypesDialog] =
    React.useState(false);
  const [attachmentTypes, setAttachmentTypes] = React.useState<string[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = React.useState(false);

  //TODO::submit form function
  const handleCreateTransaction = handleSubmit(async (data) => {
    console.log("submitted data::", data);
    let bodyData = {
      order_num: data.requestNum,
      letter_num: data.letterNum,
      subject: data.transactionSubject,
      receiver: data.sendTo,
      contract_sub_item_id: activePandId,
      contract_attachment_types: [],
      // contract_attachment_types[1]:2,
    };
    try {
      setLoading(true);
      await axios.post(
        Api("employee/contract/items/processing/store"),
        bodyData
      );
      setLoading(false);
      enqueueSnackbar("تم الحفظ بنجاح");
      handleClose();
    } catch (err) {
      setLoading(false);
      enqueueSnackbar("تعذر في حفظ بيانات الاعلان", { variant: "error" });
    }
  });
  //TODO::Declare helpers methods
  const handleClose = () => {
    setOpen(false);
    reset({});
    setAttachmentTypes([]);
  };
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
            placeholder={text}
          />
        </AddLabelToEl>
      </Grid>
    );
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: {
            width: "100vw",
            minHeight: 300,
          },
        }}
        component={"form"}
        onSubmit={handleCreateTransaction}
      >
        <DialogTitle
          sx={{ textAlign: "center" }}
          bgcolor={"background.default"}
          fontWeight={800}
        >
          انشاء معاملة جديدة
        </DialogTitle>
        <DialogContent
          sx={{
            bgcolor: "#fff",
            padding: "2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
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
            {/* Btn to add attachments */}
            {attachmentTypes.length == 0 && (
              <Grid item xs={6} paddingX={1.5}>
                <AddLabelToEl label={"مرفقات المعاملة"}>
                  <Button
                    size="small"
                    variant="text"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      border: "1px solid",
                    }}
                    onClick={() => setOpenAttachmentTypesDialog(true)}
                  >
                    <Typography variant="body2">اختيار</Typography>
                    <KeyboardArrowLeftOutlinedIcon />
                  </Button>
                </AddLabelToEl>
              </Grid>
            )}
            {/* show table for attachments */}
            {attachmentTypes.length > 0 && (
              <Grid item xs={12}>
                <TableShowAttachments attachmentTypes={attachmentTypes} />
              </Grid>
            )}
            {/* save btn */}
            <Grid
              item
              textAlign={"center"}
              xs={attachmentTypes.length == 0 ? 6 : 12}
            >
              <Button
                sx={{
                  marginTop: "1.8rem",
                  borderRadius: "12px",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  width: attachmentTypes.length ? "50%" : "100%",
                }}
                onClick={() => {
                  if (attachmentTypes.length) {
                    handleCreateTransaction();
                  } else {
                    setOpenAttachmentTypesDialog(true);
                  }
                }}
                variant="contained"
                fullWidth
              >
                {attachmentTypes.length == 0 ? "أضافة" : "حفظ"}
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <ChooseAttachmentTypesDialog
        open={openAttachmentTypesDialog}
        setOpen={setOpenAttachmentTypesDialog}
        setAttachmentTypes={setAttachmentTypes}
        attachmentTypes={attachmentTypes}
      />
    </>
  );
}

type CreateTransactionsD2Props = {
  open: boolean;
  activePandId: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

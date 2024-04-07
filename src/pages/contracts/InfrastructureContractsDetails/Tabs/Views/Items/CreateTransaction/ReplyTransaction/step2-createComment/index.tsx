import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import { DialogTitle, Grid, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import AddLabelToEl from "../../../../../../../../../components/AddLabelToEl";

// TODO::define and declare our types
export type CreateTransactionFormHeaderType = "notes" | "reply";

export type CreateTransactionFormType = {
  notes: string | undefined;
  reply: string | undefined;
};

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
      label: "الملاحظات",
      name: "notes",
      cols: 12,
    },
    {
      id: `fh_${Math.random()}`,
      label: "الرد",
      name: "reply",
      cols: 12,
    },
  ];

export default function ReplyTransactionTab2(props: Tab2Props) {
  // TODO::declare our state variables
  const { register, reset, handleSubmit } = useForm<CreateTransactionFormType>(
    {}
  );

  //TODO::submit form function
  const handleSaveComment = handleSubmit((data) => {
    console.log("submitted data::", data);
    props.setOperationProgress("Step3");
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
            placeholder={text}
          />
        </AddLabelToEl>
      </Grid>
    );
  };

  return (
    <>
      <DialogTitle
        sx={{ textAlign: "center" }}
        bgcolor={"background.default"}
        fontWeight={800}
      >
        الرد على المعاملة
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
                onClick={() => handleSaveComment() /*handle create comment*/}
                variant="contained"
                fullWidth
              >
                ارسال الرد
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </DialogContent>
    </>
  );
}

type Tab2Props = {
  setOperationProgress: React.Dispatch<
    React.SetStateAction<"Step1" | "Step2" | "Step3">
  >;
};

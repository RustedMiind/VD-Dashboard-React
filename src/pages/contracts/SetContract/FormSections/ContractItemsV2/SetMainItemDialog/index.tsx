import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Box,
  Grid,
  GridProps,
  Stack,
  TextField,
  TextFieldProps,
} from "@mui/material";
import AddLabelToEl from "../../../../../../components/AddLabelToEl";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  storeContractItemSchema,
  StoreContractItemSchemaType,
} from "../../../../../../methods/api/contracts";

const GridItem = (props: GridProps) => <Grid item xs={12} lg={6} {...props} />;

const textFieldDefaultProps: TextFieldProps = {
  fullWidth: true,
};

function SetMainItemDialog() {
  const { handleSubmit, control, register } =
    useForm<StoreContractItemSchemaType>({
      // resolver: zodResolver(storeContractItemSchema),
    });

  const { append, remove, fields } = useFieldArray({
    control,
    name: "sub_items",
  });

  const submit = handleSubmit(console.log);

  return (
    <Dialog
      open={true}
      component={"form"}
      onSubmit={submit}
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle>اضافة بند جديد</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <GridItem>
            <AddLabelToEl label="عنوان البند">
              <TextField label="عنوان البند" />
            </AddLabelToEl>
          </GridItem>
          <GridItem>
            <AddLabelToEl label="وصف البند">
              <TextField label="وصف البند" />
            </AddLabelToEl>
          </GridItem>
          <Grid item>
            <Stack spacing={1}>
              {fields.map((field, index) => (
                <>
                  <Box key={field.id}>
                    <TextField
                      label={`بند رقم ${index + 1}`}
                      {...register(`sub_items.${index}.name`)}
                    />
                  </Box>
                </>
              ))}
            </Stack>
            <Button
              onClick={() =>
                append({
                  name: "",
                  is_attachment: false,
                  is_processing: false,
                  is_progress_bar: false,
                  employee_id: -1,
                })
              }
            >
              اضافة بند اخر
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="error">الغاء</Button>
        <Button color="primary" variant="contained">
          حفظ
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SetMainItemDialog;

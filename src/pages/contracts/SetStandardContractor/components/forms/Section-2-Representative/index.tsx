import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import AddLabelToEl from "../../../../../../components/AddLabelToEl";
import ErrorMessage from "../Section-1-ContractorData/components/ErrorMessage";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Box } from "@mui/material";

export default function ContractorRepresentatives() {
  // TODO::declare and define component state and variables
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, control } = useForm<FormSchema>({
    defaultValues: {
      representatives: [{ name: "", phone: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: "representatives",
    control,
  });
  
  // TODO::declare and define component helper methods
  
  // * return component UI.
  return (
    <Grid container spacing={2}>
      {fields.map((field, idx) => {
        return (
          <Grid container key={idx}>
            {/* اسم المندوب */}
            <Grid item xs={5.5} px={2}>
              <AddLabelToEl label={"اسم المندوب"}>
                <TextField
                  size="small"
                  {...register(`representatives.${idx}.name`)}
                />
              </AddLabelToEl>
              <ErrorMessage show={false} messgae="اسم المندوب مطلوب" />
            </Grid>
            {/* رقم الجوال */}
            <Grid item xs={5.5} px={2}>
              <AddLabelToEl label={"رقم الجوال"}>
                <TextField
                  size="small"
                  {...register(`representatives.${idx}.phone`)}
                />
              </AddLabelToEl>
              <ErrorMessage show={false} messgae="رقم الجوال مطلوب" />
            </Grid>
            {/* remove btn */}
            <Grid item xs={1}>
              <Tooltip title="remove">
                <IconButton onClick={() => {}} color="error" sx={{ mt: 3 }}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        );
      })}
      <Box
        sx={{
          my: 4,
          bgcolor: "#d0dce9",
          color: "#004693",
          width: "100%",
          borderRadius: "12px",
          px: 4,
        }}
      >
        <Button
          variant="text"
          startIcon={<AddBoxOutlinedIcon />}
          onClick={() => append({ name: "", phone: "" })}
        >
          اضافة مندوب اخر
        </Button>
      </Box>

      <Button
        variant="contained"
        type="submit"
        fullWidth
        disabled={loading}
        sx={{ my: 4 }}
      >
        {loading && <CircularProgress size={16} />}
        {loading ? " جاري الحفظ...." : true ? "حفظ" : "تعديل"}
      </Button>
    </Grid>
  );
}

type FormSchema = {
  representatives: { name: string; phone: string }[];
};

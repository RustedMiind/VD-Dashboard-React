import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { useEffect, useState } from "react";
import AddLabelToEl from "../../../../components/AddLabelToEl";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  WorkOrderType,
  procedure,
} from "../../../../types/electricity/WorkOrderType";
import { Api } from "../../../../constants";
import { useSnackbar } from "notistack";
import { useLocation, useParams } from "react-router-dom";

const CreateOrUpdateWorkOrderType = () => {
  // Declare
  const [procedures, setProcedures] = useState<{ name: string }[]>([
    { name: "" },
  ]);
  const { register, reset, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      description: "",
      reference_number: null,
      procedures: [],
    },
  });
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [isEdit, setIsEdit] = useState(false);
  let { id } = useParams();
  let itemToEdit = useLocation().state;

  // TODO::handle which approach we will take (edit/add)
  useEffect(() => {
    if (id) {
      setIsEdit(true);
      setLoading(true);
      // TODO::get work order type data
      console.log("we will edit:", itemToEdit, id);
      reset({
        reference_number: itemToEdit.reference_number,
        name: itemToEdit.name,
        description: itemToEdit.description,
        procedures: itemToEdit.procedures,
      });
      setProcedures(
        itemToEdit.procedures.map((ele: procedure) => ({ name: ele.name }))
      );
      setLoading(false);
    }
  }, []);

  //TODO::declare helper variables
  const ControlInputField = ({
    label,
    name,
  }: {
    label: string;
    name: "name" | "description" | "procedures" | "reference_number";
  }) => {
    return (
      <Grid item xs={12} md={6} sx={{ padding: "0 0.3rem", marginY: "0.3rem" }}>
        <AddLabelToEl label={label} required>
          <TextField
            type="text"
            required
            size="small"
            disabled={loading}
            {...register(name)}
            placeholder={label}
          />
        </AddLabelToEl>
      </Grid>
    );
  };
  const SubHeader = ({ text }: { text: string }) => {
    return (
      <Box
        sx={{
          bgcolor: "background.paper",
          display: "flex",
          justifyContent: "space-between",
          padding: "0.5rem",
          alignItems: "center",
          borderRadius: "12px",
          marginY: "1rem",
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          {text}
        </Typography>
        <IndeterminateCheckBoxOutlinedIcon fontWeight={700} />
      </Box>
    );
  };

  //TODO::our functions
  const handleAddNewProcedure = () => {
    setProcedures([...procedures, { name: "" }]);
  };
  const handleFormSubmit = handleSubmit((formData) => {
    setLoading(true);
    let finalProcedures = procedures.filter((ele) => ele.name.trim().length);

    let data = {
      ...formData,
      procedures: finalProcedures,
    };
    console.log("Data ", data);

    (isEdit
      ? axios.put<{ work_type_instruction: WorkOrderType }>(
          Api(`employee/type-work-instruction/update/${itemToEdit.id}`),
          data
        )
      : axios.post<{ work_type_instruction: WorkOrderType }>(
          Api("employee/type-work-instruction"),
          data
        )
    )
      .then((res) => {
        console.log("response101", res);
        if (!isEdit) {
          reset({});
          setProcedures([{ name: "" }]);
        }
        if (isEdit) enqueueSnackbar("تم التعديل نوع امر العمل بنجاح");
        else enqueueSnackbar("تم أضافة نوع امر العمل بنجاح");
      })
      .catch((err) => {
        console.log("Error101 :-", err);
        enqueueSnackbar("تعذر الحفظ");
      })
      .finally(() => {
        setLoading(false);
      });
  });

  return (
    <Box component="form" onSubmit={handleFormSubmit}>
      <Typography variant="h4">أضافة نوع أمر عمل</Typography>
      <SubHeader text="بيانات أمر العمل" />
      <Grid
        container
        sx={{
          bgcolor: "background.paper",
          padding: "0.5rem",
          borderRadius: "12px",
        }}
      >
        <ControlInputField label="الرقم المرجعي" name="reference_number" />
        <ControlInputField label="أسم امر العمل" name="name" />
        <Grid
          item
          xs={12}
          md={6}
          sx={{ padding: "0 0.3rem", marginY: "0.3rem" }}
        >
          <AddLabelToEl label="وصف امر العمل" required>
            <textarea
              rows={5}
              readOnly={loading}
              {...register("description")}
              style={{
                width: "100%",
                border: "1px solid lightgray",
                borderRadius: "12px",
                outline: "none",
                padding: "0.4rem",
                backgroundColor: "inherit",
                color: "inherit",
                fontSize: "1rem",
              }}
            ></textarea>
          </AddLabelToEl>
        </Grid>
      </Grid>
      <SubHeader text="بيانات الاجرات" />
      <Grid
        container
        sx={{
          bgcolor: "background.paper",
          padding: "0.5rem",
          borderRadius: "12px",
        }}
      >
        {procedures.map((pro, idx) => {
          return (
            <Grid
              key={`${idx}_${pro.name}`}
              item
              xs={12}
              sx={{ padding: "0 0.3rem", marginY: "0.3rem" }}
            >
              <AddLabelToEl label="أسم الاجراء" required>
                <TextField
                  type="text"
                  required
                  disabled={loading}
                  size="small"
                  defaultValue={pro.name}
                  onBlur={(e) => {
                    let arr: { name: string }[] = procedures;
                    arr[idx] = { name: e.target.value };
                    setProcedures([...arr]);
                  }}
                  placeholder="أسم الاجراء"
                />
              </AddLabelToEl>
            </Grid>
          );
        })}

        <Button
          variant="contained"
          sx={{
            bgcolor: "rgb(22 99 183 / 88%)",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
          }}
          startIcon={<AddBoxOutlinedIcon />}
          type={"button"}
          onClick={() => handleAddNewProcedure()}
        >
          أضافة أجراء أخر
        </Button>
      </Grid>

      <Button
        variant="contained"
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginY: "2rem",
        }}
        type={"submit"}
      >
        حفظ
      </Button>
    </Box>
  );
};

export default CreateOrUpdateWorkOrderType;

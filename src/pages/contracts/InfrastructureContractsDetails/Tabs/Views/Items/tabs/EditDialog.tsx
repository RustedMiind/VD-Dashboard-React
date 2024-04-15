import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Box, Grid, TextField, Typography } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { z } from "zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect } from "react";
import { ContractDetailsContext } from "../../../..";
import AddLabelToEl from "../../../../../../../components/AddLabelToEl";
import DoneAndReminder from "../../../../components/DoneAndReminder";
import { Api } from "../../../../../../../constants";
import { CreateTransactionContext } from "../context/CreateTransactionContext";

const formSchema = z.object({
  achievement_percentage: z.number().min(0).max(100),
});
type FormType = z.infer<typeof formSchema>;
export default function EditRaioDialog({
  open,
  setOpen,
  setRatio,
}: dialogProps) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormType>({ resolver: zodResolver(formSchema) });
  const { contractSubItem } = useContext(CreateTransactionContext);
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const onSubmit = handleSubmit(async (data) => {
    try {
      await axios.post(
        Api(
          `employee/contract/items/update-sub-item-percentage/${contractSubItem?.id}`
        ),
        data
      );
      enqueueSnackbar("تم الحفظ بنجاح");
      setRatio(data.achievement_percentage);
      handleClose();
    } catch (err) {
      enqueueSnackbar("تعذر في حفظ  ", { variant: "error" });
    }
  });
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (id) {
      reset({
        achievement_percentage: contractSubItem?.achievement_percentage,
      });
    }
  }, []);
  return (
    <>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        onSubmit={onSubmit}
        component={"form"}
      >
        <Typography
          variant="h6"
          width={"32rem"}
          fontWeight={700}
          textAlign={"center"}
          marginTop={2}
        >
          تعديل نسب الانجاز الكلية
        </Typography>
        <DialogContent>
          <AddLabelToEl label="النسبة المئوية">
            <TextField
              {...register("achievement_percentage", {
                valueAsNumber: true,
              })}
              size="small"
              placeholder="النسبة المئوية"
              type="number"
            />
            <Typography variant="body2" color={"error"}>
              {errors.achievement_percentage?.message}
            </Typography>
          </AddLabelToEl>
          <br />
          <Grid container sx={{ paddingBottom: "1rem" }}>
            <Grid item xs={4}>
              <DoneAndReminder column={true} />
            </Grid>
            <Grid item xs={8} sx={{ marginTop: "3.4rem" }}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "start",
                  position: "relative",
                  paddingX: "1rem",
                }}
              >
                <CircularProgress
                  style={{ width: "90px" }}
                  variant="determinate"
                  color={"warning"}
                  value={watch("achievement_percentage") | 0}
                />
                <Typography
                  sx={{
                    position: "absolute",
                    fontSize: "18px",
                    fontWeight: 900,
                    top: "8px",
                  }}
                  color={"warning"}
                  variant="body2"
                >
                  {watch("achievement_percentage") | 0}%
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid
            container
            xs={12}
            sx={{
              marginTop: "2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              type="submit"
              sx={{
                width: "60%",
                bgcolor: "primary.main",
                color: "#fff",
                marginY: "3px",
                transition: "all 0.5s ease-in-out",
                ":hover": {
                  bgcolor: "primary.main",
                  color: "#fff",
                  transform: "scale(1.056)",
                  boxShadow: "1px 1px 3px 3px lightgray",
                },
              }}
            >
              حفظ
            </Button>
            <Button
              variant="outlined"
              sx={{
                width: "60%",
                border: "1px solid",
                marginY: "3px",
                transition: "all 0.5s ease-in-out",
                ":hover": {
                  bgcolor: "primary.main",
                  color: "#fff",
                  transform: "scale(1.056)",
                  boxShadow: "1px 1px 3px 3px lightgray",
                },
              }}
              onClick={() => handleClose()}
            >
              عودة
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
type dialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setRatio: React.Dispatch<React.SetStateAction<number | undefined>>;
};

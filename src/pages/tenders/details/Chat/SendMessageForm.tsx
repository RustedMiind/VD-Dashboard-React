import { IconButton, Stack, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { Api } from "../../../../constants";
import { useForm } from "react-hook-form";
import { TenderDataContext } from "..";
import { useContext } from "react";
import { useSnackbar } from "notistack";

function SendMeessageForm(props: PropsType) {
  const { register, reset, handleSubmit } = useForm({
    defaultValues: { message: "" },
  });
  const { tender } = useContext(TenderDataContext);
  const { enqueueSnackbar } = useSnackbar();
  const formSubmit = handleSubmit((dto) => {
    if (typeof tender === "object") {
      reset();
      axios.post(Api("employee/tender/chat/" + tender.id), dto).catch(() => {
        enqueueSnackbar("تعذر في ارسال رسالتك لباقي مستخدمين المنافسة");
      });
    }
  });

  return (
    <Stack component={"form"} direction={"row"} onSubmit={formSubmit}>
      <TextField
        sx={{ flexGrow: 1 }}
        size="small"
        label="اكتب رسالتك هنا"
        variant="filled"
        {...register("message")}
      />
      <Stack direction="row" alignItems="center" justifyContent="center">
        <IconButton type="submit" size="small">
          <SendIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
}

type PropsType = {
  getMessages: () => void;
};
export default SendMeessageForm;

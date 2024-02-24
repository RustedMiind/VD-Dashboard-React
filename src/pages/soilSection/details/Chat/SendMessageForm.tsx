import { IconButton, LinearProgress, Stack, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { Api } from "../../../../constants";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { useSnackbar } from "notistack";
import AttachmentIcon from "@mui/icons-material/Attachment";
import { serialize } from "object-to-formdata";
import { SoilDataContext } from "..";
import { useLocation, useParams } from "react-router-dom";

function SendMeessageForm(props: PropsType) {
  const { register, reset, handleSubmit } = useForm({
    defaultValues: { message: "" },
  });
  const [progress, setProgress] = useState<undefined | number>(undefined);
  const { soilData } = useContext(SoilDataContext);
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const { pathname } = useLocation();
  const diffTask = pathname.includes("showtask");
  const formSubmit = handleSubmit((dto) => {
    if (typeof soilData === "object") {
      reset();
      axios
        .post(Api("employee/soil/chat/" + (diffTask ? soilData.id : id)), dto)
        .catch(() => {
          enqueueSnackbar("تعذر في ارسال رسالتك لباقي مستخدمين المنافسة", {
            variant: "error",
          });
        });
    }
  });

  return (
    <Stack component={"form"} direction={"row"} onSubmit={formSubmit}>
      <Stack sx={{ flexGrow: 1 }}>
        <TextField
          size="small"
          fullWidth
          label="اكتب رسالتك هنا"
          variant="filled"
          InputProps={{
            endAdornment: (
              <IconButton component="label">
                <input
                  type="file"
                  onChange={(e) => {
                    const targetFile = e.target.files && e.target.files[0];

                    if (
                      targetFile instanceof File &&
                      typeof soilData === "object"
                    ) {
                      const serialized = serialize({
                        message: targetFile,
                      });
                      axios
                        .post(
                          Api("employee/soil/chat/" + soilData.id),
                          serialized,
                          {
                            onUploadProgress: (data) => {
                              //Set the progress value to show the progress bar
                              if (data.total)
                                setProgress(
                                  Math.round((100 * data.loaded) / data.total)
                                );
                            },
                          }
                        )
                        .catch(() => {
                          enqueueSnackbar(
                            "تعذر في ارسال رسالتك لباقي مستخدمين الخدمة",
                            { variant: "error" }
                          );
                        })
                        .finally(() => {
                          setProgress(undefined);
                        });
                    } else {
                      enqueueSnackbar("لم يتم التعرف علي الملف المراد ارفاقه", {
                        variant: "error",
                      });
                    }
                  }}
                  style={{ display: "none" }}
                />
                <AttachmentIcon />
              </IconButton>
            ),
          }}
          {...register("message")}
        />
        {typeof progress === "number" && (
          <LinearProgress value={progress} variant="determinate" />
        )}
      </Stack>
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

import {
  Stack,
  Typography,
  Box,
  Tabs,
  Tab,
  Paper,
  Button,
  TextField,
  Input,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { TypeAdd } from "./AddClient";

const paddingSize = 0.1;
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
export default function FormAdd(props: PropsType) {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "50ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <Grid container>
        <Grid item p={paddingSize} md={6}>
          <Stack>
            <Typography component="label" sx={{ ml: 2 }}>
              {props.typeAdd === "فرد" ? "اسم العميل *" : "اسم الشركه *"}
            </Typography>
            <TextField
              id="outlined-name-input"
              type="text"
              required
              size="small"
            />
          </Stack>
        </Grid>
        <Grid item p={paddingSize} md={6}>
          <Stack>
            <Typography sx={{ ml: 2 }} component="label">
              {props.typeAdd === "فرد"
                ? "رقم الهويه * "
                : "السجل التجاري *    "}
            </Typography>
            <TextField
              id="outlined-idNumber-input"
              type="number"
              required
              size="small"
            />
          </Stack>
        </Grid>
        <Grid item p={paddingSize} md={6}>
          <Stack>
            <Typography sx={{ ml: 2 }} component="label">
              رقم الجوال *
            </Typography>
            <TextField
              id="outlined-phone-input"
              type="number"
              required
              size="small"
            />
          </Stack>
        </Grid>
        <Grid item p={paddingSize} md={6}>
          <Stack>
            <Typography sx={{ ml: 2 }} component="label">
              البريد الالكتروني
            </Typography>
            <TextField
              id="outlined-email-input"
              type="email"
              required
              size="small"
            />
          </Stack>
        </Grid>
        {props.typeAdd === "شركه" && (
          <>
            <Grid item p={paddingSize} md={6}>
              <Stack>
                <Typography sx={{ ml: 2 }} component="label">
                  اسم الوكيل
                </Typography>
                <TextField
                  id="outlined-address-input"
                  type="text"
                  required
                  size="small"
                />
              </Stack>
            </Grid>
            <Grid item p={paddingSize} md={6}>
              <Stack>
                <Typography sx={{ ml: 2 }} component="label">
                  الوسيط
                </Typography>
                <TextField
                  id="outlined-address-input"
                  type="text"
                  required
                  size="small"
                />
              </Stack>
            </Grid>
          </>
        )}
        <Grid item p={paddingSize} md={6}>
          <Stack>
            <Typography sx={{ ml: 2 }} component="label">
              الفرع *
            </Typography>
            <TextField
              id="outlined-branch-input"
              type="text"
              required
              size="small"
            />
          </Stack>
        </Grid>
        {props.typeAdd === "فرد" && (
          <Grid item p={paddingSize} md={6}>
            <Stack>
              <Typography sx={{ ml: 2 }} component="label">
                الوسيط
              </Typography>
              <TextField
                id="outlined-address-input"
                type="text"
                required
                size="small"
              />
            </Stack>
          </Grid>
        )}

        {props.typeAdd === "شركه" && (
          <Grid item p={paddingSize} md={6}>
            <Stack>
              <Typography sx={{ ml: 2 }} component="label">
                ارفاق صورة الهويه
              </Typography>
              <Box sx={{ mt: 1, ml: 1 }}>
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload file
                  <VisuallyHiddenInput type="file" />
                </Button>
              </Box>
            </Stack>
          </Grid>
        )}

        <Grid item p={paddingSize} md={12}>
          <Stack width="100%" maxWidth="100%">
            <Typography sx={{ ml: 2 }} component="label">
              عنوان المراسلات
            </Typography>
            <TextField
              id="outlined-address-input"
              type="text"
              required
              size="small"
              fullWidth
            />
          </Stack>
        </Grid>

        {props.typeAdd === "فرد" && (
          <Grid item p={paddingSize} md={5}>
            <Stack>
              <Typography sx={{ ml: 2 }} component="label">
                ارفاق صورة الهويه
              </Typography>
              <Box sx={{ mt: 1, ml: 1 }}>
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                >
                  ارفاق صورة
                  <VisuallyHiddenInput type="file" />
                </Button>
              </Box>
            </Stack>
          </Grid>
        )}
        <Grid item p={paddingSize} md={9} sx={{ marginX: "auto", mt: 2 }}>
          <Button fullWidth type="submit" variant="contained">
            حفظ
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

type PropsType = { typeAdd: TypeAdd };

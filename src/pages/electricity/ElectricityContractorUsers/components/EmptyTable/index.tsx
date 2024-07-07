import { Button, Paper, Stack, Typography } from "@mui/material";
import Img from "../../../../../assets/images/branch-empty.png";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

export default function EmptyTable(props: PropsType) {
  return (
    <Paper
      sx={{
        overflow: "hidden",
        mb: 7,
        marginTop: "5rem",
      }}
      elevation={4}
    >
      <Stack
        width={"100%"}
        height={"500px"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <img src={Img} width={"224px"} height={"245px"} alt="" />
        <Typography
          variant="body2"
          sx={{ fontSize: "1.2rem", color: "lightgray", my: 4 }}
        >
          لا يوجد مستخدمين
        </Typography>
        <Button
          variant="contained"
          onClick={() => props.setOpenDialog(true)}
          startIcon={<AddBoxOutlinedIcon />}
        >
          اضافة مستخدمين
        </Button>
      </Stack>
    </Paper>
  );
}

type PropsType = {
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

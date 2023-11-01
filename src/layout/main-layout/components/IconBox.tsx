import { Box, Typography } from "@mui/material";
import logo from "../../../assets/images/logo.png";

function IconBox() {
  return (
    <Box
      width={1}
      display={"flex"}
      flexDirection={"column"}
      pt={4}
      pb={2}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <img src={logo} alt="logo" width={98} />
      <Typography variant="h6" mt={2}>
        بوابة الموظف
      </Typography>
    </Box>
  );
}

export default IconBox;

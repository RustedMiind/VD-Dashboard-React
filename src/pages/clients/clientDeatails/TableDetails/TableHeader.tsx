import { Grid, Typography, Button, TextField, Box } from "@mui/material";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import DeleteIcon from "@mui/icons-material/Delete";
import StatusChip from "../../../../components/StatusChip";
import { useState } from "react";

function TableHeader(props: PropsType) {
  const [searchCode, setSearchCode] = useState<number | null>(null);
  return (
    <Grid container px={2} py={1} alignItems={"center"}>
      <Grid item xs={2}>
        <Typography
          variant="subtitle2"
          fontWeight={"800"}
          sx={{ fontSize: "16px" }}
        >
          حالة العقود
        </Typography>
        <Box width={0.8} display={"flex"} justifyContent={"space-between"}>
          <StatusChip color="primary" label={0} />
          <StatusChip color="warning" label={0} />
          <StatusChip color="error" label={0} />
          <StatusChip color="secondary" label={0} />
        </Box>
      </Grid>
      <Grid item xs={6} display={"flex"} flexDirection={"row"}>
        <TextField
          onChange={(e) => {
            setSearchCode(parseInt(e.target.value));
          }}
          label="بحث"
          fullWidth
          size="small"
        />
        <Box>
          <Button
            onClick={(e) => {
              props.setToSearch(searchCode);
            }}
            variant="contained"
            sx={{ ml: 5 }}
          >
            بحث
          </Button>
        </Box>
      </Grid>
      <Grid item xs={4} display={"flex"} justifyContent={"end"}>
        <Box>
          <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
            حذف
          </Button>
          <Button
            variant="outlined"
            sx={{ ml: 2 }}
            startIcon={<CreditScoreIcon />}
          >
            تعديل
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
type PropsType = {
  setToSearch: React.Dispatch<React.SetStateAction<number | null>>;
};
export default TableHeader;

import {
  Grid,
  Typography,
  Button,
  TextField,
  Box,
  Stack,
  Chip,
} from "@mui/material";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import DeleteIcon from "@mui/icons-material/Delete";
import StatusChip from "../../../../components/StatusChip";
import { useState } from "react";
import { isStringAllNumbers } from "../../../../methods";

function TableHeader(props: PropsType) {
  const [searchCode, setSearchCode] = useState<string>();
  return (
    <Stack px={2} py={1} gap={8} direction="row" alignItems={"end"}>
      <Stack gap={1}>
        <Typography
          variant="subtitle2"
          fontWeight={"800"}
          sx={{ fontSize: "16px" }}
        >
          حالة العقود
        </Typography>
        <Stack spacing={1} direction={"row"}>
          <Chip color="primary" label={props.contractsCounts.end} />
          <Chip color="warning" label={props.contractsCounts.late} />
          <Chip color="error" label={props.contractsCounts.stopped} />
          <Chip color="success" label={props.contractsCounts.work} />
        </Stack>
      </Stack>
      <Stack direction={"row"} flexGrow={1} gap={1}>
        <TextField
          onChange={(e) => {
            isStringAllNumbers(e.target.value);
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
            sx={{ px: 4 }}
          >
            بحث
          </Button>
        </Box>
      </Stack>
      <Stack direction={"row"} gap={1}>
        <Button
          variant="outlined"
          size="medium"
          color="error"
          startIcon={<DeleteIcon />}
        >
          حذف
        </Button>
        <Button variant="outlined" startIcon={<CreditScoreIcon />}>
          تعديل
        </Button>
      </Stack>
    </Stack>
  );
}
type PropsType = {
  setToSearch: React.Dispatch<React.SetStateAction<string | undefined>>;
  contractsCounts: {
    end: number;
    work: number;
    late: number;
    stopped: number;
  };
};
export default TableHeader;

import { Typography, Button, TextField, Box, Stack, Chip } from "@mui/material";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import DeleteIcon from "@mui/icons-material/Delete";
import { isStringAllNumbers } from "../../../../methods";
import axios from "axios";
import { Api } from "../../../../constants";
import { useNavigate } from "react-router-dom";

function TableHeader(props: PropsType) {
  const deleteDisabled = props.selectedItems.length === 0;
  const updateDisabled = props.selectedItems.length !== 1;
  const navigate = useNavigate();
  function onDelete() {
    axios
      .post(Api("employee/contract/delete"), {
        id: props.selectedItems,
      })
      .then(() => {
        props.getContractsData();
      });
  }

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
      <Stack
        direction={"row"}
        component={"form"}
        onSubmit={(e) => {
          e.preventDefault();
          props.getContractsData();
        }}
        flexGrow={1}
        gap={1}
      >
        <TextField
          onChange={(e) => {
            const value = e.target.value;
            if (isStringAllNumbers(value)) {
              props.setToSearch(value);
            }
          }}
          value={props.search}
          label="بحث"
          fullWidth
          size="small"
        />
        <Box>
          <Button type="submit" variant="contained" sx={{ px: 4 }}>
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
          disabled={deleteDisabled}
          onClick={onDelete}
        >
          حذف
        </Button>
        <Button
          onClick={() => {
            navigate(`../../contracts/${props.selectedItems[0]}/edit`);
          }}
          variant="outlined"
          startIcon={<CreditScoreIcon />}
          disabled={updateDisabled}
        >
          تعديل
        </Button>
      </Stack>
    </Stack>
  );
}
type PropsType = {
  setToSearch: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  selectedItems: number[];
  contractsCounts: {
    end: number;
    work: number;
    late: number;
    stopped: number;
  };
  getContractsData: () => void;
};
export default TableHeader;

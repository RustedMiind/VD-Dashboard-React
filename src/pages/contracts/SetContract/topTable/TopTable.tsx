import { Box, Stack } from "@mui/system";
import DoubleChips from "../../../../components/DoubleStatusChips";
import BtnCus from "./BtnCus";
import { Button, Typography } from "@mui/material";
import { PropType } from "./TableHeader";
import { ContractsContext } from "../../Context/ContractsContext";
import { useContext } from "react";

export default function TopTable({ value }: PropType) {
  let contractsContext = useContext(ContractsContext);

  return (
    <Stack>
      {value === 0 ? (
        <Typography sx={{ mt: 2 }}>حالات العقود</Typography>
      ) : (
        <Stack direction={"row"} spacing={2}>
          <Button variant="contained" sx={{ width: "50%" }}>
            العقود المنشأه
          </Button>
          <Button variant="outlined" sx={{ width: "50%" }}>
            العقود المحوله
          </Button>
        </Stack>
      )}
      <Stack
        direction={"row"}
        justifyContent={value === 0 ? "space-between" : "end"}
      >
        {value === 0 && (
          <Stack direction={"row"} spacing={2} mb={1}>
            <DoubleChips
              color="success"
              label="ساري"
              value={contractsContext.contracts?.contract_work}
            />
            <DoubleChips
              color="warning"
              label="متأخر"
              value={contractsContext.contracts?.contract_payment}
            />
            <DoubleChips
              color="error"
              label="متوقف"
              value={contractsContext.contracts?.contract_stop}
            />
            <DoubleChips
              color="primary"
              label="منتهي"
              value={contractsContext.contracts?.contract_end}
            />
          </Stack>
        )}
        <Box>
          <BtnCus />
        </Box>
      </Stack>
    </Stack>
  );
}

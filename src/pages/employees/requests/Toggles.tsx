import {
  Stack,
  Chip,
  Badge,
} from "@mui/material";

function RequestTypesToggles() {
  return ( 
    <Stack
          sx={{
            alignItems: "end",
            gap: 2,
            flexDirection: "row",
            mb: 1,
          }}
        >
          <Badge badgeContent={4} color="error">
            <Chip
              color="primary"
              onClick={() => {}}
              variant="outlined"
              label="اجازات"
            />
          </Badge>
          <Chip
            color="primary"
            onClick={() => {}}
            variant="outlined"
            label="مهام عمل"
          />
          <Chip
            color="primary"
            onClick={() => {}}
            variant="outlined"
            label="سلف"
          />
          <Chip
            color="primary"
            onClick={() => {}}
            variant="outlined"
            label="عهد"
          />
          <Chip
            color="primary"
            onClick={() => {}}
            variant="outlined"
            label="احتياجات عمل"
          />
          <Chip
            color="primary"
            onClick={() => {}}
            variant="outlined"
            label="صيانة سيارة"
          />
        </Stack>
   );
}

export default RequestTypesToggles;
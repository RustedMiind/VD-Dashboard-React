import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import AddLabelToEl from "../../../../../components/AddLabelToEl";
import { useEffect, useState } from "react";

type userT = { id: number; full_name: string };
type PandT = {
  name: string;
  eng_id: number | undefined;
  is_percent: boolean;
  is_treatment: boolean;
  is_attachment: boolean;
  is_mission: boolean;
  is_letter: boolean;
};

export default function SinglePand({
  users,
  subPandsArr,
  idx,
  disabled,
  setPandData,
}: {
  disabled: boolean;
  users: userT[];
  idx: number;
  subPandsArr: PandT[];
  setPandData: React.Dispatch<React.SetStateAction<PandT[]>>;
}) {
  // * define pand data
  const [Pand, setPand] = useState<PandT>({
    name: subPandsArr.length > idx ? subPandsArr[idx].name : "",
    eng_id: subPandsArr.length > idx ? subPandsArr[idx].eng_id : undefined,
    is_percent: subPandsArr.length > idx ? subPandsArr[idx].is_percent : false,
    is_treatment:
      subPandsArr.length > idx ? subPandsArr[idx].is_treatment : false,
    is_attachment:
      subPandsArr.length > idx ? subPandsArr[idx].is_attachment : false,
    is_mission: subPandsArr.length > idx ? subPandsArr[idx].is_mission : false,
    is_letter: subPandsArr.length > idx ? subPandsArr[idx].is_letter : false,
  });

  useEffect(() => {
    let arr = subPandsArr;
    arr[idx] = Pand;
    setPandData(arr);
  }, [Pand]);

  return (
    <Grid
      container
      spacing={2}
      xs={12}
      sx={{
        bgcolor: "white",
        width: "95%",
        padding: "1rem",
        marginBottom: "2rem",
        borderRadius: "12px",
      }}
    >
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          alignItems: "start",
        }}
      >
        <AddLabelToEl label="اسم البند الفرعي">
          <TextField
            disabled={disabled}
            id="outlined-select-currency-0909"
            size="small"
            variant="outlined"
            fullWidth
            defaultValue={Pand.name}
            onChange={(e) =>
              setPand((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </AddLabelToEl>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          alignItems: "start",
          justifyContent: "start",
        }}
      >
        <AddLabelToEl label="أختيار المهندس">
          <TextField
            disabled={disabled}
            id="outlined-select-currency-0909"
            size="small"
            select
            variant="outlined"
            fullWidth
            value={Pand.eng_id}
            onChange={(e) =>
              setPand((prev) => ({ ...prev, eng_id: +e.target.value }))
            }
          >
            {users?.map((employee) => (
              <MenuItem key={employee.id} value={employee.id}>
                {employee.full_name}
              </MenuItem>
            ))}
          </TextField>
        </AddLabelToEl>
      </Grid>
      <Grid xs={12} sx={{ marginTop: "2rem" }}>
        <Box alignItems={"start"} display="flex" flexDirection="column">
          <Typography>المسموح للبند</Typography>
          <Box display="flex">
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={Pand.is_percent}
                    onChange={(e, checked) =>
                      setPand((prev) => ({ ...prev, is_percent: checked }))
                    }
                  />
                }
                label="النسبة المئوية"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={Pand.is_treatment}
                    onChange={(e, checked) =>
                      setPand((prev) => ({ ...prev, is_treatment: checked }))
                    }
                  />
                }
                label="معاملات"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={Pand.is_attachment}
                    onChange={(e, checked) =>
                      setPand((prev) => ({ ...prev, is_attachment: checked }))
                    }
                  />
                }
                label="المرفقات"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={Pand.is_mission}
                    onChange={(e, checked) =>
                      setPand((prev) => ({ ...prev, is_mission: checked }))
                    }
                  />
                }
                label="المهمات"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={Pand.is_letter}
                    onChange={(e, checked) =>
                      setPand((prev) => ({ ...prev, is_letter: checked }))
                    }
                  />
                }
                label="الخطابات"
              />
            </FormGroup>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FormControlLabel, Grid, Radio, RadioGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";
import getFormOptions from "../createAndUpdate/getFormOptions";
import { useEffect, useState } from "react";
import {
  TenderFormOptionTypes,
  toOptionArr,
} from "../createAndUpdate/Forms/MainDataForm";

function CreateDialog(props: PropsType) {
  const navigate = useNavigate();

  const [options, setOptions] = useState<TenderFormOptionTypes>({});
  const [selectedOption, setSelectedOption] = useState("");

  function goToCreate() {
    props.onClose();
    setTimeout(() => {
      navigate(`create?type=${selectedOption}`);
    }, 50);
  }

  useEffect(getOptions, []);

  return (
    <Dialog open={props.open} onClose={props.onClose} fullWidth maxWidth={"sm"}>
      <DialogTitle>انشاء منافسة جديدة</DialogTitle>
      <DialogContent>
        <RadioGroup
          row
          value={selectedOption}
          onChange={(e, v) => {
            setSelectedOption(v);
          }}
        >
          <Grid container sx={{ py: 2 }} justifyContent="space-between">
            {options.tenderTypes?.map((option) => (
              <Grid item>
                <FormControlLabel
                  value={option.value}
                  control={<Radio />}
                  label={option.name}
                  checked={selectedOption === option.value}
                />
              </Grid>
            ))}
          </Grid>
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>الغاء</Button>
        <Button
          variant="contained"
          onClick={goToCreate}
          disabled={!selectedOption}
        >
          انشاء منافسة
        </Button>
      </DialogActions>
    </Dialog>
  );

  function getOptions() {
    getFormOptions({})
      .then((data) => {
        setOptions({
          allEmployees: toOptionArr(data.employees_branch),
          branches: toOptionArr(data.banches),
          managementEmployee: toOptionArr(data.employees_management),
          managementes: toOptionArr(data.managements),
          departments: toOptionArr(data.departments),
          applyMethods: toOptionArr(data.apply),
          warranties: toOptionArr(data.warranty),
          organization: toOptionArr(data.organization),
          tenderTypes: toOptionArr(data.type),
        });
      })
      .catch((err) => {});
  }
}

export default CreateDialog;

type PropsType = {
  open: boolean;
  onClose: () => void;
};

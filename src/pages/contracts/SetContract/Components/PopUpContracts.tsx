import { FormControl } from "@mui/base";
import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  FormControlLabel,
  Radio,
  Box,
  RadioGroup,
} from "@mui/material";
import { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { NavLink, useLocation, useParams } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material";
import axios from "axios";
import { Api } from "../../../../constants";
import { SelectOptions } from "../FormSections/ContractDataSection/SelectOptions";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
export default function PopUpContracts(props: PropType) {
  const location = useLocation();
  const currentPath = location.pathname;
  const [requests, setRequests] = useState<SelectOptions | null>(null);
  const [contract_id, setContract_id] = useState<number | undefined>(undefined);
  const newPath = currentPath.replace(
    `${currentPath}`,
    `/react/contracts/create/${contract_id}`
  );
  const [isChecked, setIsChecked] = useState<string>();

  useEffect(() => {
    axios
      .get<SelectOptions>(Api("employee/contract/use"))
      .then((res) => {
        setRequests(res.data);
      })
      .catch((err) => {
        setRequests(null);
      });
  }, []);

  return (
    <BootstrapDialog
      onClose={props.handleClose}
      aria-labelledby="customized-dialog-title"
      open={props.open}
    >
      <DialogTitle
        sx={{ m: 0, p: 2, fontWeight: "bold", textAlign: "center" }}
        id="customized-dialog-title"
        variant="h5"
        component="h2"
      >
        انشاء عقد جديد
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={props.handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              sx={{ display: "flex", justifyContent: "center" }}
              onChange={(e) => {
                setContract_id(parseInt(e.target.value));
              }}
            >
              {requests?.contractType?.map((type) => (
                <FormControlLabel
                  key={type.id}
                  value={type.id}
                  control={<Radio />}
                  label={type.name}
                  disabled={type.name !== "ادخال مباشر"}
                  onChange={(e: React.SyntheticEvent<Element, Event>) => {
                    setIsChecked("4");
                  }}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <Button
            variant="contained"
            component={NavLink}
            to={`${newPath}`}
            sx={{ my: 5 }}
            disabled={!!!isChecked}
          >
            الذهاب لصفحة الادخال المباشر
          </Button>
        </Box>
      </DialogContent>
    </BootstrapDialog>
  );
}
type PropType = {
  handleClose: () => void;
  open: boolean;
};

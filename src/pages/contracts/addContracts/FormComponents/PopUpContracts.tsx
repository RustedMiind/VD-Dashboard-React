import { FormControl, Modal } from "@mui/base";
import {
  Dialog,
  Button,
  DialogTitle,
  Paper,
  DialogContent,
  DialogActions,
  Stack,
  Typography,
  FormControlLabel,
  Radio,
  Box,
  RadioGroup,
} from "@mui/material";
import { useState, useReducer, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { NavLink } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material";
import { contractTypes } from "../ContractTyeps";
import { contractIntial, reducer } from "./reducer";
import axios from "axios";
import { Api } from "../../../../constants";
import { ContractDataType } from "../../../../types/ContractRequest";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
export default function PopUpContracts(props: PropType) {
  // const [option, setOption] = useContext(ContractCreationOptionContext);
  const [requests, setRequests] = useState<ContractDataType | null>(null);
  const [contract_id, setContract_id] = useState<number | undefined>(undefined);

  useEffect(() => {
    axios
      .get<ContractDataType>(Api("employee/contract/use"))
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
              {requests?.contractType.map((type) => (
                <FormControlLabel
                  key={type.id}
                  value={type.id}
                  control={<Radio />}
                  label={type.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <Button
            variant="contained"
            component={NavLink}
            to={`${contract_id}`}
            sx={{ my: 5 }}
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

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
import { useContext, useReducer } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { NavLink } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material";
import { ContractCreationOptionContext } from "../../Context/Store";
import { contractTypes } from "../ContractTyeps";
import { contractIntial, reducer } from "./reducer";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
export default function PopUpContracts(props: PropType) {
  const [option, setOption] = useContext(ContractCreationOptionContext);

  const [contractData, dispatch] = useReducer(reducer, contractIntial);

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
              // value={option}
              value={contractData.type}
              onChange={(e) => {
                // console.log("Changed !!!! ", value);
                // console.log("setOption Exist ", !!setOption);
                // console.log(option, setOption);
                // if (setOption) {
                //   setOption(value as unknown as number);
                // }
                dispatch({ type: "TYPE", payload: 1 });
              }}
            >
              {contractTypes.map((option) => (
                <FormControlLabel
                  key={option.type}
                  value={option.type}
                  control={<Radio />}
                  label={option.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <Button
            variant="contained"
            component={NavLink}
            to={"create"}
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

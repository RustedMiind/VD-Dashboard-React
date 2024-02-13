import {
  TableContainer,
  Table,
  TableRow,
  TableBody,
  Checkbox,
  Stack,
  Button,
  Typography,
  TextField,
  TableCell,
  IconButton,
  MenuItem,
} from "@mui/material";
import NotFound from "../../../../components/NotFound";
import SettingsIcon from "@mui/icons-material/Settings";
import StatusChip from "../../../../components/StatusChip";
import { NavLink } from "react-router-dom";
import TableHead from "./TableHead";
import { useContext, useEffect, useState } from "react";
import { EnvoysContext } from "../context";
import axios from "axios";
import { Api } from "../../../../constants";
import { Envoy } from "../../../../types/Envoys/Envoy";
import { useSnackbar } from "notistack";
import { Contractor } from "../../../../types/Contractors/Contractor";

function TableContainerComponent() {
  const { state, isSelected, toggleEnvoy } = useContext(EnvoysContext);
  const { status, envoys } = state;
  console.log(envoys, status);

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead />
          {status === "none" && envoys && (
            <TableBody>
              {envoys.map((envoy) => (
                <TableRow>
                  <TableCell>
                    <Checkbox
                      checked={isSelected(envoy.id)}
                      onChange={(e, checked) => {
                        toggleEnvoy(envoy.id, checked);
                      }}
                    />
                  </TableCell>

                  <TableCell>{envoy.name}</TableCell>

                  <TableCell>{envoy.phone}</TableCell>

                  <TableCell>{envoy.email}</TableCell>
                  <TableCell>{envoy.contractor?.name}</TableCell>
                  <TableCell>
                    <IconButton>
                      <SettingsIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <Stack
        p={2}
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{
          position: "absolute",
          left: "250px",
        }}
      >
        <Typography> عدد العرض في الصفحة</Typography>
        <TextField
          size="small"
          // value={props.limit}
          select
          // onChange={(e) => {
          //   props.setLimit(e.target.value);
          // }}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={100}>100</MenuItem>
          <MenuItem value={250}>250</MenuItem>
          <MenuItem value={500}>500</MenuItem>
          <MenuItem value={1000}>1000</MenuItem>
          <MenuItem value={10000}>10000</MenuItem>
          <MenuItem value={"-1"}>عرض الكل</MenuItem>
        </TextField>
      </Stack>
    </>
  );
}

export default TableContainerComponent;

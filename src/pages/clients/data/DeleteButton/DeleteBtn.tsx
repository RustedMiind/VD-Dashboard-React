import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext } from "react";
import { TableContext } from "../../Context/Store";
import axios from "axios";
import { Api } from "../../../../constants";
import { ClientRequest } from "../../../../types";

function DeleteBtn(props: PropsType) {
  const deleteClients = useContext(TableContext);
  function Delete() {
    axios
      .post(Api("employee/client/delete"), deleteClients?.index)
      .then((res) => {
        console.log(res);
        const filtered =
          props.requests?.filter(
            (req) => !deleteClients?.index?.id?.includes(req.id)
          ) || props.requests;
        props.setRequests(filtered);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <Button
      variant="outlined"
      startIcon={<DeleteIcon />}
      disabled={!!!deleteClients?.index?.id}
      sx={{
        ml: 3,
        width: "100px",
      }}
      color="error"
      onClick={Delete}
    >
      حذف
    </Button>
  );
}

export default DeleteBtn;

export type PropsType = {
  requests: ClientRequest[] | null;
  setRequests: any;
};

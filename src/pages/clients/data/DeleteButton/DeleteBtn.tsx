import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext } from "react";
import { TableContext } from "../../Context/Store";
import axios from "axios";
import { Api } from "../../../../constants";
import { Client } from "../../../../types/Clients";

function DeleteBtn(props: PropsType) {
  const deleteClients = useContext(TableContext);

  function Delete() {
    axios
      .post(Api("employee/client/delete"), deleteClients?.index)
      .then((res) => {
        const filtered =
          (typeof props.requests === "object" &&
            props.requests?.filter(
              (req) => !deleteClients?.index?.id?.includes(req.id)
            )) ||
          props.requests;
        props.setRequests(filtered);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <Button
      disabled={deleteClients?.index?.id.length == 0}
      variant="outlined"
      startIcon={<DeleteIcon />}
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
  requests: Client[] | "loading" | "error";
  setRequests: React.Dispatch<
    React.SetStateAction<Client[] | "loading" | "error">
  >;
};

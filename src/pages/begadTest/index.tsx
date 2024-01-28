import { useState } from "react";
import AddLocation from "./AddLocation";
import AddSpace from "./AddSpace";
import AddFloors from "./AddFloors";

function TestPopUp() {
  let [open, setOpen] = useState(true);

  return (
    <>
      <AddLocation open={open} setOpen={setOpen} />
      <AddSpace open={false} setOpen={setOpen} />
      <AddFloors open={false} setOpen={setOpen} />
    </>
  );
}

export default TestPopUp;

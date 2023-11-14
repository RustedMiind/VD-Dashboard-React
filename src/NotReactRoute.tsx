import { useEffect } from "react";
import { Domain } from "./constants";

function NotReactRoute() {
  useEffect(() => {
    window.location.replace(Domain("admin"));
  }, []);

  return <></>;
}

export default NotReactRoute;

import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useContext } from "react";
import { BreadCrumbContext } from "../BreadCrumbContext";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

function Breadcrumb() {
  const breadcrumbContext = useContext(BreadCrumbContext);

  return (
    <Breadcrumbs separator={<NavigateBeforeIcon />}>
      {breadcrumbContext.links.map((link, index, arr) => (
        <Button
          disabled={exclude.includes(link.title) || index === arr.length - 1}
          component={NavLink}
          sx={{ fontWeight: 700 }}
          to={link.path}
        >
          {link.title}
        </Button>
      ))}
    </Breadcrumbs>
  );
}

const exclude = ["الموظفين", "مكتبة البيانات"];

export default Breadcrumb;

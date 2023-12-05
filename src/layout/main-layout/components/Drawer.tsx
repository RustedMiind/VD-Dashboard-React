import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import IconBox from "./IconBox";
import { Stack, SvgIconTypeMap } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { OverridableComponent } from "@mui/material/OverridableComponent";

// Icons
import SecurityIcon from "@mui/icons-material/Security";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import GroupIcon from "@mui/icons-material/Group";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BadgeIcon from "@mui/icons-material/Badge";
import { AdminUrl } from "../../../constants/AdminUrl";

const routesCollections: RoutesCollectionType[] = [
  {
    name: "الادوار والمستخدمين",
    icon: SecurityIcon,
    routes: [
      { name: "الادوار", path: "roles/index" },
      { name: "المستخدمين", path: "users" },
    ],
  },
  {
    name: "الهيكل التنظيمي",
    icon: AutoAwesomeMosaicIcon,
    routes: [
      { name: "الفروع", path: "branches" },
      {
        name: "الادارة والاقسام",
        path: "managements",
      },
      {
        name: "التسلسل الوظيفي",
        path: "job_types",
      },
      {
        name: "بيانات الموظفين",
        path: "employees",
      },
    ],
  },
  {
    name: "العملاء",
    icon: GroupIcon,
    routes: [
      { name: "بيانات العملاء", path: "/clients", react: true },
      { name: "ادارة العقود", path: "/contracts", react: true },
      {
        name: "بيانات الوسطاء",
        path: "brokers",
      },
      {
        name: "طلبات العملاء",
        path: "/clients/requests",
        react: true,
      },
      {
        name: "اجراءات العملاء",
        path: "/clients/procedures",
        react: true,
      },
    ],
  },
  {
    name: "الحضور والطلبات",
    icon: AssignmentIcon,
    routes: [
      {
        name: "حضور الموظفين",
        path: "employee/reports",
      },
      { name: "طلبات الموظفين", path: "/employees/requests", react: true },
      { name: "اجراءات الطلبات", path: "/employees/procedures", react: true },
      {
        name: "الشكاوي والدعم",
        path: "attendance/support",
      },
      {
        name: "محددات المشاريع",
        path: "attendance/projects-shifts",
      },
    ],
  },
  // {
  //   name: "الموظفين",
  //   icon: BadgeIcon,
  //   routes: [
  //     { name: "حضور الموظفين", path: "" },
  //     { name: "محددات المشاريع", path: "" },
  //   ],
  // },
];

function DrawerComponent(props: PropsType) {
  const [currentCollection, setCurrentCollection] = useState<null | number>();

  return (
    <Drawer
      sx={{
        width: props.width,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: props.width,
          boxSizing: "border-box",
          backgroundColor: "primary.main",
          color: "primary.contrastText",
          "*": {
            color: "primary.contrastText",
          },
        },
      }}
      variant="permanent"
      anchor="left"
    >
      {/* <Toolbar /> */}
      <IconBox />
      <List>
        {routesCollections.map((collection, index) => (
          <Accordion
            key={index}
            sx={{
              backgroundColor: "transparent",
            }}
            expanded={currentCollection === index}
            onChange={(e, x) => {
              if (x) {
                setCurrentCollection(index);
              } else {
                setCurrentCollection(null);
              }
            }}
            elevation={0}
            disableGutters
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              component={Button}
              sx={{ width: 1 }}
              key={collection.name}
            >
              {collection.icon && <collection.icon />}
              <Typography ml={collection.icon ? 0.5 : 0}>
                {collection.name}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack
                sx={{
                  button: {
                    width: 1,
                    justifyContent: "start",
                  },
                }}
              >
                {collection.routes.map((route, i) => (
                  <Button
                    key={i}
                    disabled={!route.path}
                    sx={{ justifyContent: "start" }}
                    {...(route.react
                      ? { component: NavLink, to: `/react${route.path}` }
                      : { component: "a", href: AdminUrl(route.path) })}
                  >
                    {route.name}
                  </Button>
                ))}
              </Stack>
            </AccordionDetails>
          </Accordion>
        ))}
      </List>
    </Drawer>
  );
}

type PropsType = {
  width: number;
};

type RoutesCollectionType = {
  name: string;
  routes: RouteType[];
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
};

type RouteType = { name: string; path: string; react?: boolean };

export default DrawerComponent;

import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Link from "@mui/material/Link";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconBox from "./IconBox";
import { Stack } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const routesCollections: RoutesCollectionType[] = [
  {
    name: "الادوار والمستخدمين",
    routes: [
      { name: "الادوار", path: "#" },
      { name: "المستخدمين", path: "#" },
    ],
  },
  {
    name: "الهيكل التنظيمي",
    routes: [
      { name: "الفروع", path: "#" },
      { name: "الادارة والاقسام", path: "#" },
      { name: "التسلسل الوظيفي", path: "#" },
      { name: "بيانات الموظفين", path: "#" },
    ],
  },
  {
    name: "العملاء",
    routes: [
      { name: "بيانات العملاء", path: "#" },
      { name: "بيانات الوسطاء", path: "#" },
      { name: "طلبات العملاء", path: "#", react: true },
    ],
  },
  {
    name: "الحضور والطلبات",
    routes: [
      { name: "حضور الموظفين", path: "#" },
      { name: "طلبات الموظفين", path: "#" },
      { name: "الشكاوي والدعم", path: "#" },
      { name: "محددات المشاريع", path: "#" },
    ],
  },
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
              <Typography>{collection.name}</Typography>
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
                {collection.routes.map((route) => (
                  <Button
                    sx={{ justifyContent: "start" }}
                    {...(route.react
                      ? { component: NavLink, to: route.path }
                      : { component: "a", href: route.path })}
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
};

type RouteType = { name: string; path: string; react?: boolean };

export default DrawerComponent;